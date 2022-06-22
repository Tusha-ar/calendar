import React, { useState } from "react";
import EasyCalendar from "./components";

const App = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const currentDate = new Date();

  const renderDate = (date, props, style) => {
    return (
      <div
        {...props}
        style={{
          height: "20px",
          width: "20px",
          padding: "5px",
          fontFamily: "monospace",
          ...style
        }}
      >
        {date}
      </div>
    );
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate.year, inputDate.month - 1, inputDate.date);
    return String(date).slice(4, 15);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <EasyCalendar.Calendar
        inputContainerStyle={{
          width: "400px",
          border: "1px solid ",
          display: "flex",
          justifyContent: "space-around",
          fontFamily: "monospace",
          fontSize: "16px"
        }}
        calendarContainerStyle={{
          border: "none",
          padding: "10px 20px",
          boxShadow: "0px 0px 15px -4px rgba(0,0,0,0.23)"
        }}
        calendarHeadingStyle={{
          fontFamily: "monospace",
          fontSize: "18px"
        }}
        calendarDaysStyle={{ fontFamily: "monospace", fontWeight: "600" }}
        renderDate={renderDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        fromDate={fromDate}
        toDate={toDate}
        minDateToSelect={new Date()}
        maxDateToSelect={currentDate.setFullYear(currentDate.getFullYear() + 2)}
        navButtonStyle={{
          backgroundColor: "grey",
          color: "white",
          border: "none",
          padding: "10px"
        }}
        selectedDateStyle={{
          backgroundColor: "grey"
        }}
        inRangeDateStyle={{
          backgroundColor: "lightgrey"
        }}
        containerData={() => (
          <div style={{ padding: "20px" }}>
            <span style={{ fontWeight: "bolder", margin: "10px" }}>
              {fromDate ? formatDate(fromDate) : "check-in "}
            </span>
            <span style={{ color: "grey" }}> --- </span>
            <span style={{ fontWeight: "bolder", margin: "10px" }}>
              {toDate ? formatDate(toDate) : " check-out "}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default App;
