import logoUrl from "../../assets/logo_p.svg";

function TopbarMark() {
  const markers = [
    [50, 14, 0],
    [74, 25, 45],
    [86, 50, 90],
    [74, 75, 135],
    [50, 86, 180],
    [25, 75, 225],
    [14, 50, 270],
    [25, 25, 315]
  ];

  return (
    <div className="brand-mark brand-mark-topbar" aria-hidden="true">
      <svg viewBox="0 0 100 100" role="presentation">
        <defs>
          <linearGradient id="ligandHubGradientTopbar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6d4aff" />
            <stop offset="100%" stopColor="#00c2a8" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="22" fill="none" stroke="#6d4aff" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 9" />
        <g fill="url(#ligandHubGradientTopbar)">
          {markers.map(([x, y, rotation]) => (
            <g transform={`translate(${x} ${y}) rotate(${rotation})`} key={`${x}-${y}`}>
              <circle cx="0" cy="0" r="8" />
              <circle cx="9" cy="10" r="6" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export function Header() {
  return (
    <div className="topbar">
      <div className="topbar-brand">
        <TopbarMark />
        <div className="topbar-text">
          <div className="topbar-title">LigandHub</div>
          <div className="topbar-subtitle">Docking Toolkit</div>
        </div>
      </div>
    </div>
  );
}

export function HeroHeader() {
  return (
      <div className="header">
        <div className="hero-brand">
          <img src={logoUrl} alt="LigandHub logo" className="brand-logo brand-logo-hero" />
          <div className="hero-title-group">
            <h1>LigandHub</h1>
          </div>
        </div>
        <p>Molecular docking workspace for structure preparation and output recovery</p>
      </div>
  );
}
