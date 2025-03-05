import { showSuccessMsg } from '../services/event-bus.service.js'
const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="container home">
      <div className="hero-section">
        <h1 className="main-title">TriVault</h1>
        <h2 className="tagline">Connect, Organize, Remember – All in One</h2>
        <p className="subtitle">Your Digital Vault for Life</p>
        <button
          onClick={() => showSuccessMsg('Welcome to TriVault!')}
          className="get-started-btn"
        >
          Get Started
        </button>
      </div>

      <div className="features-container">
        <div className="feature-card mail-feature">
          <div className="feature-icon">📧</div>
          <h3>Mail</h3>
          <p>
            Manage your communication in one secure place with our intuitive
            mail interface.
          </p>
          <Link to="/mail" className="feature-link">
            Open Mail
          </Link>
        </div>

        <div className="feature-card notes-feature">
          <div className="feature-icon">📝</div>
          <h3>Notes</h3>
          <p>
            Capture ideas, make lists, and keep track of important information
            with ease.
          </p>
          <Link to="/notes" className="feature-link">
            Open Notes
          </Link>
        </div>

        <div className="feature-card books-feature">
          <div className="feature-icon">📚</div>
          <h3>Books</h3>
          <p>
            Organize your reading collection and discover new books to explore.
          </p>
          <Link to="/books" className="feature-link">
            Open Books
          </Link>
        </div>
      </div>

      <div className="benefits-section">
        <h2>Why Choose TriVault?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h4>All-in-One Solution</h4>
            <p>
              Everything you need in a single platform – no more switching
              between apps.
            </p>
          </div>
          <div className="benefit-item">
            <h4>User-Friendly</h4>
            <p>
              Clean, intuitive interface inspired by your favorite Google apps.
            </p>
          </div>
          <div className="benefit-item">
            <h4>Seamless Integration</h4>
            <p>
              All your tools work together perfectly for maximum productivity.
            </p>
          </div>
          <div className="benefit-item">
            <h4>Secure Storage</h4>
            <p>Keep your important information safe and accessible anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
