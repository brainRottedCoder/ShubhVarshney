import { Router } from 'express';

const router = Router();

interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    bio: string;
}

interface GitHubRepo {
    name: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
}

interface ContributionDay {
    contributionCount: number;
    date: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}

interface GraphQLResponse {
    data?: {
        user?: {
            contributionsCollection: {
                contributionCalendar: ContributionCalendar;
            };
        };
    };
}

// Function to fetch contributions using GitHub GraphQL API
async function fetchContributions(username: string): Promise<{ totalContributions: number; streak: number }> {
    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN || ''}`,
                'User-Agent': 'calm-canvas-portfolio'
            },
            body: JSON.stringify({ query, variables: { username } })
        });

        if (!response.ok) {
            throw new Error('GraphQL request failed');
        }

        const result: GraphQLResponse = await response.json();

        if (!result.data?.user) {
            throw new Error('User not found in GraphQL response');
        }

        const calendar = result.data.user.contributionsCollection.contributionCalendar;
        const totalContributions = calendar.totalContributions;

        // Calculate current streak
        const allDays: ContributionDay[] = [];
        for (const week of calendar.weeks) {
            for (const day of week.contributionDays) {
                allDays.push(day);
            }
        }

        // Sort by date descending (most recent first)
        allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Calculate streak from today backwards
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const day of allDays) {
            const dayDate = new Date(day.date);
            dayDate.setHours(0, 0, 0, 0);

            // Only count days up to today
            if (dayDate > today) continue;

            if (day.contributionCount > 0) {
                streak++;
            } else {
                // Allow skipping today if no contributions yet
                if (dayDate.getTime() === today.getTime()) {
                    continue;
                }
                break;
            }
        }

        return { totalContributions, streak };
    } catch (error) {
        console.error('GraphQL fetch error:', error);
        // Return fallback values if GraphQL fails
        return { totalContributions: 0, streak: 0 };
    }
}

// Alternative: Scrape contributions from GitHub profile page
async function scrapeContributions(username: string): Promise<{ totalContributions: number; streak: number }> {
    try {
        // Use a public contributions API endpoint
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);

        if (!response.ok) {
            throw new Error('Contributions API failed');
        }

        const data = await response.json();

        // Get total contributions from the response
        const totalContributions = data.total?.lastYear || data.total?.[new Date().getFullYear()] || 0;

        // Calculate streak from contributions array
        const contributions = data.contributions || [];

        // Sort by date descending
        contributions.sort((a: { date: string }, b: { date: string }) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const day of contributions) {
            const dayDate = new Date(day.date);
            dayDate.setHours(0, 0, 0, 0);

            if (dayDate > today) continue;

            if (day.count > 0) {
                streak++;
            } else {
                // Allow skipping today if no contributions yet
                if (dayDate.getTime() === today.getTime()) {
                    continue;
                }
                break;
            }
        }

        return { totalContributions, streak };
    } catch (error) {
        console.error('Contributions scrape error:', error);
        return { totalContributions: 0, streak: 0 };
    }
}

// GET /api/github/:username
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Fetch user profile
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'calm-canvas-portfolio'
            }
        });

        if (!userResponse.ok) {
            throw new Error(`GitHub user not found: ${username}`);
        }

        const userData: GitHubUser = await userResponse.json();

        // Fetch repositories to calculate total stars
        const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'calm-canvas-portfolio'
                }
            }
        );

        const repos: GitHubRepo[] = await reposResponse.json();

        // Calculate stats
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

        // Get actual contribution data
        // Try GraphQL first (requires GITHUB_TOKEN), then fall back to scraping
        let contributionData = { totalContributions: 0, streak: 0 };

        if (process.env.GITHUB_TOKEN) {
            contributionData = await fetchContributions(username);
        }

        // If GraphQL fails or no token, use the scraping method
        if (contributionData.totalContributions === 0) {
            contributionData = await scrapeContributions(username);
        }

        // Language stats
        const languages = repos
            .filter(r => r.language)
            .reduce((acc, repo) => {
                acc[repo.language] = (acc[repo.language] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

        const topLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }));

        res.json({
            username: userData.login,
            name: userData.name,
            avatar: userData.avatar_url,
            bio: userData.bio,
            repositories: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            stars: totalStars,
            forks: totalForks,
            contributions: contributionData.totalContributions,
            topLanguages,
            streak: contributionData.streak,
        });
    } catch (error) {
        console.error('GitHub API error:', error);
        res.status(500).json({
            error: 'Failed to fetch GitHub data',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export { router as githubRouter };
