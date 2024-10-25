export function formatTimestamp(timestamp: number): string {
  const totalMilliseconds = Math.floor(timestamp * 1000);

  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const milliseconds = totalMilliseconds % 1000;

  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");
  const millisecondsStr = String(milliseconds).padStart(3, "0");

  return `${minutesStr}:${secondsStr}:${millisecondsStr}`;
}
