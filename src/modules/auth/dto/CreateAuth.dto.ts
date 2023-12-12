import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({
        description: 'name для регистарации',
        example: 'name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'lastname для регистарации',
        example: 'lastname',
        required: true,
      })
    @IsString()
    @IsNotEmpty()
    lastname: string;
    
    @ApiProperty({
        description: 'password для регистарации',
        example: 'password',
        required: true,
      })
    @IsString()
    @IsNotEmpty()
    password: string;
}