import { useCallback, useState, useEffect, useRef } from 'react'

//Usage of this hooks -useState, useEffect, useCallback and useRef
//1. useState - To check the state of character, Numbers(Allowed or not), Password,len'
//2. useCallback - To memoize the function (Instead of calling this at every-render only calls when dependecy array changes)
//3. useEffect - as it dependency array changes, It will re-load the fun' in it
//(for-ex) In this case we should call the function every time if length/numberAllowed/CharacterAllow changes!

import './App.css'

function App() {

const [length,setLength]=useState(8);
const [numbersAllowed, setnumberAllowed]=useState(false);
const [charactersAllowed, setCharactersAllowed]=useState(false);
const [password, setPassword]=useState('');
const passRef=useRef(null);
//using password ref we can acces this and make changes for this field


//we can pass this directly onChange={adjusting} or we can write the call-back there it-self!
// function adjusting(e) {
//   setLength(e.target.value); 
//   console.log(e.target.value);
// }

function numbersCheck() {
  console.log("numbersCheck called");
  setnumberAllowed((prev) =>{
    console.log(prev);
    return !prev;
  })
}


//Through browser we are accessing clipboard method ans copy-pasting the things!
function copyPass() {
  window.navigator.clipboard.writeText(password);
  passRef.current?.select()

}

//Using callback hook 
const generatePassword= useCallback(()=> {
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numbersAllowed) {
    str+="0123456789";
  }
  if(charactersAllowed) {
    str+="!@#$%^&*()_+-=[]{}|;:,.<>?";
  }

  for(let i=1;i<length;i++) {
    //This randomly generated a str of size length then, rounds to the floor value
    // This function generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
    // 0.2345 * 62 ≈ 14.539
    //Math.floor(14.539) = 14
    const char=Math.floor(Math.random() * str.length +1);
    pass+=str.charAt(char);

    setPassword(pass);

  }
},[length,numbersAllowed,charactersAllowed]);


//Using useEffect hook 
//(when these dependencies changes then it will re-load)
//It's not required to explicitily mention to load only when page or certain things changes, this is why we use useEffect!
useEffect(()=>{
  generatePassword()
},[length,numbersAllowed,charactersAllowed]);



  return (
    <>
    <div className='text-white' >
      <h1 className= 'font-bold p-4 text-center text-3xl '>
      Tired of Thinking Up New Passwords?🤔 Let Us Handle It for You!🔒</h1>
      
    </div>
        {/* <h2 className='font-normal text-center'>Use this password Generator :)</h2> */}
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg  px-4 py-3 my-8 bg-gray-800 text-orange-800 font-bold'>
        <h1 className='text-white  font-bold text-center my-3'>Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passRef}
          />
          <div  onClick={copyPass} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer' >COPY</div>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=> setLength(e.target.value)}/>

            <label htmlFor='length'>Length : {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={numbersAllowed}

            // onChange={()=>{
            //   setnumberAllowed((prev)=> {
            //     return !prev;
            //   })
            // }}
            //Toggels the prev state. (false->true(vice-versa))
            onChange={numbersCheck}
            />

            <label htmlFor='numbers'>Numbers:</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={charactersAllowed}
            onChange={()=>{
              console.log("char func called!")
              setCharactersAllowed((prev)=>{
                console.log(prev);
                return !prev;
              })
            }}

            />

            <label htmlFor='characters'>Characters:</label>
          </div>
        </div>
      </div>
    <h2 className='text-center'>Hope this is helpful!</h2>
    </>
  )
}

export default App
