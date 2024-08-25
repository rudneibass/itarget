export type TabsContextType = {
    tabs: Array<{ eventKey: string, title: string, content: JSX.Element }>,
    activeTab: string,
    setActiveTab: ( eventKey: string) => void,
    handleAddTab: ({ eventKey, title, content } : { eventKey: string, title: string, content: JSX.Element }) => void,
    handleRemoveTab: ({ eventKey } : { eventKey: string}) => void
}