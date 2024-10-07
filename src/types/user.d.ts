export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    role?: string;
    location?: string;
    biography?: string;
    image?: string;
    status: number;
}
