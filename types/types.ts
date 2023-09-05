export interface UsersData {
    success: boolean;
    page: number,
    total_users: number,
    count: number,
    users: User[]
}
export interface User {
    id: number,
    name: string,
    email: string,
    phone: string,
    position: string,
    photo: string
}
export interface CreateUser {
    name: string
    email: string
    phone: string
    position_id: string
    photo: Photo[]
}

export interface PositionsData {
    success: boolean;
    positions: Positions[];
}
export interface Positions {
    id: number;
    name: string;
}
export interface TokenData {
    success: boolean;
    token: string;
}

export interface Photo {
    name: string
    type: string
    size: number
}