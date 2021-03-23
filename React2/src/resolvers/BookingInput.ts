import { InputType, Field } from "type-graphql";

@InputType()
export class BookingInput {
    @Field()
    RequestedOn: string;
  
    @Field()
    StartTime: string;
  
    @Field()
    EndTime: string;
  
    @Field()
    sportpitchid: number;
  
    @Field()
    statusid: number;
}