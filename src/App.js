import React from 'react';
import './App.css';
import Footer from "./components/utils/Footer";
import DefaultRoutes from "./route/RouterSwitch";

function App() {
    return (
        <div className="App">
            <DefaultRoutes/>
            <Footer/>
        </div>
    );
}

export default App;