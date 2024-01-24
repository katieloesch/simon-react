import './App.scss';
import Game from './components/Game/Game';
import Header from './components/Header/Header';
import ContactIcons from './components/ContactIcons/ContactIcons'

function App() {
  return (
    <div className='App'>
      <Header />
      <Game />
      <ContactIcons />
    </div>
  );
}

export default App;
