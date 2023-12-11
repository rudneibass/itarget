import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2  bg-dark" style={{ minHeight: "100vh" }}>
            <SideBar />
          </div>

          <div className="main-container col-10">
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default App;
