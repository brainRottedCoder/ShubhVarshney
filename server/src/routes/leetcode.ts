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

        // Fetch user profile, solved stats, contest data, and calendar
        const [profileRes, solvedRes, contestRes, calendarRes] = await Promise.all([
            fetch(`${baseUrl}/${username}`),
            fetch(`${baseUrl}/${username}/solved`),
            fetch(`${baseUrl}/${username}/contest`),
            fetch(`${baseUrl}/${username}/calendar`)
        ]);

        if (!profileRes.ok) {
            throw new Error(`LeetCode user not found: ${username}`);
        }

        const profile = await profileRes.json();
        const solved = await solvedRes.json();
        const contest = await contestRes.json();
        const calendarData = await calendarRes.json();

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
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export { router as leetcodeRouter };
