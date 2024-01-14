import { Field, Int, ObjectType } from "@nestjs/graphql";

// Este decorador ( ObjectType) nos sirve para definir un objeto y que GraphQL sepa cuales con sus campos y que tipo de datos son
@ObjectType()
export class Todo {

    @Field(() => Int)
    id: number;

    @Field(() => String)
    description: string;

    @Field(() => Boolean)
    done: boolean = false;
}