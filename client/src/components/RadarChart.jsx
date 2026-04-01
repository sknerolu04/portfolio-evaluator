import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RadarChartComponent = ({ scores }) => {
  const data = [
    { category: 'Activity', score: scores.activity },
    { category: 'Code Quality', score: scores.codeQuality },
    { category: 'Diversity', score: scores.diversity },
    { category: 'Community', score: scores.community },
    { category: 'Hiring Ready', score: scores.hiringReady },
  ];

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Score Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: 13, fill: '#4a5568' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#718096' }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#2d333b"
            fill="#2d333b"
            fillOpacity={0.3}
          />
          <Tooltip
            formatter={(value) => [`${value}/100`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
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
};

export default RadarChartComponent;