import countryCodes from 'lib/countrycodes';
import { Partner, Item, VatRate } from 'lib/types';

export const NON_VAT_ACT = 'Falling outside the territorial scope of the VAT Act.';
export const REVERSE_CHARGE_VAT = 'Reverse charge VAT.';

export default function getTaxComment (buyer: Partner, items: Item[]): string {
  const isHU = countryCodes(buyer.country).isHungarian();
  const isEU = countryCodes(buyer.country).isEuropean();

  if (isHU) return '';

  if (buyer.taxNumber === '' && isEU) return NON_VAT_ACT;

  if (items.some(item => item.vat === VatRate.TEHK)) return REVERSE_CHARGE_VAT;

  if (!isHU && !isEU) return NON_VAT_ACT;

  return '';
};
