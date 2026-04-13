import productsData from '../public/products.json'

export function getAllProducts() {
  return productsData
}

export function getProductById(id) {
  return productsData.find(p => p.id === parseInt(id))
}

export function getAllBrands() {
  const brands = new Set(productsData.map(p => p.brand).filter(Boolean))
  return [...brands].sort()
}

export function getAllAktivitaeten() {
  const akts = new Set()
  productsData.forEach(p => {
    if (p.aktivitaet) {
      p.aktivitaet.split(',').forEach(a => {
        const t = a.trim()
        if (t) akts.add(t)
      })
    }
  })
  return [...akts].sort()
}
