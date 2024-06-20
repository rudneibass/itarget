import { createContext, useState } from "react";
import { RegistrationFormContextextType, RegistrationType, RegistrationFormInputsType } from "./types";

export const RegistrationFormContext = createContext({} as RegistrationFormContextextType)

export const RegistrationFormContextProvider = ({ children }:  { children: JSX.Element }) => {
    
    const [data, setData] = useState<RegistrationType>({} as RegistrationType)
    function setDataContext(data: RegistrationType){
        setData(data)
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

import { useContext } from 'react'
export default function useRegistrationFormContext(){
    const context = useContext( RegistrationFormContext);
    return context
}