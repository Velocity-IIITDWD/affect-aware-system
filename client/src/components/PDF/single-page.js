import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Document, Page, pdfjs } from "react-pdf";
import RightSide from './RightSide/RightSide'
import BackSvg from './arrow-left.svg'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// Need to read these variables from local storage to retain values for Clickstream Analysis
  var reading = 0;
  var backToClassroom = 0;
  var backToDashboard = 0;
  var prevClickCount = 0;
  var nextClickCount = 0;
  var current = Date();
  const sessionStartTime = current;


export default function SinglePage(props) {
  console.log(current);
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


  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show first page - Need to set to last stored session page
  
  function onDocumentLoadSuccess({ numPages }) {
    reading = 1
    setNumPages(numPages);
    setPageNumber(1); // Need to change to last stored session page
    console.log("Document Load Success, Current Page:", pageNumber);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
    prevClickCount++;
    console.log("Clicked Previous Page, Current Page:", pageNumber+1);
  }

  function nextPage() {
    changePage(1);
    nextClickCount++;
    console.log("Clicked Next Page, Current Page:", pageNumber+1);
  }

  function toClassroom() {
    backToClassroom = 1;
    var sessionEndTime = current;
    var sessionDuration = sessionEndTime - sessionStartTime;
    //console.log("State = {currentPage:", pageNumber,", readingState:",reading,", prevClickCount:",prevClickCount,", nextClickCount:",nextClickCount,", backToClassroom? :",backToClassroom,", backToDashboard? : ",backToDashboard,", sessionDuration:",sessionDuration,"}");
    console.log("State = {currentPage:", pageNumber,", readingState:",reading,", prevClickCount:",prevClickCount,", nextClickCount:",nextClickCount,", backToClassroom? :",backToClassroom,", backToDashboard? : ",backToDashboard,"}");
    navigate('/player')
  }

  function toDashboard() {
    backToDashboard = 1;
   // var sessionEndTime = current;
    //var sessionDuration = sessionEndTime.getSeconds() - sessionStartTime.getSeconds();
   // console.log("State = {currentPage:", pageNumber,", readingState:",reading,", prevClickCount:",prevClickCount,", nextClickCount:",nextClickCount,", backToClassroom? :",backToClassroom,", backToDashboard? : ",backToDashboard,", sessionDuration:",sessionDuration,"}");
    console.log("State = {currentPage:", pageNumber,", readingState:",reading,", prevClickCount:",prevClickCount,", nextClickCount:",nextClickCount,", backToClassroom? :",backToClassroom,", backToDashboard? : ",backToDashboard,"}");
    navigate("/dashboard");
  }


  const { pdf } = props;

  console.log("State = {currentPage:", pageNumber,", readingState:",reading,", prevClickCount:",prevClickCount,", nextClickCount:",nextClickCount,", backToClassroom? :",backToClassroom,", backToDashboard? : ",backToDashboard,"}");
  return (
    <>
      
      
      <div className="container_pdf">
        <div>
        <h3 style={{
          marginTop: '10px',
          fontWeight: 'bold',
         
        }}>Not<span style={{ color: '#004ea0'}}>e</span>s</h3>
        </div>
        <div>

        <button type="button" onClick={toClassroom} style={{
          marginRight: '10px'
        }}>
          <img src={BackSvg} />
        </button>
        <button type="button" onClick={toDashboard}>Home</button>
        </div>
        <div className="wrapper">
        <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        </div>
        <div>

        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
        </div>
        </div>
      
      </div>
      <Document
        //file={{url:"https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf"}}
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="container_bot_pdf">
      <RightSide />
      <div className="bot-text">{props.botText || 'Hi, my name is Pekanu. Welcome to E-Tutor'}</div>
      </div>
    </>
  );
}
