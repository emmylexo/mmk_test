
export interface AccountInterface {
    id: number;
    auth_id: string;
    username: string;
}

interface defaultResponseInterface {
    success: boolean,
    message: string,
    data: AccountInterface | [AccountInterface] | unknown
}