export class Offer{
    id: number;
    skuName: string;
    title: string;
    links: string[];
    description: string;
    images: string[];
    categories: string[];
    editing?: boolean;
    validation?: string;
    isValid?: boolean;
}