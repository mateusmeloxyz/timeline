import React, { useState, useEffect } from "react";
import assignLanes from "../assignLanes";
import TimelineItem from "./TimelineItem";
import TimelineHeader from "./TimelineHeader";
import { getDateRange, getDaysBetween } from "../utils";

const Timeline = ({ items }) => {
  const [lanes, setLanes] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // Assign items to lanes
    const assignedLanes = assignLanes(items);
    setLanes(assignedLanes);

    // Calculate overall date range
    const range = getDateRange(items);
    setDateRange(range);
  }, [items]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));

  if (!dateRange.start || !dateRange.end) return <div>Loading...</div>;

  const totalDays = getDaysBetween(dateRange.start, dateRange.end);
  const dayWidth = 20 * zoomLevel; // 20px per day, adjusted by zoom level
  const timelineWidth = totalDays * dayWidth;

  return (
    <div className="timeline-container">
      <div className="timeline-controls">
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handleZoomIn}>Zoom In</button>
      </div>

      <div className="timeline-scroll-container" style={{ overflowX: "auto" }}>
        <TimelineHeader dateRange={dateRange} dayWidth={dayWidth} />

        <div className="timeline-lanes" style={{ width: `${timelineWidth}px` }}>
          {lanes.map((lane, laneIndex) => (
            <div key={laneIndex} className="timeline-lane">
              {lane.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  dateRange={dateRange}
                  dayWidth={dayWidth}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
