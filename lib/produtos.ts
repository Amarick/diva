export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  sizes: string[]
  colors: string[]
  inStock: boolean
}

export const products: Product[] = Array.from({ length: 22 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Produto ${i + 1}`,
  description: "",
  price: Math.floor(Math.random() * 400) + 100, // preço aleatório entre 100 e 500
  category: "Categoria",
  image: `/roupas/loja${i + 1}.jpg`,
  sizes: ["P", "M", "G", "GG"],
  colors: ["Cor Única"],
  inStock: true,
}))

export const categories = [
  "Todos",
  "Vestidos",
  "Blusas",
  "Calças",
  "Saias",
  "Blazers",
  "Conjuntos",
  "Jaquetas",
  "Tops",
  "Shorts",
  "Macacões",
  "Cardigans",
  "Camisas",
]
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}