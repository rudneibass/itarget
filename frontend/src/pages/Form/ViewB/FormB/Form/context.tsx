import { createContext, useState, useContext, useEffect } from "react";
import { errorAlert, successAlert, warningAlert, HtmlContent, warningAlertWithHtmlContent } from '@components/Toastify'
import { FormContextextType, FormInputsType, FormType, convertToFormType, isFormType } from "./types";
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context";
import { fieldApi } from "@services/backendApi/fieldApi";

export const FormContext = createContext({} as FormContextextType)

export const useFormContext = () => {
    const context = useContext(FormContext);
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
        activeTab: mainTabsContext.activeTab,
        showModalForm: false,
        recordId: id
    })
        
    function setStateContext(
        { form, isLoading, activeTab, showModalForm, recordId } : 
        { form?: FormType, isLoading?: boolean, activeTab?: string, showModalForm?: boolean, recordId?: string | undefined}
    ){
        setState((prevState) => ({
            form: form !== undefined ? form : prevState.form,
            isLoading: isLoading !== undefined ? isLoading : prevState.isLoading,
            activeTab: activeTab !== undefined ? activeTab : prevState.activeTab,
            showModalForm: showModalForm !== undefined ? showModalForm : prevState.showModalForm,
            recordId: recordId !== undefined ? recordId : prevState.recordId
        }));
    }

    function saveFormContext(inputs: FormInputsType){
        saveForm(inputs)
    }

    async function saveForm(inputs: FormInputsType){
        try {
            if(!state.recordId){
                await fieldApi.create(fieldApi.endpoints.create, inputs)
            }
            if(state.recordId){
                await fieldApi.update({ endpoint: fieldApi.endpoints.update , id: state.recordId, data: inputs })
            }
            successAlert('Operação realizada com sucesso!')
        } catch (error) {
            if (error instanceof Error) {
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }
        }
    }

    function getFormContext(id?: string){
        getForm(id)
    }

    async function getForm( id?: string ){
        try {
            let form;
            setStateContext({isLoading: true})
            if(id){
                form = await fieldApi.getFormWithValues({ endpoint: fieldApi.endpoints.formEdit, formName: 'form-field', id: id });
                setStateContext({recordId: id})
            }

            if(!id){
                form = await fieldApi.getForm({ endpoint: fieldApi.endpoints.formCreate, formName: 'form-field' });
                setStateContext({recordId: ''})
            } 
            
            if(form){
                if(isFormType(form)){
                    if(JSON.stringify(form) !== JSON.stringify(form)){
                        setStateContext({form})
                    }
                }
                if(!isFormType(form)){
                    const convertedToFormType = convertToFormType(form)
                    if(JSON.stringify(convertedToFormType) !== JSON.stringify(form)){
                        setStateContext({form: convertedToFormType})
                    }
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
        getFormContext()
    },[])

    return (
        <FormContext.Provider 
            value={{
                state,
                setStateContext,
                getFormContext,
                closeFormTab,
                saveFormContext,
                successAlert,
                warningAlert,
                errorAlert,
            }}
        >
            {children}
        </FormContext.Provider>
    )
}