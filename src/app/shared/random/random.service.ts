export class RandomService {
  public static getRandomNumber(maxNumber: number): number {
    return Math.floor(Math.random() * maxNumber);
  }

  public static getRandomFromList(list: any[]) {
    const index = RandomService.getRandomNumber(list.length);
    return list[index];
  }
}