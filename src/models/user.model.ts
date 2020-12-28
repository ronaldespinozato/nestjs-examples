import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty({required: false})    
    id: string;  

    @ApiProperty({required: true, example: "Ronald"})
    firstName: string;

    @ApiProperty({required: true, example: "Espinoza"})
    lastName: string;

    @ApiProperty({required: true, example: "123456789"})
    ciNit: string;

    @ApiProperty({required: true, example: "76930655"})
    phoneNumber: string;

    @ApiProperty({type: Boolean, required: false, default: false})
    isActive: boolean;
}
