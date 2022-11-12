import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Amplify, Analytics, AWSKinesisFirehoseProvide, AWSKinesisFirehoseProvider } from 'aws-amplify'

import { withCookies } from "react-cookie";
import config from './aws-exports';

// import player css
import './player.css'
import './reset.css';
import './defaults.css';
import './range.css';
import './inVideoQuestion.css'

// // InVideo Questions Popup
 import Popup from './inVideoQuestion.js';
// import { useState } from 'react';


import ReactPlayer from 'react-player';
import Duration from './Duration';
import Logger from '../../store/clickstreamLogger'
import WebcamStreamCapture2 from '../camera/camera'

// THIS SECTION DEALS WITH SENDING THE DATA TO AWS BACKEND

Amplify.configure({
  Auth: {
    identityPoolId: config.aws_cognito_identity_pool_id,
    region: config.aws_project_region
  },
  Analytics: {
    AWSKinesisFirehose: {
      region: config.aws_project_region
    }
  }
});

Analytics.addPluggable(new AWSKinesisFirehoseProvider());

// THIS SECTION DEALS WITH LOGGING SESSION DATA
// Indicators to track from website: sessionStartTime, sessionEndTime, currentTime, clicksOnComponent

// THIS SECTION DEALS WITH LOGGING VIDEO INTERACTION DATA
// Indicator to track from video: currentTime, volume, totalBufferDuration, totalPauseDuration
var trueWatchTime = -1;
var pauseCount = -1;
var bufferCount = 0;
var time = 0;
var noOfVolChanges = 0; // requires timer
var avgPlaybackSpeed = 0;
var avgVolume = 0; // requires timer
var avgMuteDuration = 0;  // requires timer
var PauseDuration = 0; // requires timerF

console.log("hiiiiii");

class LoggingPlayer extends Component {
  
