import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './components/Home';
import BobsBurgers from './components/BobsBurgers'
import SouthPark from './components/SouthPark'
import Futurama from './components/Futurama'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import uniqid from 'uniqid';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  query,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  orderBy
} from 'firebase/firestore';
import 'firebase/firestore';


function App() {

  

  const [mousePos, setMousePos] = useState({});
  const [clickCord, setClickCord] = useState({});
  const [newCord, setNewCord] = useState({});
  const [char, setChar] = useState([false, false, false]);
  const [timeStart, setTimeStart] = useState();
  const [compTime, setCompTime] = useState();
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("Bob's Burgers");

  let timeEnd;
  let time;

  useEffect(() => {
    const handleMouseMove = (event) => {
      var x = event.pageX;
      var y = event.pageY;
      setMousePos({ x: x, y: y});
      var a = Math.round((event.offsetX / event.target.clientWidth)*100);
      var b = Math.round((event.offsetY / event.target.clientHeight)*100);;
      setClickCord({x: a, y: b});
    };
    window.addEventListener('mousemove', handleMouseMove);
  },[]);

  useEffect(()=>{
    setCompTime(time);
  },[time])

  const firebaseConfig = {
    apiKey: "AIzaSyABDWf6LxeTihq04tq30dvZPRe3bY941_Q",
    authDomain: "photo-find-1313.firebaseapp.com",
    projectId: "photo-find-1313",
    storageBucket: "photo-find-1313.appspot.com",
    messagingSenderId: "123475712796",
    appId: "1:123475712796:web:19142b7eb6e6f0f0bcb8d9",
    measurementId: "G-2JLM9HDG16"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const analytics = getAnalytics(app);
  let theCords;

  const charFound = (pos) =>{
    let arr = char;
    arr[pos] = true;
    setChar(arr);
  }

  const openPop = (id) => {
    const pop = document.getElementById(id);
    const highlight = document.getElementById('highlight');
    if (pop.style.display === 'grid'){
      pop.style.display = 'none';
      highlight.style.display ="none";
    } else {
      pop.style.display = 'grid';
      highlight.style.display = 'inline-block';
      pop.style.left = mousePos.x + 50 +'px';
      pop.style.top = mousePos.y - 40 + 'px';
      highlight.style.left = mousePos.x - 35 + 'px';
      highlight.style.top = mousePos.y -35  + 'px';
      theCords= {x: clickCord.x, y: clickCord.y}
      setNewCord(theCords);
    }
  }

  const cordCheck = (clicked, id, pos) => {
    const pop = document.getElementById(id);
    const highlight = document.getElementById('highlight');
    const label = document.getElementById('guide'+pos);
    let diffX = Math.abs(clicked.x-newCord.x);
    let diffY = Math.abs(clicked.y-newCord.y);
    pop.style.display = 'none';
    highlight.style.display ="none";
    if ((diffX<2)&&(diffY<2)){
      clicked.found = true;
      charFound(pos);
      allFound();
      foundPop();
      label.style.textDecoration = 'line-through';
      return true;
    } else {
      console.log('wrong.');
      return false;
    }
    
  }

  const resetChar = () => {
    setChar([false,false,false])
  }

  

  const allFound = () => {
    let found = true;
    for (let i=0; i<char.length; i++){
      if (char[i] !== true) {
        found = false;
      }
    }
    return found;
  };

  const foundPop = () => {
    if (allFound() === true){
      document.getElementById('foundPop').style.display = 'grid';
      document.getElementById('timerBG').style.display = 'block';
      endTimer();
      getTime();
      document.getElementById('finishTime').textContent = time;
    }
  }

  const startTimer = () => {
    resetChar();
    setTimeStart(Date.now());
    document.getElementById('timerBox').style.display = 'none';
    document.getElementById('timerBG').style.display = 'none';
    document.getElementById('legend').style.display ='grid';
  }
  
  const endTimer = () => {
    timeEnd = Date.now();
  }
  
  const getTime =()=> {
    time=((timeEnd - timeStart)/1000);
    setCompTime(time);
    return time;
  }

  let username;

  const getUsername =()=>{
    username = document.getElementById('name-input').value;
  }

  async function saveTime(level){
    getUsername();
    time=((timeEnd - timeStart)/1000);
    try{
      await setDoc(doc(db,level,username),{
        time: compTime,
        name: username,
        id: uniqid()
      });
    }
    catch(error){
      console.log('Error saving time to Database',error);
    }
    document.getElementById('submit-time').disabled = true;
  }

  const getLeaderboard = (level) => {
    const leaders = query(collection(db, level));
    const leaderboardARR = []
    const list = query(leaders, orderBy("time"));
    setSelectedLevel(level);
    onSnapshot(list, function(snapshot) {
    
      snapshot.docChanges().forEach(function(change) {
          var entry = change.doc.data();
          leaderboardARR.push({
            username: entry.name,
            time: entry.time,
            level: level,
            id: entry.id
          })
    })})
  setLeaderboard(leaderboardARR);
  return leaderboard;
  }

  function showLeaderboard(){

      let div = document.getElementById('leaderboard-container');
      let pop = document.getElementById('foundPop');
    
      pop.style.display = "none";
      div.style.display = "grid";

  }
  const closeLeaderboard =()=>{
    let div = document.getElementById('leaderboard-container');
    
    div.style.display="none";
    document.getElementById('foundPop').style.display = 'grid';
  }

  const playAgain =()=>{
    resetChar();
    document.getElementById('guide0').style.textDecoration="none"
    document.getElementById('guide1').style.textDecoration="none"
    document.getElementById('guide2').style.textDecoration="none"
    document.getElementById('foundPop').style.display = "none";
    document.getElementById('timerBox').style.display = 'grid';
    document.getElementById('timerBG').style.display = 'flex';
    document.getElementById('legend').style.display ='none';

  }

  return (
    <div className="App">
      {/* <BobsBurgers openPop={openPop} cordCheck={cordCheck} clickCord={clickCord} startTimer={startTimer}/> */}
      <Router basename="/photo-find">
        <Routes>
          <Route path='/' element={<Home leaderboard={leaderboard} getLeaderboard={getLeaderboard} setSelectedLevel={setSelectedLevel}/>}/>
          <Route path='/bobs-burgers' element={<BobsBurgers openPop={openPop} cordCheck={cordCheck} clickCord={clickCord} startTimer={startTimer} saveTime={saveTime}  getLeaderboard={getLeaderboard} leaderboard={leaderboard} setSelectedLevel={setSelectedLevel} showLeaderboard={showLeaderboard} closeLeaderboard={closeLeaderboard} playAgain={playAgain}/>} />
          <Route path='/south-park' element={<SouthPark openPop={openPop} cordCheck={cordCheck} clickCord={clickCord} startTimer={startTimer} saveTime={saveTime} getLeaderboard={getLeaderboard} leaderboard={leaderboard} setSelectedLevel={setSelectedLevel} showLeaderboard={showLeaderboard} closeLeaderboard={closeLeaderboard} playAgain={playAgain}/>}/>
          <Route path='/futurama' element={<Futurama openPop={openPop} cordCheck={cordCheck} clickCord={clickCord} startTimer={startTimer} saveTime={saveTime} getLeaderboard={getLeaderboard} leaderboard={leaderboard} setSelectedLevel={setSelectedLevel} showLeaderboard={showLeaderboard} closeLeaderboard={closeLeaderboard} playAgain={playAgain}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
