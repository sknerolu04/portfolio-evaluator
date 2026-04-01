const RepoList = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return (
      <div style={styles.card}>
        <h3 style={styles.title}>Top Repositories</h3>
        <p>No repositories found</p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Top Repositories</h3>
      <div style={styles.grid}>
        {repos.map((repo) => (
          <div key={repo.name} style={styles.repoCard}>
            <a href={repo.url} target="_blank" style={styles.repoName}>
              {repo.name}
            </a>
            <p style={styles.repoDesc}>
              {repo.description || 'No description provided'}
            </p>
            <div style={styles.repoStats}>
              <span style={styles.stat}>Language: {repo.language || 'N/A'}</span>
              <span style={styles.stat}>Stars: {repo.stars}</span>
              <span style={styles.stat}>Forks: {repo.forks}</span>
            </div>
          </div>
        ))}
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
  },
  title: {
    margin: '0 0 16px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d333b',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  repoCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  repoName: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#0366d6',
  },
  repoDesc: {
    margin: 0,
    fontSize: '13px',
    color: '#718096',
    lineHeight: '1.4',
  },
  repoStats: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  stat: {
    fontSize: '12px',
    color: '#4a5568',
  },
};

export default RepoList;
