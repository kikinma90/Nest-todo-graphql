import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";


@ArgsType()
export class StatusArgs {

    @Field(() => Boolean, {nullable: true})
    @IsOptional()
    @IsBoolean()
    status?: boolean;

}