import { createContext, useState,useContext, useEffect } from  "react"
import { formApi } from "@services/backendApi/formApi"
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
    function addTab({ title, eventKey, content }: { eventKey: string, title: string, content: JSX.Element }){
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

    async function search(searchParams?: object){
        setStateContext({ isLoading: true })
        try{
            const response = await formApi.search(`${formApi.endpoints.search}`, searchParams)
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
            setStateContext({ isLoading: false})
        } catch (error) {
            setStateContext({ isLoading: false})

            if (error instanceof Error) { 
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }    
        } 
    }

    function remove(itemId: string){
        alert('Delete item '+itemId)
    }

    function activeDeactive(itemId: string){
        alert('Active item '+itemId)
    }

    function sort(sortBy: string, sortDirection: string){
        alert('Sort by '+sortBy+' '+sortDirection)
    } 

    function reorder(dataReordered: []){
        alert('Reorder')
        console.log(dataReordered)
    } 

    useEffect(() => {
        search()
    }, [])
    
    return (
        <ListContext.Provider 
            value={{
                state,
                setStateContext,
                addTab,
                activeDeactive,
                search,
                remove,
                sort
            }}
        >
            {children}
        </ListContext.Provider>
    )
}

