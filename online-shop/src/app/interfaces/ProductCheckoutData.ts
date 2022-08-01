export interface ProductCheckoutData {
  customer: string | null,
  products: {productId: number, quantity: number}[]
}
