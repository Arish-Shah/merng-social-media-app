import { formatDistance } from "date-fns";

export const formatDate = (dateStr) => {
  return formatDistance(new Date(dateStr), new Date(), {
    addSuffix: true,
  });
};
