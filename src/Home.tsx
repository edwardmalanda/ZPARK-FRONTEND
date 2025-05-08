// import React, { useState } from 'react';
import { MySlideshow } from './modules/dashboard/components/SlideShow';


export const Home: React.FC = () => {
 // const [isLoading, setIsLoading] = useState(true); // State to track loading state

 

  return (
    <div style={{ textAlign: 'center', overflow: 'hidden' }}>
      <h1 className='text-white bg-orange-300' style={{ fontSize: '2rem', overflow: 'hidden' }}>
      </h1>

     
      <MySlideshow />
    </div>
  );
};
