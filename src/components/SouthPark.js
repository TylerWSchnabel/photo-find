import { getDefaultNormalizer } from "@testing-library/react"
import React from "react";
import { Link } from "react-router-dom";
import SouthParkPhoto from './Files/southpark.jpg'
import Gnome from'./Files/gnome.png'
import Shelley from './Files/Shelly.webp'
import Al from './Files/Al-gore.webp'
import { click } from "@testing-library/user-event/dist/click";



const SouthPark = (props) => {
    const {openPop, cordCheck, startTimer, saveTime, getLeaderboard} = props
    const underpantsGnome = {x: 35, y: 66};
    const alGore = {x: 84, y: 40};
    const shelley = {x: 7, y: 49};
    const characters = [underpantsGnome, alGore, shelley]
    return (  
        <div className="futurama">
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
                <img src={Gnome} alt="Underpants Gnome" className="legendImg"/>
                <p className="findItem" id="guide0">Underpants Gnome</p>
                <img src={Al} alt="Al Gore" className="legendImg"/>
                <p className="findItem" id="guide1">Al Gore</p>
                <img src={Shelley} alt="shelley" className="legendImg"/>
                <p className="findItem" id="guide2">Shelley</p>
            </div>
            <img src={SouthParkPhoto} alt="South Park" className="heroPhoto" id="south-parkPhoto" onClick={()=>{openPop('bobsPop')}}/>
            <div className="highlight" id="highlight"></div>
            <div className="pop-up" id="bobsPop">
                <button className="popBtn" id="underpantsGnome" onClick={()=>cordCheck(characters[0],'bobsPop', 0)}>Underpants Gnome</button>
                <button className="popBtn" id="alGore" onClick={()=>cordCheck(characters[1],'bobsPop', 1)}>Al Gore</button>
                <button className="popBtn" id="shelley" onClick={()=>cordCheck(characters[2],'bobsPop', 2)}>Shelley</button>
            </div>
            <div id="foundPop">
                <p>All characters found! Your time is:</p>
                <div id="finishTime"></div>
                    <input id="name-input" placeholder="Name"></input>
                    <button id='submit-time' onClick={()=>saveTime("South Park")}>Submit</button>
                <button onClick={() => window.location.reload()}>Play Again?</button>
                <Link to='/leaderboard'>
                    <button className="leaderBtn" onClick={()=>getLeaderboard("South Park")}>Leaderboard</button>
                </Link>  
            </div>
        </div>
    )
};

export default SouthPark;