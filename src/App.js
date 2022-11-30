import { Routes, Route } from "react-router-dom";
import Main from "./Layouts/Main";
import BitcoinForm from "./Pages/BitcoinForm";
import BitcoinList from "./Pages/BitcoinList";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import OwnerForm from "./Pages/OwnerForm";
import OwnerList from "./Pages/OwnerList";
import SignUp from "./Pages/SignUp";
import UsersList from "./Pages/UsersList";
const App = () => {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />

      <Route path="/admin" exact element={<Main />}>
        <Route path="currency/list" element={<BitcoinList />} />
        <Route path="currency/form" element={<BitcoinForm />} />
        <Route path="users/list" element={<UsersList />} />
        <Route path="client/form" element={<OwnerForm />} />
        <Route path="client/list" element={<OwnerList />} />
      </Route>
    </Routes>
  );
};

export default App;
