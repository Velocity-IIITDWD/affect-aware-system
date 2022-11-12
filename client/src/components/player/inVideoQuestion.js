import React, { useRef, useState } from 'react';
// import './Popup.css'
import {useEffect} from 'react'

function Popup(props) {

    const [popup,setPopup] = useState(true)
    const [choice,setChoice] = useState(null)
    const choiceRef = useRef(null)

    const handleSubmit = (e)=>{
        e.preventDefault()
        var options= {}
        options['a'] = e.target[0].checked
        options['b'] = e.target[1].checked
        options['c'] = e.target[2].checked
        options['d'] = e.target[3].checked
        if(options[props.correctAnswer]){props.setResponse(1)}
        else{props.setResponse(-1)}
        setPopup(false)
        console.log(props.correctAnswer,options[props.correctAnswer])
    }

    useEffect(()=>{
        
    },[popup])

    return (popup)?(
        <div className="popup">
            <div className="popup">
                <div className="popup-inner">
                    <div className='question-wrapper'>
                        <h3 className="question">List numbers from 1 to 10, Write the fraction of prime numbers in it</h3>
                        <div className='options-wrapper'>
                        <form onSubmit={handleSubmit}>
                            <p>
                              <label>
                                <input name="group1" type="radio" value={"a"} required/>
                                <span>1/2</span>
                              </label>
                            </p>
                            <p>
                              <label>
                                <input name="group1" type="radio" value={"b"} />
                                <span>4/10</span>
                              </label>
                            </p>
                            <p>
                              <label>
                                <input className="with-gap" name="group1" type="radio" value={"c"}  />
                                <span>3/5</span>
                              </label>
                            </p>
                            <p>
                              <label>
                                <input name="group1" type="radio" value={"d"} />
                                <span>3/10</span>
                              </label>
                            </p>
                            <button className='submit' type='submit'>submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
} 

export default Popup