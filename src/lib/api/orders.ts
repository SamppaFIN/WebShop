import { supabase } from "@/lib/supabase"
import type { Order, OrderItem, Address, CartItem } from "@/types"

interface ProductSnapshot {
  id: string
  title: string
  price: number
  inventoryCount: number
}

export async function createOrder(
  userId: string,
  cartItems: CartItem[],
  address: Address
): Promise<Order> {
  // 1. Hae tuotteiden hintatiedot
  const productIds = cartItems.map((i) => i.productId)
  const { data } = await supabase
    .from("Product")
    .select("id,title,price,inventoryCount")
    .in("id", productIds)

  const products = (data ?? []) as unknown as ProductSnapshot[]

  if (products.length === 0) throw new Error("Tuotteita ei löytynyt")

  // 2. Laske kokonaissumma ja rakenna tilausrivit
  const orderItems: Omit<OrderItem, "orderId">[] = []
  let totalAmount = 0

  for (const item of cartItems) {
    const product = products.find(p => p.id === item.productId)
    if (!product) throw new Error(`Tuotetta ${item.productId} ei löytynyt`)
    if (product.inventoryCount < item.quantity) {
      throw new Error(`Tuotetta ${product.title} ei ole riittävästi varastossa`)
    }
    const lineTotal = product.price * item.quantity
    totalAmount += lineTotal
    orderItems.push({
      productId: product.id,
      title: product.title,
      quantity: item.quantity,
      priceAtPurchase: product.price,
    })
  }

  // 3. Luo tilaus
  const { data: order, error } = await supabase
    .from("Order")
    .insert({
      userId,
      status: "pending",
      totalAmount: Number(totalAmount.toFixed(2)),
      shippingAddress: address as unknown as Record<string, unknown>,
    })
    .select("*")
    .single()

  if (error || !order) throw new Error(error?.message ?? "Tilauksen luonti epäonnistui")

  // 4. Lisää tilausrivit
  const { error: itemsError } = await supabase
    .from("OrderItem")
    .insert(orderItems.map(o => ({ ...o, orderId: order.id })))

  if (itemsError) throw new Error(itemsError.message)

  // 5. Vähennä varastosaldoja
  for (const item of cartItems) {
    await supabase.rpc("decrement_stock", {
      p_product_id: item.productId,
      p_quantity: item.quantity,
    })
  }

  return order as Order
}

export async function getMyOrders(userId: string): Promise<Order[]> {
  const { data: orders, error } = await supabase
    .from("Order")
    .select("*, items:OrderItem(*)")
    .eq("userId", userId)
    .order("createdAt", { ascending: false })

  if (error) throw new Error(error.message)
  return orders as unknown as Order[]
}

export async function getOrderById(orderId: string, userId: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from("Order")
    .select("*, items:OrderItem(*)")
    .eq("id", orderId)
    .eq("userId", userId)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw new Error(error.message)
  }
  return data as unknown as Order
}
