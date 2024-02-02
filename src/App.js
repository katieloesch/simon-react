import './App.scss';
import Game from './components/Game/Game';
import Header from './components/Header/Header';
import ContactIcons from './components/ContactIcons/ContactIcons'
import { useState } from 'react';

function App() {

  const [mute, setMute] = useState(false)
  const [strict, setStrict] = useState(true)
  return (
    <div className='App'>
      <Header mute={mute} strict={strict} setMute={setMute} setStrict={setStrict} />
      <Game mute={mute} strict={strict} />
      <ContactIcons />
    </div>
  );
}

export default App;
