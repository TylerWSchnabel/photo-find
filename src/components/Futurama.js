import { getDefaultNormalizer } from "@testing-library/react"
import React from "react";
import Future from './Files/futurama.jpg'
import Fischoeder from'./Files/MrFischoeder-bobs.webp'
import Harold from './Files/HaroldCranwinkle-bobs.png'
import Ron from './Files/Ron-bobs.png'



const Futurama = (props) => {
    const {openPop} = props
    const fischoeder = [671, 676];
    const harold = [291, 793];
    const ron = [1216, 726];
    return (  
        <div >
            <div className="legend">
                <p className="instructions">Find :</p>
                <img src={Fischoeder} alt="Mr. Fischoeder" className="legendImg"/>
                <p className="findItem">Mr. Fischoeder</p>
                <img src={Harold} alt="Harold Cranwinkle" className="legendImg"/>
                <p className="findItem">Harold</p>
                <img src={Ron} alt="ron" className="legendImg"/>
                <p className="findItem">Ron</p>
            </div>
            <img src={Future} alt="Futurama" className="heroPhoto" id="futuramaPhoto" onClick={()=>{openPop('futurePop')}}/>
            <div className="pop-up" id="futurePop">
                <button className="popBtn" id="fischoeder">Mr Fischoeder</button>
                <button className="popBtn" id="harold">Harold Cranwinkle</button>
                <button className="popBtn" id="ron">Ron</button>
            </div>

        </div>
    )
};

export default Futurama;