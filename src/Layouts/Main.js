import { Menu } from "antd";
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Currency", "sub1", null, [
    getItem(<Link to={"/admin/currency/form"}>Add</Link>, "1"),
    getItem(<Link to={"/admin/currency/list"}>List</Link>, "2"),
  ]),
  getItem("Clients", "sub2", null, [
    getItem(<Link to={"/admin/client/form"}>Add</Link>, "5"),
    getItem(<Link to={"/admin/client/list"}>List</Link>, "6"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2"];
const Main = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div className="min-vh-100">
      <Navbar />
      <div className="d-flex">
        <Menu
          className="min-vh-100 h-100 bg-light shadow-sm"
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 256,
          }}
          items={items}
        />
        <div className="bg_waves w-100 min-vh-100 h-100  px-4 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Main;
