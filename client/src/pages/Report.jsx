import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfile } from '../utils/api';
import ScoreCard from '../components/ScoreCard';
import RadarChartComponent from '../components/RadarChart';
import HeatMap from '../components/HeatMap';
import RepoList from '../components/RepoList';

const Report = () => {
  const { username } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProfile(username);
        setReport(data);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load report. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [username]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div style={styles.centered}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Analysing {username} profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centered}>
        <p style={styles.errorText}>{error}</p>
        <a href="/" style={styles.backLink}>Go back</a>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <a href="/" style={styles.backLink}>Back to search</a>
        <button onClick={handleCopyLink} style={styles.shareButton}>
          Share Report
        </button>
      </div>

      {/* All sections */}
      <div style={styles.content}>
        <ScoreCard data={report} />
        <RadarChartComponent scores={report.scores} />
        <HeatMap heatmapData={report.heatmapData} />
        <RepoList repos={report.topRepos} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f9fc',
    padding: '24px 16px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  backLink: {
    color: '#0366d6',
    textDecoration: 'none',
    fontSize: '14px',
  },
  shareButton: {
    padding: '8px 20px',
    backgroundColor: '#2d333b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  centered: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #2d333b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#718096',
    fontSize: '16px',
  },
  errorText: {
    color: '#dc3545',
    fontSize: '16px',
  },
};

export default Report;
