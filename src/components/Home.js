import React from "react";
import BB from "./Files/BobsBurgers.jpeg";
import SP from "./Files/southpark.jpg"
import FR from "./Files/futurama.jpg";
import { Link } from "react-router-dom";

const Home = () => {

    return(
        <div className="home">
            <div className="home-head">
                <h1 className="home-title">Choose Your Level</h1>
            </div>
            <div className="levelSelect">
                <Link to='/bobs-burgers'>
                    <img src={BB} alt="Bob's Burgers" className='homeLevel'/>
                    <p className="level-name">Bob's Burgers</p>
                </Link>
                <Link to='/south-park'>
                    <img src={SP} alt="South Park" className='homeLevel'/>
                    <p className="level-name">South Park</p>
                </Link>
                <Link to='/futurama'>
                    <img src={FR} alt="Futurama" className='homeLevel'/>
                    <p className="level-name">Futurama</p>
                </Link>
            </div>
        </div>
    )

}
export default Home