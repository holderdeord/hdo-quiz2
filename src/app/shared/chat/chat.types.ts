export type TChatLog = {
  entries: TChatLogTextEntry[];
};

export type TChatLogTextEntry = {
  bot: boolean;
  text: string;
};