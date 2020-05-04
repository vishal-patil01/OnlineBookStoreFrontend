import React from 'react';
import './App.css';
import Footer from "./components/utils/Footer";
import AddBook from "./components/admin/AddBook";

function App() {
    return (
        <div className="App">
            <AddBook/>
            <Footer/>
        </div>
    );
}

export default App;