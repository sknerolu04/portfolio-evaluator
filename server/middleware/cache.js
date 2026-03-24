import Report from '../models/Report.js';

const checkCache = async (req, res, next) => {
  try {
    const { username } = req.params;
    
    const cachedReport = await Report.findOne({ username });

    if (cachedReport) {
      const now = new Date();
      const cacheAge = (now - cachedReport.cachedAt) / (1000 * 60 * 60);

      if (cacheAge < 24) {
        console.log(`Cache hit for ${username}`);
        return res.json(cachedReport);
      }

      // Cache expired — delete it and fetch fresh
      await Report.deleteOne({ username });
      console.log(`Cache expired for ${username}, fetching fresh data`);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkCache;