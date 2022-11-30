import { Menu } from "antd";
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import jwt from "jwt-decode";
import localStorageService from "../Utils/localStorageService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faCirclePlus,
  faTableList,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import bitcoin from "../Assets/bitcoin.svg";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2"];
const Main = () => {
  const user = jwt(localStorageService().getToken());
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const items = [
    user.roles.includes("ADMIN") &&
      getItem(
        <Link
          className="fw-bold"
          style={{ textDecoration: "none" }}
          to={"/admin/users/list"}
        >
          Users
        </Link>,
        "8",
        <FontAwesomeIcon icon={faUserGroup} />
      ),
    getItem(
      <span className="fw-bold">Currency</span>,
      "sub1",
      <img src={bitcoin} style={{ height: "14px" }} />,
      [
        getItem(
          <Link
            className="fw-bold"
            style={{ textDecoration: "none" }}
            to={"/admin/currency/form"}
          >
            Add
          </Link>,
          "1",
          <FontAwesomeIcon icon={faCirclePlus} />
        ),
        getItem(
          <Link
            className="fw-bold"
            style={{ textDecoration: "none" }}
            to={"/admin/currency/list"}
          >
            List
          </Link>,
          "2",
          <FontAwesomeIcon icon={faTableList} />
        ),
      ]
    ),
    getItem(
      <span className="fw-bold">Clients</span>,
      "sub2",
      <FontAwesomeIcon icon={faUserCircle} />,
      [
        getItem(
          <Link
            className="fw-bold"
            style={{ textDecoration: "none" }}
            to={"/admin/client/form"}
          >
            Add
          </Link>,

          "5",
          <FontAwesomeIcon icon={faCirclePlus} />
        ),
        getItem(
          <Link
            className="fw-bold"
            style={{ textDecoration: "none" }}
            to={"/admin/client/list"}
          >
            List
          </Link>,
          "6",
          <FontAwesomeIcon icon={faTableList} />
        ),
      ]
    ),
  ];

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
