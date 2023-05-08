export const autoSchedule = (): string => {
    const startDate: Date = new Date('2023-05-06');
    const today: Date = new Date();

    const daysDifference: number =
        Math.floor(
            (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) % 14;

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

    const workStart: Date = new Date(today);
    const workEnd: Date = new Date(today);
    workStart.setHours(0, 0, 0, 0);
    workEnd.setHours(0, 0, 0, 0);

    if (daysDifference >= 0 && daysDifference < 6) {
        const shiftStartHour = (daysDifference % 2) * 8 + 5;
        const shiftEndHour = shiftStartHour + 8;
        workStart.setHours(shiftStartHour, 0, 0, 0);
        workEnd.setHours(shiftEndHour, 0, 0, 0);
        if (today >= workStart && today <= workEnd) {
            const timeLeft: number =
                workEnd.getTime() - today.getTime() + 15 * 60 * 1000;
            const hoursLeft: number = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutesLeft: number = Math.floor(
                (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
            );
            schedule += ` Il finit dans ${hoursLeft} heures et ${minutesLeft} minutes.`;
        } else if (today < workStart) {
            const timeLeft: number =
                workStart.getTime() - today.getTime() - 30 * 60 * 1000;
            const hoursLeft: number = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutesLeft: number = Math.floor(
                (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
            );
            schedule += ` Il s'en va dans ${hoursLeft} heures et ${minutesLeft} minutes.`;
        }
    }

    return schedule;
};
