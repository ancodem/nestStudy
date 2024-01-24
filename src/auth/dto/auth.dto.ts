import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'e-mail не может быть пустым' })
  @IsString({ message: 'e-mail должен быть строкой' })
  email: string;

  @IsNotEmpty({ message: 'пароль не может быть пустым' })
  @IsString({ message: 'пароль должен быть строкой' })
  password: string;
}
