import { CartItem, UserDetails } from "@/context/AppContext";

export function generateWhatsAppLink(user: UserDetails, cart: CartItem[], total: number, orderId: string): string {
  const phoneNumber = "923143181261"; // 0314-3181261
  
  let message = `*New Order!* 🚀\n`;
  message += `*Order ID:* ${orderId}\n\n`;
  
  message += `*Customer Details:*\n`;
  message += `Name: ${user.name}\n`;
  message += `Phone: ${user.phone}\n`;
  message += `Address: ${user.address}\n\n`;
  
  message += `*Order Items:*\n`;
  cart.forEach(item => {
    message += `- ${item.quantity}x ${item.name} (Rs. ${item.price * item.quantity})\n`;
  });
  
  message += `\n*Total Bill: Rs. ${total}*`;

  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // Return the wa.me link
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
