import { useMainTabsContext } from '../MainTabs/context'

import './styles.css'

import Home from '@pages/Home'

import RegistrationList from '@pages/Modules/Registration/List'
import { ListContextProvider as RegistrationListContext } from '@pages/Modules/Registration/List/context.tsx'

import FormList from '@pages/Modules/Form/List'
import { ListContextProvider as FormListContextProvider } from '@pages/Modules/Form/List/context.tsx'


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
              className={`nav-link align-middle px-0 ${ activeTab ===  'tab-registration-list' ? 'active-route' : ''}`}
              onClick={() => handleAddTab({ 
                eventKey: 'tab-registration-list', 
                title: 'Inscrições', 
                content: 
                  <RegistrationListContext>
                    <RegistrationList />
                  </RegistrationListContext> 
                  }
                )
              } 
            >
              <i className="fs-4 bi-people"></i>
              <span className="ms-1 d-none d-sm-inline">Inscrições</span>
            </a>
          </li>
          <li>
            <a 
              className={`nav-link align-middle px-0 ${ activeTab ===  'tab-form-list' ? 'active-route' : ''}`}
              onClick={() => handleAddTab({ 
                eventKey: 'tab-form-list', 
                title: 'Formulários', 
                content: 
                  <FormListContextProvider>
                    <FormList />
                  </FormListContextProvider> 
                })
              }
            >
              <i className="fs-4 bi-grid"></i>
              <span className="ms-1 d-none d-sm-inline">Formulários</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
