import { useQuery } from '@tanstack/react-query';

const API_BASE = 'http://localhost:3001/api';

export interface LeetCodeStats {
    username: string;
    name: string;
    avatar: string;
    ranking: number;
    reputation: number;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalEasy: number;
    totalMedium: number;
    totalHard: number;
    acceptanceRate: number;
    contestRating: number;
    contestRanking: number;
    contestsAttended: number;
    totalActiveDays: number;
    streak: number;
    badges: unknown[];
}

async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
    const response = await fetch(`${API_BASE}/leetcode/${username}`);

    if (!response.ok) {
        throw new Error('Failed to fetch LeetCode stats');
    }

    return response.json();
}

export function useLeetCodeStats(username: string) {
    return useQuery({
        queryKey: ['leetcode', username],
        queryFn: () => fetchLeetCodeStats(username),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
        enabled: !!username,
    });
}
