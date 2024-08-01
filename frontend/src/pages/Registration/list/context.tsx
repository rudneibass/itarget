import { createContext, useState,useContext, useEffect } from  "react"
import { useGlobalContext } from "@src/context/context"
import { indentifiers } from "@utils/indentifiers"
import { registrationApi } from "@services/backendApi/registrationApi"
import { isPaginatedListType, PaginatedListLinksType, RegistrationListContextType } from "./types"
import { utils } from "@utils/index"


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
            globalContext.setListCacheGlobalContext({data: data, pageIdentifier: indentifiers.pages.registrationList})
        }
    }
    
    const [paginationLinks, setPaginationLinks] = useState<Array<PaginatedListLinksType>>()
    function setPaginationLinksContext({ paginationLinks }:{paginationLinks: Array<PaginatedListLinksType>}){
        setPaginationLinks(paginationLinks)
    }

    async function getListDataAndSetOnStateData(){
        const response = await registrationApi.search(`${registrationApi.endpoints.search}`, {})
        if(response && utils.isObject(response) && response.data){
            if(isPaginatedListType(response.data)){
                setData(response.data.data)
                setPaginationLinks(response.data.links)
            }
        }
    }

    useEffect(() => {
        getListDataAndSetOnStateData()
    }, [])
    
    return (
        <RegistrationListContext.Provider 
            value={{
                    data, 
                    setDataContext,
                    paginationLinks,
                    setPaginationLinksContext
                }}
        >
            {children}
        </RegistrationListContext.Provider>
    )
}

