export type ProductProps = {
    count: number
    result: Array<{
        category: {
            category_name: string
            slug: string
        }
        quantity_type: any
        color_type: any
        size_type: any
        product_name: string
        image: string
        price: string
        description: string
        stock: number
        slug: string
    }>
}