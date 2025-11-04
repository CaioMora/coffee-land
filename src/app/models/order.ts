export interface Order {
  coffeeId: number;
  coffeeName: string;
  size: 'Pequeno' | 'Médio' | 'Grande';
  quantity: number;
  price: number;
  couponCode?: string;
  total: number;
}