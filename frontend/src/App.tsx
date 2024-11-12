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
            
            <div className="col-2 bg-dark" style={{ minHeight: "100vh" }}>
              <SideBar />
            </div>

            <div className="col-10 main-container">
              <NavBar />
              <main>
                <MainTabs />
              </main>
              <Footer />
            </div>

          </div>
        </div>
      </MainTabsContextProvider>
    </GlobalContextProvider>
  )
}
