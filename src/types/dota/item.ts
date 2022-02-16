export enum ItemType {
  Basic = 'Basic',
  Upgrade = 'Upgrade',
  Neutral = 'Neutral',
  RoshanDrop = 'Roshan Drop',
}

export enum BasicItemCategory {
  Consumables = 'Consumables',
  Attributes = 'Attributes',
  Equipment = 'Equipment',
  Miscellaneous = 'Miscellaneous',
  SecretShop = 'Secret Shop',
}

export interface BasicItem {
  name: string;
  img: string;
  url: string;
  category: BasicItemCategory;
  price: number;
  type: ItemType.Basic;
}

export enum UpgradeItemCategory {
  Accessories = 'Accessories',
  Support = 'Support',
  Magical = 'Magical',
  Armor = 'Armor',
  Weapons = 'Weapons',
  Artifacts = 'Artifacts',
}

export interface UpgradeItem {
  name: string;
  img: string;
  url: string;
  category: UpgradeItemCategory;
  price: number;
  type: ItemType.Upgrade;
}

export enum NeutralItemTier {
  Tier1 = 'Tier 1',
  Tier2 = 'Tier 2',
  Tier3 = 'Tier 3',
  Tier4 = 'Tier 4',
  Tier5 = 'Tier 5',
}

export interface NeutralItem {
  name: string;
  img: string;
  url: string;
  tier: NeutralItemTier;
  type: ItemType.Neutral;
}

export interface RoshanItem {
  name: string;
  img: string;
  url: string;
  price?: number;
  type: ItemType.RoshanDrop;
}

export type Item = BasicItem | UpgradeItem | NeutralItem | RoshanItem;
