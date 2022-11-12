import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import Logger from '../../store/clickstreamLogger'

import customFunction from '../../store/clickstreamLogger'

const MainDash = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = () => {
      if (!cookies.user) {
        navigate("/login");
      }
      else {
        Logger(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Navigated to Dashboard", "User navigated to dashboard")
        console.log(cookies.user);
        console.log(cookies.session);
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  return (
    <div className="MainDash">
      <h1>
        <b>Hey there,</b> {cookies.user.username.split(" ")[0]}</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
