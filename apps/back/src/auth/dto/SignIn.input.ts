import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Password must be at least 1 character long' })
  password: string;
}
