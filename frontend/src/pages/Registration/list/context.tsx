import { createContext, useState,useContext, useEffect } from  "react"
//import { useGlobalContext } from "@src/context/context"
//import { indentifiers } from "@utils/indentifiers"
import { registrationApi } from "@services/backendApi/registrationApi"
import { isPaginatedListType, PaginatedListLinksType, RegistrationListContextType } from "./types"
import { utils } from "@utils/index"


export const RegistrationListContext = createContext<RegistrationListContextType>({} as RegistrationListContextType)

export const useRegistrationListContext = () => {
  const context = useContext(RegistrationListContext)
  return context;
}

export const RegistrationListContextProvider = ({ children }:{ children: JSX.Element }) => {
    //const globalContext = useGlobalContext()
    
    const [state, setState] = useState({
        data: [] as [],
        paginationLinks: [] as Array<PaginatedListLinksType>
    })

    function setStateContext({ data, paginationLinks }: { data: [], paginationLinks: Array<PaginatedListLinksType> }){
        setState({
            data: data,
            paginationLinks: paginationLinks
        })  
    }

    useEffect(() => {
        async function getListDataAndSetOnStateData(){
            const response = await registrationApi.search(`${registrationApi.endpoints.search}`, {})
            if(response && utils.isObject(response) && response.data){
                if(isPaginatedListType(response.data)){
                    
                    if(JSON.stringify(response.data.data) !== JSON.stringify(state.data)){
                        setState({
                            data: response.data.data,
                            paginationLinks: response.data.links
                        })   
                    }
                }
            }
        }
        getListDataAndSetOnStateData()
    }, [])
    
    return (
        <RegistrationListContext.Provider 
            value={{
                    state,
                    setStateContext
                }}
        >
            {children}
        </RegistrationListContext.Provider>
    )
}

