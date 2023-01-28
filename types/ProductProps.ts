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
                name: string
                color: string
                level: number
                icon: string
                is_active: boolean
                parent: any
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