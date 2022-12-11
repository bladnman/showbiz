export default class Diary {
  private ttlSec = 60;
  private entries: Record<string, { expires: Date; value: unknown }> = {};

  constructor(ttlSec = 60) {
    this.ttlSec = ttlSec;
  }

  write(key: string, value: unknown, ttlSec = this.ttlSec) {
    const expires = dateByAddingSecondsToDate(new Date(), ttlSec);
    this.entries[key] = { value: value, expires };
    return value;
  }

  read(key: string) {
    const { value, expires } = this.entries[key] ?? {};
    if (!expires || expires < new Date()) return null;
    return value;
  }

  // erase(key: string) {
  //   delete this.entries[key];
  // }
}

function dateByAddingSecondsToDate(date: Date, seconds: number) {
  return new Date(date.getTime() + seconds * 1000);
}
