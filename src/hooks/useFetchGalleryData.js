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
      try {
        const res = await fetch(url);
        const data = await res.json();

        const { gallery, carousel, events } =
          data.reduce(
            (acc, { acf }) => {
              if (acf.fullname)
                acc.gallery.push(acf);
              if (acf.mainImage)
                acc.carousel.push(acf);
              if (acf.eventTitle)
                acc.events.push(acf);
              return acc;
            },
            {
              gallery: [],
              carousel: [],
              events: [],
            }
          );

        setGalleryData(gallery);
        setCarouselData(carousel);
        setEventsData(events);
      } catch (err) {
        console.error(
          "Error fetching data:",
          err
        );
        setError(err);
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
