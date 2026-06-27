export enum OrderStatusEnum {
  PENDING = 'PENDING', // Order created, waiting for payment

  PAYMENT_PENDING = 'PAYMENT_PENDING', // Waiting for payment confirmation
  PAID = 'PAID', // Payment completed successfully
  PAYMENT_FAILED = 'PAYMENT_FAILED', // Payment failed

  PROCESSING = 'PROCESSING', // Seller is preparing the order
  PACKED = 'PACKED', // Order has been packed
  SHIPPED = 'SHIPPED', // Order shipped
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', // Courier is delivering the order
  DELIVERED = 'DELIVERED', // Customer received the order

  CANCELLED = 'CANCELLED', // Order cancelled
  RETURN_REQUESTED = 'RETURN_REQUESTED', // Customer requested a return
  RETURNED = 'RETURNED', // Returned by customer
  REFUNDED = 'REFUNDED', // Refund completed

  FAILED = 'FAILED', // Unexpected processing failure
}
