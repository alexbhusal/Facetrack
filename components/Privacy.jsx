import React from 'react';
import { PrivacyData } from '../util/Listitems';

const Privacy = () => {
  return (
    <div className="h-full mt-10 px-4" data-aos="flip-up">
      <h1 className='text-2xl md:text-3xl font-semibold text-center mb-5'>
        Security and Privacy Assurance
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-2 p-0 w-full max-w-screen-xl mx-auto overflow-hidden">
        {PrivacyData.map((item, index) => (
          <div key={index} className="h-auto border-2 border-black rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 break-words">
            <h1 className='text-center text-blue-500 text-xl md:text-2xl font-bold p-3'>
              {item.title}
            </h1>
            <h2 className='text-start text-lg md:text-xl font-semibold p-2'>
              {item.discription}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Privacy;
