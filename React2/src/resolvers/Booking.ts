import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection} from "typeorm";
import { Booking } from "../entites/Booking";
import { UserHasBooking } from "../entites/UserHasBooking";
import { validateBooking } from "../utils/validateBooking";
import { isAuth } from "../middleware/isAuth";
import { SportPitch } from "../entites/SportPitch";
import moment from "moment";

@ObjectType()
class BookingResponse {
  @Field(() => [FieldErrors], { nullable: true })
  errors?: FieldErrors[];

  @Field(() => Booking, { nullable: true })
  bookingk?: Booking;
}

@ObjectType()
class FieldErrors {
  @Field()
  field: string;

  @Field()
  message: string;
}

@InputType()
class bookingInput {
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

// @InputType()
// class IsBooked {
//   @Field()
//   RequestedOn: string;

//   @Field()
//   StartTime: string;

//   @Field()
//   EndTime: string;

//   @Field()
//   BookingPitch: number;
// }

@Resolver()
export class BookingResolver {
  @Mutation(() => UserHasBooking)
  async createBookingUser(
    @Arg("bookingId", () => Int) bookingid: number,
    @Ctx() { req }: MyContext
  ) {
    return UserHasBooking.create({
      bookingid,
      userid: req.session.userId,
    }).save();
  }

  // @Query(() => Boolean)
  // async isBookedBool(@Arg("request") request: IsBooked): Promise<Boolean> {
  //   let StartTime = request.StartTime;
  //   let EndTime = request.EndTime;
  //   let sportpitchid = request.BookingPitch;
  //   let RequestedOn = request.RequestedOn;

  //   const photoRepository = getConnection().getRepository(Booking);
  //   let booking = await photoRepository.findOne({
  //     relations: ["sportPitchi", "bookingStatus"],
  //     where: { StartTime, EndTime, sportpitchid, RequestedOn },
  //   });

  //   console.log("Book"+booking);

  //   if (!booking) {
  //     return false;
  //   }

  //   return true;
  // }

  @Query(() => Boolean)
  async isBookedBoolNew(
    @Arg("StartTime", () => String) StartTime: string,
    @Arg("EndTime", () => String) EndTime: string,
    @Arg("sportpitchid", () => Int) sportpitchid: number,
    @Arg("RequestedOn", () => String) RequestedOn: string
  ): Promise<Boolean> {
    //let ans = false;
    if (StartTime === undefined || EndTime === undefined) {
      return false;
    }
    let bok = await Booking.findOne({
      where: { StartTime, EndTime, sportpitchid, RequestedOn },
    });

    // const photoRepository = await getConnection().getRepository(Booking);
    // let booking = await photoRepository.findOne({
    //   where: { StartTime, EndTime, sportpitchid, RequestedOn },
    // });

    if (undefined === bok || !bok) {
      return (false);
    } else if (bok !== undefined) {
      return (true);
    }

    return false;
  }

  @Query(() => [String])
  async isitbooked(
    @Arg("sportpitchid", () => Int) sportpitchid: number,
    @Arg("RequestedOn", () => String) RequestedOn: string
  ): Promise<String[]> {
    const total3: any[] = [];
    //if(StartTime === null || EndTime)

    let pitch = await SportPitch.findOne(sportpitchid);

    let time2 = Number(moment(pitch?.StartTime, "HH:mm:ss").format("H"));
    let time = Number(moment(pitch?.EndTime, "HH:mm:ss").format("H"));

    var total = time - time2;

    let sTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");
    let eTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");
    
    const bookingRep = getConnection().getRepository(Booking)
      
    const BOKO= await (Booking).find({where:{ RequestedOn,sportpitchid}})

    console.log("sfsdfdsfsdf"+( (await BOKO).map((b) =>(
      b.StartTime
    ))))
    let val = await bookingRep.find({ 
      select:["RequestedOn","StartTime","EndTime","sportpitchid"],where:{
          RequestedOn,sportpitchid
      }})
      
      
    let timeNow = moment().format("HH:mm:ss")
    let DateNow = moment().format("DD/MM/YYYY")
    
      
      
    if (await val.length ==0){
      nothing: for (let i = 0; i < total; i++) {
        eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
        if(moment(sTime,"HH:mm:ss").subtract(30,"minutes").format("HH:mm:ss") <= moment(timeNow, "HH:mm:ss").format("HH:mm:ss") && RequestedOn===DateNow){
          total3[i] = sTime + " - " + eTime+ true;
          sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
          continue nothing

        }
        
        total3[i] = sTime + " - " + eTime+ false;

        sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
      
      }
      return total3
    }
    
    

    time: for (let i = 0; i < total; i++) {
      

     
      eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");

      if(moment(sTime,"HH:mm:ss").subtract(30,"minutes").format("HH:mm:ss") <= moment(timeNow, "HH:mm:ss").format("HH:mm:ss") && RequestedOn===DateNow){
        console.log("INSIDE ")
        total3[i] = sTime+" - " + eTime+true
        sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
        continue time
      }
      
      bookings:for(let j = 0; j < BOKO.length; j++){
            console.log( await DateNow)
        

        if(BOKO[j].StartTime==sTime && BOKO[j].EndTime===eTime){
          total3[i] = sTime + " - " + eTime+ true;
          break;
        }else{
          total3[i] = sTime + " - " + eTime+ false;
        }
       
      }
      sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");

      // bok = await bookingRep.findOne({
      //  where: {StartTime:sTime, EndTime:eTime, sportpitchid, RequestedOn}
      // });

      // if (bok) {
      //   total3[i] = sTime + " - " + eTime+ true;
      //   sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
      // } else {
      //   total3[i] = sTime + " - " + eTime+ false;
      //   sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
      // }
      // console.log(total3[i])
    }

    return total3;
  }

