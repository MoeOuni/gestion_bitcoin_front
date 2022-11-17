import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();

  const handleDisconnect = () => {
    Navigate("/login");
  };

  return (
    <div class="px-4 bg-light shadow-sm">
      <header class="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3">
        <h5 class="d-flex align-items-center text-dark text-decoration-none">
          Gestion Bitcoin/Owners
        </h5>

        <div class="text-end">
          <Button type="primary" onClick={handleDisconnect}>
            Logout
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
