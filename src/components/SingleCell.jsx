import { useState } from "react"

export function SingleCell(props){

    const {userOne,setUserOne,e,index,isGameOn,userOneFiller,setUserOneFiller,userTwoFiller,setUserTwoFiller,setIsGameOn}=props.data;

    const [flag,setFlag]=useState(true);
    const [flagTwo,setFlagTwo]=useState(true);
    
    async function handleClick() {
      if(!isGameOn && flag){
        const a=[...userOne];
        a[index]=userOneFiller;
        setUserOneFiller((e)=>e+1);
        setUserOne([...a]);
        setFlag(false);
      }
    }

    return (<>
            <div onClick={handleClick} className="w-[100px] h-[100px] border border-black flex justify-center items-center text-5xl cursor-pointer">
                {e}
            </div>
        </>)
}

// if(!isGameOn && flag){
//     setBlockData(userOneFiller);
//     setUserOneFiller((e)=>e+1);
//     setFlag(false);
// }
// if(isGameOn && flagTwo){

//     const a=[...userOne];
//     a[e]="X"
//     setUserOne([...a]);
//     setFlagTwo(false);
//     setBlockData("X");
// }
// if(userOneFiller==10 && userTwoFiller==10){
//     setIsGameOn(true);
// }