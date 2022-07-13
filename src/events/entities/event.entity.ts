import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Event extends mongoose.Document {
  @Prop()
  type: string;

  @Prop({ index: true })
  name: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);

//compound indexes where a single index references multiple properties
//name:1 -> index should order  name in ascending order
//type:-1 -> index should order type in descending order
EventSchema.index({ name: 1, type: -1 });
