import './style/common.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";

function App() {

    /**
     * install
     * 1. npm install
     * 2. npm install react-router-dom
     * 3. npm install axios
     */

    return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
