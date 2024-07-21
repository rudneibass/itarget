import { createContext, useState, useContext } from "react";
import { FormCacheType, GlobalContextType, ListCacheType } from "./types";

export const GlobalContext = createContext({} as GlobalContextType)

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    return context
}

export const GlobalContextProvider = ({ children }: { children: JSX.Element }) => {

    const [formCache, setFormCache] = useState<FormCacheType[]>([]);
    function setFormCacheGlobalContext({data, pageIdentifier}:{data: object, pageIdentifier: string}){
        const newFormCache = formCache.filter(
            (item) => item.pageIdentifier !== pageIdentifier
        )
        newFormCache.push({data: data, pageIdentifier: pageIdentifier});
        setFormCache(newFormCache)      
    }

    
    const [listCache, setListCache] = useState<ListCacheType[]>([]);
    function setListCacheGlobalContext({data, pageIdentifier}:{data: [], pageIdentifier: string}){
        const newListCache = listCache.filter(
            (item) => item.pageIdentifier !== pageIdentifier
        )
        newListCache.push({data: data, pageIdentifier: pageIdentifier});
        setListCache(newListCache)               
    }

    return (
        <GlobalContext.Provider 
            value={{
                formCache,
                setFormCacheGlobalContext,
                listCache,
                setListCacheGlobalContext,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}