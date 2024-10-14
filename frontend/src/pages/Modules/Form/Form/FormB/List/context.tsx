import { createContext, useState,useContext, useEffect } from  "react"
import { isPaginatedListType, PaginatedListLinksType, ListContextType } from "./types"
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
    
    function isObject(value: unknown): value is Record<string, unknown> {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
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

    async function getList(){
        try {
            if(formId){
                setStateContext({ ...state, isLoading: true })

                const response = await formFieldApi.search(`${formFieldApi.endpoints.search}`, { form_id: formId })                

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

        } catch (error) {
            
            setStateContext({ ...state, isLoading: false})

            if (error instanceof Error) { 
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }    
        }   
    }

    useEffect(() => {
        getList()
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

