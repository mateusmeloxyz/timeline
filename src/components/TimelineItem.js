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

  // Generate color based on item ID
  const getColorById = (id) => {
    const colors = [
      "#3498db",
      "#e74c3c",
      "#2ecc71",
      "#f39c12",
      "#9b59b6",
      "#1abc9c",
      "#e67e22",
      "#34495e",
      "#f1c40f",
      "#e91e63",
      "#8e44ad",
      "#16a085",
      "#27ae60",
      "#f39800",
      "#c0392b",
    ];
    return colors[id % colors.length];
  };

  const backgroundColor = getColorById(item.id);

  const handleClick = () => {
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
        backgroundColor: backgroundColor,
      }}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={itemName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          autoFocus
        />
      ) : (
        <div>{itemName}</div>
      )}
    </div>
  );
};

export default TimelineItem;
