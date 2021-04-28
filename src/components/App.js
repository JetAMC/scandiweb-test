import React from 'react'
import Carousel from "./Carousel"
import data from "../data.json";

function App() {
  return (
    <div>
      <div className="title">
        <h2>React responsive carousel</h2>
      </div>
      <div className="carousel-area">
        <Carousel content={data} />
      </div>
    </div>
  );
}

export default App;
