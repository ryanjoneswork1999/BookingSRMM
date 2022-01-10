import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";


@ObjectType()
@Entity()
export class BookingStatus extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  status!: string;

  @OneToMany(() => Booking, bok => bok.bookingStatus)
  bookerstatus: Booking
}
