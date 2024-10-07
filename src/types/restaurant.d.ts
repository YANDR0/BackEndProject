export interface Restaurant {
    id?: string;
    name: string;
    rating?: number;
    description: string;
    category: number[];
    location: string;
    menu?: File;
}
