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
    <div className="timeline-header">
      <div className="timeline-months">
        {months.map((month, index) => (
          <div
            key={index}
            className="timeline-month-marker"
            style={{
              left: `${month.position}px`,
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
