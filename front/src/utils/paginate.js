import _ from "lodash";

export function pagination(array, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(array).slice(startIndex).take(pageSize).value();
}
