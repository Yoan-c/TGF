import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Header from "./component/Header";
import Home from "./component/Home";
import Main from "./component/Main";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/forum" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
