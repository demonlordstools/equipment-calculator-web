export enum Element {
    NONE = 'NONE',
    FIRE = 'FIRE',
    EARTH = 'EARTH',
    AIR = 'AIR',
    ICE = 'ICE',
    FIRE_AIR = 'FIRE_AIR',
    EARTH_ICE = 'EARTH_ICE',
}

// @ts-ignore
export const elements = Object.keys(Element).map((k) => Element[k]);
