import React, { useCallback, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "./useOutsideClick";
import DateComp from "./dateComp";

const MONTHS = {
  0: "Jan",
  1: "Feb",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const Calendar = ({
  inputContainerStyle,
  containerData,
  minDateToSelect,
  maxDateToSelect,
  renderDate,
  setFromDate,
  setToDate,
  fromDate,
  toDate,
  selectedDateStyle,
  inRangeDateStyle,
  navButtonStyle,
  calendarContainerStyle,
  calendarHeadingStyle,
  calendarDaysStyle
}) => {
  const minMonth = new Date(minDateToSelect).getMonth() + 1;
  const minYear = new Date(minDateToSelect).getFullYear();
  const [show, setShow] = useState(false);

  const maxMonth = new Date(maxDateToSelect).getMonth() + 1;
  const maxYear = new Date(maxDateToSelect).getFullYear();

  const [isStartSelected, setIsStartSelected] = useState(false);
  const [mouseOverDate, setMouseOverDate] = useState(null);

  const [monthArray, setMonthArray] = useState([]);
  const [currentMonthToDisplay, setCurrentMonthToDisplay] = useState({
    month: minMonth,
    year: minYear
  });
  const calendarRef = useRef();
  const handleCalendarShow = useCallback(() => {
    setShow(false);
  }, []);
  useOutsideClick(calendarRef, handleCalendarShow);

  if (
    minYear > maxYear ||
    (minYear === maxYear && minMonth < maxMonth)
    // || (minYear === maxYear && minMonth === maxMonth && minDate < maxDate)
  ) {
    throw "minYear cannot be smaller than maxYear";
  }

  const compareDates = (date1, date2) => {
    const first = new Date(date1.year, date1.month - 1, date1.date).getTime();
    const second = new Date(date2.year, date2.month - 1, date2.date).getTime();

    if (first === second) {
      return "equal";
    } else if (first > second) {
      return "greater";
    } else {
      return "less";
    }
  };
  const calculateMonthArray = (month, year) => {
    const monthArray = [];
    const numberOfDays = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      monthArray.push({ validDay: false, date: 0 });
    }

    for (let i = 0; i < numberOfDays; i++) {
      monthArray.push({ validDay: true, date: i + 1 });
    }
    return monthArray;
  };

  // const years = useMemo(() => {
  //   const temp = [];
  //   for (let i = minYear; i <= maxYear; i++) {
  //     temp.push(i);
  //   }
  //   return temp;
  // }, [minYear, maxYear]);

  useEffect(() => {
    const array = calculateMonthArray(
      currentMonthToDisplay.month,
      currentMonthToDisplay.year
    );
    setMonthArray(array);
  }, [currentMonthToDisplay.month, currentMonthToDisplay.year]);

  const handleMonthBack = () => {
    if (currentMonthToDisplay.month === 1) {
      setCurrentMonthToDisplay({
        month: 12,
        year: currentMonthToDisplay.year - 1
      });
    } else {
      setCurrentMonthToDisplay({
        month: currentMonthToDisplay.month - 1,
        year: currentMonthToDisplay.year
      });
    }
  };

  const handleMouseOver = (date) => {
    if (isStartSelected) {
      if (
        compareDates(fromDate, {
          date,
          month: currentMonthToDisplay.month,
          year: currentMonthToDisplay.year
        }) === "less"
      ) {
        setMouseOverDate({
          date,
          month: currentMonthToDisplay.month,
          year: currentMonthToDisplay.year
        });
      }
    }
  };

  const handleMouseLeave = (date) => {
    if (isStartSelected) {
      if (
        compareDates(fromDate, {
          date,
          month: currentMonthToDisplay.month,
          year: currentMonthToDisplay.year
        }) === "less"
      ) {
        setMouseOverDate(null);
      }
    }
  };

  const handleDateOnClick = (date) => {
    if (isStartSelected) {
      if (
        compareDates(fromDate, {
          date,
          month: currentMonthToDisplay.month,
          year: currentMonthToDisplay.year
        }) === "less"
      ) {
        setMouseOverDate(null);
        setToDate({
          date,
          month: currentMonthToDisplay.month,
          year: currentMonthToDisplay.year
        });
        setShow(false);
        setIsStartSelected(false);
      }
    } else {
      setToDate(null);
      setFromDate({
        date,
        month: currentMonthToDisplay.month,
        year: currentMonthToDisplay.year
      });
      setIsStartSelected(true);
    }
  };

  const handleMonthNext = () => {
    if (currentMonthToDisplay.month === 12) {
      setCurrentMonthToDisplay({
        month: 1,
        year: currentMonthToDisplay.year + 1
      });
    } else {
      setCurrentMonthToDisplay({
        month: currentMonthToDisplay.month + 1,
        year: currentMonthToDisplay.year
      });
    }
  };

  const handleContainerClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", userSelect: "none" }} ref={calendarRef}>
      <div
        style={Object.assign(
          {
            width: "100px",
            curson: "pointer"
          },
          inputContainerStyle
        )}
        onClick={handleContainerClick}
      >
        {containerData()}
      </div>
      {show ? (
        <div
          style={Object.assign(
            {
              border: "1px solid black",
              padding: "10px",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            },
            calendarContainerStyle,
            { position: "absolute", top: "105%" }
          )}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <button
              onClick={handleMonthBack}
              disabled={
                currentMonthToDisplay.month === minMonth &&
                currentMonthToDisplay.year === minYear
              }
              style={Object.assign(
                { cursor: "pointer" },
                currentMonthToDisplay.month === minMonth &&
                  currentMonthToDisplay.year === minYear
                  ? { opacity: 0 }
                  : {},
                navButtonStyle
              )}
            >
              {"<"}
            </button>
            <button
              onClick={handleMonthNext}
              disabled={
                currentMonthToDisplay.month === maxMonth &&
                currentMonthToDisplay.year === maxYear
              }
              style={Object.assign(
                { cursor: "pointer" },
                currentMonthToDisplay.month === maxMonth &&
                  currentMonthToDisplay.year === maxYear
                  ? { opacity: 0 }
                  : {},
                navButtonStyle
              )}
            >
              {">"}
            </button>
          </div>
          <span
            style={Object.assign(
              {
                margin: "20px",
                fontWeight: "bold",
                textTransform: "uppercase"
              },
              calendarHeadingStyle
            )}
          >
            {MONTHS[currentMonthToDisplay.month - 1]} ,{" "}
            {currentMonthToDisplay.year}
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, auto)",
              gridAutoRows: "minmax(30px, auto)"
            }}
          >
            {WEEK.map((day, index) => (
              <React.Fragment key={index}>
                <div
                  style={Object.assign(
                    { PointerEvent: "none" },
                    calendarDaysStyle
                  )}
                >
                  {day}
                </div>
              </React.Fragment>
            ))}
            {monthArray.map((day, index) => (
              <DateComp
                index={index}
                day={day}
                renderDate={renderDate}
                handleDateOnClick={handleDateOnClick}
                handleMouseLeave={handleMouseLeave}
                handleMouseOver={handleMouseOver}
                fromDate={fromDate}
                mouseOverDate={mouseOverDate}
                compareDates={compareDates}
                currentMonthToDisplay={currentMonthToDisplay}
                inRangeDateStyle={inRangeDateStyle}
                toDate={toDate}
                selectedDateStyle={selectedDateStyle}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Calendar;
