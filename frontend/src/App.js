import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import Navbar from "./Component/Navbar";
function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
  );
}

export default App;
