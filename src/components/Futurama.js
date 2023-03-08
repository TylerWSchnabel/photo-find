import { getDefaultNormalizer } from "@testing-library/react"
import React from "react";
import { Link } from "react-router-dom";
import Future from './Files/futurama.jpg'
import Zapp from'./Files/Zapp.webp'
import Beelzebot from './Files/Beelzebot.webp'
import Elzar from './Files/Elzar.webp'
import { useEffect } from "react";



const Futurama = (props) => {
    const {openPop, cordCheck, startTimer, saveTime, getLeaderboard, leaderboard, showLeaderboard, closeLeaderboard, playAgain} = props
    const zapp = {x:15, y: 61};
    const beelzebot = {x: 46, y: 46};
    const elzar = {x: 75, y: 84};
    const characters = [zapp, beelzebot, elzar]

    useEffect(()=>{
        getLeaderboard("Futurama");
    },[])

    let level = "Futurama";

    useEffect(()=>{
        getLeaderboard("Futurama")
      },[])
    

    return (  
        <div className="level">
            <div className="rotate">Please rotate device to play the game.</div>
            <div className="gameBoard">
                <div id="timerBG"></div>
                <div id='timerBox'>
                    <button className="timerBtn" onClick={()=>startTimer()}>Start Timer?</button>
                    <Link to='/'>
                        <button className="timerBtn">Home</button>
                    </Link>
                </div>
                <div id="legend">
                    <Link to='/'>
                        <p className="nav-label">Home</p>
                    </Link>
                    <p className="instructions">Find :</p>
                    <img src={Zapp} alt="Mr. Fischoeder" className="legendImg"/>
                    <p className="findItem" id="guide0">Zapp Brannigan</p>
                    <img src={Beelzebot} alt="Beelzebot" className="legendImg"/>
                    <p className="findItem" id="guide1">Beelzebot</p>
                    <img src={Elzar} alt="elzar" className="legendImg"/>
                    <p className="findItem" id="guide2">Elzar</p>
                </div>
                <img src={Future} alt="Futurama" className="heroPhoto" id="futuramaPhoto" onClick={()=>{openPop('bobsPop')}}/>
                <div className="highlight" id="highlight"></div>
                <div className="pop-up" id="bobsPop">
                    <button className="popBtn" id="zapp" onClick={()=>cordCheck(characters[0],'bobsPop', 0)}>Zapp Brannigan</button>
                    <button className="popBtn" id="beelzebot" onClick={()=>cordCheck(characters[1],'bobsPop', 1)}>Beelzebot</button>
                    <button className="popBtn" id="elzar" onClick={()=>cordCheck(characters[2],'bobsPop', 2)}>Elzar</button>
                </div>
                <div id="foundPop">
                    <p>All characters found! Your time is:</p>
                    <div id="finishTime"></div>
                    <input id="name-input" placeholder="Name"></input>
                    <button id='submit-time' onClick={()=>saveTime("Futurama")}>Submit</button>
                    <div className="gameEndBtns-container">
                        <button className="gameEndBtns" onClick={() => playAgain()}>Play Again?</button>
                        <button className="gameEndBtns"  onClick={()=>showLeaderboard("Futurama")}>Leaderboard</button>
                    </div>
                </div>
                <div id='leaderboard-container'>
                    <h1 className="leaderboard-header">{level} Leaderboard</h1>
                    <div className="leaderboard">
                        <ul className="leaderboard-titles">
                            <div className="labels">
                                <p className="leader-label">Name</p>
                                <p className="leader-label">Time</p>
                            </div>
                        </ul>
                    <ol className="leaderBoard-list">
                            {leaderboard.map((entry)=>{
                                return <li className="leaderboard-entry" key={entry.id}>
                                    <div className="leader-line">
                                        <p>{entry.username}</p>
                                        <p>{entry.time}</p>
                                    </div>
                                </li>
                            })}
                        </ol>
                    </div>
                    <div className="leaderBtn-container">
                        <button className="leaderBtn" onClick={()=>closeLeaderboard()}>Close</button>
                        <Link to='/'>
                            <button className="leaderBtn">Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Futurama;