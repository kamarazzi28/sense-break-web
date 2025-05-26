import './StatsGrid.css';

function StatsGrid({stats}) {
    return (
        <div className="stats-grid">
            <div className="stats-row">
                <div className="stat-card">
                    <p className="label">Total sessions</p>
                    <p className="value">{stats.total}</p>
                </div>
                <div className="stat-card">
                    <p className="label">Vision sessions</p>
                    <p className="value">{stats.vision}</p>
                </div>
                <div className="stat-card">
                    <p className="label">Hearing sessions</p>
                    <p className="value">{stats.hearing}</p>
                </div>
            </div>

            <div className="stat-card wide">
                <p className="label">Relaxation Time</p>
                <p className="value">{stats.relaxation}</p>
            </div>
        </div>
    );
}

export default StatsGrid;
