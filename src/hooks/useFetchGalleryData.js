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
        setError(
          new Error("No internet connection")
        );
        setLoading(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10000);

      try {
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors", // Explicitly set CORS mode
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(
            `HTTP error! status: ${res.status} - ${res.statusText}`
          );
        }

        const contentType = res.headers.get(
          "content-type"
        );
        if (
          !contentType ||
          !contentType.includes(
            "application/json"
          )
        ) {
          throw new Error(
            `Expected JSON, got ${contentType}`
          );
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error(
            `Invalid data format received: expected array, got ${typeof data}`
          );
        }

        const { gallery, carousel, events } =
          data.reduce(
            (acc, item, index) => {
              const acf = item?.acf;
              if (!acf) {
                return acc;
              }

              if (acf.fullname) {
                acc.gallery.push(acf);
              }
              if (acf.mainImage) {
                acc.carousel.push(acf);
              }
              if (acf.eventTitle) {
                acc.events.push(acf);
              }
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
        clearTimeout(timeoutId);
        console.error(
          "Error fetching data:",
          err
        );

        // More specific error messages
        let errorMessage =
          "Unknown error occurred";
        if (err.name === "AbortError") {
          errorMessage =
            "Request timeout - please check your connection";
        } else if (
          err.name === "TypeError" &&
          err.message.includes("fetch")
        ) {
          errorMessage =
            "Network error - please check your internet connection";
        } else if (err.message.includes("CORS")) {
          errorMessage =
            "CORS error - server configuration issue";
        } else {
          errorMessage =
            err.message || errorMessage;
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
