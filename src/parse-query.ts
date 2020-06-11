export default function parseQuery(query: string) {
  const seconds = query.match(/(.*) (\d+s)$/);

  if (seconds) {
    return {
      message: seconds[1].trim(),
      time: parseInt(seconds[2].slice(0, -1)),
      prettyTime: seconds[2],
    };
  }

  const minutes = query.match(/(.*) (\d+m)$/);

  if (minutes) {
    return {
      message: minutes[1].trim(),
      time: parseInt(minutes[2].slice(0, -1)) * 60,
      prettyTime: minutes[2],
    };
  }

  const hours = query.match(/(.*) (\d+h)$/);

  if (hours) {
    return {
      message: hours[1].trim(),
      time: parseInt(hours[2].slice(0, -1)) * 60 * 60,
      prettyTime: hours[2],
    };
  }

  return {
    error: true,
  };
}
