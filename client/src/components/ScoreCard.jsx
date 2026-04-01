const ScoreCard = ({ data }) => {
  const { name, username, avatarUrl, bio, followers, publicRepos, scores } = data;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - scores.overall) / 100) * circumference;

  const getScoreColor = (score) => {
    if (score >= 70) return '#28a745';
    if (score >= 40) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div style={styles.card}>
      {/* Profile Info */}
      <div style={styles.profile}>
        <img src={avatarUrl} alt={name} style={styles.avatar} />
        <div>
          <h2 style={styles.name}>{name || username}</h2>
          <p style={styles.username}>@{username}</p>
          {bio && <p style={styles.bio}>{bio}</p>}
          <div style={styles.stats}>
            <span>👥 {followers} followers</span>
            <span>📦 {publicRepos} repos</span>
          </div>
        </div>
      </div>

      {/* Score Ring */}
      <div style={styles.ringContainer}>
        <svg width="180" height="180">
          {/* Background circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={getScoreColor(scores.overall)}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            transform="rotate(-90 90 90)"
          />
          {/* Score text */}
          <text
            x="90"
            y="85"
            textAnchor="middle"
            fontSize="32"
            fontWeight="bold"
            fill={getScoreColor(scores.overall)}
          >
            {scores.overall}
          </text>
          <text
            x="90"
            y="110"
            textAnchor="middle"
            fontSize="14"
            fill="#718096"
          >
            out of 100
          </text>
        </svg>

        {/* Category Scores */}
        <div style={styles.categories}>
          {[
            { label: 'Activity', key: 'activity' },
            { label: 'Code Quality', key: 'codeQuality' },
            { label: 'Diversity', key: 'diversity' },
            { label: 'Community', key: 'community' },
            { label: 'Hiring Ready', key: 'hiringReady' },
          ].map(({ label, key }) => (
            <div key={key} style={styles.categoryRow}>
              <span style={styles.categoryLabel}>{label}</span>
              <div style={styles.barContainer}>
                <div
                  style={{
                    ...styles.bar,
                    width: `${scores[key]}%`,
                    backgroundColor: getScoreColor(scores[key]),
                  }}
                />
              </div>
              <span style={styles.categoryScore}>{scores[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  profile: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
  },
  name: {
    margin: '0 0 4px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  username: {
    margin: '0 0 8px',
    color: '#718096',
    fontSize: '14px',
  },
  bio: {
    margin: '0 0 8px',
    fontSize: '14px',
    color: '#4a5568',
  },
  stats: {
    display: 'flex',
    gap: '16px',
    fontSize: '14px',
    color: '#4a5568',
  },
  ringContainer: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categories: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: '200px',
  },
  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  categoryLabel: {
    width: '100px',
    fontSize: '13px',
    color: '#4a5568',
  },
  barContainer: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    height: '8px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
  categoryScore: {
    width: '30px',
    fontSize: '13px',
    fontWeight: 'bold',
    textAlign: 'right',
  },
};

export default ScoreCard;