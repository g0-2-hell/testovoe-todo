import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Project } from 'src/project/project.schema';
import { User } from 'src/user/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  responsible: User[];

  @Prop()
  deadLine: Date;

  @Prop({ default: false })
  status: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
