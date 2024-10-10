import { createContext, useState,useContext, useEffect } from  "react"
import { registrationApi } from "@services/backendApi/registrationApi"
import { utils } from "@utils/index"
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context"
import { errorAlert, HtmlContent, toastContainer, warningAlertWithHtmlContent } from "@components/Toastify"
import { isPaginatedListType, PaginatedListLinksType, ListContextType } from "./types"

export const ListContext = createContext<ListContextType>({} as ListContextType)

export const useListContext = () => {
  const context = useContext(ListContext)
  return context;
}

export const ListContextProvider = ({ children }:{ children: JSX.Element }) => {
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

            try{
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
            } catch (error) {
                setStateContext({ 
                    ...state,
                    isLoading: false
                })
                if (error instanceof Error) { 
                    warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
                } else {
                    errorAlert("Caught unknown error.")
                }    
            } 

        }
        getListDataAndSetOnStateData()
    }, [])
    
    return (
        <ListContext.Provider 
            value={{
                    state,
                    setStateContext,
                    renderFormTab
                }}
        >
            { toastContainer }
            {children}
        </ListContext.Provider>
    )
}

