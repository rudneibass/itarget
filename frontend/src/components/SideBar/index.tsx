import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './styles.css'

export default function Index() {
  
  const location = useLocation();
  const isLinkActive = (pathname: string) => {
    return location.pathname === pathname;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark light-border-bottom">
        <a className="navbar-brand d-flex align-items-center">
          <b>Admin</b>
        </a>
      </nav>

      <nav>
        <ul
          id="sidebar-menu"
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
        >
          <li>
            <Link to="/" className={`nav-link align-middle px-0 ${isLinkActive('/') ? 'active-route' : ''}`} >
              <i className="fs-4 bi-grid"></i>
              <span className="ms-1 d-none d-sm-inline">Eventos</span>
            </Link>
          </li>

          <li>
            <Link to="/inscricoes" className={`nav-link align-middle px-0 ${isLinkActive('/inscricoes') ? 'active-route' : ''}`}>
              <i className="fs-4 bi-people"></i>
              <span className="ms-1 d-none d-sm-inline">Inscrições</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
