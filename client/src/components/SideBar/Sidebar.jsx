import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useCookies } from "react-cookie";
import Logo from "../../assets/et-logo.png";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import Logger from '../../store/clickstreamLogger'

const Sidebar = () => {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const logOut = (req, res) => {
    removeCookie('user');
    removeCookie('session');
    navigate('/');
  };
  
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          {/* <img src={Logo} alt="logo" /> */}
          <span>Pekanu<span> e</span>Tutor
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            const sidebarOnClick=()=>{
    
              console.log(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on "+ item.heading, "Navigated from HomePage to "+ item.heading)
              Logger(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on "+ item.heading, "Navigated from HomePage to "+ item.heading)
              navigate('/player',);
            }

            const logoutOnClick=(req, res)=>{
    
              console.log(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on Logout", "User Logged out")
              Logger("Session Ended: "+ cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on Logout", "User Logged out")
              removeCookie('user');
              removeCookie('session');
              navigate('/');
            }
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => (item.heading === 'Log Out') ? logoutOnClick() : sidebarOnClick()}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
