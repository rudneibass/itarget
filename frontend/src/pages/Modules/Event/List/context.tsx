import { createContext, useState,useContext, useEffect } from  "react"
import { registrationApi } from "@services/backendApi/registrationApi"
import { EventListContextType, PaginatedListLinksType, isPaginatedListType } from "./types"
import { utils } from "@utils/index"
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context"


export const EventListContext = createContext<EventListContextType>({} as EventListContextType)

export const useEventListContext = () => {
  const context = useContext(EventListContext)
  return context;
}

export const EventListContextProvider = ({ children }:{ children: JSX.Element }) => {
    const mainTabsContext = useMainTabsContext()
    function renderFormTab({ title, eventKey, content }: { eventKey: string, title: string, content: JSX.Element }){
        mainTabsContext.handleAddTab({ title, eventKey, content })
    }
    
    const [state, setState] = useState({
        data: [] as [],
        paginationLinks: [] as Array<PaginatedListLinksType>,
        isLoading: false
    })

    function setStateContext({ data, paginationLinks, isLoading }: { data: [], paginationLinks: Array<PaginatedListLinksType>, isLoading?: boolean }){
        setState({
            data: data,
            paginationLinks: paginationLinks,
            isLoading: isLoading || false
        })  
    }

    useEffect(() => {
        async function getListDataAndSetOnStateData(){
            setStateContext({ 
                ...state,
                isLoading: true 
            })

            const response = await registrationApi.search(`${registrationApi.endpoints.search}`, {})

            if(response && utils.isObject(response) && response.data){
                if(isPaginatedListType(response.data)){
                    
                    if(JSON.stringify(response.data.data) !== JSON.stringify(state.data)){
                        setState({
                            data: response.data.data,
                            paginationLinks: response.data.links,
                            isLoading: false
                        })   
                    }
                }
            }
        }
        getListDataAndSetOnStateData()
    }, [])
    
    return (
        <EventListContext.Provider 
            value={{
                    state,
                    setStateContext,
                    renderFormTab
                }}
        >
            {children}
        </EventListContext.Provider>
    )
}

