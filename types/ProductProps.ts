export type ProductProps = {
    count: number
    next: any
    previous: any
    results: Array<{
        id: string
        color_type: {
            id: string
            color_name: string
            color_code: string
        }
        quantity_type: any
        size_type: any
        product: {
            id: string
            category: {
                id: string
                category_name: string
                icon: string
                color: string
            }
            brand: {
                id: string
                brand_name: string
                country: string
                image: string
            }
            product_name: string
            description: string
            stock: number
        }
        image: string
        price: number
        amount: number
    }>
}