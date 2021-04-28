import React, { useState, useEffect, useCallback, useRef } from 'react'
import cn from "classnames";

function useSwipe(left, right, container) {
  const { current } = useRef({
    startX: undefined,
    startY: undefined,
    endX: undefined,
    endY: undefined,
  })


  const handleTouch = useCallback(function(cbL, cbR) {
    var xDist = current.endX - current.startX;
    var yDist = current.endY - current.startY;
    if (current.endX - current.startX < 0) {
        cbR();
    } else {
        cbL();
    }
  }, [left, right]);

  useEffect(() => {
    function touchstart(event) {
      current.startX = event.touches[0].clientX;
      current.startY = event.touches[0].clientY;
    }

    function touchend(event) {
      current.endX = event.changedTouches[0].clientX;
      current.endY = event.changedTouches[0].clientY;
      
      handleTouch(left, right)
    }

    container.current.addEventListener('touchstart', touchstart)
    container.current.addEventListener('touchend', touchend)
    return () => {
      container.current.removeEventListener('touchstart', touchstart);
      container.current.removeEventListener('touchend', touchend);
    }
  },[left, right])
}

function Carousel({ content }) {

    const [slide, setSlide] = useState(0);

    function prevSlide() {
        if (slide === 0) return;
        setSlide(current => current - 1);
    }

    function nextSlide() {
      if (slide === content.length - 1) return;
        setSlide(current => current + 1);
    }



    const container = useRef(null);

    useSwipe(prevSlide, nextSlide, container);

    const prevButtonDisabled = slide === 0;
    const nextButtonDisabled = slide === content.length - 1;

    return (
      <div ref={container} className="carousel" style={{ "--slide": slide }}>
        <button onClick={prevSlide} disabled={prevButtonDisabled} className={cn("btn", "prevBtn")}><i className="fas fa-arrow-circle-left"></i></button>
        <button onClick={nextSlide} disabled={nextButtonDisabled} className={cn("btn", "nextBtn")}><i className="fas fa-arrow-circle-right"></i></button>
        {content.map((html, index) => {
            return (
              <div
                key={index}
                className="slide"
                dangerouslySetInnerHTML={{ __html: html}}
              />
            );
        })}
      </div>
    )
}

export default Carousel
