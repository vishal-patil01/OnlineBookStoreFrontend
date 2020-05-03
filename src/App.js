import React from 'react';
import './App.css';
import Footer from "./components/utils/Footer";
import NavigationBar from "./components/utils/NavigationBar";

function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Footer/>
        </div>
    );
}

export default App;