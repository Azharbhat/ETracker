import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import { DataProvider } from './components/DataContext';
import Header from "./components/Header";
import Auth from "./components/Auth";
import Home from './components/Home/Home';
import Create from './components/Create/Create'

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  return (
    <div className="root">
      <React.Fragment >
        <Header />
        <main>
          {/* Wrap the entire Routes with DataProvider */}
          <DataProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              {/* Redirect logged-in user to home with user ID */}
              {isLoggedIn ? (
                <Route path="/" element={<Navigate to={`/${localStorage.getItem("userId")}`} />} />
              ) : (
                <Route path="/" element={<Navigate to="/auth" />} />
              )}
              <Route path="/:userId" element={<Home />} />
              <Route path="/createSource" element={<Create />} />
            </Routes>
          </DataProvider>
        </main>
      </React.Fragment>
    </div>
  );
}

export default App;
