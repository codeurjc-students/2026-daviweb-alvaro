import { TimeUtils } from './time.utils';

describe('TimeUtils', () => {
  it('converts HH:mm to minutes and back', () => {
    expect(TimeUtils.timeToMinutes('09:30')).toBe(570);
    expect(TimeUtils.minutesToTime(570)).toBe('09:30');
  });

  it('builds the slots between opening and closing time, closing excluded', () => {
    expect(TimeUtils.hoursRangeFromOpenClose('09:00', '11:00')).toEqual(['09:00', '09:30', '10:00', '10:30']);
  });

  it('returns no slots when opening or closing time is missing', () => {
    expect(TimeUtils.hoursRangeFromOpenClose('', '11:00')).toEqual([]);
  });

  it('formats a date in local time as yyyy-MM-dd', () => {
    expect(TimeUtils.toISODate(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
