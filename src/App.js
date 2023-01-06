import './App.css';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import BobsBurgers from './components/BobsBurgers'
import SouthPark from './components/SouthPark'
import Futurama from './components/Futurama'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {

  const [mousePos, setMousePos] = useState({});
  const [clickCord, setClickCord] = useState({});
  const [newCord, setNewCord] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      /* var x = Math.round((event.pageX/event.target.scrollWidth)*100 );
      var y = Math.round((event.pageY /event.target.scrollHeight)*100); */
      var x = event.pageX;
      var y = event.pageY;
      setMousePos({ x: x, y: y});
      var a = Math.round((event.offsetX / event.target.clientWidth)*100);
      var b = Math.round((event.offsetY / event.target.clientHeight)*100);;
      setClickCord({x: a, y: b});
    };

    window.addEventListener('mousemove', handleMouseMove);
  },[]);

  const firebaseConfig = {
    apiKey: "AIzaSyABDWf6LxeTihq04tq30dvZPRe3bY941_Q",
    authDomain: "photo-find-1313.firebaseapp.com",
    projectId: "photo-find-1313",
    storageBucket: "photo-find-1313.appspot.com",
    messagingSenderId: "123475712796",
    appId: "1:123475712796:web:19142b7eb6e6f0f0bcb8d9",
    measurementId: "G-2JLM9HDG16"
  };
  
  let theCords;

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
      console.log(theCords);
    }
  }

  const cordCheck = (clicked) => {
    console.log('TheCords: '+newCord);
    console.log('clicked : ' +clicked.x +' '+clicked.y)
    console.log('cord : '+newCord.x + ' ' + newCord.y)
    let diffX = Math.abs(clicked.x-newCord.x);
    let diffY = Math.abs(clicked.y-newCord.y);
    console.log('diff : ' + diffX+' - ' + diffY);
    if ((diffX<2)&&(diffY<2)){
      console.log('correct!');
      return true;
    } else {
      console.log('wrong.');
      return false;
    }
  }

  

  return (
    <div className="App">
      <BobsBurgers openPop={openPop} cordCheck={cordCheck} clickCord={clickCord}/>
      {/* <Router basename="/photo-find">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/bobs-burgers' element={<BobsBurgers openPop={openPop}/>} />
          <Route path='/south-park' element={<SouthPark openPop={openPop}/>} />
          <Route path='/futurama' element={<Futurama openPop={openPop}/>}/>
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
