'use client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

import React, { useState } from 'react'
interface AwesomeProps{
    children:string;
    message:string;
}




function AwesomeComponent({children,message}:AwesomeProps) {
    const [alertVisability, setalertVisability] = useState<boolean>(false);

    function HandleClick() {
        setalertVisability(true); // Ensure the alert becomes visible again when the button is clicked
        console.log({ message });
    
    }

    function handleCloseAlert() {
  setalertVisability(false); // Hide the alert when the close button is clicked
}
        
    return (
        <div>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg border border-blue-700 hover:bg-blue-600 transition duration-200" 
            onClick={HandleClick}>{children}</button>  
            {alertVisability && (
                <Alert variant="blue">
                <div className="flex justify-between items-center">
                    <div>
                    <AlertTitle>Info</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                    </div>
                    
                    <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={handleCloseAlert}
                    >
                    X
                    </button>
                    
                </div>
                </Alert>
            )}
        </div>
    )
}

export default AwesomeComponent