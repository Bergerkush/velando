import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((product) => {
    setItems(prev => {
      // Уникальность по id + размеру
      const key = `${product.id}-${product.selectedSize || 'no-size'}`
      const existing = prev.find(i => `${i.id}-${i.selectedSize || 'no-size'}` === key)
      if (existing) {
        return prev.map(i =>
          `${i.id}-${i.selectedSize || 'no-size'}` === key
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((id, selectedSize) => {
    setItems(prev => prev.filter(i => !(i.id === id && (i.selectedSize || 'no-size') === (selectedSize || 'no-size'))))
  }, [])

  const changeQty = useCallback((id, delta, selectedSize) => {
    setItems(prev => {
      return prev.map(i => {
        if (i.id !== id || (i.selectedSize || 'no-size') !== (selectedSize || 'no-size')) return i
        const newQty = i.qty + delta
        return newQty <= 0 ? null : { ...i, qty: newQty }
      }).filter(Boolean)
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.new_price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, changeQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
