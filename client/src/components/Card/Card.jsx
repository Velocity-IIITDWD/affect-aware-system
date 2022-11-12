import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";

import Logger from '../../store/clickstreamLogger';
import { useCookies } from "react-cookie";

// parent Card

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <CompactCard param={props} setExpanded={() => setExpanded(true)} />
  );
};

// Compact Card
function CompactCard({ param }) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const Png = param.png;
  const cardOnClick=()=>{
    console.log(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on Card", "Navigated from HomePage to SubjectPage: " + param.title)
    Logger(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on Card", "Navigated from HomePage to SubjectPage: " + param.title)
    navigate('/player',);
  }
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={()=>{cardOnClick()}}
    >
      <div className="radialBar">
        {/* <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        /> */}
        <h3>{param.title}</h3>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
// function ExpandedCard({ param, setExpanded }) {

//   return (
//     <motion.div
//       className="ExpandedCard"
//       style={{
//         background: param.color.backGround,
//         boxShadow: param.color.boxShadow,
//       }}
//       layoutId="expandableCard"
//     >
//       <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
//         <UilTimes onClick={setExpanded} />
//       </div>
//         <span>{param.title}</span>
//         <div className="videoContainer">
//           <iframe class="responsive-videoContainer" src={param.link} allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *" title="Integer"></iframe><script src="https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js" charset="UTF-8"></script>
//       </div>
//       <div className = "gotoClass">
//         <span>Go to class</span>
//       </div>
//     </motion.div>
//   );
// }

export default Card;