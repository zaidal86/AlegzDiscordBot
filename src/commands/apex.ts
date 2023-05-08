import axios, { AxiosResponse } from 'axios';
import { load as cheerioLoad } from 'cheerio';
import { parse, format, addHours } from 'date-fns';

const url: string = 'https://apexlegendsstatus.com/current-map';

export const currentPubMap = async (): Promise<string> => {
    const response: AxiosResponse = await axios.get(url);
    const html: string = response.data;
    const $ = cheerioLoad(html);

    let pubMap: string = $(
        'main.wrapper > div.row > div.col-lg-6 > div.row > div.col-lg-8 > div > h1'
    )
        .first()
        .text()
        .replace('Battle Royale: ', "C'est ");

    const timeText: string = $(
        'main.wrapper > div.row > div.col-lg-6 > div.row > div.col-lg-8 > div > h5'
    )
        .first()
        .text();

    const [, startTime, endTime] = timeText.match(
        /From (\d{2}:\d{2}) to (\d{2}:\d{2})/
    ) as RegExpMatchArray;

    const timezoneOffset: number = 2;
    const adjustedStartTime: Date = addHours(
        parse(startTime, 'HH:mm', new Date()),
        timezoneOffset
    );
    const adjustedEndTime: Date = addHours(
        parse(endTime, 'HH:mm', new Date()),
        timezoneOffset
    );

    const formattedStartTime: string = format(adjustedStartTime, 'HH:mm');
    const formattedEndTime: string = format(adjustedEndTime, 'HH:mm');

    const adjustedTimeText: string = ` de ${formattedStartTime} à ${formattedEndTime}.`;

    pubMap += adjustedTimeText;

    return pubMap;
};
