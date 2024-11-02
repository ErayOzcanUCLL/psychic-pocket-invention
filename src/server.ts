import http from "http";
import express from "express";
import { compute } from "./compute";
import {Game} from "./types";

export const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;
  // TODO: Validate input
// function that checks if 
  function isValidGame(game: any): game is Game {
    //check if its an array and has 10 frames
    if (!Array.isArray(game) || game.length !== 10) return false;
    
    //check if its the frame is an array and has 2 rolls (only first 9 rolls) and if the value of the roll (pin) is btwn 0 and 10 and a number :)
    for (let i = 0 ; i < 9; i++) {
      const frame = game[i];
      if (!Array.isArray(frame) || frame.length !== 2 || !frame.every(pin => typeof pin === "number" && pin >= 0 && pin <= 10)) return false;
      
      
  }
  


  const score = compute(game);
  return response.json({ score });

  // TODO: Return response
});
