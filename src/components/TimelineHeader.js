import React from "react";
import { getDaysBetween, formatDate } from "../utils";

const TimelineHeader = ({ dateRange, dayWidth }) => {
  const totalDays = getDaysBetween(dateRange.start, dateRange.end);
  const months = [];

  // Generate month markers
  let currentDate = new Date(dateRange.start);
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  for (let i = 0; i <= totalDays; i++) {
    const date = new Date(dateRange.start);
    date.setDate(date.getDate() + i);

    if (
      date.getMonth() !== currentMonth ||
      date.getFullYear() !== currentYear
    ) {
      currentMonth = date.getMonth();
      currentYear = date.getFullYear();
      months.push({
        date: new Date(date),
        position: i * dayWidth,
      });
    }
  }

  return (
    <div
      className="timeline-header"
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#f8f9fa",
        zIndex: 1,
      }}
    >
      <div
        className="timeline-months"
        style={{ height: "30px", position: "relative" }}
      >
        {months.map((month, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${month.position}px`,
              borderLeft: "1px solid #ddd",
              height: "100%",
              paddingLeft: "4px",
            }}
          >
            {formatDate(month.date, "MMM YYYY")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineHeader;
