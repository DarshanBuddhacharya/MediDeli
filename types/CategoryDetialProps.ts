export type CategoryDetialProps = {
    id: string
    child: Array<{
        id: string
        name: string
        level: number
        is_active: boolean
    }>
    name: string
    color: string
    level: number
    icon: string
    is_active: boolean
    parent: any
}