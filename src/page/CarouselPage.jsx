import React, { useEffect, useState } from 'react'; 
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { auth } from '../firebase';
import axios from "axios";


export default function CarouselPage() { 
  const [images, setImages] = useState([])

  useEffect(() => {
    const token = auth.currentUser.getIdToken().then((token) => {
      // Write Axios Request here
      // Add the authorization header here
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      axios.get("http://localhost:1977/invoicetemplates", config)
      .then((response) => {
          // handle the response
          setImages(response.data);
      });
    });
  })

  console.log(images);

  return (
     <ImageGallery items={images} />
  );
 
}
