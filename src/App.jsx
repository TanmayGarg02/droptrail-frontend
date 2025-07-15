import './App.css';
import DropForm from './components/DropForm';
import DropGallery from './components/DropGallery';

function App() {
  return (
    <div className="container">
      <h1>🌍 DropTrail</h1>
      <DropForm />
      <DropGallery />
    </div>
  );
}

export default App