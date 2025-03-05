import { Link, NavLink } from 'ReactRouterDOM'

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/" className="header-logo-link">
        <div className="logo-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
            width="55"
            height="55"
          >
            <defs>
              <linearGradient
                id="hexGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <filter
                id="hexShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="3"
                  floodOpacity="0.2"
                />
              </filter>
            </defs>

            <path
              d="M150 50 L250 100 L250 200 L150 250 L50 200 L50 100 Z"
              fill="url(#hexGradient)"
              filter="url(#hexShadow)"
            />

            <path
              d="M150 75 L225 115 L225 185 L150 225 L75 185 L75 115 Z"
              fill="#ffffff"
              opacity="0.2"
            />
            <path
              d="M150 100 L200 130 L200 170 L150 200 L100 170 L100 130 Z"
              fill="#ffffff"
              opacity="0.3"
            />

            <path
              d="M150 120 L180 135 L180 165 L150 180 L120 165 L120 135 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
        <div className="header-text">
          <h3>TriVault</h3>
        </div>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/notes">Notes</NavLink>
      </nav>
    </header>
  )
}
