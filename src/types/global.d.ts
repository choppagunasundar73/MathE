// Global type declarations

// Extend the Window interface to include our global flags
interface Window {
  // Flag to track if leaderboard refresh is in progress
  refreshingLeaderboard: boolean | string;
  
  // Flag to track if challenges are being loaded
  loadingAllChallenges: boolean;
  
  // Flag to track if completed challenges are being refreshed
  refreshingCompletedChallenges: boolean;
}