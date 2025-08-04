export enum WeaponCategory {
  ASSAULT_RIFLE = 'Assault Rifle',
  SMG = 'Submachine Gun',
  SNIPER = 'Sniper Rifle',
  SHOTGUN = 'Shotgun',
  LMG = 'Light Machine Gun',
  PISTOL = 'Pistol',
  MELEE = 'Melee',
  THROWABLE = 'Throwable',
}

export interface Weapon {
  name: string;
  category: WeaponCategory;
  img: string;
  url: string;
  damage?: number;
  fireRate?: string;
  ammoType?: string;
} 