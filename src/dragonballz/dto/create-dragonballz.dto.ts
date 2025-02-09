import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";



export class CreateDragonballzDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsInt()
    @IsPositive()
    np: number;

}
