import { useState } from "react";

const Event = ({ data = [], ...props }) => {
  const today = new Date();
  const [isPastSelected, setIsPastSelected] =
    useState(false);
  const [isTransitioning, setIsTransitioning] =
    useState(false); // For controlling fade animation
  const [currentData, setCurrentData] = useState(
    data.filter(
      (event) => new Date(event.date) > today
    ) // Start with future data
  );

  // Split events into past and future
  const { previous, after } = data.reduce(
    (acc, current) => {
      if (new Date(current.date) > today) {
        acc.after.push(current);
      } else {
        acc.previous.push(current);
      }
      return acc;
    },
    { previous: [], after: [] }
  );

  // Handle button click with transition
  const handleToggle = (showPast) => {
    if (
      isTransitioning ||
      showPast === isPastSelected
    )
      return; // Prevent mid-transition clicks

    setIsTransitioning(true); // Start transition
    setTimeout(() => {
      setCurrentData(showPast ? previous : after); // Change data after fade-out
      setIsPastSelected(showPast); // Update state
      setIsTransitioning(false); // End transition
    }, 300); // Match the CSS fade-out duration
  };

  return (
    <div className="wrapper" {...props}>
      <div className="container">
        <div className="event__title">
          <h3>EVENTY</h3>
        </div>

        <div className="event__header">
          <button
            className={
              !isPastSelected ? "active" : ""
            }
            onClick={() => handleToggle(false)}
          >
            PRZYSZŁE
          </button>
          <span>/</span>
          <button
            className={
              isPastSelected ? "active" : ""
            }
            onClick={() => handleToggle(true)}
          >
            PRZESZŁE
          </button>
        </div>
        <div
          className={`desc__wrapper event__wrapper ${
            isTransitioning
              ? "fade-out"
              : "fade-in"
          }`}
        >
          <div className="event__wrapper-content">
            {currentData.map(
              (
                { eventTitle, link, date, place },
                index
              ) => (
                <div
                  className="event__wrapper-item"
                  key={index}
                >
                  <a href={link}>{eventTitle}</a>
                  <div className="event_place">
                    <span>{date}</span>
                    <span>{place}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
