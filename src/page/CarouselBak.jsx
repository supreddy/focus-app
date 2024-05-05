import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { auth } from '../firebase';
import axios from "axios";

class CarouselPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: null
    }
  }

  render () {
    const { images } = this.state

    if (!images) {
      const token = auth.currentUser.getIdToken().then((token) => {
        // Write Axios Request here
        // Add the authorization header here
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        axios.get("http://localhost:1977/invoicetemplates", config)
        .then((response) => {
            // handle the response
            //console.log(response.data);
            let urls = response.data;
            return <Carousel autoPlay infiniteLoop='true'>
            {
              urls.map( image => {
                console.log(image.url);
                return <div>
                  <img src={ image.url } />
                  <p className="legend">{ image.filename }</p>
                </div>
              })
            }
            </Carousel>
        })
        .catch((error) => {
            // handle errors
            console.log(error);
            return error;
        });
      });
    }
  }
}

export default CarouselPage