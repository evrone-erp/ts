require('@testing-library/jest-dom');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

// make sure all tests consistently run in the same time offset in all environments
jest.mock('dayjs', () => {
  const UTC_DEFAULT_OFFSET_HOURS = 3;
  let UTC_OFFSET_HOURS = UTC_DEFAULT_OFFSET_HOURS;

  // for some tests we need to change timezone
  const SET_TEST_UTC_OFFSET_HOURS_PROP_NAME = '__SET_TEST_UTC_OFFSET_HOURS__';
  const RESET_UTC_OFFSET_HOURS_PROP_NAME = '__RESET_DEFAULT_TEST_UTC_OFFSET_HOURS__';

  const setOffset = (hours) => {
    UTC_OFFSET_HOURS = hours;
  };
  const resetOffset = () => {
    UTC_OFFSET_HOURS = UTC_DEFAULT_OFFSET_HOURS;
  };

  const handler = {
    apply(target, _, argumentsList) {
      return target(...argumentsList).utcOffset(UTC_OFFSET_HOURS);
    },
    get(obj, prop, receiver) {
      if (prop === SET_TEST_UTC_OFFSET_HOURS_PROP_NAME) {
        return setOffset;
      }
      if (prop === RESET_UTC_OFFSET_HOURS_PROP_NAME) {
        return resetOffset;
      }
      return Reflect.get(obj, prop, receiver);
    },
  };

  return new Proxy(jest.requireActual('dayjs'), handler);
});
