import { TISODuration } from 'entities/track/common/model/types';

export const DURATION_EMPTY: TISODuration = 'P0D';

const SECONDS_A_MINUTE = 60;
const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
const SECONDS_A_BUSINESS_DAY = SECONDS_A_HOUR * 8;
const SECONDS_A_BUSINESS_WEEK = SECONDS_A_BUSINESS_DAY * 5;

export const MILLISECONDS_A_SECOND = 1e3;
export const MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_BUSINESS_DAY = SECONDS_A_BUSINESS_DAY * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_BUSINESS_WEEK = SECONDS_A_BUSINESS_WEEK * MILLISECONDS_A_SECOND;

export const HOUR_A_BUSINESS_DAY = 8;

export const NUMBERS_REGEX = /^\d+$/;

export const HUMAN_DURATION_STR_REGEX =
  /^(?:\s*(\d+)\s*(?:[wн]|нед|неделя|недель|недели))?(?:\s*(\d+)\s*(?:[dд]|день|дня|дней))?(?:\s*(\d+)\s*(?:[hч]|час|часа|часов))?(?:\s*(\d+)\s*(?:[mм]|мин|минута|минуты|минут))?(?:\s*(\d+)\s*(?:[sс]|сек|секунда|секунды|секунд))?\s*$/i;
export const DURATION_DESIGNATORS = ['W', 'D', 'H', 'M', 'S'] as const;
export const HOUR_DESIGNATOR_IDX = DURATION_DESIGNATORS.indexOf('H');

// this regexp describes time duration string with designators, according to ISO-8601 paragraph 4.4.3.2
export const ISO_DURATION_REGEX =
  /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
