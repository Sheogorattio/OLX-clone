export interface IListing{
    id: string;
    name :string;
    description?: string;
    price :number;
    isAvailable: boolean;
    userId :string;
    locationId? :string;
    categoryId? :string;
}