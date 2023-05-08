import axios from 'axios';
import { load as cheerioLoad } from 'cheerio';
import { parse, format, addHours } from 'date-fns';

const url = 'https://apexlegendsstatus.com/current-map';

export const currentPubMap = async () => {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerioLoad(html);

    let pubMap = $(
        'main.wrapper > div.row > div.col-lg-6 > div.row > div.col-lg-8 > div > h1'
    )
        .first()
        .text()
        .replace('Battle Royale: ', 'Map actuelle : ');

    const timeText = $(
        'main.wrapper > div.row > div.col-lg-6 > div.row > div.col-lg-8 > div > h5'
    )
        .first()
        .text();

    // Extract the start and end times from the timeText
    const [, startTime, endTime] = timeText.match(
        /From (\d{2}:\d{2}) to (\d{2}:\d{2})/
    );

    // Parse the start and end times and adjust them by the timezone offset
    const timezoneOffset = 2; // Adjust this value according to your desired timezone offset
    const adjustedStartTime = addHours(
        parse(startTime, 'HH:mm', new Date()),
        timezoneOffset
    );
    const adjustedEndTime = addHours(
        parse(endTime, 'HH:mm', new Date()),
        timezoneOffset
    );

    // Format the adjusted times back to the original format
    const formattedStartTime = format(adjustedStartTime, 'HH:mm');
    const formattedEndTime = format(adjustedEndTime, 'HH:mm');

    // Update the timeText with the adjusted times
    const adjustedTimeText = ` de ${formattedStartTime} à ${formattedEndTime}.`;

    pubMap += adjustedTimeText;

    return pubMap;
};
