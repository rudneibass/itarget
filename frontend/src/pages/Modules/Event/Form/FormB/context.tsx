import { createContext, useState, useContext, useEffect } from "react";
import { registrationApi } from '@services/backendApi/registrationApi'
import { toastContainer, errorAlert, successAlert, HtmlContent, warningAlertWithHtmlContent } from '@components/Toastify'
import { RegistrationFormBContextextType, RegistrationFormBInputsType, FormType, convertToFormType, isFormType } from "./types";
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context";

export const RegistrationFormBContext = createContext({} as RegistrationFormBContextextType)

export const useRegistrationFormBContext = () => {
    const context = useContext( RegistrationFormBContext);
    return context
}

export const RegistrationFormBContextProvider = ({ id, children }:  { id?: string, children: JSX.Element }) => {
    const mainTabsContext = useMainTabsContext()
    
    function closeFormTab({ tabId }: { tabId: string }){
        mainTabsContext.handleRemoveTab({ eventKey: tabId })
    }

    const [form, setForm] = useState<FormType>()
    function setFormContext(form: FormType){
        setForm(form)
    }

    const [inputs, setInputs] = useState<RegistrationFormBInputsType>({} as RegistrationFormBInputsType);
    function setInputsContext(inputs: RegistrationFormBInputsType){
        saveForm(inputs)
        setInputs(inputs)
    }

    const [isLoading, setIsLoading] = useState(false)
    function setIsLoadingContext({ isLoading } : { isLoading: boolean }){
        setIsLoading(isLoading)
    }

    async function saveForm(inputs: RegistrationFormBInputsType){
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
                    form = await registrationApi.getFormWithFields({ endpoint: `${registrationApi.endpoints.form}`, formName: 'registration'});
                }
                if(id){ 
                    form = await registrationApi.getFormWithFieldsAndValues({endpoint: `${registrationApi.endpoints.edit}`, formName: 'registration', id: id }) 
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
                    errorAlert(error.message) 
                } else {
                    errorAlert("Caught unknown error.")
                }    
            }   
        }
        getForm()
    },[])
    return (
        <RegistrationFormBContext.Provider 
            value={{
                form,
                setFormContext,
                inputs, 
                setInputsContext,
                activeTab: mainTabsContext.activeTab,
                closeFormTab,
                isLoading,
                setIsLoadingContext
            }}
        >
            {children}
            {toastContainer}
        </RegistrationFormBContext.Provider>
    )
}