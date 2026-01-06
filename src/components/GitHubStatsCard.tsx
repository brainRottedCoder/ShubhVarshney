import { motion } from 'framer-motion';
import { Github, GitFork, Star, GitCommit, Users, ExternalLink, Loader2 } from 'lucide-react';
import { SmokeEffect } from './SmokeEffect';
import { useGitHubStats } from '@/hooks/useGitHubStats';

interface GitHubStatsProps {
  username?: string;
}

const contributionData = [
  [0, 1, 2, 3, 2, 1, 0],
  [1, 2, 3, 4, 3, 2, 1],
  [2, 3, 4, 3, 4, 3, 2],
  [1, 2, 3, 4, 3, 2, 1],
  [0, 1, 2, 3, 2, 1, 0],
  [1, 2, 3, 2, 3, 2, 1],
  [2, 3, 4, 3, 4, 3, 2],
];

const getContributionColor = (level: number) => {
  const colors = [
    'bg-github/10',
    'bg-github/30',
    'bg-github/50',
    'bg-github/70',
    'bg-github',
  ];
  return colors[level] || colors[0];
};

export const GitHubStatsCard = ({ username = 'brainRottedCoder' }: GitHubStatsProps) => {
  const { data: stats, isLoading, isError } = useGitHubStats(username);

  // Fallback stats when loading or error
  const displayStats = {
    contributions: stats?.contributions ?? 0,
    repositories: stats?.repositories ?? 0,
    stars: stats?.stars ?? 0,
    followers: stats?.followers ?? 0,
    streak: stats?.streak ?? 0,
  };

  return (
    <motion.a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="stats-card stats-card-github group cursor-pointer gradient-border block"
    >
      {/* Smoke effect */}
      <SmokeEffect color="green" intensity="light" />

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-github/10 via-transparent to-transparent rounded-2xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-github/10 flex items-center justify-center">
            <Github className="w-5 h-5 text-github" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">GitHub</h3>
            <p className="text-xs text-muted-foreground font-mono">@{username}</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ x: 0 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
          ) : (
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          )}
        </motion.div>
      </div>

      {/* Contribution Graph */}
      <div className="mb-6 relative">
        <div className="flex gap-1 justify-center">
          {contributionData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((level, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: (weekIndex * 7 + dayIndex) * 0.01 + 0.3,
                    type: 'spring',
                    stiffness: 300,
                  }}
                  className={`w-3 h-3 rounded-sm ${getContributionColor(level)} transition-colors duration-200`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 relative">
        <motion.div
          className="text-center p-3 rounded-xl bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <GitCommit className="w-3.5 h-3.5 text-github" />
          </div>
          <p className={`text-2xl font-semibold text-foreground font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.contributions.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">contributions</p>
        </motion.div>

        <motion.div
          className="text-center p-3 rounded-xl bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-3.5 h-3.5 text-github" />
          </div>
          <p className={`text-2xl font-semibold text-foreground font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.stars}
          </p>
          <p className="text-xs text-muted-foreground">stars earned</p>
        </motion.div>

        <motion.div
          className="text-center p-3 rounded-xl bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <GitFork className="w-3.5 h-3.5 text-github" />
          </div>
          <p className={`text-2xl font-semibold text-foreground font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.repositories}
          </p>
          <p className="text-xs text-muted-foreground">repositories</p>
        </motion.div>

        <motion.div
          className="text-center p-3 rounded-xl bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-3.5 h-3.5 text-github" />
          </div>
          <p className={`text-2xl font-semibold text-foreground font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.followers}
          </p>
          <p className="text-xs text-muted-foreground">followers</p>
        </motion.div>
      </div>

      {/* Streak */}
      <motion.div
        className="mt-4 p-3 rounded-xl bg-github/5 border border-github/10 text-center"
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-sm text-muted-foreground">
          🔥 <span className="font-semibold text-foreground">{displayStats.streak} day</span> streak
        </p>
      </motion.div>

      {/* Error state */}
      {isError && (
        <p className="text-xs text-red-500 text-center mt-2">Failed to load stats</p>
      )}
    </motion.a>
  );
};
