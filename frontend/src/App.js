import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
  );
}

export default App;
