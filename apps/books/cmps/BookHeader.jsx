const { Link, NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header>
        <section>
        </section>
        <nav className="app-nav">
            <h1>MissBooks</h1>

            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/books">Books</Link>
        </nav>



    </header>   
  )
}
