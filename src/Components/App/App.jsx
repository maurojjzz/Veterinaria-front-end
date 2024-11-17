import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer'; //por alguna razón que no logro detectar, no lo está tomando//
import './styles.css';

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
    </div>
  );
}

export default App;
