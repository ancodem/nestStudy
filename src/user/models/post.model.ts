import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MSchema } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.model';

export type PostDocument = HydratedDocument<Post>; // declare type for further usage in dependency injection

@Schema() // declare schema
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  // connection to another model in the db
  @Prop({
    type: MSchema.Types.ObjectId, // type of the reference. NB the Schema should be from mangoose, not from nest/mangoose
    ref: User.name, // reference to the other model name
  })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post); // generate schema for usage in module
