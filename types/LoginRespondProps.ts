export type LoginRespondProps = {
    token: {
        refresh: string
        access: string
    }
    user: {
        id: number
        phone: string
        full_name: string
        is_valid: boolean
        has_account: boolean
    }
    message: string
}