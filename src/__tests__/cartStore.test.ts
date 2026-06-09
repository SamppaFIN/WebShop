import { describe, it, expect, beforeEach } from "vitest"
import { useCartStore, totalItems } from "@/store/cartStore"

describe("cartStore", () => {
  beforeEach(() => useCartStore.setState({ items: [] }))

  it("addItem lisää tuotteen", () => {
    useCartStore.getState().addItem("prod-1")
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].productId).toBe("prod-1")
  })

  it("addItem kahdesti kasvattaa quantityä", () => {
    useCartStore.getState().addItem("prod-1")
    useCartStore.getState().addItem("prod-1")
    expect(useCartStore.getState().items[0].quantity).toBe(2)
  })

  it("removeItem poistaa tuotteen", () => {
    useCartStore.getState().addItem("prod-1")
    useCartStore.getState().removeItem("prod-1")
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it("updateQuantity muuttaa määrän", () => {
    useCartStore.getState().addItem("prod-1")
    useCartStore.getState().updateQuantity("prod-1", 5)
    expect(useCartStore.getState().items[0].quantity).toBe(5)
  })

  it("updateQuantity 0 poistaa tuotteen", () => {
    useCartStore.getState().addItem("prod-1")
    useCartStore.getState().updateQuantity("prod-1", 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it("clearCart tyhjentää", () => {
    useCartStore.getState().addItem("prod-1")
    useCartStore.getState().addItem("prod-2")
    useCartStore.getState().clearCart()
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it("totalItems laskee oikein", () => {
    useCartStore.getState().addItem("prod-1", 2)
    useCartStore.getState().addItem("prod-2", 3)
    expect(totalItems(useCartStore.getState().items)).toBe(5)
  })
})
