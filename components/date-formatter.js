import { parseISO, format, isValid } from 'date-fns';

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{isValid(date) ? format(date, 'LLLL	d, yyyy') : ``}</time>;
}
