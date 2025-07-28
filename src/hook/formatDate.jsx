export const formatDate = (dateString, dayIndex) => {
  const date = new Date(dateString);

  if (dayIndex === 0) return "Tomorrow";

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${weekday}, ${day} ${month}`;
};
