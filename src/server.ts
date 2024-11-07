import express from "express";
import {compute} from "./compute";
import {Game} from "./types";

export const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
    try {
        const game = request.body.game;

        function isValidGame(game: any): game is Game {
            //check if its an array and has 10 frames
            if (!Array.isArray(game) || game.length !== 10) return false;

            //check if its the frame is an array and has 2 rolls (only first 9 rolls) and if the value of the roll (pin) is btwn 0 and 10 and a number :)
            for (let i = 0; i < 9; i++) {
                const frame = game[i];
                if (!Array.isArray(frame) || frame.length !== 2 || !frame.every(pin => typeof pin === "number" && pin >= 0 && pin <= 10)) return false;
            }

            //frame 10 heeft 3 rolls so seperate check
            const lastFrame = game[9];
            return Array.isArray(lastFrame) && lastFrame.length === 3 && lastFrame.every(pin => typeof pin === "number" && pin >= 0 && pin <= 10);
        }

        //validation check 
        if (!isValidGame(game)) {
            return response.status(400).json({error: "Invalid Game format"});
        }

        //calculate score if it's valid.
        const score = compute(game);
        return response.status(200).json({score});
    } catch (error) {
        console.error(error);
        return response.status(500).json({error: "Internal Server Error"});
    }

});
