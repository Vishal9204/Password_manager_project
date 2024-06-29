import React from 'react';
import Home from './home/Home';
import Contact from './contact/Contact'
import About from './about/About'

import { Route , Routes } from 'react-router-dom';

function App() {
    return (
        <>
        <Routes>
            <Route path = "/" element = {<Home />}></Route>
            <Route path = "/contact" element = {<Contact />}></Route>
            <Route path = "/about" element = {<About />}></Route>
        </Routes>
        </>
    );
}

export default App;
