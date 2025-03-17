import { RawTimeZone, rawTimeZones } from '@vvo/tzdb';

export const DATE_FORMAT_MONTH = 'DD.MM';
export const DATE_FORMAT_DATE = 'YYYY-MM-DD';
export const DATE_FORMAT_DATE_API = 'YYYY-MM-DD HH:mm:ss';

export const DATE_TIME_FORMAT_JIRA_API = 'YYYY-MM-DD HH:mm';

export const STARTED_DATE_TIME_JIRA_API = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';

export const STANDARD_WORK_DAY_START_LOCAL_HOUR = 9;

export const UTC_OFFSET_TO_TIMEZONE_MAP = (() => {
  const offset2Tz = new Map<number, RawTimeZone>();

  for (const tz of rawTimeZones) {
    offset2Tz.set(tz.rawOffsetInMinutes, tz);
  }

  return offset2Tz;
})();
