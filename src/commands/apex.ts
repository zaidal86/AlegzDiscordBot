import axios, { AxiosResponse } from 'axios';

interface MapRotationData {
    battle_royale: {
        current: {
            map: string;
            remainingTimer: string;
        };
    };
}

const url: string = `https://api.mozambiquehe.re/maprotation?version=5&auth=${process.env.APEX_TOKEN}`;

export const currentPubMap = async (): Promise<string> => {
    const response: AxiosResponse<MapRotationData> = await axios.get(url);
    const data: MapRotationData = response.data;

    const pubMap = `C'est ${data.battle_royale.current.map} pendant encore ${data.battle_royale.current.remainingTimer}`;

    return pubMap;
};