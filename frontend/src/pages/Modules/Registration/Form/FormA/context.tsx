import { createContext, useState, useContext, useEffect } from "react";
import { registrationApi } from '@services/backendApi/registrationApi'
import { errorAlert, successAlert, warningAlert, HtmlContent, warningAlertWithHtmlContent } from '@components/Toastify'
import { FormContextextType, FormInputsType, FormType, convertToFormType, isFormType } from "./types";
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context";

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

    const [form, setForm] = useState<FormType>()
    function setFormContext(form: FormType){
        setForm(form)
    }

    const [inputs, setInputs] = useState<FormInputsType>({} as FormInputsType);
    function setInputsContext(inputs: FormInputsType){
        saveForm(inputs)
        setInputs(inputs)
    }

    const [isLoading, setIsLoading] = useState(false)
    function setIsLoadingContext({ isLoading } : { isLoading: boolean }){
        setIsLoading(isLoading)
    }

    async function saveForm(inputs: FormInputsType){
        try {
            if(!id){
                await registrationApi.create(registrationApi.endpoints.create, inputs)
                successAlert('Inscrição realizada com sucesso!')
            }
            if(id){
                await registrationApi.update({ endpoint:registrationApi.endpoints.update , id: id, data: inputs })
                successAlert('Inscrição atualizada com sucesso!')
            }
        } catch (error) {
            if (error instanceof Error) {
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
            } else {
                errorAlert("Caught unknown error.")
            }
        }
    }
    
    useEffect(() => {
        async function getForm(){
            try {
                let form
                setIsLoadingContext({isLoading: true})
                if(!id){
                    form = await registrationApi.getForm({ endpoint: registrationApi.endpoints.formCreate });
                }
                if(id){ 
                    form = await registrationApi.getFormWithValues({endpoint: registrationApi.endpoints.formEdit, id: id, formName: 'registration' })
                }
                if(form){
                    if(isFormType(form)){
                        setFormContext(form)
                    }
                    if(!isFormType(form)){
                        setFormContext(convertToFormType(form))
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
        getForm()
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
                setIsLoadingContext,
                successAlert,
                warningAlert,
                errorAlert
            }}
        >
            { children }
        </FormContext.Provider>
    )
}