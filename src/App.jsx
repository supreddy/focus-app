import React, { useState, useEffect } from 'react';
import bg from './components/assets/bg.png';
// import Sidebar from './components/widgets/Sidebar';
import Home from './page/Home';
import Notes from './page/Notes';
import Signup from './page/Signup';
import Login from './page/Login';
import CompanyProfile from './page/CompanyProfile';
import CarouselPage from './page/CarouselPage';
import UserCreation from './page/UserCreation';
import { Routes, Route } from 'react-router-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import NoteDetail from './page/NoteDetail';
import ProtectedRoute from './components/widgets/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './store/features/userSlice';
import NotFound from './page/NotFound';


function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // const user = "asasa";
  console.log(user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch])


  return (
    <Router>
      <div className="md:overflow-x-auto overflow-x-hidden bg-primary">
        <section>
          <div>
            <Routes>
              <Route element={<ProtectedRoute user={user} />}>
                <Route
                  path="/home"
                  element={
                    < Home />
                  }
                />

                <Route
                  path="/notes/:id"
                  element={<NoteDetail />}
                />

                <Route
                  path="/notes"
                  element={
                    < Notes />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    < CompanyProfile />
                  }
                />

                <Route
                  path="/carousel"
                  element={
                    < CarouselPage />
                  }
                />

                <Route
                  path="/user"
                  element={
                    < UserCreation />
                  }
                />
              </Route>

              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={< NotFound />} />
            </Routes>
          </div>
        </section>

      </div>
    </Router>
  );
}

export default App;



