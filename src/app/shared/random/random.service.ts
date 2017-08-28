import { Injectable } from "@angular/core";

@Injectable()
export class RandomService {
  getRandomNumber(maxNumber: number): number {
    return Math.floor(Math.random() * maxNumber) + 1;
  }
}