
import { BookingStatus } from "../entites/BookingStatus";
import { Mutation, Arg, Resolver, InputType, Field} from "type-graphql";

@InputType()
class StatusInput {
  @Field()
  status: string;

}

@Resolver()
export class BookingStatusResolver {

 @Mutation(() => BookingStatus)
  async createBookingStatus(
    @Arg("bookingStatus") bookingStatus: StatusInput,
   // @Ctx() { req }: MyContext
  ): Promise<BookingStatus> {
    return BookingStatus.create({
      ...bookingStatus,
    }).save();
  }
}