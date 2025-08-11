// Get the start and end dates from all items
export const getDateRange = (items) => {
  const start = new Date(
    Math.min(...items.map((item) => new Date(item.start))),
  );
  const end = new Date(Math.max(...items.map((item) => new Date(item.end))));
  return { start, end };
};

// Calculate days between two dates
export const getDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Reset time to compare only dates
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // Calculate difference in days
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// Format date according to specified format
export const formatDate = (date, format = "YYYY-MM-DD") => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.getFullYear();

  return `${month} ${year}`;
};
