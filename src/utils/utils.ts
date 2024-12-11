const calculateDday = (dueDate: Date) => {
  const result = Math.ceil(
    (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  if (result < 0) {
    return `D+${Math.abs(result)}`;
  }
  return `D-${result}`;
};

export default calculateDday;
