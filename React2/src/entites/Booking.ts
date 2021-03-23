import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookingStatus } from "./BookingStatus";
import { SportPitch } from "./SportPitch";
import { UserHasBooking } from "./UserHasBooking";

@ObjectType()
@Entity()
export class Booking extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date ;

  @Field(() => String)
  @Column()
  RequestedOn: String;
  
  @Field(() => String)
  @Column()
  StartTime:string;

  @Field(() => String)
  @Column()
  EndTime: string;

  @Field()
  @Column({nullable:true})
  sportpitchid: number

  @Field()
  @Column({nullable:true})
  statusid: number

  
  @Field(type => SportPitch)
  @ManyToOne( () => SportPitch, sportPitch => sportPitch.bookingval,{
    eager:true,
  })
  @JoinColumn({name:"sportpitchid"})
  sportPitchi: Promise<SportPitch>

  @Field(type=>BookingStatus)
  @ManyToOne( () => BookingStatus, bookingStatus => bookingStatus.bookerstatus,{
    eager:true,
  })
  @JoinColumn({name:"statusid"})
  bookingStatus: Promise<BookingStatus>

  
  @OneToOne(() => UserHasBooking, userHasBooking => userHasBooking.booking)
  userhasbooking: UserHasBooking
}
