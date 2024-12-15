import { useState } from "react";

const Event = ({ data = [], ...props }) => {
  const today = new Date();
  const [isPastSelected, setIsPastSelected] =
    useState(false);
  const [isTransitioning, setIsTransitioning] =
    useState(false);
  const [currentData, setCurrentData] = useState(
    data.filter(
      (event) => new Date(event.startDate) > today
    )
  );

  const filteredData = data.reduce(
    (acc, current) => {
      if (new Date(current.startDate) > today) {
        acc.after.push(current);
      } else if (
        new Date(current.startDate) < today &&
        new Date(current.finishDate) > today
      ) {
        acc.now.push(current);
      } else {
        acc.previous.push(current);
      }
      return acc;
    },
    { now: [], previous: [], after: [] }
  );

  const handleToggle = (showPast) => {
    if (
      isTransitioning ||
      showPast === isPastSelected
    )
      return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentData(filteredData[showPast]);
      console.log(filteredData[showPast]);
      setIsPastSelected(showPast);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="wrapper" {...props}>
      <div className="container">
        <div className="event__title">
          <h3>prezentacje projektu</h3>
        </div>

        <div className="event__header">
          <button
            className={
              isPastSelected === "now"
                ? "active"
                : ""
            }
            onClick={() => handleToggle("now")}
          >
            OBECNE
          </button>
          <span>/</span>
          <button
            className={
              isPastSelected === "after"
                ? "active"
                : ""
            }
            onClick={() => handleToggle("after")}
          >
            PRZYSZŁE
          </button>
          <span>/</span>
          <button
            className={
              isPastSelected === "previous"
                ? "active"
                : ""
            }
            onClick={() =>
              handleToggle("previous")
            }
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
                {
                  eventTitle,
                  link,
                  startDate,
                  finishDate,
                  place,
                },
                index
              ) => (
                <div
                  className="event__wrapper-item"
                  key={index}
                >
                  <a href={link}>{eventTitle}</a>
                  <div className="event_place">
                    <div>
                      <span>{startDate}</span>
                      <span>{" - "}</span>
                      <span>{finishDate}</span>
                    </div>
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
