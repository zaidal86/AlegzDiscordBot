import { utcToZonedTime, format } from 'date-fns-tz';

const PARIS_TIMEZONE: string = 'Europe/Paris';

const startDate: Date = utcToZonedTime(new Date('2023-05-06'), PARIS_TIMEZONE);
const schedule: { start: number | null; end: number | null }[] = [
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

const isWorkDay = (schedule: {
    start: number | null;
    end: number | null;
}): boolean => schedule.start !== null && schedule.end !== null;

const isCurrentShift = (
    currentHour: number,
    schedule: { start: number | null; end: number | null }
): boolean =>
    schedule.start !== null &&
    schedule.end !== null &&
    (schedule.start < schedule.end
        ? currentHour >= schedule.start && currentHour < schedule.end
        : currentHour >= schedule.start || currentHour < schedule.end);

const scheduleToString = (schedule: {
    start: number | null;
    end: number | null;
}): string =>
    schedule.start !== null && schedule.end !== null
        ? ` de ${schedule.start}h à ${schedule.end}h.`
        : '';

const getNextIndex = (currentIndex: number, arrayLength: number): number =>
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
