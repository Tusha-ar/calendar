import React, { useState } from "react";
import EasyCalendar from "./components";

const App = () => {
  const [fromDate, setFromDate] = useState("1 jan");
  const [toDate, setToDate] = useState("20 jan");

  const currentDate = new Date();

  const renderDate = (date) => {
    return <div>{date}</div>;
  };

  return (
    <div>
      <EasyCalendar.Calendar
        inputContainerStyle={{
          width: "200px",
          border: "1px solid ",
          display: "flex",
          justifyContent: "space-around",
        }}
        renderDate={renderDate}
        minDateToSelect={Date.now()}
        maxDateToSelect={currentDate.setFullYear(currentDate.getFullYear() + 2)}
        containerData={() => (
          <div>
            <span>{fromDate}</span>-<span>{toDate}</span>
          </div>
        )}
      />
    </div>
  );
};

export default App;
