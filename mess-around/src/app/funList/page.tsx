'use client'
import FunListComponent from '../components/FunListComponent';
import HeaderComponent from '../components/HeaderComponent'; 

export default function ListPage() {
  const activities = [
          'Climbing',
          'Reading',
          'Hiking',
          'Yoga',
          'Exercising',
          'Coffee',
          'Loving Kate'
      ]
  const handleSelectActivity = (activity:string ) => {
    console.log(activity)
  }
  return (
    <>
      <HeaderComponent />
      <div className="p-6">
        <FunListComponent activities={activities} heading='Activities' onSelectActivity={handleSelectActivity}/> 
      </div>
    </>
  );
}