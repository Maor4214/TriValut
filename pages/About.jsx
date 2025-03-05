export function About() {
  return (
    <section className="container about">
      <div className="about-header">
        <h1>About TriVault</h1>
        <p className="about-intro">
          TriVault is your all-in-one digital solution, combining the best
          features of email management, note-taking, and book organization in a
          single, intuitive platform.
        </p>
      </div>

      <div className="applications-section">
        <h2>Our Applications</h2>

        <div className="app-card mail-app">
          <div className="app-icon">
            <i className="material-icons">mail</i>
          </div>
          <div className="app-details">
            <h3>Mail</h3>
            <p>
              Our Mail application streamlines your communication with an
              intuitive interface inspired by Gmail. Organize your messages with
              custom folders, filter important emails, and never miss a critical
              conversation again.
            </p>
            <ul className="feature-list">
              <li>
                <i className="material-icons">check_circle</i> Smart
                categorization
              </li>
              <li>
                <i className="material-icons">check_circle</i> Advanced search
                capabilities
              </li>
              <li>
                <i className="material-icons">check_circle</i> Seamless file
                attachments
              </li>
            </ul>
          </div>
        </div>

        <div className="app-card notes-app">
          <div className="app-icon">
            <i className="material-icons">note</i>
          </div>
          <div className="app-details">
            <h3>Notes</h3>
            <p>
              Capture your thoughts instantly with our Notes application,
              designed to help you organize ideas, create to-do lists, and store
              important information. Inspired by Google Keep, our Notes app
              combines simplicity with powerful features.
            </p>
            <ul className="feature-list">
              <li>
                <i className="material-icons">check_circle</i> Color-coded
                organization
              </li>
              <li>
                <i className="material-icons">check_circle</i> Checklists and
                reminders
              </li>
              <li>
                <i className="material-icons">check_circle</i> Rich text
                formatting
              </li>
            </ul>
          </div>
        </div>

        <div className="app-card books-app">
          <div className="app-icon">
            <i className="material-icons">book</i>
          </div>
          <div className="app-details">
            <h3>Books</h3>
            <p>
              Manage your reading life with our Books application. Keep track of
              your collection, discover new titles, and organize your library
              effortlessly. Perfect for book lovers who want to maintain a
              digital catalog of their reading journey.
            </p>
            <ul className="feature-list">
              <li>
                <i className="material-icons">check_circle</i> Virtual bookshelf
                organization
              </li>
              <li>
                <i className="material-icons">check_circle</i> Reading progress
                tracking
              </li>
              <li>
                <i className="material-icons">check_circle</i> Book
                recommendations
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <i className="material-icons">person</i>
            </div>
            <h3>Maor Yadegar</h3>
            <p className="member-role">Full-Stack Developer</p>
            <p className="member-bio">
              Passionate about creating intuitive user experiences and robust
              applications. Maor combines coding expertise with design
              sensibility to build seamless digital solutions.
            </p>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <i className="material-icons">person</i>
            </div>
            <h3>Tomer Almog</h3>
            <p className="member-role">Full-Stack Developer</p>
            <p className="member-bio">
              With strong technical knowledge and an eye for detail, Tomer
              brings well-rounded expertise in both development and design to
              create engaging and functional applications.
            </p>
          </div>
        </div>
      </div>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At TriVault, we believe in simplifying digital life through
          integration and smart design. Our mission is to provide a unified
          platform that helps you communicate, create, and collect with ease.
          We're committed to developing tools that enhance productivity without
          sacrificing usability.
        </p>
      </div>
    </section>
  )
}
