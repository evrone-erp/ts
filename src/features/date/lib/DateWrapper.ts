import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ru';

dayjs.extend(isBetween);
dayjs.extend(utc);

dayjs.Ls.en.weekStart = 1;

export type TDate = Dayjs;

export class DateWrapper {
  static setLocale(language: string): void {
    dayjs.locale(language);
  }

  // utcOffsetInMinutes type is not optional on purpose, so that in the future, when writing code, developers would pay attention and wouldn't
  // forget to include offset where it's necessary
  static getDate({ date, utcOffsetInMinutes }: { date?: string; utcOffsetInMinutes: number | undefined }): TDate {
    if (utcOffsetInMinutes === undefined) {
      return dayjs(date);
    }
    return dayjs(date).utcOffset(utcOffsetInMinutes);
  }

  static getDateFormat(dateObject: TDate, format?: string, utcOffsetInMinutes?: number | undefined): string {
    if (utcOffsetInMinutes === undefined) {
      return dateObject.format(format);
    }
    return dateObject.utcOffset(utcOffsetInMinutes).format(format);
  }

  static getDateISO(dateString: string): string {
    // https://github.com/iamkun/dayjs/issues/1923 incorrect iso date when timezone not specified
    return new Date(dateString).toISOString();
  }

  static getDateStart(dateObject: TDate, unit: OpUnitType): TDate {
    return dateObject.startOf(unit);
  }

  static getDateEnd(dateObject: TDate, unit: OpUnitType): TDate {
    return dateObject.endOf(unit);
  }

  static getDateDiff(dateObject1: TDate, dateObject2: TDate, unit: OpUnitType): number {
    return dateObject1.diff(dateObject2, unit);
  }

  static getDateRange(dateObject1: TDate, dateObject2: TDate, unit: OpUnitType): TDate[] {
    const diff = DateWrapper.getDateDiff(dateObject2, dateObject1, unit);
    const diffAbs = Math.abs(diff);
    const k = diffAbs === 0 ? 0 : diff / diffAbs;

    return new Array(diffAbs + 1).fill(null).map((_, index) => dateObject1.add(index * k, 'day'));
  }

  static isDateValid(dateObject: TDate): boolean {
    return dateObject.isValid();
  }

  static getDay(date: TDate) {
    return date.day();
  }

  static isWeekend(date: TDate) {
    const day = this.getDay(date);
    return day === 0 || day === 6;
  }
}
