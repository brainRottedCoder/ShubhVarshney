import { useQuery } from '@tanstack/react-query';

const API_BASE = 'http://localhost:3001/api';

export interface GitHubStats {
    username: string;
    name: string;
    avatar: string;
    bio: string;
    repositories: number;
    followers: number;
    following: number;
    stars: number;
    forks: number;
    contributions: number;
    topLanguages: { name: string; count: number }[];
    streak: number;
}

async function fetchGitHubStats(username: string): Promise<GitHubStats> {
    const response = await fetch(`${API_BASE}/github/${username}`);

    if (!response.ok) {
        throw new Error('Failed to fetch GitHub stats');
    }

    return response.json();
}

export function useGitHubStats(username: string) {
    return useQuery({
        queryKey: ['github', username],
        queryFn: () => fetchGitHubStats(username),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
        enabled: !!username,
    });
}
