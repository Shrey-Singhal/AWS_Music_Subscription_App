import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import MainPage from "./pages/MainPage/MainPage";
import Register from "./pages/Register";
import Navbar from "./Component/Navbar";
import Subscriptions from "./pages/MainPage/Subscriptions";
import Query from "./pages/MainPage/Query";
function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/query" element={<Query />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
          </Routes>
      </Router>
  );
}

export default App;
