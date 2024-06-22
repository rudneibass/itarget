import { createContext, useState, useContext } from  "react"
import { EventListContextextType } from "./types"
import { useGlobalContext } from "@src/context/context"
import { indentifiers } from "@utils/indentifiers"
import { LaravelPaginationLinksType } from "@services/backendApi/baseApi/types"

export const EventListContext = createContext<EventListContextextType>({} as EventListContextextType)

export const useEventListContext = () => {
  const context = useContext(EventListContext)
  return context;
}

export const EventListContextProvider = ({ children }:  { children: JSX.Element }) => {
    const globalContext = useGlobalContext()

    const [data, setData] = useState<[]>()
    function setDataContext({ data, cache = false }: {data: [], cache?: boolean}){
        setData(data)
        if(cache){
            globalContext.setListCacheGlobalContext({data: data, pageIdentifier: indentifiers.pages.eventList})
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

    return (
        <EventListContext.Provider 
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
        </EventListContext.Provider>
    )
}
