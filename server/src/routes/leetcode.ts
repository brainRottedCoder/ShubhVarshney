import { Router } from 'express';

const router = Router();

interface SubmissionCalendar {
    [timestamp: string]: number;
}

// Function to calculate total active days from submission calendar
function calculateActiveDays(calendar: SubmissionCalendar | string | null): number {
    if (!calendar) return 0;

    // Calendar can be a JSON string or object
    let calendarObj: SubmissionCalendar;
    if (typeof calendar === 'string') {
        try {
            calendarObj = JSON.parse(calendar);
        } catch {
            return 0;
        }
    } else {
        calendarObj = calendar;
    }

    // Count days with at least one submission
    let activeDays = 0;
    for (const timestamp in calendarObj) {
        if (calendarObj[timestamp] > 0) {
            activeDays++;
        }
    }

    return activeDays;
}

// GET /api/leetcode/:username
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Use alfa-leetcode-api (free, public API)
        const baseUrl = 'https://alfa-leetcode-api.onrender.com';

        console.log(`Fetching LeetCode data for: ${username}`);

        // Fetch user profile, solved stats, contest data, and calendar with timeout
        const fetchWithTimeout = async (url: string, timeout = 10000) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            try {
                const response = await fetch(url, { signal: controller.signal });
                clearTimeout(timeoutId);
                return response;
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        };

        const [profileRes, solvedRes, contestRes, calendarRes] = await Promise.allSettled([
            fetchWithTimeout(`${baseUrl}/${username}`),
            fetchWithTimeout(`${baseUrl}/${username}/solved`),
            fetchWithTimeout(`${baseUrl}/${username}/contest`),
            fetchWithTimeout(`${baseUrl}/${username}/calendar`)
        ]);

        // Check if profile request succeeded
        if (profileRes.status === 'rejected' || (profileRes.status === 'fulfilled' && !profileRes.value.ok)) {
            const errorMsg = profileRes.status === 'rejected'
                ? profileRes.reason?.message
                : `HTTP ${profileRes.value.status}`;
            console.error(`LeetCode profile fetch failed for ${username}:`, errorMsg);
            throw new Error(`LeetCode user not found or API unavailable: ${username}`);
        }

        // Parse responses with error handling
        const profile = profileRes.status === 'fulfilled' ? await profileRes.value.json() : {};

        const solved = solvedRes.status === 'fulfilled' && solvedRes.value.ok
            ? await solvedRes.value.json()
            : {};

        const contest = contestRes.status === 'fulfilled' && contestRes.value.ok
            ? await contestRes.value.json()
            : {};

        const calendarData = calendarRes.status === 'fulfilled' && calendarRes.value.ok
            ? await calendarRes.value.json()
            : {};

        console.log(`LeetCode data fetched successfully for ${username}`);

        // Calculate total active days from submission calendar
        const submissionCalendar = calendarData?.submissionCalendar || profile?.submissionCalendar || null;
        const totalActiveDays = calculateActiveDays(submissionCalendar);

        // Extract and format the data
        const stats = {
            username: profile.username || username,
            name: profile.name || username,
            avatar: profile.avatar || '',
            ranking: profile.ranking || 0,
            reputation: profile.reputation || 0,

            // Solved problems
            totalSolved: solved.solvedProblem || 0,
            easySolved: solved.easySolved || 0,
            mediumSolved: solved.mediumSolved || 0,
            hardSolved: solved.hardSolved || 0,

            // Total problems available
            totalEasy: solved.totalEasy || 0,
            totalMedium: solved.totalMedium || 0,
            totalHard: solved.totalHard || 0,

            // Acceptance rate
            acceptanceRate: profile.acceptanceRate || 0,

            // Contest data
            contestRating: Math.round(contest.contestRating || 0),
            contestRanking: contest.contestGlobalRanking || 0,
            contestsAttended: contest.contestAttend || 0,

            // Total active days (days with at least one submission)
            totalActiveDays: totalActiveDays,

            // Keep streak for backward compatibility (if available from API)
            streak: profile.streak || 0,

            // Badges
            badges: profile.badges || [],
        };

        res.json(stats);
    } catch (error) {
        console.error('LeetCode API error:', error);
        res.status(500).json({
            error: 'Failed to fetch LeetCode data',
            message: error instanceof Error ? error.message : 'Unknown error',
            username: username
        });
    }
});

export { router as leetcodeRouter };
