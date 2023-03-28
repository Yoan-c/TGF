import { BrowserRouter, Routes, Route } from "react-router-dom";
import AskQuestion from "./component/AskQuestion";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Header from "./component/Header";
import Home from "./component/Home";
import Main from "./component/Main";
import Questions from "./component/Questions";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forum" element={<Main />} />
          <Route path="/questions/:id" element={<Questions />} />
          <Route path="/askQuestion" element={<AskQuestion />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
