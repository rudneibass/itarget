import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/global.css"

import { GlobalContextProvider } from "./context/context"

import SideBar from "@components/Bootstrap/SideBar"
import NavBar from "@components/Bootstrap/NavBar"
import Footer from "@components/Bootstrap/Footer"
import MainTabs from "@components/Bootstrap/MainTabs"
import { MainTabsContextProvider } from "@components/Bootstrap/MainTabs/context"
import { toastContainer } from "@components/Toastify"

export default function App() {
  return (
    <GlobalContextProvider>
      <MainTabsContextProvider>
        
        <div className="container-fluid">
          {toastContainer}

          <div className="row">
            
            <aside className="col-2 bg-dark" style={{ minHeight: "100vh" }}>
              <SideBar />
            </aside>

            <div className="main-container col-10">
              <nav><NavBar /></nav>
              <main><MainTabs /></main>
              <Footer />
            </div>

          </div>
        </div>
      </MainTabsContextProvider>
    </GlobalContextProvider>
  )
}
