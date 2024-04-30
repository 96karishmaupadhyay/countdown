import React, { useEffect, useState } from 'react'
import styles from "./countstart.module.css"
export default function CountStart() {
  const [selectedDate,setSelectedDate]=useState()
  const [count,setCount]=useState({Days:0,Hours:0,Minutes:0,Seconds:0})
  const [startTimer,setStartTimer]=useState(false)

  //handle calender change
const handleCalender=(e)=>{
setSelectedDate(e.target.value)
}
//console.log(selectedDate)
const handleTimer=()=>{
  const newDate=new Date(selectedDate).getTime()
  //console.log(newDate)
  const currentDate=new Date().getTime()
  //console.log(currentDate)
  const diff=newDate-currentDate
  //console.log(diff)
  const days=Math.floor(diff/(1000*60*60*24))
  //console.log(days)
  const remainingMSecFromDays=Math.floor(diff%(1000*60*60*24))
  const hours=Math.floor(remainingMSecFromDays/(1000*60*60))
  //console.log(hours)
  const remainingMSecFromHours=remainingMSecFromDays%(1000*60*60)
  const minutes=Math.floor(remainingMSecFromHours/(1000*60))
   //console.log(minutes)
   const remainingMSecFromMinutes=remainingMSecFromHours%(1000*60)
   const seconds=Math.floor(remainingMSecFromMinutes/(1000))
   //console.log(seconds)
   //updating count
   setCount({Days:days,Hours:hours,Minutes:minutes,Seconds:seconds})
}

const handleStart=()=>{
  if(selectedDate&&!startTimer){
    handleTimer()
    const newTimer=setInterval(()=>{
      handleTimer()
    },1000)
    setStartTimer(newTimer)
  }
}
const handleCancle=()=>{
  if(startTimer)
  clearInterval(startTimer)
  setStartTimer(false)
  setCount({Days:0,Hours:0,Minutes:0,Seconds:0})
}
  return (
    <div>
      <h1>CountDown <span className={styles.spanTimer}>Timer</span></h1>
      <div className={styles.container}>
      <div className={styles.inputBox}>
        <input type="datetime-local" name="" id="" onChange={handleCalender} 
        />
      </div>
      <div  className={styles.btnBox}>
        {/* <button onClick={handleStart}>Start</button>
        <button onClick={handleCancle}>Cancel</button> */}
        {!startTimer&&
          (<button onClick={handleStart}>Start</button>)
        }
        {startTimer&&( <button onClick={handleCancle}>Cancel</button> )}
      </div>
      <div className={styles.timerBox}>
    <div>
    <span className={styles.number}>{isNaN(count.Days) ? 0 : count.Days}</span>
      <span className={styles.text}>Days</span>
    </div>
    <div>
    <span className={styles.number}>{isNaN(count.Hours) ? 0 : count.Hours}</span>
      <span className={styles.text}>Hours</span>
    </div>
    <div> 
    <span className={styles.number}>{isNaN(count.Minutes) ? 0 : count.Minutes}</span>
      <span className={styles.text}>Minutes</span></div>
    <div> 
    <span className={styles.number}>{isNaN(count.Seconds) ? 0 : count.Seconds}</span>
      <span className={styles.text}>Seconds</span></div>
      </div>
      </div>
    </div> 
  )
}

