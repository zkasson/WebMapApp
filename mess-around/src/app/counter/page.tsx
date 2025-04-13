import HeaderComponent from '../components/HeaderComponent'; 
import Counter from '../components/CountComponent';

export default function CountPage() {
  return (
    <>
      <HeaderComponent />
      <div className="p-6">
        <Counter/>
      </div>
    </>
  );
}