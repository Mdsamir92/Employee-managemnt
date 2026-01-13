import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./index.css"
import Home from "./components/Home";


function App() {
  return (
    <>
      <Navbar /> {/* ✅ Router ke andar */}
      
      <Routes>
         <Route path="/" element={<Home/>} />
      
      </Routes>
    </>
  );
}

export default App;
