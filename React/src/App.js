import React from 'react';
import HomeView from "./view/HomeView";
import LoginView from"./view/LoginView";
import ProfileView from "./view/ProfileView";
import SearchView from"./view/SearchView"
import BlackListView from "./view/BlackListView"
import GroupChatView from"./view/GroupChatView"
import { BrowserRouter,Routes, Route } from "react-router-dom"


function App() {
    return (
      //  <LoginView />
    // <HomeView />
        // <ProfileView />
     //<SearchView/>
         <BrowserRouter>
             <Routes>

                <Route path="/" element={<LoginView />} />
                <Route path="/home" element={<HomeView />} />
                 <Route path="/home/black" element={<BlackListView />} />
                 <Route path="/home/group" element={<GroupChatView />} />
                 <Route path="/profile" element={<ProfileView />} />
                 <Route path="/search" element={<SearchView />} />
             </Routes>
         </BrowserRouter>

    );
}

export default App;
