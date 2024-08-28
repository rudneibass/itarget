import './styles.css'

import Home from '@pages/Home'

import { RegistrationListContextProvider } from '@pages/Modules/Registration/List/context.tsx'
import RegistrationList from '@pages/Modules/Registration/List'

import EventList from '@pages/Modules/Event/List'
import { EventListContextProvider } from '@pages/Modules/Event/List/context.tsx'

import { useMainTabsContext } from '../MainTabs/context'


export default function Index() {
  const mainTabsContext = useMainTabsContext()
  
  const activeTab = mainTabsContext.activeTab

  function handleAddTab({ eventKey, title, content } : { eventKey: string, title: string, content: JSX.Element }){
    mainTabsContext.handleAddTab({ eventKey, title, content })
  }

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
            <a 
              className={`nav-link align-middle px-0 ${ activeTab ===  'tab-home' ? 'active-route' : ''}`}
              onClick={() => handleAddTab({ eventKey: 'tab-home', title: 'Home', content: <Home /> })} 
            >
              <i className="fs-4 bi-house"></i>
              <span className="ms-1 d-none d-sm-inline">Home</span>
            </a>
          </li>

          <li>
            <a 
              className={`nav-link align-middle px-0 ${ activeTab ===  'tab-event-list' ? 'active-route' : ''}`}
              onClick={() => handleAddTab({ eventKey: 'tab-event-list', title: 'Eventos', content: <EventListContextProvider><EventList /></EventListContextProvider> })}
            >
              <i className="fs-4 bi-grid"></i>
              <span className="ms-1 d-none d-sm-inline">Eventos</span>
            </a>
          </li>

          <li>
            <a 
              className={`nav-link align-middle px-0 ${ activeTab ===  'tab-registration-list' ? 'active-route' : ''}`}
              onClick={() => handleAddTab({ eventKey: 'tab-registration-list', title: 'Inscrições', content: <RegistrationListContextProvider><RegistrationList /></RegistrationListContextProvider> })} 
            >
              <i className="fs-4 bi-people"></i>
              <span className="ms-1 d-none d-sm-inline">Inscrições</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
