const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const formatDate = (rawDate: string) => {
  const date = '' === rawDate ? new Date() : new Date(rawDate);
  return formatter.format(date);
};

export default formatDate;
