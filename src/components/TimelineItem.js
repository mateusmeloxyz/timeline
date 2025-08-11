import React, { useState } from "react";
import { getDaysBetween } from "../utils";

const TimelineItem = ({ item, dateRange, dayWidth }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState(item.name);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate position and width
  const daysFromStart = getDaysBetween(dateRange.start, item.start);
  const itemDuration = getDaysBetween(item.start, item.end) + 1; // +1 to include end date

  const left = daysFromStart * dayWidth;
  const width = itemDuration * dayWidth;

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    // Here you would typically update the item name in your state/database
  };

  return (
    <div
      className="timeline-item"
      style={{
        left: `${left}px`,
        width: `${width}px`,
        position: "absolute",
        backgroundColor: "#3498db",
        borderRadius: "4px",
        padding: "4px 8px",
        color: "white",
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={itemName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          autoFocus
          style={{
            width: "90%",
            border: "none",
            background: "transparent",
            color: "white",
          }}
        />
      ) : (
        <div>{itemName}</div>
      )}
    </div>
  );
};

export default TimelineItem;
