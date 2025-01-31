import { createContext, useState,useContext, useEffect } from  "react"
import { userApi } from "@services/backendApi/userApi"
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context"
import { errorAlert, HtmlContent, warningAlertWithHtmlContent } from "@components/Toastify"
import { isPaginatedListType, PaginatedListLinksType, ListContextType, isObject } from "./types"

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

    function setStateContext({ data, paginationLinks, isLoading }: { data?: [], paginationLinks?: Array<PaginatedListLinksType>, isLoading?: boolean }){
        setState((prevState) => ({
            ...prevState,
            data: data || prevState.data,
            paginationLinks: paginationLinks || prevState.paginationLinks,
            isLoading: isLoading !== undefined ? isLoading : prevState.isLoading,
        })); 
    }

    async function handleSearchContext(searchParams?: object){
        setStateContext({ isLoading: true })
        try{
            const response = await userApi.search(`${userApi.endpoints.search}`, {...searchParams})
            if(response && isObject(response) && response.data){
                if(isPaginatedListType(response.data)){ 
                    if(JSON.stringify(response.data.data) !== JSON.stringify(state.data)){
                        setStateContext({
                            data: response.data.data,
                            paginationLinks: response.data.links,
                            isLoading: false
                        })   
                    }
                }
            }
            setStateContext({ isLoading: false })
        } catch (error) {
            setStateContext({isLoading: false})
            if (error instanceof Error) { 
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }    
        } 
    }

    function handleDeleteContext(itemId: string){
        alert('Delete item '+itemId)
    }

    function handleActiveContext(itemId: string){
        alert('Active item '+itemId)
    }

    function handleSortContext(sortBy: string, sortDirection: string){
        alert('Sort by '+sortBy+' '+sortDirection)
    } 

    useEffect(() => {
        handleSearchContext({})
    }, [])
    
    return (
        <ListContext.Provider 
            value={{
                state,
                setStateContext,
                renderFormTab,
                handleSearchContext,
                handleDeleteContext,
                handleActiveContext,
                handleSortContext
            }}
        >
            { children }
        </ListContext.Provider>
    )
}

