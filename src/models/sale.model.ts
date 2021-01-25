import { ApiProperty } from "@nestjs/swagger";
import { ProductItemModel } from "./product.item.model";

let exampleItem = new ProductItemModel();
exampleItem.id = "20A5718D-9991-47BB-A283-C0C3C311C7D3";
exampleItem.productId = "20A5718D-9991-47BB-A283-C0C3C3117D3C";
exampleItem.quantity = 50;

export class SaleModel {
    @ApiProperty({ 
        required: false,
        example: "20A5718D-9991-47BB-A283-D3CC1731C0C3", 
        description: 'The FoodSale identifier, It will be assigned when it is being created.' })
    id: string;

    @ApiProperty({ 
        required: true,
        example: "20A5718D-9991-47BB-A283-C0C3D3CC3117", 
        description: "The Customer identifier" })
    customerId: string;

    @ApiProperty({ 
        required: true,
        example: true, 
        description: "The food is to eat in the local location" })
    forTable: boolean;

    @ApiProperty({ 
        required: true,
        example: [exampleItem], 
        description: "List of product items models" })
    products: ProductItemModel[];
}