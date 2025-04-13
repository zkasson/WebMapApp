'use client'
import { MouseEvent, useState } from 'react'
import React from 'react'

interface ListGroupProps {
    activities:string[];
    heading:string;
    onSelectActivity:(item:string ) => void;
}

function FunListComponent({activities,heading,onSelectActivity}:ListGroupProps) {
    
    
    //Event Handler
    const handleClick = (event:MouseEvent) => console.log("Coordinates of click:  " + event.clientX,event.clientY);

    // State handler 
    const [selectedIndex,setSelectedIndex] = useState(-1);

  return (
    <>  
        <h1>List of things I like:</h1>
        <ul className='list-group'>
            {activities.map((activity,index) =>  (
                <li 
                className={`p-3 rounded-lg cursor-pointer transition duration-200 ${
                    selectedIndex === index ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  }`}
                key={activity} 
                onClick={(event) => {
                  handleClick(event);
                  setSelectedIndex(index);
                  onSelectActivity(activity)
                }}
              >
                {activity}
              </li>
            ))}
        </ul>
    </>
  )
}

export default FunListComponent