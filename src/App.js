import './App.css';
import React, { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import Form from './components/Form/Form';

function App() {
    const { onToggleButton, tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

  return (
    <div className="App">
        <Form />
    </div>
  );
}

export default App;
