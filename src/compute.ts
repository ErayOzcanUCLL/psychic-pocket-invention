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
    return frame[0] === 10 && frame.length >= 2;
}

function isSpare(frame: Frame | LastFrame): boolean {
    return frame.length === 2 && frame[0] + frame[1] === 10 && frame[0] !== 10;
}

function isDouble(frame: Frame | LastFrame, nextFrame: Frame | LastFrame): boolean {
    return isStrike(frame) && isStrike(nextFrame);
}

function frameSum(frame: Frame | LastFrame): number {
    return frame.reduce((a, b) => a + b, 0);
}