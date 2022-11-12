import  Camera  from "./camera";
import PlayerBot from '../player/Bot/PlayerBot'
import './camera.css'

export default function CameraPage(){
    return (
        <div className='' style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
          <section className='section'>
            <h1>Classroom</h1>
            <div className='player-wrapper'>
                <Camera/>           
            </div>
          </section>
            <section className="bot-wrapper">
                <PlayerBot></PlayerBot>
            </section>
        </div>
      )
}