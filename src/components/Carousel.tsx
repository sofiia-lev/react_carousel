import React, { useState } from 'react';
import './Carousel.scss';

const countCarouselWidth = (itemWidth: number, frameSize: number) => {
  return itemWidth * frameSize;
};

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [visibleImages, setVisibleImages] = useState(0);
  const offset = visibleImages * itemWidth;
  const maxVisibleImages = images.length - frameSize;
  const listWidth = images.length * itemWidth;

  function handleNext() {
    if (infinite && visibleImages >= maxVisibleImages) {
      setVisibleImages(0);
    } else {
      setVisibleImages(Math.min(visibleImages + step, maxVisibleImages));
    }
  }

  function handlePrev() {
    if (infinite && visibleImages === 0) {
      setVisibleImages(maxVisibleImages);
    } else {
      setVisibleImages(prev => Math.max(prev - step, 0));
    }
  }

  return (
    <div
      className="Carousel-wrapper"
      style={{ width: `${countCarouselWidth(itemWidth, frameSize)}px` }}
    >
      <div
        className="Carousel"
        style={{ width: `${countCarouselWidth(itemWidth, frameSize)}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${listWidth}px`,
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image: string, index: number) => (
            <li key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>

        <button
          className="Carousel__btn Carousel__btn--prev"
          type="button"
          onClick={handlePrev}
          disabled={!infinite && visibleImages === 0}
        >
          {'<='}
        </button>

        <button
          className="Carousel__btn Carousel__btn--next"
          type="button"
          onClick={handleNext}
          disabled={!infinite && visibleImages === maxVisibleImages}
          data-cy="next"
        >
          {'=>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
