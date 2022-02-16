export enum HeroAttr {
  STR = 'Strength',
  AGI = 'Agility',
  INT = 'Intelligence',
}

export interface Hero {
  name: string;
  attr: HeroAttr;
  url: string;
  img: string;
}
