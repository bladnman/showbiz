export function ymd(date: Date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1; //months from 1-12
  var day = date.getDate();
  return `${year}-${month}-${day}`;
}
export function ymdhms(date: Date) {
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return `${ymd(date)} ${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}`;
}
export function pad(value: number | string, width: number, char?: string) {
  value = value + "";
  return value.length >= width
    ? value
    : new Array(width - value.length + 1).join(char ?? "0") + value;
}