  state = {
    url: "https://www.youtube.com/watch?v=YzO7z85pPQI",
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    popupAnswer:null,
   }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })  
  }

  handleStop = () => {
    const { cookies } = this.props;
    console.log('Video stopped at sessionTime:', time)
    this.setState({ url: null, playing: false })
    Logger(cookies.get("session"), cookies.get("user")._id,cookies.get("user").username, "VideoQuery: Clicked on Stop", "Video stopped at session time: " + time,"invideo question score :" + this.state.popupAnswer)
  }

  handleToggleLoop = () => {
    console.log('Loop toggled at sessionTime:', time) // odd even to determine
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    // Need timer for volChange
    const { cookies } = this.props;
    console.log('Volume changed to ', e.target.value, ' at sessionTime', time)
    this.setState({ volume: parseFloat(e.target.value) })
    Logger(cookies.get("session"), cookies.get("user")._id,cookies.get("user").username, "VideoQuery: Clicked on Volume", "Volume changed to " + e.target.value)

  }

  handleToggleMuted = () => {
    noOfVolChanges += 1;
    console.log('Mute Callback at sessionTime:', time) // odd even to detect mute state
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    const { cookies } = this.props;
    console.log('Playback rate changed at sessionTime:', time)
    this.setState({ playbackRate: parseFloat(e.target.value) })
    Logger(cookies.get("session"), cookies.get("user")._id,cookies.get("user").username, "VideoQuery: Changed Playback Speed", "Speed changed to" + e.target.value)

  }

  handleOnPlaybackRateChange = (speed) => {
    console.log('Playback rate changed to ', speed, ' at sessionTime:', time)
    this.setState({ playbackRate: parseFloat(speed) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    const { cookies } = this.props;
    console.log('onPlay at sessionTime:', time)
    this.setState({ playing: true })
    Logger(cookies.get("session"), cookies.get("user")._id,cookies.get("user").username, "VideoQuery: Clicked on Play/Pause", "Video playing")  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    const { cookies } = this.props;
    console.log('onPause at sessionTime:', time)
    pauseCount += 1;
    trueWatchTime -= 1;
    this.setState({ playing: false })}

  handleBuffer = () => {
    console.log('onBuffer at sessionTime:', time)
    bufferCount += 1;
  }

  handleSeekMouseDown = e => {
    console.log('Seeking started at sessionTime:', time)
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    const { cookies } = this.props;
    console.log('Seeking at ', e.target.value, ' at sessionTime ', time)
    this.setState({ played: parseFloat(e.target.value) })
    Logger(cookies.get("session"), cookies.get("user")._id,cookies.get("user").username, "VideoQuery: Seeked Video", "Seeked video to" + e.target.value)
  }

  handleSeekMouseUp = e => {
    console.log('Seeked to ', e.target.value, ' at sessionTime ', time)
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    // console.log('onProgress', time, state)
    trueWatchTime += 1;
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded at sessionTime:', time)
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  // SESSION TIMER TRIGGERED ON PLAYER READY.

  sessionTimer = state => {
    var self = this
    console.log('onReady')
    setInterval(function () {
      state = self.state;
      time += 1;
      // console.log('session time elapsed (in sec)', time);
      const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = state;
      // console.log(url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip);

      var interactionLog =
      {
        url: (url instanceof Array ? 'Multiple' : url) || 'null',
        playing: playing ? 'true' : 'false',
        paused: playing ? 'false' : 'true',
        buffering: played > loaded ? 'true' : 'false',
        volume: volume,
        no_of_volume_changes: noOfVolChanges,
        avg_volume: volume,
        avg_mute_duration: duration,
        speed: playbackRate,
        avg_playback_speed: playbackRate,
        played: played,
        loaded: loaded,
        duration: duration,
        elapsed: duration * played,
        remaining: duration * (1 - played),
        true_watch_time: trueWatchTime,
        pause_count: pauseCount,
        timestamp: Date.now(),
        
      };

      // console.log(interactionLog);

      // Analytics.record({
      //   data: interactionLog,
      //   streamName: config.aws_firehose_name
      // }, 'AWSKinesisFirehose');

    }, 1000);

  }

  handleViewPDF = () => {
    console.log('Clicked View Notes at sessionTime:', time) 
  }

  ref = player => {
    this.player = player
  }


  setResponse = (i)=>{
    const {cookies} = this.props;
    this.setState({popupAnswer:i});
    if(this.state.popupAnswer){this.handlePlay()}
    // if(!this.state.popupAnswer){this.setState((prev)=>({...prev,played:prev.played}))}
    Logger(cookies.get("session"), cookies.get("user")._id,cookies.get("user").username, "user invideo question selected" ,"user result:" +this.state.popupAnswer) ;
  }

  // Collecting all interaction log data and sending to AWS Amplify

  

  // collectData = () => {
  //   const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip, time } = this.state
  //   interactionLog =
  //   {
  //     url: (url instanceof Array ? 'Multiple' : url) || 'null',
  //     playing: playing ? 'true' : 'false',s
  //     paused: playing ? 'false' : 'true',
  //     buffering: played>loaded ? 'true' : 'false',
  //     volume: volume.toFixed(3),
  //     no_of_volume_changes: noOfVolChanges,
  //     avg_volume: volume.toFixed(3),
  //     avg_mute_duration: duration,
  //     speed: playbackRate,
  //     avg_playback_speed: playbackRate,
  //     played: played.toFixed(3),
  //     loaded: loaded.toFixed(3),
  //     duration: duration,
  //     elapsed: duration * (1 - played),
  //     remaining: duration * (1 - played),
  //     true_watch_time: trueWatchTime,
  //     pause_count: pauseCount,
  //  }; 

  //  Analytics.record({
  //   data: interactionLog,
  //   streamName: config.aws_firehose_name
  // }, 'AWSKinesisFirehose');

  // }



  render(){
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
    const SEPARATOR = ' · '
    // // For in video questions:
    // const [buttonPopup, setButtonPopup] = useState(false);

    setTimeout(()=>{
      this.handlePause()
    },[13000])

    return (
      <div className='app'>
        <section className='section'>
          <h1>Classroom</h1>
          <div className='player-wrapper'>
          {(duration * played) >= ( 10 )  &&(
            <Popup setResponse = {this.setResponse} correctAnswer = {'b'}>{/*harcoded to b update here from backend*/} 
            </Popup>)
           }
      
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              // onReady={() => console.log('onReady')}
              onReady={this.sessionTimer}
              onStart={() => console.log('onStart',)}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              onBuffer={this.handleBuffer}
              onPlaybackRateChange={this.handleOnPlaybackRateChange}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>
          <table>
            <tbody>
              <tr>
                <th>Controls</th>
                <td>
                  <button onClick={this.handleStop}>Stop</button>
                  <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                  <Link to='/pdf' style={{ color: "#004ea0", textDecoration: "none" }}><button onClick={this.handleViewPDF} style={{color: "#004ea0"}}>View PDF</button></Link>
                  {light &&
                    <button onClick={() => this.player.showPreview()}>Show preview</button>}
                  {ReactPlayer.canEnablePIP(url) &&
                    <button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
                  <button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                  <button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
                  <button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                </td>
              </tr>
              {/* <tr>
                <th>Speed</th>
                <td>
                  <button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                  <button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
                  <button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                </td>
              </tr> */}
              <tr>
                <th>Seek</th>
                <td>
                  <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                </td>
              </tr>
              {/* <tr>
                <th>
                  <label htmlFor='muted'>Muted</label>
                </th>
                <td>
                  <input id='muted' type='checkbox' checked={muted} onChange={this.handleToggleMuted} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='loop'>Loop</label>
                </th>
                <td>
                  <input id='loop' type='checkbox' checked={loop} onChange={this.handleToggleLoop} />
                </td>
              </tr> */}
              {/* <tr>
                <th>Played</th>
                <td><progress max={1} value={played} /></td>
              </tr>
              <tr>
                <th>Loaded</th>
                <td><progress max={1} value={loaded} /></td>
              </tr> */}
            </tbody>
          </table>
        </section>
        <section className='section'>
          <table>
            <tbody>
              {/* <h1>Bot Feedback</h1> */}
              {/* Bot Code will be integrated here */}
            </tbody>
          </table>

          {/* <h2>State</h2>

          <table>
            <tbody>
              <tr>
                <th>url</th>
                <td className={!url ? 'faded' : ''}>
                  {(url instanceof Array ? 'Multiple' : url) || 'null'}
                </td>
              </tr>
              <tr>
                <th>playing</th>
                <td>{playing ? 'true' : 'false'}</td>
              </tr>
              <tr>
                <th>paused</th>
                <td>{playing ? 'false' : 'true'}</td>
              </tr>
              <tr>
                <th>buffering</th>
                <td>{played > loaded ? 'true' : 'false'}</td>
              </tr>
              <tr>
                <th>volume</th>
                <td>{volume.toFixed(3)}</td>
              </tr>
              <tr>
                <th>no of volume changes</th>
                <td>{noOfVolChanges}</td>
              </tr>
              <tr>
                <th>avg volume</th>
                <td>{volume.toFixed(3)}</td>
              </tr>
              <tr>
                <th>avg mute duration</th>
                <td>{volume.toFixed(3)}</td>
              </tr>
              <tr>
                <th>speed</th>
                <td>{playbackRate}</td>
              </tr>
              <tr>
                <th>avg playback speed</th>
                <td>{playbackRate}</td>
              </tr>
              <tr>
                <th>played</th>
                <td>{played.toFixed(3)}</td>
              </tr>
              <tr>
                <th>loaded</th>
                <td>{loaded.toFixed(3)}</td>
              </tr>
              <tr>
                <th>duration</th>
                <td><Duration seconds={duration} /></td>
              </tr>
              <tr>
                <th>elapsed</th>
                <td><Duration seconds={duration * played} /></td>
              </tr>
              <tr>
                <th>remaining</th>
                <td><Duration seconds={duration * (1 - played)} /></td>
              </tr>
              <tr>
                <th>true watch time</th>
                <td><Duration seconds={trueWatchTime} /></td>
              </tr>
              <tr>
                <th>pause count</th>
                <td>{pauseCount}</td>
              </tr>
              <tr>
                <th>total pause duration</th>
                <td><Duration seconds={0} /></td>
              </tr>
              <tr>
                <th>buffer count</th>
                <td>{bufferCount}</td>
              </tr>
              <tr>
                <th>total buffer duration</th>
                <td><Duration seconds={0} /></td>
              </tr>
            </tbody>
          </table> */}
        </section>
          <WebcamStreamCapture2/>
        <footer className='footer'>
          IIT Bombay's Affect Aware eTutor System
        </footer>
      </div>
    )

    // THIS SECTION DEALS WITH SENDING THE INTERACTION LOG DATA TO SERVER

  }

}

LoggingPlayer = withCookies(LoggingPlayer)

export default hot(module)(LoggingPlayer)
