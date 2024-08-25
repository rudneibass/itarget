import { createContext, useState, useContext } from "react"
import { TabsContextType } from "./types"

import Home from '@pages/Home'

export const MainTabsContext = createContext({} as TabsContextType)

export const useMainTabsContext = () => {
    const context = useContext(MainTabsContext)
    return context
}

export const MainTabsContextProvider = ({ children }: { children: JSX.Element }) => {

    const [tabs, setTabs] = useState([{ eventKey: 'tab-home', title: 'Home', content: <Home /> }])
    const [activeTab, setActiveTab] = useState(tabs[0].eventKey)

    function handleAddTab({ eventKey, title, content } : { eventKey: string, title: string, content: JSX.Element }){
      setTabs((prevTabs) => {
        const tabExists = prevTabs.some(tab => tab.eventKey === eventKey)
        if(tabExists){ return prevTabs }
        return [...prevTabs, { eventKey, title, content }]
      })
      setActiveTab(eventKey)
    }

    function handleRemoveTab({ eventKey } : { eventKey: string}){
      setTabs((prevTabs) => {
        const newTabs = prevTabs.filter(tab => tab.eventKey !== eventKey)
        if (activeTab === eventKey) {
          const removedTabIndex = prevTabs.findIndex(tab => tab.eventKey === eventKey)
          setActiveTab(newTabs[removedTabIndex - 1].eventKey)
        }
        return newTabs
      })
    }

    return (
        <MainTabsContext.Provider 
            value={{
                tabs,
                activeTab,
                setActiveTab,
                handleAddTab,
                handleRemoveTab
            }}
        >
            {children}
        </MainTabsContext.Provider>
    )
}