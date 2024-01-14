import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, { description: 'Hola mundo es lo que retorna', name: 'helloWorld' })
    helloWorld() {
        return 'Hello World!';
    }

    @Query(() => Float, {name: 'randomNumber'})
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    // Int es propio de graphql, number es de typescript
    @Query(() => Int, {name: 'randomFromZeroTo', description: 'From zero to argument TO (default 6'})
    getRandomFromZeroTo(
        @Args('to', {nullable: true, type: () => Int}) to: number = 6
    ): number {
        return Math.floor(Math.random() * to);
    }

}
