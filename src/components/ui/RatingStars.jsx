import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 0, onRate, readonly = false, size = 'md' }) => {
  const [hovered, setHovered] = useState(0);

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const currentSize = starSizes[size] || starSizes.md;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (hovered || rating) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onRate && onRate(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={`transition-transform duration-150 ${
              readonly ? 'cursor-default' : 'hover:scale-115 focus:outline-hidden cursor-pointer'
            }`}
          >
            <Star
              className={`${currentSize} transition-colors ${
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-100 text-slate-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
export default RatingStars;
