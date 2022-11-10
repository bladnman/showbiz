export function rnd(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
export function isHeads() {
  return Math.round(Math.random()) === 1;
}
export function roll(sides: number) {
  return rnd(1, sides);
}
export function rollIsOf(min: number, sides: number) {
  return rnd(1, sides) >= min;
}
/**
 * a _"portion of 1"_ or `decimal fraction`
 * value between 0 and 1.
 * @param minPercFloat 0.0 - 1.0
 * @returns boolean
 */
export function isPercFloat(minPercFloat: number) {
  return Math.random() >= minPercFloat;
}