  @Query(() => [Booking])
  async isBooked(@Arg("request") RequestedOn: string): Promise<Booking[]> {
    const photoRepository = getConnection().getRepository(Booking);
    let booking = await photoRepository.find({
      relations: ["sportPitchi", "bookingStatus"],
      where: { RequestedOn },
    });

    console.log(booking);

    return booking;
  }

  @Mutation(() => BookingResponse)
  @UseMiddleware(isAuth)
  async createBookingNew(
    @Arg("booking") booking: bookingInput,
    @Ctx() { req }: MyContext
  ): Promise<BookingResponse> {
    const errors = validateBooking(booking);

    if (errors) {
      return { errors };
    }

    let val1 = booking.RequestedOn;
    let val2 = booking.StartTime;
    let val3 = booking.EndTime;
    let val4 = booking.sportpitchid;

    let bool = await this.isBookedBoolNew(val2, val3, val4, val1);

    if (!bool) {
      const bookingk = Booking.create({ ...booking });
      await bookingk.save();

      UserHasBooking.create({
        bookingid: bookingk.id,
        userid: req.session.userId,
      }).save();

      return { bookingk };
    }

    return {
      errors: [
        {
          field: "RequestedOn",
          message: "Error: requested day and time has been taken",
        },
      ],
    };
  }
  @Query(() => [UserHasBooking])
  async listSpecificBookings(
    @Ctx() { req }: MyContext
  ): Promise<UserHasBooking[]> {
    let photoRepository = getConnection().getRepository(UserHasBooking);
    let photos = await photoRepository.find({
      relations: ["booking", "user"],
      where: { userid: req.session.userId },
    });

    console.log("Booking" + photos);

    return photos;
  }

  @Query(() => [UserHasBooking])
  async listUserBookings(): Promise<UserHasBooking[]> {
    let photoRepository = getConnection().getRepository(UserHasBooking);
    let photos = await photoRepository.find({ relations: ["booking", "user"] });

    //console.log(photos)

    return photos;
  }

  @Query(() => [Booking])
  async listBookings(): Promise<Booking[]> {
    // const qb = getConnection()
    //   .getRepository(Booking)
    //   .createQueryBuilder("booking")
    //   .leftJoinAndSelect("booking.sportPitchi", "Booking")

    //   return qb.getMany()

    // const user = getConnection().getRepository(Booking);
    // const users = await user.find({ relations: ["sportPitchi"] });

    const photoRepository = getConnection().getRepository(Booking);
    const photos = await photoRepository.find();

    return photos;
    // return users
  }

