export type LoginRespondProps = {
    token: {
        refresh: string
        access: string
    }
    user: {
        phone: string
        full_name: string
        is_valid: boolean
    }
    message: string
}