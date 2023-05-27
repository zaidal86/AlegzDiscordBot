import { utcToZonedTime, format } from 'date-fns-tz';

const PARIS_TIMEZONE = 'Europe/Paris';

const startDate: Date = utcToZonedTime(new Date('2023-05-06'), PARIS_TIMEZONE);
const schedule: { start: number; end: number }[] = [
    { start: 5, end: 13 },
    { start: 5, end: 13 },
    { start: 13, end: 21 },
    { start: 13, end: 21 },
    { start: 21, end: 5 },
    { start: 21, end: 5 },
    { start: null, end: null },
    { start: null, end: null },
    { start: null, end: null },
    { start: null, end: null },
];

const isWorkDay = (schedule) => schedule.start !== null;

const isCurrentShift = (currentHour, schedule) =>
    schedule.start < schedule.end
        ? currentHour >= schedule.start && currentHour < schedule.end
        : currentHour >= schedule.start || currentHour < schedule.end;

const scheduleToString = (schedule) =>
    ` de ${schedule.start}h à ${schedule.end}h.`;

const getNextIndex = (currentIndex, arrayLength) =>
    (currentIndex + 1) % arrayLength;

export const autoSchedule = (): string => {
    const today: Date = utcToZonedTime(new Date(), PARIS_TIMEZONE);
    const daysSinceStart: number = Math.floor(
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const scheduleIndex: number = daysSinceStart % schedule.length;
    const currentHour: number = parseInt(
        format(today, 'H', { timeZone: PARIS_TIMEZONE })
    );

    if (!isWorkDay(schedule[scheduleIndex])) {
        return "Aujourd'hui, auto ne travaille pas.";
    }

    if (isCurrentShift(currentHour, schedule[scheduleIndex])) {
        return (
            "Aujourd'hui, auto travaille" +
            scheduleToString(schedule[scheduleIndex])
        );
    }

    return (
        'Demain, auto travaille' +
        scheduleToString(schedule[getNextIndex(scheduleIndex, schedule.length)])
    );
};
