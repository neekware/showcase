export type Translations = {
  [locale: string]: {
    [namespace: string]: {
      [key: string]: string;
    };
  };
};
