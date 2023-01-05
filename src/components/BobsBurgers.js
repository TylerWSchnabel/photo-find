import { getDefaultNormalizer } from "@testing-library/react"
import React from "react";
import Bobs from './Files/BobsBurgers.jpeg'
import Fischoeder from'./Files/MrFischoeder-bobs.webp'
import Harold from './Files/HaroldCranwinkle-bobs.png'
import Ron from './Files/Ron-bobs.png'


const BobsBurgers = (props) => {
    const {openPop, cordCheck, clickCord} = props
    const fischoeder = {x: 45, y: 64};
    const harold = {x: 19, y: 78};
    const ron = {x: 83, y: 70};

    const characters = [fischoeder, harold, ron]
    return (  
        <div >
            <div className="legend sticky">
                    <p className="homeNav">Home</p>
                <p className="instructions">Find :</p>
                <img src={Fischoeder} alt="Mr. Fischoeder" className="legendImg"/>
                <p className="findItem">Mr. Fischoeder</p>
                <img src={Harold} alt="Harold Cranwinkle" className="legendImg"/>
                <p className="findItem">Harold</p>
                <img src={Ron} alt="ron" className="legendImg"/>
                <p className="findItem">Ron</p>
            </div>
            <img src={Bobs} alt="Bob's Burgers" className="heroPhoto" id="bobsBurgersPhoto" onClick={()=>{openPop('bobsPop')}}/>
            <div className="highlight" id="highlight"></div>
            <div className="pop-up" id="bobsPop">
                <button className="popBtn" id="fischoeder" onClick={()=>cordCheck(characters[0])}>Mr Fischoeder</button>
                <button className="popBtn" id="harold" onClick={()=>cordCheck(characters[1])}>Harold Cranwinkle</button>
                <button className="popBtn" id="ron" onClick={()=>cordCheck(characters[2])}>Ron</button>
            </div>
        </div>
    )
};

export default BobsBurgers;