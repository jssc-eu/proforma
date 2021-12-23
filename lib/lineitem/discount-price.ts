
export default function discountPrice (price:number, discount: number):number {
  return price - (price * discount / 100);
}
