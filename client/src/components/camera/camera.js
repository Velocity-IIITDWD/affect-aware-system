import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react';
import ImageCapture from 'react-image-data-capture';
import clickstreamLogger from '../../store/clickstreamLogger';



// const WebcamStreamCapture2 = () => {

//   const uploadrecording = React.useCallback(() => {

//     if (recordedChunks.length) {
//       const video = new Blob(recordedChunks, {
//         type: "video/webm"
//       });

//       var formdata = new FormData();
//       formdata.append("file", video);
//       console.log("api working");

//       fetch('http://3.110.127.167/video', {
//           method: 'post',
//           // mode: 'cors', 
//           body: formdata
//         })
//         .then(response => {
//           console.log(response);
//           response.json()
//         })

//       //code to send it to backend using fetch
//       setRecordedChunks([]);
//     }
//   }, [setRecordedChunks]);

//   useEffect(()=>{
//     setInterval(() => {
//       setStopRecording(true);
//       // setTimeout(() => {
//       //   handleStopCaptureClick()
//       // }, 2000)
//     }, 10000);
//   },[startrecording,stoprecording ])



//   return ( <
//     VideoRecorder constraints = {
//       {
//         audio: false,
//         video: true
//       }
//     }
//     countdownTime = {
//       0
//     }
//     dataAvailableTimeout = {
//       500
//     }
//     isOnInitially mimeType = {
//       "video/webm"
//     }
//     onStopRecording = {
//       (videoBlob) => {
//         setRecordedChunks(videoBlob);
//         console.log('videoBlob', recordedChunks);
//         uploadrecording();
//         videoBlob = null;
//         setStopRecording(false);
//       }
//     }
//     onCameraOn = {
//       setStartRecording(true)
//     }
//     />
//   );
// };






function WebcamStreamCapture2() {
  const [imgSrc, setImgSrc] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [count, setCount] = useState(0);
  const [imageArray, setImageArray] = useState(null);
  const imageRef = useRef(null)
  let newArray = [];
  let tempArray = [];
  const onCapture = async (imageData) => {
    // console.log('imageData', imageData);
    // read as webP
    setImgSrc(imageData.webP);
    // read as file
    setImgFile(imageData.file);
    setCount(count + 1);
    // console.log(imageData.webP);
    newArray.push(imageData.webP);
    // tempArray.push(imageData.file);
    setImageArray(newArray);
    // console.log("Image array", newArray);

    if (newArray.length === 100) {
      var myHeaders = new Headers();
      // myHeaders.append("Access-Control-Allow-Origin", "*");
      const formData = new FormData();
      // formData.append('image_array', newArray);
      newArray.forEach((item) => formData.append("image_array", item))
      // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Access-Control-Allow-Origin", "*");
      // var json = JSON.stringify({image_array: newArray})
      // console.log(json);
      console.log(formData.getAll("image_array")[0])
      // console.log(formData.getAll("image_array"));

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      };

      const response = await fetch("http://3.110.127.167/predict", requestOptions)
      const data = await response.json();
      console.log(data);

      var userState = data["prediction"]
      console.log(userState);

      // const response = await fetch("http://127.0.0.1:5000/predict", requestOptions)
      // console.log(response.text());

      // const data = await response.text();
      // console.log(data);
      // const data = await response.body();
      console.log("Array Empty");
      newArray = [];
      tempArray = [];
      // break;
    }
    // read as blob
    // imageData.blob
  };

  // Use useCallback to avoid unexpected behaviour while rerendering
  const onError = useCallback((error) => {
    console.log(error)
  }, []);

  // Use useMemo to avoid unexpected behaviour while rerendering
  const config = useMemo(() => ({
    video: true
  }), []);
  /*
    { video: true } - Default Camera View
    { video: { facingMode: environment } } - Back Camera
    { video: { facingMode: "user" } } - Front Camera
  */

  // imgFile can be used as a file upload field form submission
  const formData = new FormData();

  formData.append("file", imgFile);
  // console.log(imgFile);
  return (
    <div style={{width:"200px",height:"200px",border:"1px solid red"}} >
    <ImageCapture ref = {imageRef} onCapture = {
      (e) => {setInterval(() => {
        console.log(e);
          onCapture(e);
        }, 100);}
    }
    onError = {
      onError
    }
    width = {
      200
    }
    userMediaConfig = {
      config
    }/> 
    {/* {imgSrc &&
        <div>
        <div> Captured Image: </div> <
        img src = {
          imgSrc
        }
      alt = "captured-img" / >
        </div>} */}
        
        
        </div>

  );
}

export default WebcamStreamCapture2;