const startDate: Date = new Date('2023-05-06');
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

export const autoSchedule = (): string => {
    const today: Date = new Date();
    let output: string = '';

    const daysSinceStart: number = Math.floor(
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const scheduleIndex: number = daysSinceStart % schedule.length;
    const currentHour: number = today.getHours();

    if (schedule[scheduleIndex].start === null) {
        output = "Aujourd'hui, auto ne travaille pas.";
    } else if (currentHour < schedule[scheduleIndex].end) {
        output =
            "Aujourd'hui, auto travaille de " +
            schedule[scheduleIndex].start +
            'h à ' +
            schedule[scheduleIndex].end +
            'h.';
    } else {
        output =
            'Demain, auto travaille de ' +
            schedule[scheduleIndex + 1].start +
            'h à ' +
            schedule[scheduleIndex + 1].end +
            'h.';
    }

    return output;
};
