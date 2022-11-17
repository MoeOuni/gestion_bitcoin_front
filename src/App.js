import { Routes, Route } from "react-router-dom";
import Main from "./Layouts/Main";
import BitcoinForm from "./Pages/BitcoinForm";
import BitcoinList from "./Pages/BitcoinList";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import OwnerForm from "./Pages/OwnerForm";
import OwnerList from "./Pages/OwnerList";
import SignUp from "./Pages/SignUp";
const App = () => {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />

      <Route path="/admin" exact element={<Main />}>
        <Route path="/admin/currency/list" element={<BitcoinList />} />
        <Route path="/admin/currency/form" element={<BitcoinForm />} />

        <Route path="/admin/client/form" element={<OwnerForm />} />
        <Route path="/admin/client/list" element={<OwnerList />} />
      </Route>
    </Routes>
  );
};

export default App;
