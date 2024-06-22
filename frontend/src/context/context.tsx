import { createContext, useState, useContext } from "react";
import { CacheSearchType, GlobalContextType } from "./types";

export const GlobalContext = createContext({} as GlobalContextType)

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    return context
}

export const GlobalContextProvider = ({ children }: { children: JSX.Element }) => {

    const [cacheSearch, setCacheSearch] = useState<CacheSearchType[]>([]);
    function setCacheSearchGlobalContext({data, pageIdentifier}:{data: [], pageIdentifier: string}){

        const newCacheSearch = cacheSearch.filter(
            (item) => item.pageIdentifier !== pageIdentifier
        )

        newCacheSearch.push({data: data, pageIdentifier: pageIdentifier});
        setCacheSearch(newCacheSearch)               
    }

    return (
        <GlobalContext.Provider 
            value={{
                cacheSearch,
                setCacheSearchGlobalContext
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}