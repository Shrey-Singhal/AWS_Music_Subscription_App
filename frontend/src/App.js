import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/mainpage" element={<MainPage />} />
          </Routes>
      </Router>
  );
}

export default App;
