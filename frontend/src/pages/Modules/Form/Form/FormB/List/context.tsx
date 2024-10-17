import { createContext, useState,useContext, useEffect } from  "react"
import { isPaginatedListType, PaginatedListLinksType, ListContextType, isObject } from "./types"
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context"
import { errorAlert, HtmlContent, toastContainer, warningAlertWithHtmlContent } from "@components/Toastify"
import { formFieldApi } from "@services/backendApi/formFieldApi"
  
export const ListContext = createContext<ListContextType>({} as ListContextType)

export const useListContext = () => {
  const context = useContext(ListContext)
  return context;
}

export const ListContextProvider = ({ formId, children }:{ formId?: string, children: JSX.Element }) => {
    const mainTabsContext = useMainTabsContext()
    function renderFormTab({ title, eventKey, content }: { eventKey: string, title: string, content: JSX.Element }){
        mainTabsContext.handleAddTab({ title, eventKey, content })
    }

    const [state, setState] = useState({
        data: [] as [],
        formId: formId || '',
        paginationLinks: [] as Array<PaginatedListLinksType>,
        isLoading: false,
        showModalForm: false
    })

    function setStateContext({ data, formId, paginationLinks, isLoading, showModalForm } : { data?: [], formId?: string, paginationLinks?: Array<PaginatedListLinksType>, isLoading?: boolean, showModalForm?: boolean }){
        setState((prevState) => ({
            data: data !== undefined ? data : prevState.data,
            formId: formId !== undefined ? formId : prevState.formId,
            paginationLinks: paginationLinks !== undefined ? paginationLinks : prevState.paginationLinks,
            isLoading: isLoading !== undefined ? isLoading : prevState.isLoading,
            showModalForm: showModalForm !== undefined ? showModalForm : prevState.showModalForm
        }));
    }

    async function handleSearchContext(searchParams?: object){
        try {
            if(formId){
                setStateContext({ isLoading: true })
                const response = await formFieldApi.search(`${formFieldApi.endpoints.search}`, { ...searchParams, form_id: formId })
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
            }
            setStateContext({ isLoading: false })
        } catch (error) {
            setStateContext({ isLoading: false})
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
        handleSearchContext()
    }, [])
    
    return (
        <ListContext.Provider 
            value={{
                state,
                setStateContext,
                renderFormTab,
                handleSearchContext,
                handleActiveContext,
                handleDeleteContext,
                handleSortContext
            }}
        >
            { toastContainer }
            { children }
        </ListContext.Provider>
    )
}

