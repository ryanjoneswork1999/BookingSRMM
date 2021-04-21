import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Booking } from "./Booking";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserHasBooking extends BaseEntity{
  @Field()
  @PrimaryColumn()
  bookingid: number

  @PrimaryColumn()
  userid: number

  @Field()
  @OneToOne( () => Booking, bok => bok.userhasbooking,{primary:true})
  @JoinColumn({name: "bookingid"})
  booking: Booking

  @Field(() => User)
  @ManyToOne( () => User, user => user.usersBookings,{primary:true,eager:true})
  @JoinColumn({name:"userid"})
  user: Promise<User>

  
}