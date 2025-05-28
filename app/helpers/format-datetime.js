/**
 * @param {Date} date
 * @returns {string}
 */
export default function formatDatetime(date) {
  if (!date && !(date instanceof Date)) {
    return '';
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${pad(day)}-${pad(month)}-${year} ${pad(hours)}:${pad(minutes)}`;
}

function pad(number) {
  return `${number}`.padStart(2, '0');
}
