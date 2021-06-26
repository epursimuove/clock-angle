import { Hand } from "@/types/Hand";

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
