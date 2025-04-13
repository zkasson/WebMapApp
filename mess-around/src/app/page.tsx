import HeaderComponent from './components/HeaderComponent';  
import CountPage from './components/CountComponent'; // Import the ListComponent to show the climbs
import { ClimbProvider } from './api/apiDisplayClimbs';

export default function WelcomePage() {
  return (
    <>
      <HeaderComponent />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      </div>
    </>
  );
}