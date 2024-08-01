import { createContext, useState, useContext, useEffect } from "react";
import { RegistrationFormContextextType, RegistrationType, RegistrationFormInputsType } from "./types";
import { useGlobalContext } from "@src/context/context";
import { indentifiers } from "@utils/indentifiers";
import { formApi } from "@services/backendApi/formApi";
import { FormType } from "@services/backendApi/formApi/type";

import { registrationApi } from '@services/backendApi/registrationApi'
import { toastContainer, errorAlert, successAlert, HtmlContent, warningAlertWithHtmlContent } from '@components/ToastifyAlerts'
import { convertToFormType, isFormType } from "@pages/Form/types";

export const RegistrationFormContext = createContext({} as RegistrationFormContextextType)

export const useRegistrationFormContext = () => {
    const context = useContext( RegistrationFormContext);
    return context
}

export const RegistrationFormContextProvider = ({ children }:  { children: JSX.Element }) => {
    const globalContext = useGlobalContext()
    
    const [data, setData] = useState<RegistrationType>({} as RegistrationType)
    function setDataContext({ data, cache = false }:{data: RegistrationType, cache?: boolean}){
        setData(data)
        if(cache){
            globalContext.setFormCacheGlobalContext({data: data, pageIdentifier: indentifiers.pages.registrationForm})
        }   
    }

    const [inputs, setInputs] = useState<RegistrationFormInputsType>({} as RegistrationFormInputsType);
    async function sendFormDataToBackend(inputs: RegistrationFormInputsType){
        try {
            await registrationApi.create(registrationApi.endpoints.create, inputs)
            successAlert('Inscrição efetuada com sucesso!')
        } catch (error) {
            if (error instanceof Error) {
                warningAlertWithHtmlContent(<HtmlContent htmlContent={error.message} />)
              } else {
                errorAlert("Caught unknown error.");
              }
        }
    }

    function setInputsContext(inputs: RegistrationFormInputsType){
        sendFormDataToBackend(inputs)
        setInputs(inputs)
    }
    

    const [form, setForm] = useState<FormType>()
    function setFormContext(form: FormType){
        setForm(form)
    }
    
    useEffect(() => {
        async function getForm(){
            const form = await formApi.getByName(`${formApi.endpoints.getByName}registration`)
            if(isFormType(form)){
                setFormContext(form)
            }
            if(!isFormType(form)){
                setFormContext(convertToFormType(form))
            }
        }
        getForm()
    },[])
    return (
        <RegistrationFormContext.Provider 
            value={{
                data,
                setDataContext,
                inputs, 
                setInputsContext,
                form,
                setFormContext
            }}
        >
            {children}
            {toastContainer}
        </RegistrationFormContext.Provider>
    )
}