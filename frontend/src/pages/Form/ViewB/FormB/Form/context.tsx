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

export const FormContextProvider = ({ id, fk, children }:  { id?: string, fk?: string, children: JSX.Element }) => {
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

    async function save(
        { input, successCallback, errorCallback } : 
        { input: FormInputsType, successCallback?: () => void, errorCallback?: () => void }
    ){
        try {
            if(!state.recordId){
                await fieldApi.create(fieldApi.endpoints.create, input)
            }
            if(state.recordId){
                await fieldApi.update({ endpoint: fieldApi.endpoints.update , id: state.recordId, data: input })
            }
            successAlert('Operação realizada com sucesso!')
            
            if(successCallback){ successCallback() }

        } catch (error) {
            if (error instanceof Error) {
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }

            if(errorCallback){ errorCallback() }
        }
    }

    async function getForm( id?: string ){
        try {
            let form;
            setStateContext({isLoading: true})
            if(id){
                form = await fieldApi.getFormWithValues({ endpoint: fieldApi.endpoints.formEdit, formName: 'form-field', id: id })
                setStateContext({recordId: id})
            }

            if(!id){
                form = await fieldApi.getForm({ endpoint: fieldApi.endpoints.formCreate, formName: 'form-field' });
                setStateContext({recordId: ''})
            } 
            
            if(form){
                const convertedToFormType = convertToFormType(form)
                if(JSON.stringify(convertedToFormType) !== JSON.stringify(form)){
                    if(fk){
                        convertedToFormType.fields?.map((field) => {
                            if(field.name && field.name === 'form_id'){
                                field.attributes.disabled = 'disabled'
                                field.attributes.readonly = 'readonly'
                                field.attributes.value = fk
                            }
                        })
                    }
                    setStateContext({form: convertedToFormType})
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

    function addNew(){
        getForm()
        setStateContext({showModalForm: true})
    }

    function edit(id: string){
        getForm(id)
        setStateContext({showModalForm: true})
    }

    useEffect(() => {
        getForm()
    },[])

    return (
        <FormContext.Provider 
            value={{
                state,
                setStateContext,
                addNew,
                edit,
                save,
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