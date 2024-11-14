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
        
          <div className="d-flex">
            {toastContainer}
            <div className="bg-dark" style={{ minHeight: "100vh", width: "210px" }}>
              <SideBar />
            </div>

            <div className="main-container">
              <NavBar />
              <main>
                <MainTabs />
              </main>
              <Footer />
            </div>

          </div>
    
      </MainTabsContextProvider>
    </GlobalContextProvider>
  )
}
