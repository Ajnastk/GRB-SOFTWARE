import React from 'react';
import Image from 'next/image';

const TaskCard = ({ card }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-kumbh font-semibold text-global-2 line-clamp-2">
          {card.title}
        </h3>
        <button className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors">
          <Image 
            src="/images/img_akar_icons_more_horizontal.svg" 
            alt="More options" 
            width={14}
            height={14}
            className="w-4 h-4"
          />
        </button>
      </div>
      
      <p className="text-sm font-kumbh text-global-4 mb-4 line-clamp-3">
        {card.description}
      </p>
      
      <div className="inline-flex items-center bg-global-10 rounded-lg px-3 py-1 mb-4">
        <span className="text-xs font-kumbh font-medium text-global-5">
          {card.tag}
        </span>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            {card.avatars.map((avatar, index) => (
              <div key={index} className="relative w-6 h-6">
                <Image 
                  src={avatar} 
                  alt={`Team member ${index + 1}`} 
                  fill
                  className="rounded-full border-2 border-white object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-global-4 font-kumbh">
            {card.count}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-global-4">
          <Image 
            src="/images/img_uit_calender.svg" 
            alt="Calendar" 
            width={16}
            height={16}
            className="w-4 h-4"
          />
          <span className="text-xs font-kumbh">
            {card.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
