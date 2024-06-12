import { Exclude } from 'class-transformer';

export class UserDtoInterceptor {
  id: string;

  email: string;

  @Exclude()
  password: string;
}
