const getFormattedDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));
  const yyyy = date.getFullYear();

  let month = date.getMonth() + 1;
  let day = date.getDate();

  const dd = day >= 10 ? day : `0${day}`;
  const mm = month >= 10 ? month : `0${month}`;

  return `${dd}.${mm}.${yyyy}`;
};

export { getFormattedDate };
