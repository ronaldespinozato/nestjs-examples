import { ApiProperty } from "@nestjs/swagger";

export class QueryCustomer {
    @ApiProperty({
        required: true, 
        example: "name or ci or nit or phone", 
        description: "It belongs to search customer by name, ci, nit or phone"})
    query: string;    
  }