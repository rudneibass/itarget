import { createContext, useState,useContext } from  "react"

import { LaravelPaginationLinksType } from "@services/backendApi/baseApi/types"
import { RegistrationListContextType } from "./types"

import { indentifiers } from "@utils/indentifiers"
import { useGlobalContext } from "@src/context/context"

export const RegistrationListContext = createContext<RegistrationListContextType>({} as RegistrationListContextType)

export const useRegistrationListContext = () => {
  const context = useContext(RegistrationListContext)
  return context;
}

export const RegistrationListContextProvider = ({ children }:{ children: JSX.Element }) => {
    const globalContext = useGlobalContext()

    const [data, setData] = useState<[]>()
    function setDataContext({data, cache = false}: {data: [], cache?: boolean}){
        setData(data)
        if(cache){
            globalContext.setCacheSearchGlobalContext({data: data, pageIdentifier: indentifiers.pages.registrationsList})
        }
    }

    const [loading, setLoading] = useState(false)
    function setLoadingContext({loading}:{loading: boolean}){
        setLoading(loading)
    }

    const [thereIsNoData, setThereIsNoData] = useState(false)
    function setThereIsNoDataContext({thereIsNoData}:{thereIsNoData: boolean}){
        setThereIsNoData(thereIsNoData)
    }

    const [paginationLinks, setPaginationLinks] = useState<LaravelPaginationLinksType[]>()
        function setPaginationLinksContext({ paginationLinks }:{paginationLinks: LaravelPaginationLinksType[]}){
        setPaginationLinks(paginationLinks)
    }

    return (
        <RegistrationListContext.Provider 
            value={{
                    data, 
                    setDataContext,
                    loading,
                    setLoadingContext,
                    thereIsNoData,
                    setThereIsNoDataContext,
                    paginationLinks,
                    setPaginationLinksContext
                }}
        >
            {children}
        </RegistrationListContext.Provider>
    )
}

