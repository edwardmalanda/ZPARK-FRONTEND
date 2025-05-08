import { Carousel } from 'antd';



const imageUrls = [
  "/trucks/T2.jpg" ,
  "/trucks/T3.jpg", 
  "/trucks/T4.jpg" ,
      ];
  

  export const MySlideshow: React.FC = () => {
    return (
      <Carousel autoplay>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Slide ${index + 1}`} 
            style={{ width: '1800px', height: '800px' }} />
          </div>
        ))}
      </Carousel>
    );
  };
  

  