import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId })
  author: User;

  @Prop()
  createAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }]})
  employees: User[];

  @Prop({default: false})
  isDeleted: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
