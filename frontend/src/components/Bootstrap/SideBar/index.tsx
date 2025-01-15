import { useMainTabsContext } from '../MainTabs/context'

import './styles.css'

import Home from '@pages/Home'

import RegistrationList from '@pages/Registration/List'
import { ListContextProvider as RegistrationListContext } from '@pages/Registration/List/context.tsx'

import FormList from '@pages/Form/List'
import { ListContextProvider as FormListContextProvider } from '@pages/Form/List/context.tsx'
import brand from './brand-exemple.png'
import { Button } from 'react-bootstrap'


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
            <Button 
              variant="dark w-100 text-left" 
              onClick={() => handleAddTab({ eventKey: 'tab-home', title: 'Home', content: <Home /> })} 
            >
              <div className={`${ activeTab ===  'tab-home' ? 'active-route' : ''}`}>
                <i className='sidebar-small bi-house' ></i>
                <small className='sidebar-small sidebar-small-label mx-2'>
                  Home
                </small>
              </div>
            </Button>
          </li>

          <li className='light-border-bottom-offset'></li>

          <li> 
            <Button 
              variant="dark w-100 text-left" 
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
              <div className={`${ activeTab ===  'tab-registration-list' ? 'active-route' : ''}`}>
                <i className='bi-people sidebar-small'></i>
                <small className='sidebar-small sidebar-small-label mx-2'>Inscrições</small>
              </div>
            </Button>
          </li>

          <li> 
            <Button 
              variant="dark w-100 text-left" 
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
              <div className={`${ activeTab ===  'tab-form-list' ? 'active-route' : ''}`}>
                <i className='bi-grid sidebar-small'></i>
                <small className='sidebar-small sidebar-small-label mx-2'>
                  Formulários
                </small>
              </div>
            </Button>
          </li>

          <li className='light-border-bottom-offset'></li>
        </ul>
      </nav>
    </aside>
  );
}
