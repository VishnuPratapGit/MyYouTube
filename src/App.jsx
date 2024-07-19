import React, { useEffect, useState } from "react";
import { Header, PreLoader, Sidebar, StudioSidebar } from "./components/index";
import AddVideo from "./pages/AddVideo";
import { Outlet, useLocation } from "react-router-dom";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/authSlice";
import "./App.css";

const App = () => {
  const [isSibarOpen, setIsSidbarOpen] = useState(false);
  const [studio, setStudio] = useState(false);
  const [loading, setLoading] = useState(true);
  const [createBtnClick, setCreateBtnClick] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function checkUserLogin() {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }
    checkUserLogin();
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname.startsWith("/studio")) {
      setStudio(true);
    } else {
      setStudio(false);
    }
  }, [location]);

  function toggleSidebar() {
    setIsSidbarOpen(!isSibarOpen);
  }

  function toggleCreateVideoComponent() {
    setCreateBtnClick(!createBtnClick);
  }

  return (
    <>
      <nav className="dark:bg-stone-950">
        <Header
          toggleSidebar={toggleSidebar}
          toggleCreate={toggleCreateVideoComponent}
          isSidebarOpen={isSibarOpen}
          studio={studio}
        />
      </nav>

      <div>
        <aside
          className={`fixed z-10 w-min transition-transform duration-500 ${isSibarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {studio ? <StudioSidebar /> : <Sidebar />}
        </aside>

        <main className="h-[90svh] overflow-y-scroll">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <PreLoader type="bars" color="gray" height={60} width={60} />
            </div>
          ) : (
            <><Outlet /> {createBtnClick && <AddVideo toggleCreate={toggleCreateVideoComponent} />}</>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
