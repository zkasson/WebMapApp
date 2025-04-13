import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import AwesomeComponent from '../components/AwesomeComponent'

export default function AwesomePage() {
  return (
        <>
        <HeaderComponent/>
            <div>
                <AwesomeComponent  message="You're Awesome!"> Click this button to brighten your day!</AwesomeComponent>
            </div>
        </>
  );
}
