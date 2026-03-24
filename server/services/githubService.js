import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Get basic profile info
export const getProfile = async (username) => {
  const { data } = await octokit.rest.users.getByUsername({ username });
  return data;
};

// Get all public repositories
export const getRepos = async (username) => {
  const { data } = await octokit.rest.repos.listForUser({
    username,
    per_page: 100,
    sort: 'updated',
  });
  return data;
};

// Get recent public events (for activity score)
export const getEvents = async (username) => {
  const { data } = await octokit.rest.activity.listPublicEventsForUser({
    username,
    per_page: 100,
  });
  return data;
};

// Check if a repo has a tests folder
export const getRepoContents = async (owner, repo) => {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: '',
    });
    return data;
  } catch (error) {
    return [];
  }
};

// Get contribution data for heatmap
export const getContributions = async (username) => {
  try {
    const { data } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 100,
    });

    // Build heatmap data from push events
    const heatmap = {};
    data.forEach((event) => {
      if (event.type === 'PushEvent') {
        const date = event.created_at.split('T')[0];
        heatmap[date] = (heatmap[date] || 0) + 1;
      }
    });

    return heatmap;
  } catch (error) {
    return {};
  }
};

// Get language distribution across all repos
export const getLanguages = async (repos) => {
  const languageCount = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(languageCount).reduce((a, b) => a + b, 0);

  const languages = Object.entries(languageCount)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);

  return languages;
};

// Get top 6 repos by stars
export const getTopRepos = (repos) => {
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      description: repo.description,
      url: repo.html_url,
    }));
};