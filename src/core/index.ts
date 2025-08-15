export type Distance = number;

export type Height = number;

export type Skyline = Height[];

export type Candidate = Skyline;

export type Candidates = Candidate[];

export type Skyscraper = Height;

export const serialize = (skyline: Skyline): string => skyline.join(",");

export const reverse = (skyline: Skyline): Skyline => [...skyline].reverse();
