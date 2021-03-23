import { Field, Float, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";

@ObjectType()
@Entity()
export class SportPitch extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => Float)
  @Column()
  pricePerHour!: Number

  
  @Field()
  @Column()
  StartTime:string;

  @Field()
  @Column()
  EndTime: string;

  
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Booking, booking => booking.sportPitchi )
  bookingval: Booking
}
