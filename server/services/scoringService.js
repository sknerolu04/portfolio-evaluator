// Activity Score (25%) — based on recent commits and push frequency
export const getActivityScore = (events) => {
  const now = new Date();
  const ninetyDaysAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);

  const recentPushes = events.filter(
    (e) => e.type === 'PushEvent' && new Date(e.created_at) > ninetyDaysAgo
  );

  const commitCount = recentPushes.reduce(
    (total, event) => total + (event.payload.commits?.length || 0), 0
  );

  const commitScore = Math.min(commitCount, 20);

  const pushDates = [...new Set(recentPushes.map((e) => e.created_at.split('T')[0]))];
  const streakScore = Math.min(pushDates.length / 3, 5);

  return Math.round(((commitScore + streakScore) / 25) * 100);
};

// Code Quality Score (20%) — README, license, topics, tests folder
export const getCodeQualityScore = (repos) => {
  let totalPoints = 0;
  const maxPoints = repos.length * 5;

  repos.forEach((repo) => {
    if (repo.description) totalPoints += 1;
    if (repo.license) totalPoints += 1;
    if (repo.topics && repo.topics.length > 0) totalPoints += 1;
    if (repo.has_wiki) totalPoints += 1;
    if (repo.homepage) totalPoints += 1;
  });

  if (maxPoints === 0) return 0;
  return Math.round((totalPoints / maxPoints) * 100);
};

// Diversity Score (20%) — languages and repo topics
export const getDiversityScore = (repos) => {
  const languages = new Set(repos.map((r) => r.language).filter(Boolean));
  const topics = new Set(repos.flatMap((r) => r.topics || []));

  const languageScore = Math.min(languages.size, 10);
  const topicScore = Math.min(topics.size, 10);

  return Math.round(((languageScore + topicScore) / 20) * 100);
};

// Community Score (20%) — stars, forks, followers
export const getCommunityScore = (repos, followers) => {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  const starScore = Math.min(Math.log10(totalStars + 1) * 10, 10);
  const forkScore = Math.min(Math.log10(totalForks + 1) * 10, 5);
  const followerScore = followers > 50 ? 5 : Math.min(followers / 10, 5);

  return Math.round(((starScore + forkScore + followerScore) / 20) * 100);
};

// Hiring Readiness Score (15%) — bio, website, email, pinned repos
export const getHiringReadyScore = (profile) => {
  let score = 0;

  if (profile.bio) score += 25;
  if (profile.blog) score += 25;
  if (profile.email) score += 25;
  if (profile.twitter_username) score += 25;

  return score;
};

// Overall Score — weighted total of all 5 categories
export const getOverallScore = (scores) => {
  return Math.round(
    scores.activity * 0.25 +
    scores.codeQuality * 0.20 +
    scores.diversity * 0.20 +
    scores.community * 0.20 +
    scores.hiringReady * 0.15
  );
};