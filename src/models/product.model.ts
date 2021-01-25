import { ApiProperty } from "@nestjs/swagger";

export class Product {
    @ApiProperty({required: true, example:"CA3BF234-5CCF-11EB-AE93-0242AC130002"})
    id: string;

    @ApiProperty({required: true})
    name: string;

    @ApiProperty({required: false})
    description: string;

    @ApiProperty({required: false})
    price: number;

    @ApiProperty({required: true, default: false})
    active: boolean;
}