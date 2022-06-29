import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  userName: string;
  @IsPhoneNumber('IR')
  phoneNumber: number;
}
