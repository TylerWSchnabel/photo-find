import { getDefaultNormalizer } from "@testing-library/react"
import { Link } from "react-router-dom";
import React from "react";
import Bobs from './Files/BobsBurgers.jpeg'
import Fischoeder from'./Files/MrFischoeder-bobs.webp'
import Harold from './Files/HaroldCranwinkle-bobs.png'
import Ron from './Files/Ron-bobs.png'
import Leaderboard from "./Leaderboard";


const BobsBurgers = (props) => {
    const {openPop, cordCheck, startTimer, saveTime, getLeaderboard, setSelectedLevel, leaderboard, showLeaderboard, closeLeaderboard} = props
    let fischoeder = {x: 45, y: 64};
    let harold = {x: 19, y: 78};
    let ron = {x: 83, y: 70};
    let level = "Bob's Burgers";;
    

    const characters = [fischoeder, harold, ron]
    return (  
        <div>
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
                <img src={Fischoeder} alt="Mr. Fischoeder" className="legendImg"/>
                <p className="findItem" id="guide0">Mr. Fischoeder</p>
                <img src={Harold} alt="Harold Cranwinkle" className="legendImg"/>
                <p className="findItem" id="guide1">Harold</p>
                <img src={Ron} alt="ron" className="legendImg"/>
                <p className="findItem" id="guide2">Ron</p>
            </div>
            <img src={Bobs} alt="Bob's Burgers" className="heroPhoto" id="bobsBurgersPhoto" onClick={()=>{openPop('bobsPop')}}/>
            <div className="highlight" id="highlight"></div>
            <div className="pop-up" id="bobsPop">
                <button className="popBtn" id="fischoeder" onClick={()=>cordCheck(characters[0],'bobsPop', 0)}>Mr Fischoeder</button>
                <button className="popBtn" id="harold" onClick={()=>cordCheck(characters[1],'bobsPop', 1)}>Harold Cranwinkle</button>
                <button className="popBtn" id="ron" onClick={()=>cordCheck(characters[2],'bobsPop', 2)}>Ron</button>
            </div>
            <div id="foundPop">
                <p>All characters found! Your time is:</p>
                <div id="finishTime"></div>
                    <input id="name-input" placeholder="Name"></input>
                    <button id='submit-time' onClick={()=>saveTime("Bob's Burgers")}>Submit</button>
                <button onClick={() => window.location.reload()}>Play Again?</button>
                <button  onClick={()=>showLeaderboard("Bob's Burgers")}>Leaderboard</button>
                
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
    )
};

export default BobsBurgers;