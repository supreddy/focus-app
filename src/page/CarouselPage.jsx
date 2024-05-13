// import React, { useState } from 'react'; 
import { Document, Page,pdfjs } from 'react-pdf'; 
import { auth } from '../firebase';
import axios from "axios";
import { register } from 'swiper/element/bundle';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const url = 
"https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"

export default function CarouselPage() { 
	
    pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
    const [numPages, setNumPages] = useState(null); 
    const [pageNumber, setPageNumber] = useState(1); 

    /*To Prevent right click on screen*/
    document.addEventListener("contextmenu", (event) => { 
      event.preventDefault(); 
    }); 
      
    /*When document gets loaded successfully*/
    function onDocumentLoadSuccess({ numPages }) { 
      setNumPages(numPages); 
      setPageNumber(1); 
    } 

    function changePage(offset) { 
      setPageNumber(prevPageNumber => prevPageNumber + offset); 
    } 

    function previousPage() { 
      changePage(-1); 
    } 

    function nextPage() { 
      changePage(1); 
    } 

    register();
    return ( 
      //** Added this code for Carousel using swiper Carousel for reference url :: https://swiperjs.com/demos*/
      <> 
        <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={'true'}
        autoplay={{
          delay:8000,
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
      >
        <SwiperSlide>
          <img src="karousel_images\karousel_image_01.jpeg"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="karousel_images\karousel_image_02.jpeg"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="karousel_images\karousel_image_03.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="karousel_images\karousel_image_04.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="karousel_images\karousel_image_03.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="karousel_images\karousel_image_02.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="karousel_images\karousel_image_01.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="karousel_images\karousel_image_04.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="karousel_images\karousel_image_02.jpeg" />
        </SwiperSlide>
      </Swiper>
      
      
      
      {/* <div className="main"> 
      <Document 
        file={url} 
        onLoadSuccess={onDocumentLoadSuccess} 
      > 
        <Page pageNumber={pageNumber} /> 
      </Document> 
      <div> 
        <div className="pagec"> 
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} 
        </div> 
        <div className="buttonc"> 
        <button 
          type="button"
          disabled={pageNumber <= 1} 
          onClick={previousPage} 
          className="Pre"
        > 
        Previous 
        </button> 
        <button 
          type="button"
          disabled={pageNumber >= numPages} 
          onClick={nextPage} 
        > 
        Next 
        </button> 
        </div> 
      </div> 
      </div>  */}
      </> 
    ); 
}
