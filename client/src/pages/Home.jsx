import SearchBar from '../components/SearchBar';

const Home = () => {
  const examples = ['torvalds', 'gaearon', 'sindresorhus'];
  const features = [
    { icon: '📊', title: 'Detailed Scores', desc: 'Get scores across 5 key categories' },
    { icon: '🔗', title: 'Shareable URL', desc: 'Share your report with recruiters' },
    { icon: '⚡', title: 'Instant Results', desc: 'Results cached for 24 hours' },
    { icon: '🆓', title: '100% Free', desc: 'No account or subscription needed' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.icon}>⚡</div>
        <h1 style={styles.title}>Developer Portfolio Evaluator</h1>
        <p style={styles.subtitle}>
          Analyse any GitHub profile and get a detailed score card
          covering activity, code quality, diversity, community impact
          and hiring readiness — all in seconds.
        </p>
        <SearchBar />
        <div style={styles.examples}>
          <span style={styles.exampleText}>Try:</span>
          {examples.map((name) => (
            <a key={name} href={'/report/' + name} style={styles.exampleLink}>
              {name}
            </a>
          ))}
        </div>
      </div>

      <div style={styles.features}>
        {features.map((feature) => (
          <div key={feature.title} style={styles.featureCard}>
            <span style={styles.featureIcon}>{feature.icon}</span>
            <h3 style={styles.featureTitle}>{feature.title}</h3>
            <p style={styles.featureDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f9fc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 16px',
    gap: '48px',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    maxWidth: '600px',
    textAlign: 'center',
  },
  icon: { fontSize: '48px' },
  title: {
    margin: 0,
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2d333b',
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    color: '#718096',
    lineHeight: '1.6',
  },
  examples: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  exampleText: {
    fontSize: '14px',
    color: '#718096',
  },
  exampleLink: {
    fontSize: '14px',
    color: '#0366d6',
    textDecoration: 'none',
    padding: '4px 10px',
    backgroundColor: '#e8f0fe',
    borderRadius: '20px',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    width: '100%',
    maxWidth: '900px',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  featureIcon: { fontSize: '28px' },
  featureTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2d333b',
  },
  featureDesc: {
    margin: 0,
    fontSize: '14px',
    color: '#718096',
  },
};

export default Home;
