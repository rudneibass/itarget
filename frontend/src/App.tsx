import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/global.css"

import { GlobalContextProvider } from "./context/context"

import SideBar from "@components/Bootstrap/SideBar"
import NavBar from "@components/Bootstrap/NavBar"
import MainTabs from "@components/Bootstrap/MainTabs"
import { MainTabsContextProvider } from "@components/Bootstrap/MainTabs/context"
import { toastContainer } from "@components/Toastify"
import ErrorBoundary from "@components/ErrorBoundary"

export default function App() {
  return (
    <ErrorBoundary>
      <GlobalContextProvider>
        <MainTabsContextProvider>
            <div className="d-flex">
              {toastContainer}
              <div className="sidebar-container bg-dark ">
                <SideBar />
              </div>
              <div className="main-container">
                <NavBar />
                <main>
                  <MainTabs />
                </main>
              </div>
            </div>
        </MainTabsContextProvider>
      </GlobalContextProvider>
    </ErrorBoundary>
  )
}
