import React, { useEffect, useMemo, useState } from "react";

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
  11: "Dec",
};
const Calendar = ({
  inputContainerStyle,
  containerData,
  minDateToSelect,
  maxDateToSelect,
  renderDate,
}) => {
  const minMonth = new Date(minDateToSelect).getMonth() + 1;
  const minYear = new Date(minDateToSelect).getFullYear();

  const maxMonth = new Date(maxDateToSelect).getMonth() + 1;
  const maxYear = new Date(maxDateToSelect).getFullYear();

  const [monthArray, setMonthArray] = useState([]);
  const [currentMonthToDisplay, setCurrentMonthToDisplay] = useState({
    month: minMonth,
    year: minYear,
  });
  if (
    minYear > maxYear ||
    (minYear === maxYear && minMonth < maxMonth)
    // || (minYear === maxYear && minMonth === maxMonth && minDate < maxDate)
  ) {
    throw "minYear cannot be smaller than maxYear";
  }
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
        year: currentMonthToDisplay.year - 1,
      });
    } else {
      setCurrentMonthToDisplay({
        month: currentMonthToDisplay.month - 1,
        year: currentMonthToDisplay.year,
      });
    }
  };

  const handleMonthNext = () => {
    if (currentMonthToDisplay.month === 12) {
      setCurrentMonthToDisplay({
        month: 1,
        year: currentMonthToDisplay.year + 1,
      });
    } else {
      setCurrentMonthToDisplay({
        month: currentMonthToDisplay.month + 1,
        year: currentMonthToDisplay.year,
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={Object.assign(
          {
            width: "100px",
          },
          inputContainerStyle
        )}
      >
        {containerData()}
      </div>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          position: "absolute",
          top: 25,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button
            onClick={handleMonthBack}
            disabled={
              currentMonthToDisplay.month === minMonth &&
              currentMonthToDisplay.year === minYear
            }
          >
            {"<"}
          </button>
          <button
            onClick={handleMonthNext}
            disabled={
              currentMonthToDisplay.month === maxMonth &&
              currentMonthToDisplay.year === maxYear
            }
          >
            {">"}
          </button>
        </div>
        <h2>
          {MONTHS[currentMonthToDisplay.month - 1]} ,{" "}
          {currentMonthToDisplay.year}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridAutoRows: "minmax(30px, auto)",
            gridGap: "10px",
          }}
        >
          {monthArray.map((day, index) => (
            <React.Fragment key={index}>
              {day.validDay
                ? React.createElement(renderDate().type, day.date)
                : renderDate(null)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
