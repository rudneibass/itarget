import { createContext, useState,useContext, useEffect } from  "react"
import { LaravelPaginationLinksType } from "@services/backendApi/baseApi/types"
import { RegistrationListContextType } from "./types"
import { indentifiers } from "@utils/indentifiers"
import { useGlobalContext } from "@src/context/context"
import { registrationApi } from "@services/backendApi/registrationApi"
import { endpoints } from "@utils/endpoints"

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

    const [paginationLinks, setPaginationLinks] = useState<LaravelPaginationLinksType[]>()
    function setPaginationLinksContext({ paginationLinks }:{paginationLinks: LaravelPaginationLinksType[]}){
        setPaginationLinks(paginationLinks)
    }

    const [loading, setLoading] = useState(false)
    function setLoadingContext({loading}:{loading: boolean}){
        setLoading(loading)
    }

    const [thereIsNoData, setThereIsNoData] = useState(false)
    function setThereIsNoDataContext({thereIsNoData}:{thereIsNoData: boolean}){
        setThereIsNoData(thereIsNoData)
    }
 
    
    useEffect(() => {
        async function getData(){
            const searchResponse = await registrationApi.paginate(`${endpoints.registration.endpoint}${endpoints.registration.actions.paginate}`)
            
            console.log(searchResponse.data)

            setData(searchResponse.data)
            setPaginationLinks(searchResponse.links)
        }
        getData()
    }, [])
    
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

