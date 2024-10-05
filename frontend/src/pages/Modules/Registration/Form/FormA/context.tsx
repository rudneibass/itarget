import { createContext, useState, useContext, useEffect } from "react";
import { registrationApi } from '@services/backendApi/registrationApi'
import { toastContainer, errorAlert, successAlert, warningAlert, HtmlContent, warningAlertWithHtmlContent } from '@components/Toastify'
import { RegistrationFormAContextextType, RegistrationFormAInputsType, FormType, convertToFormType, isFormType } from "./types";
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context";

export const RegistrationFormAContext = createContext({} as RegistrationFormAContextextType)

export const useRegistrationFormAContext = () => {
    const context = useContext( RegistrationFormAContext);
    return context
}

export const RegistrationFormAContextProvider = ({ id, children }:  { id?: string, children: JSX.Element }) => {
    const mainTabsContext = useMainTabsContext()
    
    function closeFormTab({ tabId }: { tabId: string }){
        mainTabsContext.handleRemoveTab({ eventKey: tabId })
    }

    const [form, setForm] = useState<FormType>()
    function setFormContext(form: FormType){
        setForm(form)
    }

    const [inputs, setInputs] = useState<RegistrationFormAInputsType>({} as RegistrationFormAInputsType);
    function setInputsContext(inputs: RegistrationFormAInputsType){
        saveForm(inputs)
        setInputs(inputs)
    }

    const [isLoading, setIsLoading] = useState(false)
    function setIsLoadingContext({ isLoading } : { isLoading: boolean }){
        setIsLoading(isLoading)
    }

    async function saveForm(inputs: RegistrationFormAInputsType){
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
                    form = await registrationApi.getForm({ endpoint: registrationApi.endpoints.form });
                }
                if(id){ 
                    form = await registrationApi.getFormWithValues({endpoint: `${registrationApi.endpoints.edit}`, id: id })
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
        <RegistrationFormAContext.Provider 
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
            {children}
            {toastContainer}
        </RegistrationFormAContext.Provider>
    )
}