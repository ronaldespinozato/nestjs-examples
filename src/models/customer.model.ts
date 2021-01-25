import { ApiProperty } from "@nestjs/swagger";

export class CustomerModel {
    @ApiProperty({
        required: true,
        example: "20A5718D-9991-47BB-A283-C0C3D3CC1731",
        description: 'Customer identifier, it is not required when it is being created.' })
    id: string;

    @ApiProperty({
        required: true,
        example: "20A5718D-9991-47BB-A283-C0C3D3CC1731",
        description: 'Customer full name' })
    fullName: string;

    @ApiProperty({
        required: false,
        example: "987654321",
        description: "Person's Card identity"})
    ci: string;

    @ApiProperty({
        required: false,
        example: "123456789",
        description: "Tax Identification number(NIT numero de identificacion tributaria)" })
    nit: string;

    @ApiProperty({
        required: false,
        example: "76930655",
        description: 'Customer phone number' })
    phone: string;        
}