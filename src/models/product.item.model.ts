import { ApiProperty } from "@nestjs/swagger";

export class ProductItemModel {
    @ApiProperty({ 
        required: false,
        example: "20A5718D-9991-47BB-A283-D3CC1731C0C3", 
        description: 'The ProductItem identifier, It will be assigned when it is being created.' })
    id: string;

    @ApiProperty({ 
        required: false,
        example: "20A5718D-9991-47BB-A283-31C0C3D3CC17", 
        description: 'The Product identifier' })
    productId: string;

    @ApiProperty({ 
        required: false,
        example: 50, 
        description: 'Product price' })
    quantity: number;

    public calculateTotal(unit_price: number): number {
        let total = unit_price * this.quantity;        
        return Math.round(total);
    }
}