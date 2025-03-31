import { Button } from 'react-bootstrap';
import brand from './brand-exemple.png';
import './styles.css';

import { useMainTabsContext } from '../MainTabs/context';

import Home from '@pages/Home';
import FormViewA from '@pages/Form/ViewA/index';

const menuGroups = [
  {
    group: 'Main',
    items: [
      {
        eventKey: 'tab-home',
        title: 'Home',
        icon: 'bi-house',
        content: <Home />,
      },
    ],
  },
  {
    group: 'Forms',
    items: [
      {
        eventKey: 'form-view-a',
        title: 'Formulários',
        icon: 'bi-grid',
        content: <FormViewA />,
      },
    ],
  },
];

export default function Index() {
  const mainTabsContext = useMainTabsContext();
  const activeTab = mainTabsContext.activeTab;

  function handleAddTab({ eventKey, title, content } : { eventKey: string, title: string, content: JSX.Element }){
    mainTabsContext.addTab({ eventKey, title, content })
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
            justifyContent: 'center',
          }}
        >
          <img src={brand} loading='lazy' width={150} />
        </div>

        <ul id='sidebar-menu' className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'>
          {menuGroups.map((group, index) => (
            <>
              {group.items.map((item) => (
                <li key={item.eventKey}>
                  <Button 
                    variant='dark w-100 text-left' 
                    onClick={() => handleAddTab(item)}
                  >
                    <div className={`${activeTab === item.eventKey ? 'active-route' : ''}`}>
                      <i className={`sidebar-small ${item.icon}`}></i>
                      <small className='sidebar-small sidebar-small-label mx-2'>
                        {item.title}
                      </small>
                    </div>
                  </Button>
                </li>
              ))}
              <li className='light-border-bottom-offset'></li>
            </>
          ))}
        </ul>
      </nav>
    </aside>
  );
}