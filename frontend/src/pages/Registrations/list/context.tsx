import { createContext, useState } from  "react"
import { RegistrationListContextType, RegistrationListType } from "./types"

export const RegistrationListContext = createContext<RegistrationListContextType>({} as RegistrationListContextType)

export const RegistrationListContextProvider = ({ children }:  { children: JSX.Element }) => {
    
    const [data, setData] = useState<RegistrationListType[]>()
    function setDataContext(data: RegistrationListType[]){
        setData(data)
    }

    const [loading, setLoading] = useState(false)
    function setLoadingContext(loading: boolean){
        setLoading(loading)
    }

    const [thereIsNoData, setThereIsNoData] = useState(false)
    function setThereIsNoDataContext(thereIsNoData: boolean){
        setThereIsNoData(thereIsNoData)
    }

    return (
        <RegistrationListContext.Provider 
            value={{
                    data, 
                    setDataContext,
                    loading,
                    setLoadingContext,
                    thereIsNoData,
                    setThereIsNoDataContext
                }}
        >
            {children}
        </RegistrationListContext.Provider>
    )
}

import { useContext } from 'react'
export default function useRegistrationListContext() {
  const context = useContext(RegistrationListContext)
  return context;
}
