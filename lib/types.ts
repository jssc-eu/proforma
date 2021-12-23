
export interface PostAddress {
  name: string;
  zip: string;
  city: string;
  address: string;
}

export interface RawPartner {
  taxNumber: string;
  address: string;
  city: string;
  countryCode: string;
  companyName: string;
  name?: string;
  zip?: string;
  state?: string;
  reference?: string;
  email?: string;
}

export interface Partner {
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

export interface RawItem {
  price: number;
  quantity: number;
  title: string;
  isOnlineService: boolean;
  discount?: number;
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
  TEHK = 'TEHK',
  Regular = 27,
}
