import { auth } from '../firebase';
import axios from "axios";
import { register } from 'swiper/element/bundle';
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';


export default function CarouselPage() { 
  const [images, setImages] = useState([])

  useEffect(() => {
    const token = auth.currentUser.getIdToken().then((token) => {
      // Write Axios Request here
      // Add the authorization header here
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      axios.get("https://blinkinvoice-backend.vercel.app/invoicetemplates", config)
      .then((response) => {
          // handle the response
          setImages(response.data);
      });
    });
  })

  //console.log(images);

    /*To Prevent right click on screen*/
    document.addEventListener("contextmenu", (event) => { 
      event.preventDefault(); 
    }); 
      

    register();

    return (
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={'true'}
          autoplay={{
            delay:5000,
            disableOnInteraction:false
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          onClick={() => console.log('click')}
        >
        {
          images.map( (image, index) => { 
            return (
              <>
              <SwiperSlide key={index}>
                <img src={image.img}/>
              </SwiperSlide>
              </>
            )
          })
        }
        </Swiper>
    )
}
