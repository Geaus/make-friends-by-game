import React from 'react';
import HomeView from "./view/HomeView";
import LoginView from"./view/LoginView";
import ProfileView from "./view/ProfileView";
import SearchView from"./view/SearchView"
import BlackListView from "./view/BlackListView"
import GroupChatView from"./view/GroupChatView"
import ActivityView from "./view/ActivityView";
import ReportView from "./view/ReportView";
import HelpView from "./view/HelpView";
import AdminView from "./view/AdminView";
import SettingsView from "./view/SettingsView";
import { BrowserRouter,Routes, Route } from "react-router-dom"
import ContactView from "./view/ContactView";


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
                 {/*<Route path="/home/black" element={<BlackListView />} />*/}
                 {/*<Route path="/home/group" element={<GroupChatView />} />*/}
                 <Route path="/profile" element={<ProfileView />} />
                 <Route path="/settings" element={<SettingsView />} />
                 <Route path="/search" element={<SearchView />} />
                 <Route path="/report" element={<ReportView />} />
                 <Route path="/activity" element={<ActivityView />} />
                 <Route path="/help" element={<HelpView />} />
                 <Route path="/admin" element={<AdminView />} />
                 <Route path="/contact" element={<ContactView/>} />
             </Routes>
         </BrowserRouter>

    );
}

export default App;
