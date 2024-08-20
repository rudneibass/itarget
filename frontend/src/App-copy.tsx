import SideBar from "@components/Bootstrap/SideBar";
import NavBar from "@components/Bootstrap/NavBar";
import Footer from "@components/Bootstrap/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

import { Outlet } from 'react-router-dom'
import { GlobalContextProvider } from "./context/context";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <div className="container-fluid">
          <div className="row">
            <aside className="col-2  bg-dark" style={{ minHeight: "100vh" }}>
              <SideBar />
            </aside>
            <div className="main-container col-10">
              <nav>
                <NavBar />
              </nav>
              <main>
                <Outlet />
              </main>
              <Footer />
            </div>    
          </div>
        </div>
      </GlobalContextProvider>
    </>
  );
}

export default App;
