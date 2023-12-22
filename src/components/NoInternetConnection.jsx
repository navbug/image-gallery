import React, {useState, useEffect} from 'react';
import NoInternetImage from "../assets/no-internet.jpg";

const NoInternetConnection = (props) => {
    // state variable holds the state of the internet connection
    const [isOnline, setOnline] = useState(true);

    // On initization set the isOnline state.
    useEffect(()=>{
        setOnline(navigator.onLine)
    },[])

    // event listeners to update the state 
    window.addEventListener('online', () => {
        setOnline(true)
    });

    window.addEventListener('offline', () => {
        setOnline(false)
    });

    // if user is online, return the child component else return a custom component
    if(isOnline){
    return(
        props.children
    )
    } else {
        return(<div className='flex flex-col justify-center items-center'>
            <img src={NoInternetImage} alt='' height="150px" width="150px"/>
            <p className='text-center'>Connect to Internet and Try again! <span className='reload'></span></p>
        </div>)
    }
}

export default NoInternetConnection;