export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  });
  return formatter.format(date);
};
