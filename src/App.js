import './App.css';
import React, { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

  return (
    <div className="App">
        <Routes>
            <Route index element={<Form />}/>
            <Route path={'product'} element={<ProductList />} />
        </Routes>
    </div>
  );
}

export default App;
