import {Frame, Game, LastFrame} from "./types";

// export function compute(game: Game): number {
//     return game.reduce((total, frame, index) => {
//         return total
//             + framepoints(frame)
//             + strikeBonus(game, index, frame)
//             + spareBonus(frame, game[index + 1]);
//     }, 0);
//     
//     
// }


//alternative solution :(
export function compute(game: Game): number {
    let total = 0;
    let bonusPoints = 0;

    for (let i = 0; i < game.length; i++) {
        const frame = game[i];
        total += framepoints(frame);

        if (isStrike(frame)) {
            bonusPoints += strikeBonus(game, i, frame);
        } else if (isSpare(frame)) {
            bonusPoints += spareBonus(frame, game[i + 1]);
        }
    }

    return Math.min(total + bonusPoints, 300);
}

function frameSum(frame: Frame | LastFrame): number {
    return frame.reduce((a, b) => a + b, 0);
}

//region points
//for handling points without bonus
function framepoints(frame: Frame | LastFrame): number {
    if (isStrike(frame) || isSpare(frame)) return 0;// will handle in other function {
    return frameSum(frame);
}

function spareBonus(frame: Frame | LastFrame, nextFrame: Frame | LastFrame): number {
    if (isSpare(frame) && nextFrame) {
        return frameSum(frame) + nextFrame[0];
    }
    return 0;
}

//bonus for strikes, double and turkey
function strikeBonus(game: Game, index: number, frame: Frame | LastFrame): number {
    const nextFrame = game[index + 1];
    const nextNextFrame = game[index + 2];
    const nextNextNextFrame = game[index + 3];


    if (nextFrame && nextNextFrame && nextNextNextFrame && isFourBagger(frame, nextFrame, nextNextFrame, nextNextNextFrame)) {
        return 40;
    } else if (nextFrame && nextNextFrame && isTurkey(frame, nextFrame, nextNextFrame)) {
        return 30;
    } else if (nextFrame && isDouble(frame, nextFrame)) {
        return 20 + (nextNextFrame ? nextNextFrame[0] : 0);
    } else if (isStrike(frame) && nextFrame) {
        return 10 + frameSum(nextFrame);
    }
    return 0;
}

//endregion
//region isX
function isStrike(frame: Frame | LastFrame): boolean {
    return frame && frame[0] === 10
}

function isSpare(frame: Frame | LastFrame): boolean {
    return frame.length === 2 && frame[0] + frame[1] === 10 && frame[0] !== 10;
}

function isDouble(frame: Frame | LastFrame, nextFrame: Frame | LastFrame): boolean {
    return frame && nextFrame && isStrike(frame) && isStrike(nextFrame);
}

function isTurkey(frame: Frame | LastFrame, nextFrame: Frame | LastFrame, nextNextFrame: Frame | LastFrame): boolean {
    return frame && nextFrame && nextNextFrame && isStrike(frame) && isStrike(nextFrame) && isStrike(nextNextFrame);
}

function isFourBagger(frame: Frame | LastFrame, nextFrame: Frame | LastFrame, nextNextFrame: Frame | LastFrame, nextNextNextFrame: Frame | LastFrame): boolean {
    return frame && nextFrame && nextNextFrame && nextNextNextFrame && isStrike(frame) && isStrike(nextFrame) && isStrike(nextNextFrame) && isStrike(nextNextNextFrame);
}

//endregion
