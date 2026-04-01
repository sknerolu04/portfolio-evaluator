const HeatMap = ({ heatmapData }) => {
  // Generate last 30 days
  const getDays = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        count: heatmapData[dateStr] || 0,
      });
    }
    return days;
  };

  const getColor = (count) => {
    if (count === 0) return '#ebedf0';
    if (count === 1) return '#9be9a8';
    if (count === 2) return '#40c463';
    if (count === 3) return '#30a14e';
    return '#216e39';
  };

  const days = getDays();

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Contribution Activity</h3>
      <div style={styles.grid}>
        {days.map(({ date, count }) => (
          <div
            key={date}
            title={`${date}: ${count} contribution${count !== 1 ? 's' : ''}`}
            style={{
              ...styles.cell,
              backgroundColor: getColor(count),
            }}
          />
        ))}
      </div>
      {/* Legend */}
      <div style={styles.legend}>
        <span style={styles.legendText}>Less</span>
        {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color) => (
          <div
            key={color}
            style={{
              ...styles.cell,
              backgroundColor: color,
            }}
          />
        ))}
        <span style={styles.legendText}>More</span>
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
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  cell: {
    width: '16px',
    height: '16px',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '12px',
  },
  legendText: {
    fontSize: '12px',
    color: '#718096',
    marginRight: '4px',
  },
};

export default HeatMap;