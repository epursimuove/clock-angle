export type Coordinate = {
  x: number;
  y: number;
};

export type Coordinates = {
  outer: Coordinate;
  inner: Coordinate;
  numberHourCenter?: Coordinate;
  numberMinuteCenter?: Coordinate;
};

export type Hand = {
  // x: number;
  // y: number;
  angleDeg: number;
  angleRad: number;
};

export type State = {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  secondHand: Hand;
  minuteHand: Hand;
  hourHand: Hand;
};

export interface Settings {
  showAngles: boolean;
  showDigitalClock: boolean;
  twentyFourHours: boolean;
  faceWithNumbers: boolean;
  smoothSecondHand: boolean;
  smoothMinuteHand: boolean;
  smoothHourHand: boolean;
  showSecondHand: boolean;
  showHands: boolean;
}
