import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { Post, PostSchema } from './models/post.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      // declare connection for mongo
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [UserService],
})
export class UserModule {}
