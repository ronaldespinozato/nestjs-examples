import { ApiProperty } from "@nestjs/swagger";

export class Account {
    @ApiProperty({ example: "20A5718D-9991-47BB-A283-C0C3D3CC1731", description: 'The identifier of user' })    
    userId: string;
    @ApiProperty({example: "ronald.espinoza.to@gmail.com", type: "string"})
    userName: string;
    @ApiProperty({example: "if(nestjs){great!!!}", type: "string"})    
    password: string;
}