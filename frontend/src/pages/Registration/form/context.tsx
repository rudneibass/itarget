import { createContext, useState, useContext } from "react";
import { RegistrationFormContextextType, RegistrationType, RegistrationFormInputsType } from "./types";
import { useGlobalContext } from "@src/context/context";
import { indentifiers } from "@utils/indentifiers";

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

    const [loading, setLoading] = useState(false)
    function setLoadingContext(loading: boolean){
        setLoading(loading)
    }

    const [inputs, setInputs] = useState<RegistrationFormInputsType>({} as RegistrationFormInputsType);
    function setInputsContext(input: RegistrationFormInputsType){
        setInputs({...inputs, ...input})
    }

    return (
        <RegistrationFormContext.Provider 
            value={{
                data,
                setDataContext,
                loading,
                setLoadingContext,
                inputs, 
                setInputsContext
            }}
        >
            {children}
        </RegistrationFormContext.Provider>
    )
}