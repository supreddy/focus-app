import React from 'react';
import { useRef, useState } from 'react';
import { usePdf } from '@mikecousins/react-pdf';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { auth } from '../firebase';
import axios from "axios";

const CarouselPage = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  let images = null;

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

          urls.map( image => {
            console.log(image.url);
            const { pdfDocument } = usePdf({
              file: image.url,
              page,
              canvasRef,
              scale: 0.4,
            });
          
            const previousDisabled = page === 1;
            const nextDisabled = Boolean(page === pdfDocument?.numPages);


            return <div className="w-full flex flex-col">
              <div className="bg-gray-100">
                <div className="container text-center py-12 mx-auto flex">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-center">
                      <button
                        disabled={previousDisabled}
                        onClick={() => setPage(page - 1)}
                        className={clsx(previousDisabled && 'text-gray-300')}
                      >
                        <ArrowLeftCircleIcon className="h-12 w-12" />
                      </button>
                    </div>
                  </div>
                  <div>
                    {!pdfDocument && <span>Loading...</span>}
                    <canvas ref={canvasRef} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-center">
                      <button
                        disabled={nextDisabled}
                        onClick={() => setPage(page + 1)}
                        className={clsx(nextDisabled && 'text-gray-300')}
                      >
                        <ArrowRightCircleIcon className="h-12 w-12" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })
      })
      .catch((error) => {
          // handle errors
          //console.log(error);
          return error;
      });
    });
  }
}

export default CarouselPage