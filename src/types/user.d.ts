export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    role?: number;
    location?: string;
    biography?: string;
    image?: string;
    status: number;
}
