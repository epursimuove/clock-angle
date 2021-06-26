import { Coordinate } from "@/types/Coordinate";

export type Coordinates = {
    outer: Coordinate;
    inner: Coordinate;
    numberHourCenter?: Coordinate;
    numberMinuteCenter?: Coordinate;
};
