import React from "react";


const Leaderboard =(props)=>{

    const {leaderboard} = props;

    return <div className='leaderboard-container'>
        <h1 className="leaderboard-title">Leaderboard</h1>
        <div className="leaderboard">
        { <ol className="leaderBoard-list">
                {leaderboard.map((entry)=>{
                    return <li className="leaderboard-entry" key={entry.id}>
                        <p>{entry.username} - {entry.time}</p>
                    </li>
                })}
            </ol>}
        </div>
    </div>

}

export default Leaderboard;