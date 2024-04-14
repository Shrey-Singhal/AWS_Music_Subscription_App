import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import MainPage from "./pages/MainPage/MainPage";
import Register from "./pages/Register";
import Navbar from "./Component/Navbar";
import Subscriptions from "./pages/MainPage/Subscriptions";
import Query from "./pages/MainPage/Query";
import {AuthProvider} from "./Context/AuthContext";
import {SubscriptionProvider} from "./Context/SubscriptionContext";
import ViewLibrary from "./pages/ViewLibrary";
function App() {
  return (
      <AuthProvider>
          <SubscriptionProvider>
              <Router>
                  <Navbar />
                  <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="/mainpage" element={<MainPage />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/query" element={<Query />} />
                      <Route path="/subscriptions" element={<Subscriptions />} />
                      <Route path ="/library" element={<ViewLibrary />} />
                  </Routes>
              </Router>
          </SubscriptionProvider>

      </AuthProvider>

  );
}

export default App;
