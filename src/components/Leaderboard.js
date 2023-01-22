import React from "react";


const Leaderboard =(props)=>{

    const {leaderboard,selectedLevel, getLeaderboard} = props;

    getLeaderboard(selectedLevel);

    return <div className='leaderboard-container'>
        <h1 className="leaderboard-header">{selectedLevel} Leaderboard</h1>
        <div className="leaderboard">
            <ul className="leaderboard-titles">
                <div className="labels">
                    <p className="leader-label">Name</p>
                    <p className="leader-label">Time</p>
                </div>
            </ul>
        { <ol className="leaderBoard-list">
                {leaderboard.map((entry)=>{
                    return <li className="leaderboard-entry" key={entry.id}>
                        <div className="leader-line">
                            <p>{entry.username}</p>
                            <p>{entry.time}</p>
                        </div>
                    </li>
                })}
            </ol>}
        </div>
    </div>

}

export default Leaderboard;