import Report from '../models/Report.js';
import {
  getProfile,
  getRepos,
  getEvents,
  getLanguages,
  getTopRepos,
  getContributions,
} from '../services/githubService.js';
import {
  getActivityScore,
  getCodeQualityScore,
  getDiversityScore,
  getCommunityScore,
  getHiringReadyScore,
  getOverallScore,
} from '../services/scoringService.js';

// GET /api/profile/:username
export const getProfileReport = async (req, res, next) => {
  try {
    const { username } = req.params;

    // Fetch all data from GitHub
    const [profile, repos, events, contributions] = await Promise.all([
      getProfile(username),
      getRepos(username),
      getEvents(username),
      getContributions(username),
    ]);

    // Calculate languages and top repos
    const languages = getLanguages(repos);
    const topRepos = getTopRepos(repos);

    // Calculate all 5 scores
    const scores = {
      activity: getActivityScore(events),
      codeQuality: getCodeQualityScore(repos),
      diversity: getDiversityScore(repos),
      community: getCommunityScore(repos, profile.followers),
      hiringReady: getHiringReadyScore(profile),
    };

    // Calculate overall score
    scores.overall = getOverallScore(scores);

    // Build the report object
    const reportData = {
      username,
      avatarUrl: profile.avatar_url,
      name: profile.name,
      bio: profile.bio,
      followers: profile.followers,
      publicRepos: profile.public_repos,
      scores,
      topRepos,
      languages,
      heatmapData: contributions,
      shareUrl: `${process.env.CLIENT_URL}/report/${username}`,
      cachedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    // Save to MongoDB
    const report = await Report.findOneAndUpdate(
      { username },
      reportData,
      { upsert: true, new: true }
    );

    res.json(report);
  } catch (error) {
    // Handle non-existent GitHub username
    if (error.status === 404) {
      res.status(404);
      throw new Error(`GitHub user "${req.params.username}" not found`);
    }
    next(error);
  }
};

// GET /api/profile/:username/cached
export const getCachedReport = async (req, res, next) => {
  try {
    const { username } = req.params;
    const report = await Report.findOne({ username });

    if (!report) {
      return res.status(404).json({ message: 'No cached report found' });
    }

    res.json(report);
  } catch (error) {
    next(error);
  }
};

// GET /api/compare?u1=:u1&u2=:u2
export const compareProfiles = async (req, res, next) => {
  try {
    const { u1, u2 } = req.query;

    if (!u1 || !u2) {
      return res.status(400).json({ message: 'Please provide two usernames' });
    }

    const [report1, report2] = await Promise.all([
      getProfileReport({ params: { username: u1 } }, { json: (data) => data }, next),
      getProfileReport({ params: { username: u2 } }, { json: (data) => data }, next),
    ]);

    res.json({ user1: report1, user2: report2 });
  } catch (error) {
    next(error);
  }
};