import { motion } from 'framer-motion';
import { Code2, Trophy, Target, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { SmokeEffect } from './SmokeEffect';
import { useLeetCodeStats } from '@/hooks/useLeetCodeStats';

interface LeetCodeStatsProps {
  username?: string;
}

export const LeetCodeStatsCard = ({ username = 'Shubh_Varshney' }: LeetCodeStatsProps) => {
  const { data: stats, isLoading, isError } = useLeetCodeStats(username);

  // Fallback stats when loading or error
  const displayStats = {
    totalSolved: stats?.totalSolved ?? 0,
    easySolved: stats?.easySolved ?? 0,
    mediumSolved: stats?.mediumSolved ?? 0,
    hardSolved: stats?.hardSolved ?? 0,
    ranking: stats?.ranking ?? 0,
    contestRating: stats?.contestRating ?? 0,
    totalActiveDays: stats?.totalActiveDays ?? 0,
  };

  const total = 3000;
  const solvedPercentage = (displayStats.totalSolved / total) * 100;

  return (
    <motion.a
      href={`https://leetcode.com/u/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="stats-card stats-card-leetcode group cursor-pointer gradient-border block"
    >
      {/* Smoke effect */}
      <SmokeEffect color="orange" intensity="light" />

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-leetcode/10 via-transparent to-transparent rounded-2xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-leetcode/10 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-leetcode" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">LeetCode</h3>
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

      {/* Main Stats */}
      <div className="text-center mb-6 relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="inline-flex flex-col items-center"
        >
          <span className={`text-5xl font-bold text-foreground font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.totalSolved}
          </span>
          <span className="text-sm text-muted-foreground mt-1">problems solved</span>
        </motion.div>

        {/* Progress Ring */}
        <div className="mt-4 relative h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${solvedPercentage}%` }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-leetcode/70 to-leetcode rounded-full"
          />
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="flex justify-between gap-3 mb-6 relative">
        <motion.div
          className="flex-1 text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          whileHover={{ scale: 1.05 }}
        >
          <p className={`text-lg font-semibold text-emerald-500 font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.easySolved}
          </p>
          <p className="text-xs text-muted-foreground">Easy</p>
        </motion.div>
        <motion.div
          className="flex-1 text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
          whileHover={{ scale: 1.05 }}
        >
          <p className={`text-lg font-semibold text-amber-500 font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.mediumSolved}
          </p>
          <p className="text-xs text-muted-foreground">Medium</p>
        </motion.div>
        <motion.div
          className="flex-1 text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20"
          whileHover={{ scale: 1.05 }}
        >
          <p className={`text-lg font-semibold text-red-500 font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.hardSolved}
          </p>
          <p className="text-xs text-muted-foreground">Hard</p>
        </motion.div>
      </div>

      {/* Contest Stats */}
      <div className="grid grid-cols-2 gap-4 relative">
        <motion.div
          className="text-center p-3 rounded-xl bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className="w-3.5 h-3.5 text-leetcode" />
          </div>
          <p className={`text-xl font-semibold text-foreground font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : displayStats.contestRating || 'N/A'}
          </p>
          <p className="text-xs text-muted-foreground">contest rating</p>
        </motion.div>

        <motion.div
          className="text-center p-3 rounded-xl bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-3.5 h-3.5 text-leetcode" />
          </div>
          <p className={`text-xl font-semibold text-foreground font-mono ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : `#${displayStats.ranking.toLocaleString()}`}
          </p>
          <p className="text-xs text-muted-foreground">global rank</p>
        </motion.div>
      </div>

      {/* Total Active Days */}
      <motion.div
        className="mt-4 p-3 rounded-xl bg-leetcode/5 border border-leetcode/10 text-center"
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4 text-leetcode" />
          <span className="font-semibold text-foreground">{displayStats.totalActiveDays}</span> active days
        </p>
      </motion.div>

      {/* Error state */}
      {isError && (
        <p className="text-xs text-red-500 text-center mt-2">Failed to load stats</p>
      )}
    </motion.a>
  );
};
