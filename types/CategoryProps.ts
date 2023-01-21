export type CategoryProps = {
    count: number
    next: string
    previous: string
    results: Array<{
        id: string
        name: string
        color: string
        level: number
        icon: string
        is_active: boolean
        parent?: string
    }>
}
