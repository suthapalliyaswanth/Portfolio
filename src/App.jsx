import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import './styles.css';

function App() {
  return (
    <div className="portfolio-layout">
      <LeftPane />
      <RightPane />
    </div>
  );
}

export default App;