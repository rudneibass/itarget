import { createContext, useState } from  "react"
import { EventListContextextType } from "./types"

export const EventListContext = createContext<EventListContextextType>({} as EventListContextextType)

export const EventListContextProvider = ({ children }:  { children: JSX.Element }) => {
    
    const [data, setData] = useState<[]>()
    function setDataContext(data: []){
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
        <EventListContext.Provider 
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
        </EventListContext.Provider>
    )
}


import { useContext } from 'react'
export default function useEventListContext() {
  const context = useContext(EventListContext)
  return context;
}
