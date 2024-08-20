import { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "@src/context/context";
import { indentifiers } from "@utils/indentifiers";
import { registrationApi } from '@services/backendApi/registrationApi'
import { toastContainer, errorAlert, successAlert, HtmlContent, warningAlertWithHtmlContent } from '@components/Toastify'
import { FormType, convertToFormType, isFormType } from "@pages/Form/types";
import { RegistrationFormContextextType, RegistrationType, RegistrationFormInputsType } from "./types";

export const RegistrationFormContext = createContext({} as RegistrationFormContextextType)

export const useRegistrationFormContext = () => {
    const context = useContext( RegistrationFormContext);
    return context
}

export const RegistrationFormContextProvider = ({ children }:  { children: JSX.Element }) => {
    const globalContext = useGlobalContext()
    const { id } = useParams()
    
    const [data, setData] = useState<RegistrationType>({} as RegistrationType)
    function setDataContext({ data, cache = false }:{data: RegistrationType, cache?: boolean}){
        setData(data)
        if(cache){
            globalContext.setFormCacheGlobalContext({data: data, pageIdentifier: indentifiers.pages.registrationForm})
        }   
    }

    const [inputs, setInputs] = useState<RegistrationFormInputsType>({} as RegistrationFormInputsType);
    function setInputsContext(inputs: RegistrationFormInputsType){
        sendFormDataToBackend(inputs)
        setInputs(inputs)
    }

    const [form, setForm] = useState<FormType>()
    function setFormContext(form: FormType){
        setForm(form)
    }
    
    async function sendFormDataToBackend(inputs: RegistrationFormInputsType){
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
                errorAlert("Caught unknown error.");
              }
        }
    }
    
    useEffect(() => {
        async function getForm(){

            let form = await registrationApi.getFormWithFields({ endpoint: `${registrationApi.endpoints.form}`, formName: 'registration'});
            
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