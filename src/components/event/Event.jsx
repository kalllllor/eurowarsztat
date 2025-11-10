import { useState } from "react";

const Event = ({ data = [], ...props }) => {
  const today = new Date();
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

  filteredData.previous = [
    ...filteredData.previous,
    ...filteredData.previous,
    ...filteredData.previous,
  ];

  const [isPastSelected, setIsPastSelected] =
    useState(
      filteredData.now.length > 0
        ? "now"
        : filteredData.after.length > 0
        ? "after"
        : "previous"
    );
  const [isTransitioning, setIsTransitioning] =
    useState(false);
  const [currentData, setCurrentData] = useState(
    filteredData.now.length > 0
      ? filteredData.now
      : filteredData.after.length > 0
      ? filteredData.after
      : filteredData.previous
  );

  const [currentPage, setCurrentPage] =
    useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(
    currentData.length / itemsPerPage
  );

  const handleToggle = (timeslot) => {
    if (
      isTransitioning ||
      timeslot === isPastSelected
    )
      return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentData(filteredData[timeslot]);
      setIsPastSelected(timeslot);
      setCurrentPage(1);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 300);
  };

  const paginatedData = currentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="wrapper" {...props}>
      <div className="container">
        <div className="event__title">
          <h3>Działania prowadzone w &nbsp;</h3>
          <h3>ramach projektu</h3>
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
            {paginatedData.length ? (
              paginatedData.map(
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
                    <a href={link}>
                      {eventTitle}
                    </a>
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
              )
            ) : (
              <div className="event__wrapper-item">
                <div className="event_place">
                  <p>
                    <div>
                      {isPastSelected === "now" &&
                        "Nie ma obecnie żadnych trwających eventów"}
                      {isPastSelected ===
                        "after" &&
                        "Nie ma obecnie żadnych zaplanowanych eventów"}
                      {isPastSelected ===
                        "previous" &&
                        "Nie ma obecnie żadnych minionych eventów"}
                    </div>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <div className="pagination event__wrapper">
            <div className="pagination__content">
              {Array.from(
                { length: totalPages },
                (_, i) => (
                  <button
                    key={i}
                    className={
                      currentPage === i + 1
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handlePageChange(i + 1)
                    }
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
