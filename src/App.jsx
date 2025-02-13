import { useState } from 'react'
import './App.css'
import { SingleCell } from './components/SingleCell';
import { SingleCellTwo } from './components/SingleCellTwo';

function App() {
 
  const [userOne,setUserOne]=useState([0,0,0,0,0,0,0,0,0]);
  const [userTwo,setUserTwo]=useState([0,0,0,0,0,0,0,0,0]);
  const[userOneFiller,setUserOneFiller]=useState(1);
  const[userTwoFiller,setUserTwoFiller]=useState(1);
  const[userNumber,setUserNumber]=useState(1);
  const [lock,setLock]=useState(false);

  const [gameId,setGameId]=useState(null);

  const [rolled,setRolled]=useState(null);

  const [isGameOn,setIsGameOn]=useState(false);

  const [turn, setTurn]=useState(true);

  function handleRoll() {
    if(isGameOn){
      setLock(true);
      const value=Math.floor(Math.random() * 9) + 1;
      setRolled(value);
      if(turn){
        const a=[...userOne];
          const b=a.findIndex((e)=>e==value);
          if(b==-1){
          setTurn(e=>!e);
          setUserNumber(2);
          setLock(false);
          return
          }
          a[b]="X"
          setUserOne([...a]);
          handleDataChangesandVictory(a);
          setTurn(e=>!e);
          setUserNumber(2);
      }
      else{
        const a=[...userTwo];
          const b=a.findIndex((e)=>e==value);
          if(b==-1){
            setTurn(e=>!e);
            setUserNumber(1);
            setLock(false);
            return
            }
          a[b]="X"
          
          setUserTwo([...a]);
          handleDataChangesandVictory(a);
          setTurn(e=>!e);
          setUserNumber(1);
      }
    }
  }
  function startGame(){
    if(userOneFiller==10&&userTwoFiller==10){
      saveUserData();
      setIsGameOn(true);
    }
  }
  function handleReset(){
    setIsGameOn(false);
    setUserOne([0,0,0,0,0,0,0,0,0]);
    setUserTwo([0,0,0,0,0,0,0,0,0]);
    setUserOneFiller(1);
    setUserTwoFiller(1);
    setUserNumber(1);
  }

  async function saveUserData() {
    try {
      const response=await fetch("https://el-lotteria.vercel.app/saveset",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            "userOne":userOne,
            "userTwo":userTwo
        })
    });
    const result=await response.json()
    setGameId(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDataChangesandVictory(a) {
    try {

      const response=await fetch("https://el-lotteria.vercel.app/changeandcheck",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            "_id":gameId,
            "array":a,
            "userNum":userNumber
        })
    });
    const result=await response.json()
      if(result.victory==true){
        alert(`${result.victor} Won`);
        setLock(true);
      }
      else{
        setLock(false);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <div className='w-[100%] h-[95vh]  flex justify-center items-center gap-20 '>

        <div className='flex flex-col gap-20'>
          <div className='w-[300px] h-[300px] flex flex-wrap'>
            {userOne.map((e,index)=><SingleCell key={index} data={{userTwo,index,setUserTwo,userOne,setUserOne,e,isGameOn,userOneFiller,setUserOneFiller,userTwoFiller,setUserTwoFiller,setIsGameOn}}></SingleCell>)}
          </div>
          <div className='w-[300px] h-[300px] flex flex-wrap'>
            {userTwo.map((e,index)=><SingleCellTwo key={index} data={{userTwo,setUserTwo,userOne,setUserOne,e,index,isGameOn,userOneFiller,setUserOneFiller,userTwoFiller,setUserTwoFiller,setIsGameOn}}></SingleCellTwo>)}
          </div>
        </div>


        <div className=' flex flex-col gap-10 text-center'>
        {
          !isGameOn ? <div onClick={startGame} className='border border-black cursor-pointer  p-2 text-2xl font-bold rounded-2xl '>Start</div> : 
          <>
          <button disabled={lock} onClick={()=>{handleRoll()}} className='border border-black cursor-pointer  p-2 text-2xl font-bold rounded-2xl '>{`User ${userNumber}: Roll`}</button>
        
           <div className='text-2xl '> Last Rolled :  {rolled}</div></>
        }

        <div onClick={handleReset} className='border border-black cursor-pointer  p-2 text-2xl font-bold rounded-2xl '>RESET</div>

        </div>
      </div>
    </>
  )
}

export default App
