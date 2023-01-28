export type CategoryDetialProps = {
    id: string
    child: Array<{
        id: string
        name: string
        level: number
        is_active: boolean
    }>
    product: Array<{
        id: string
        color_type: any
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
    name: string
    color: string
    level: number
    icon: string
    is_active: boolean
    parent: any
}