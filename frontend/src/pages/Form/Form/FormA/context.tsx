import { createContext, useState, useContext, useEffect } from "react";
import { errorAlert, successAlert, warningAlert, HtmlContent, warningAlertWithHtmlContent } from '@components/Toastify'
import { FormContextextType, FormInputsType, FormType, convertToFormType, isFormType } from "./types";
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context";
import { formApi } from "@services/backendApi/formApi";

export const FormContext = createContext({} as FormContextextType)

export const useFormContext = () => {
    const context = useContext( FormContext);
    return context
}

export const FormContextProvider = ({ id, children }:  { id?: string, children: JSX.Element }) => {
    const mainTabsContext = useMainTabsContext()
    
    function closeFormTab({ tabId }: { tabId: string }){
        mainTabsContext.handleRemoveTab({ eventKey: tabId })
    }

    const [state, setState] = useState({
        form: {} as FormType,
        isLoading: false,
        activeTab: mainTabsContext.activeTab
    })
    
    function setStateContext({ form, isLoading, activeTab } : { form?: FormType, isLoading?: boolean, activeTab?: string }){
        setState((prevState) => ({
            form: form !== undefined ? form : prevState.form,
            isLoading: isLoading !== undefined ? isLoading : prevState.isLoading,
            activeTab: activeTab !== undefined ? activeTab : prevState.activeTab
        }));
    }

    function saveFormContext(inputs: FormInputsType){
        saveForm(inputs)
    }

    async function saveForm(inputs: FormInputsType){
        try {
            if(!id){
                await formApi.create(formApi.endpoints.create, inputs)
                successAlert('Operação realizada com sucesso!')
            }
            if(id){
                await formApi.update({ endpoint: formApi.endpoints.update , id: id, data: inputs })
                successAlert('Operação atualizada com sucesso!')
            }
        } catch (error) {
            if (error instanceof Error) {
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }
        }
    }
    
    async function getForm(){
        try {
            let form
            setStateContext({isLoading: true})
            if(!id){
                form = await formApi.getForm({ endpoint: formApi.endpoints.formCreate, formName: 'form' });
            }
            if(id){ 
                form = await formApi.getFormWithValues({endpoint: formApi.endpoints.formEdit, id: id, formName: 'form' })
            }
            if(form){
                if(isFormType(form)){
                    setStateContext({form})
                }
                if(!isFormType(form)){
                    setStateContext({ form: convertToFormType(form) })
                }
            } 
            setStateContext({isLoading: false})
        } catch (error) {
            setStateContext({isLoading: false})
            if (error instanceof Error) { 
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }    
        }   
    }

    useEffect(() => {
        getForm()
    },[])

    return (
        <FormContext.Provider 
            value={{
                state,
                setStateContext,
                saveFormContext,
                closeFormTab,
                successAlert,
                warningAlert,
                errorAlert,
            }}
        >
            {children}
        </FormContext.Provider>
    )
}