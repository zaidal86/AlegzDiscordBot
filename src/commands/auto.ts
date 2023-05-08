export const autoSchedule = (): string => {
    const startDate: Date = new Date('2023-05-06');
    const today: Date = new Date();

    const daysDifference: number =
        Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) % 14;

    let schedule: string;

    if (daysDifference >= 0 && daysDifference < 2) {
        schedule = "Aujourd'hui, auto travaille de 5h à 13h.";
    } else if (daysDifference >= 2 && daysDifference < 4) {
        schedule = "Aujourd'hui, auto travaille de 13h à 21h.";
    } else if (daysDifference >= 4 && daysDifference < 6) {
        schedule = "Aujourd'hui, auto travaille de 21h à 5h.";
    } else {
        schedule = "Aujourd'hui, auto ne travaille pas.";
    }

    const currentTime: number = today.getHours() + today.getMinutes() / 60;
    let timeLeft: number;

    if (schedule.includes('ne travaille pas')) {
        const nextWorkDay: number = 2 - (daysDifference % 2);
        timeLeft = 5 - currentTime + (nextWorkDay - 1) * 24 - 0.5;
        let timeText: string =
            timeLeft > 24
                ? `${Math.floor(timeLeft / 24)} jour${
                      Math.floor(timeLeft / 24) > 1 ? 's' : ''
                  } et `
                : '';
        schedule += ` Il s'en va dans ${timeText}${Math.floor(
            timeLeft % 24
        )} heures et ${Math.round((timeLeft % 1) * 60)} minutes.`;
    } else {
        const endHour: number = schedule.includes("21h") ? 29 : parseFloat(schedule.slice(-6, -4));
        timeLeft = endHour - currentTime + 0.25;
        schedule += ` Il reviendra dans ${Math.floor(
            timeLeft
        )} heures et ${Math.round((timeLeft % 1) * 60)} minutes.`;
    }

    return schedule;
};
