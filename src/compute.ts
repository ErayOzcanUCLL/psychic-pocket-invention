import {Frame, Game, LastFrame} from "./types";

export function compute(game: Game): number {
    throw new Error("Not yet implemented"); // TODO
    //todo also check max score 300
}

function framepoints(frame: Frame | LastFrame): number {
    if (isStrike(frame) || isSpare(frame)) return 0;// will handle in other function {
    return frameSum(frame);
}

function isStrike(frame: Frame | LastFrame): boolean {
    throw new Error("Not yet implemented"); // TODO
}

function isSpare(frame: Frame | LastFrame): boolean {
    throw new Error("Not yet implemented"); // TODO
}

function frameSum(frame: Frame | LastFrame): number {
    throw new Error("Not yet implemented"); // TODO
}