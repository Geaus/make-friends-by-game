import React from 'react';
import HomeView from "./view/HomeView";
import LoginView from"./view/LoginView";
import SearchView from"./view/SearchView";
import { BrowserRouter,Routes, Route } from "react-router-dom"


function App() {
    return (
       <SearchView/>
        // <BrowserRouter>
        //     <Routes>
        //
        //         <Route path="/" element={<LoginView />} />
        //         <Route path="/home" element={<HomeView />} />
        //
        //
        //     </Routes>
        // </BrowserRouter>

    );
}

export default App;
