import { useMainTabsContext } from '../MainTabs/context'

import './styles.css'

import Home from '@pages/Home'

import RegistrationList from '@pages/Registration/List'
import { ListContextProvider as RegistrationListContext } from '@pages/Registration/List/context.tsx'

import FormList from '@pages/Form/List'
import { ListContextProvider as FormListContextProvider } from '@pages/Form/List/context.tsx'
import brand from './brand-exemple.png'


export default function Index() {
  const mainTabsContext = useMainTabsContext()
  
  const activeTab = mainTabsContext.activeTab

  function handleAddTab({ eventKey, title, content } : { eventKey: string, title: string, content: JSX.Element }){
    mainTabsContext.handleAddTab({ eventKey, title, content })
  }

  return (
    <aside>


      <nav className='navbar-dark width-80 m-auto'>
        
        <div 
          className='navbar-brand' 
          style={{
            height: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
          <img src={brand} loading='lazy' width={150}/>
        </div>

        <ul
          id='sidebar-menu'
          className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
        >
          <li>
            <a 
              className={`nav-link align-middle px-0 ${ activeTab ===  'tab-home' ? 'active-route' : ''}`}
              onClick={() => handleAddTab({ eventKey: 'tab-home', title: 'Home', content: <Home /> })} 
            >
              <i className='bi-house'></i>
              <small>Home</small>
            </a>
          </li>
          <li className='light-border-bottom-offset'></li>
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
              <i className='bi-people'></i>
              <small>Inscrições</small>
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
              <i className='bi-grid'></i>
              <small>Formulários</small>
            </a>
          </li>
          <li className='light-border-bottom-offset'></li>
        </ul>
      </nav>
    </aside>
  );
}
