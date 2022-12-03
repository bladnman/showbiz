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

export function fLeft(
  str: string | null | undefined,
  delim: string | null | undefined
) {
  if (!str || !delim) {
    return "";
  }

  str = `${str}`;
  delim = `${delim}`;

  const theSpot = str.indexOf(delim);
  if (theSpot > -1) {
    return str.substring(0, theSpot);
  }
  return "";
}

export function fRight(
  str: string | null | undefined,
  delim: string | null | undefined
) {
  if (!str || !delim) return "";

  str = `${str}`;
  delim = `${delim}`;

  const theSpot = str.indexOf(delim);
  if (theSpot > -1) {
    return str.substring(theSpot + delim.length, str.length);
  }

  return "";
}

export function returnDecimalPlaces(value: number, decimalsToReturn: number) {
  if (value === null) {
    return null;
  }
  decimalsToReturn = decimalsToReturn || 0;

  // 'toFixed' rounds, we are avoiding that by adding another digit of precision
  let fixedValue = value.toFixed(++decimalsToReturn);

  // then dropping that digit
  let ret = fixedValue.slice(0, fixedValue.length - 1);

  // and the leading '+' is to convert back to a number
  return +ret; // convert to number
}
