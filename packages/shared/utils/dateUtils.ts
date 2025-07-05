import { format } from "date-fns";

export const parseDatetimeToFormat = (
  date: string,
  f: string = "yyyy-MM-dd",
) => {
  if (!date) return "";
  return format(new Date(date), f);
};
