export interface IListing{
    name :string;
    description?: string;
    price :number;
    isAvailable: boolean;
    userId :string;
    locationId? :string;
    categoryId? :string;
    pictures?: string[];
}