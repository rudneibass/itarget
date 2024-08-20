import SideBar from "@components/Bootstrap/SideBar";
import NavBar from "@components/Bootstrap/NavBar";
import Footer from "@components/Bootstrap/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

import { Outlet } from 'react-router-dom'
import { GlobalContextProvider } from "./context/context";


import { Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [tabs, setTabs] = useState([{ path: location.pathname, title: "Home" }]);
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleSelect = (tabPath: string | null) => {
    if (tabPath) {
      setActiveTab(tabPath);
      navigate(tabPath);
    }
  };

  const addTab = (path: string, title: string) => {
    if (!tabs.find((tab) => tab.path === path)) {
      setTabs([...tabs, { path, title }]);
    }
    setActiveTab(path);
  };

  const removeTab = (path: string) => {
    setTabs((prevTabs) => {
      const filteredTabs = prevTabs.filter((tab) => tab.path !== path);
      if (filteredTabs.length > 0 && activeTab === path) {
        const nextTab = filteredTabs[filteredTabs.length - 1]
        setActiveTab(nextTab.path)
        navigate(nextTab.path)
      }
      return filteredTabs
    })
  }

  useEffect(() => {
    const path = location.pathname;

    let title = "New Tab"; 
    if (path === "/") title = "Event List";
    else if (path.startsWith("/registration")) title = "Registration";

    addTab(path, title);
  },  [location.pathname]);


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

                <Tabs activeKey={activeTab} onSelect={handleSelect} id="main-tabs">
                  {tabs.map((tab) => (
                    <Tab 
                      key={tab.path}
                      eventKey={tab.path} 
                      title={
                        <>
                          <span>
                           {tab.title}
                          </span>
                          <i className="fs-6 bi-x"
                            style={{ float: 'right'}}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTab(tab.path);
                            }} 
                          ></i>
                        </>
                      } 
                    >
                      <Outlet />
                    </Tab>
                  ))}
                </Tabs>

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
