export type CategoryProps = {
    count: number
    next: any
    previous: any
    results: Array<{
        id: string
        category_name: string
        icon: string
        color: string
    }>
}