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

    const workEnd: Date = new Date(today);
    workEnd.setHours(0, 0, 0, 0);

    if (daysDifference >= 0 && daysDifference < 6) {
        workEnd.setHours((daysDifference % 2) * 8 + 5, 0, 0, 0);
        const timeLeft: number = workEnd.getTime() - today.getTime() + (15 * 60 * 1000);
        const hoursLeft: number = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft: number = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        schedule += ` Il revient dans ${hoursLeft} heures et ${minutesLeft} minutes.`;
    } else {
        workEnd.setDate(today.getDate() + (6 - daysDifference));
        workEnd.setHours(5, 0, 0, 0);
        const timeLeft: number = workEnd.getTime() - today.getTime() - (30 * 60 * 1000);
        const hoursLeft: number = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft: number = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const daysLeft: number = 6 - daysDifference;

        if (daysLeft > 0) {
            schedule += ` Il s'en va dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}, ${hoursLeft} heures et ${minutesLeft} minutes.`;
        } else {
            schedule += ` Il s'en va dans ${hoursLeft} heures et ${minutesLeft} minutes.`;
        }
    }

    return schedule;
};
