import Desktop from './components/Desktop';
import './index.css';
import './App.css';

function App() {
  return (
    <div className="desktop-root">
      <div className="desktop-frame">
        <div className="desktop-frame-inner">
          <Desktop />
        </div>
      </div>

      {/* NOTE: petit message temporaire en bas de l'écran — facile à supprimer */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 40,
          color: 'rgba(255, 255, 255, 0.8)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        Je t'aime Sophie ! :)
      </div>
    </div>
  );
}

export default App;
