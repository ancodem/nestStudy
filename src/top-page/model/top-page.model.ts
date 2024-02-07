import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses = 'Courses',
  Services = 'Services',
  Books = 'Books',
  Products = 'Products',
}

class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

class HHData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export type TopPageDocument = HydratedDocument<TopPage>;

export class TopPage {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  title: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  category: string;

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop([String])
  tags: string[];

  @Prop([TopPageAdvantage])
  advantages: TopPageAdvantage[];

  @Prop(HHData)
  hh?: HHData;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
