import React from "react";

const DateComp = ({
  index,
  day,
  renderDate,
  handleDateOnClick,
  handleMouseLeave,
  handleMouseOver,
  fromDate,
  mouseOverDate,
  compareDates,
  currentMonthToDisplay,
  inRangeDateStyle,
  toDate,
  selectedDateStyle
}) => {
  return (
    <React.Fragment key={index}>
      {day.validDay
        ? renderDate(
            day.date,
            {
              onClick: () => handleDateOnClick(day.date),
              onMouseOver: () => handleMouseOver(day.date),
              onMouseLeave: () => handleMouseLeave(day.date)
            },
            Object.assign(
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              },

              fromDate &&
                mouseOverDate &&
                compareDates(fromDate, {
                  date: day.date,
                  month: currentMonthToDisplay.month,
                  year: currentMonthToDisplay.year
                }) === "less" &&
                (compareDates(mouseOverDate, {
                  date: day.date,
                  month: currentMonthToDisplay.month,
                  year: currentMonthToDisplay.year
                }) === "greater" ||
                  compareDates(mouseOverDate, {
                    date: day.date,
                    month: currentMonthToDisplay.month,
                    year: currentMonthToDisplay.year
                  }) === "equal")
                ? inRangeDateStyle
                : {},
              fromDate && toDate
                ? compareDates(fromDate, {
                    date: day.date,
                    month: currentMonthToDisplay.month,
                    year: currentMonthToDisplay.year
                  }) === "less" &&
                  compareDates(toDate, {
                    date: day.date,
                    month: currentMonthToDisplay.month,
                    year: currentMonthToDisplay.year
                  }) === "greater"
                  ? inRangeDateStyle
                  : {}
                : {},
              fromDate &&
                compareDates(fromDate, {
                  date: day.date,
                  month: currentMonthToDisplay.month,
                  year: currentMonthToDisplay.year
                }) === "equal"
                ? selectedDateStyle
                : {},
              toDate &&
                compareDates(toDate, {
                  date: day.date,
                  month: currentMonthToDisplay.month,
                  year: currentMonthToDisplay.year
                }) === "equal"
                ? selectedDateStyle
                : {}
            )
          )
        : renderDate(null)}
    </React.Fragment>
  );
};

export default DateComp;
