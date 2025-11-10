import { useState, useEffect } from "react";

const useFetchGalleryData = (url) => {
  const [galleryData, setGalleryData] = useState(
    []
  );
  const [carouselData, setCarouselData] =
    useState([]);
  const [eventsData, setEventsData] = useState(
    []
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Check if we're online
      if (!navigator.onLine) {
        setError(new Error('No internet connection'));
        setLoading(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.log('Request timeout after 10 seconds');
      }, 10000);

      try {
        console.log('Fetching data from:', url);
        
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Explicitly set CORS mode
        });

        clearTimeout(timeoutId);

        console.log('Response status:', res.status);
        console.log('Response headers:', [...res.headers.entries()]);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Expected JSON, got ${contentType}`);
        }

        const data = await res.json();
        console.log('Received data:', data);

        if (!Array.isArray(data)) {
          console.error('Data is not an array:', typeof data, data);
          throw new Error(`Invalid data format received: expected array, got ${typeof data}`);
        }

        if (data.length === 0) {
          console.warn('Received empty data array');
        }

        const { gallery, carousel, events } = data.reduce(
          (acc, item, index) => {
            console.log(`Processing item ${index}:`, item);
            const acf = item?.acf;
            if (!acf) {
              console.warn(`Item ${index} has no ACF data:`, item);
              return acc;
            }

            if (acf.fullname) {
              acc.gallery.push(acf);
              console.log('Added to gallery:', acf.fullname);
            }
            if (acf.mainImage) {
              acc.carousel.push(acf);
              console.log('Added to carousel:', acf.mainImage);
            }
            if (acf.eventTitle) {
              acc.events.push(acf);
              console.log('Added to events:', acf.eventTitle);
            }
            return acc;
          },
          {
            gallery: [],
            carousel: [],
            events: [],
          }
        );

        console.log('Final data counts:', {
          gallery: gallery.length,
          carousel: carousel.length,
          events: events.length
        });

        setGalleryData(gallery);
        setCarouselData(carousel);
        setEventsData(events);
      } catch (err) {
        clearTimeout(timeoutId);
        console.error('Error fetching data:', err);
        
        // More specific error messages
        let errorMessage = 'Unknown error occurred';
        if (err.name === 'AbortError') {
          errorMessage = 'Request timeout - please check your connection';
        } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
          errorMessage = 'Network error - please check your internet connection';
        } else if (err.message.includes('CORS')) {
          errorMessage = 'CORS error - server configuration issue';
        } else {
          errorMessage = err.message || errorMessage;
        }
        
        setError(new Error(errorMessage));
        
        // Set empty arrays as fallback
        setGalleryData([]);
        setCarouselData([]);
        setEventsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    galleryData,
    carouselData,
    eventsData,
    error,
    loading,
  };
};

export default useFetchGalleryData;
