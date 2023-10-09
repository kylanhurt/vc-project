export const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;
  const ellipsis = "...";
  const lengthWithoutEllipsis = maxLength - ellipsis.length;
  const firstHalfLength = Math.ceil(lengthWithoutEllipsis / 2);
  const secondHalfLength = Math.floor(lengthWithoutEllipsis / 2);
  const firstHalf = str.slice(0, firstHalfLength);
  const secondHalf = str.slice(str.length - secondHalfLength);
  return `${firstHalf}${ellipsis}${secondHalf}`;
};

export const getPagination = (
  currentPage: number,
  pageSize: number,
  total: number
) => {
  const totalPages = Math.ceil(total / pageSize);
  const doesNextPageExist = currentPage < totalPages;
  const doesPreviousPageExist = currentPage > 1;
  return {
    currentPage,
    pageSize,
    total,
    totalPages,
    doesNextPageExist,
    doesPreviousPageExist,
  };
};
