
export interface PostAddress {
  name: string;
  zip: string;
  city: string;
  address: string;
}

export interface Buyer {
  name: string;
  email: string;
  sendEmail: boolean;
  country: string;
  zip: string;
  city: string;
  taxNumber?: string;
  taxSubject: number;
  address: string;
  postAddress: PostAddress;
  identifier: string;
  phone: string;
  issuerName: string;
  isTEHK: boolean;
}

export interface Item {
  label: string;
  quantity: number;
  unit: string;
  vat: string | number;
  comment?: string;
  netValue?: number;
  netUnitPrice?: number;
  grossValue?: number;
  grossUnitPrice?: number;
}

export enum VatRate {
  TEHK = "TEHK",
  Regular = 27,
}
