import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SinglePagePDFViewer from "./single-page"


/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/

import samplePDF from "./sample.pdf";

import "./styles.css";

export default function App() {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

    useEffect(() => {
        const verifyUser = () => {
          if (!cookies.user) {
            navigate("/login");
          }
          else {
            console.log(cookies.user);
            console.log(cookies.session);
          }
        };
        verifyUser();
      }, [cookies, navigate, removeCookie]);

  return (
    <div className="App">
      {/* <h4>Notes</h4> */}
      <SinglePagePDFViewer pdf={samplePDF} />

      <hr />

    </div>
  );
}
