import { Tabs, Tab } from 'react-bootstrap'
import { useMainTabsContext } from './context'

export default function Index() {
    const mainTabsContext = useMainTabsContext()

    return (
        <Tabs activeKey={mainTabsContext.activeTab} onSelect={(k) => mainTabsContext.setActiveTab(k!)} id="main-tabs">
          {mainTabsContext.tabs.map((tab) => (
            <Tab 
              key={tab.eventKey} 
              eventKey={tab.eventKey} 
              title={
                tab.eventKey == 'tab-home' ? 
                <span>{tab.title}</span> :
                <>
                  <span>{tab.title}</span>
                  <i
                    className="fs-6 bi-x"
                    style={{ float: "right" }}
                    onClick={(e) => {
                      e.stopPropagation() // Evitar que a aba seja ativada ao clicar no ícone de fechar
                      mainTabsContext.handleRemoveTab({ eventKey: tab.eventKey })
                    }}
                  ></i>
                </>
              }
            >
              { tab.content }
            </Tab>
          ))}
        </Tabs>
      
    )
}
