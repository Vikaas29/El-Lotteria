import { useState } from "react"

export function SingleCellTwo(props){

    const {userTwo,setUserTwo,userOne,setUserOne,e,index,isGameOn,userOneFiller,setUserOneFiller,userTwoFiller,setUserTwoFiller,setIsGameOn}=props.data;
    
    const [flag,setFlag]=useState(true);
    const [flagTwo,setFlagTwo]=useState(true);
    
    async function handleClick() {
      if(!isGameOn && flag){
        const a=[...userTwo];
        a[index]=userTwoFiller;
        setUserTwoFiller((e)=>e+1);
        setUserTwo([...a]);
        setFlag(false)
      }
    }

    return (<>
            <div onClick={handleClick} className="w-[100px] h-[100px] border border-black flex justify-center items-center text-5xl cursor-pointer">
                {e}
            </div>
        </>)
}