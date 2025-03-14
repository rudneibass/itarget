import { createContext, useState, useContext, useEffect } from "react";
import { errorAlert, successAlert, warningAlert, HtmlContent, warningAlertWithHtmlContent } from '@components/Toastify'
import { FormContextextType, FormInputsType, FormType, convertToFormType, isFormType } from "./types";
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context";
import { fieldApi } from "@services/backendApi/fieldApi";

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

    const [form, setForm] = useState<FormType>()
    function setFormContext(form: FormType){
        setForm(form)
    }

    const [inputs, setInputs] = useState<FormInputsType>({} as FormInputsType);
    function setInputsContext(inputs: FormInputsType){
        saveForm(inputs)
        setInputs(inputs)
    }

    const [showModalForm, setShowModalForm] = useState(false);
    function setShowModalFormContext(show: boolean){
        setShowModalForm(show)
    }

    const [isLoading, setIsLoading] = useState(false)
    function setIsLoadingContext({ isLoading } : { isLoading: boolean }){
        setIsLoading(isLoading)
    }

    const [recordId, setRecordId] = useState(id)
    function setRecordIdContext(recordId: string){
        setRecordId(recordId)
    }

    async function saveForm(inputs: FormInputsType){
        try {
            if(!recordId){
                await fieldApi.create(fieldApi.endpoints.create, inputs)
                successAlert('Operação realizada com sucesso!')
            }
            if(recordId){
                await fieldApi.update({ endpoint: fieldApi.endpoints.update , id: recordId, data: inputs })
                successAlert('Operação realizada com sucesso!')
            }
        } catch (error) {
            if (error instanceof Error) {
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }
        }
    }

    async function getFormContext( id?: string ){
        try {
            setIsLoadingContext({isLoading: true})
            let form;
            
            if(id){
                form = await fieldApi.getFormWithValues({ endpoint: fieldApi.endpoints.formEdit, formName: 'form-field', id: id });
                setRecordIdContext(id)
            }

            if(!id){
                form = await fieldApi.getForm({ endpoint: fieldApi.endpoints.formCreate, formName: 'form-field' });
                setRecordIdContext('')
            } 
            
            if(form){
                if(isFormType(form)){
                    if(JSON.stringify(form) !== JSON.stringify(form)){
                        setFormContext(form)
                    }
                }
                if(!isFormType(form)){
                    const convertedToFormType = convertToFormType(form)
                    if(JSON.stringify(convertedToFormType) !== JSON.stringify(form)){
                        setFormContext(convertedToFormType)
                    }
                }
            } 
            setIsLoadingContext({isLoading: false})
        } catch (error) {
            setIsLoadingContext({isLoading: false})
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
                form,
                setFormContext,
                inputs, 
                setInputsContext,
                activeTab: mainTabsContext.activeTab,
                closeFormTab,
                isLoading,
                setShowModalFormContext,
                showModalForm,
                setIsLoadingContext,
                getFormContext,
                successAlert,
                warningAlert,
                errorAlert
            }}
        >
            {children}
        </FormContext.Provider>
    )
}