  @Query(() => [Booking])
  async listBookingsByDate(@Arg("Date") date: String): Promise<Booking[]> {
    // const qb = getConnection()
    //   .getRepository(Booking)
    //   .createQueryBuilder("booking")
    //   .leftJoinAndSelect("booking.sportPitchi", "Booking")

    //   return qb.getMany()

    // const user = getConnection().getRepository(Booking);
    // const users = await user.find({ relations: ["sportPitchi"] });

    const photoRepository = getConnection().getRepository(Booking);
    const photos = await photoRepository.find({ where: { RequestedOn: date } });

    return photos;
    // returnusers
  }

//  // Dates for booking
//   @Query(() => [String])
//   async datebookings(
//     @Arg("sportpitchid", () => Int) sportpitchid: number,
//     @Arg("RequestedOn", () => String) RequestedOn: string
//   ) {
//     console.time("START")
//     const total3: any[] = [];
//     //if(StartTime === null || EndTime)

//     let pitch = await SportPitch.findOne(sportpitchid);

//     let date = RequestedOn;

//     let time2 = Number(moment(pitch?.StartTime, "HH:mm:ss").format("H"));
//     let time = Number(moment(pitch?.EndTime, "HH:mm:ss").format("H"));

//     var total = time - time2;

//     let sTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");
//     let eTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");

//     let count;
//     for (let p = 0; p < 7; p++) {
//       count = 0;
//       sTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");
//       eTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");
//       for (let i = 0; i < total; i++) {
//         let bok = undefined;
//         eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");

//         bok = await Booking.findOne({
//           where: {
//             StartTime: sTime,
//             EndTime: eTime,
//             sportpitchid,
//             RequestedOn: date,
//           },
//         });

//         if (bok) {
//           count++;
//           //total3[i] = true;
//           sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
//         } else {
//           //total3[i] = false;
//           sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
//         }
//         // console.log(total3[i])
//       }
//       if (count == 0) {
//         total3[p] = date + " - green";
//       } else if (count > 0 && count < total / 2 || count == (total/2)) {
//         total3[p] = date + " - yellow";
//       } else if (count < total && count > total / 2) {
//         total3[p] = date + " - orange";
//       } else if (count == total) {
//         total3[p] = date + " - red";
//       }
//       date = moment(date, "DD/MM/YYYY").add(1, "d").format("DD/MM/YYYY");
//     }
//     console.timeEnd("START")
//     return total3;
//   }

  @Query(() => [String])
  async datebookings(
    @Arg("sportpitchid", () => Int) sportpitchid: number,
    @Arg("RequestedOn", () => String) RequestedOn: string
  ) {
    let timeNow = moment().format("HH:mm:ss")
    let DateNow = moment().format("DD/MM/YYYY")
    
    const total3: any[] = [];
    //if(StartTime === null || EndTime)

    let pitch = await SportPitch.findOne(sportpitchid);

    let date = RequestedOn;

    let time2 = Number(moment(pitch?.StartTime, "HH:mm:ss").format("H"));
    let time = Number(moment(pitch?.EndTime, "HH:mm:ss").format("H"));

    var total = time - time2;

    let sTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");
    let eTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");

    let count;
    for (let p = 0; p < 7; p++) {

      
      count = 0;

      
      sTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");
      eTime = moment(pitch?.StartTime, "HH:mm:ss").format("HH:mm:ss");
      time: for (let i = 0; i < total; i++) {
        

        const BOKO= await (Booking).find({where:{ RequestedOn: date, sportpitchid}})

        //if dates bookings is 0 then it will do the following + implements a way to account for times that have passed 
        if(BOKO.length==0){
          //If time has passed add to count and then add 1 to time so can increae 
          if(moment(sTime,"HH:mm:ss").subtract(30,"minutes").format("HH:mm:ss") <= moment(timeNow, "HH:mm:ss").format("HH:mm:ss") && date===DateNow){
            count++
            sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
            eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
            continue time;
          }else if(count ==0){
          count =0;
          break;
          }
        }
        
        eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");

        if(moment(sTime,"HH:mm:ss").subtract(30,"minutes").format("HH:mm:ss") <= moment(timeNow, "HH:mm:ss").format("HH:mm:ss") && date===DateNow){
          count++
          sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
          eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
          continue time;
        }

        for(let k = 0; k < BOKO.length; k++){
          
          if(BOKO[k].StartTime===sTime && BOKO[k].EndTime===eTime){
            count++
          }
        }
        sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
       
      }

      count:if (count == 0) {
        total3[p] = date + " - green";
      } else if (count > 0 && count < total / 2 || count == (total/2)) {
        total3[p] = date + " - yellow";
      } else if (count < total && count > total / 2) {
        total3[p] = date + " - orange";
      } else if (count == total) {
        total3[p] = date + " - red";
      }
      date = moment(date, "DD/MM/YYYY").add(1, "d").format("DD/MM/YYYY");
    }
    
    return total3;
  }
}


