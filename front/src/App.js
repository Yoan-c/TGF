import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import AskQuestion from "./component/AskQuestion";
import Login from "./component/auth/Login";
import Logout from "./component/auth/Logout";
import Signup from "./component/auth/Signup";
import Home from "./component/Home";
import Main from "./component/Main";
import Questions from "./component/Questions";
import Account from "./component/user/Account";
import AllUser from "./component/user/AllUser";
import store from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forum" element={<Main />} />
          <Route path="/questions/:id" element={<Questions />} />
          <Route path="/askQuestion" element={<AskQuestion />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<AllUser />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
