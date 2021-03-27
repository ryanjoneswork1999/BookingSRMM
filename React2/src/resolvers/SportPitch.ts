import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { SportPitch } from "../entites/SportPitch";
import moment from 'moment';

@InputType()
class SportInput {
  @Field()
  name: string;

  @Field()
  pricePerHour: number

  @Field()
  StartTime: string;

  @Field()
  EndTime: string;
  
}

@Resolver()
export class SportPitchResolver {

 @Mutation(() => SportPitch)
  async createSportPitch(
    @Arg("sportInput") sportInput: SportInput,
   // @Ctx() { req }: MyContext
  ): Promise<SportPitch> {
    return SportPitch.create({
      ...sportInput,
    }).save();
  }

  @Query(() => [SportPitch])
  async listPitches(

  ) :Promise<SportPitch[]>{
    
    const qb = getConnection()
      .getRepository(SportPitch)
      .createQueryBuilder("p")
      
      .orderBy('"createdAt"')
      
      return qb.getMany()

  }

  @Query(() => Int)
  async totalOpen(
    @Arg("ID", () => Int) pitchID: number
  ):Promise<Number> {

    

    const photoRepository = getConnection().getRepository(SportPitch);
    let booking = await photoRepository.findOne(pitchID)

    let time2 = Number(moment(booking?.StartTime,"HH:mm:ss").format("H"))
    let time = Number(moment(booking?.EndTime,"HH:mm:ss").format("H"))

    return time-time2


    
  }

  @Query(() => SportPitch)
  async searchPitch(
    @Arg("ID", () => Int) pitchID: number
  ):Promise<SportPitch | undefined>{
    

    return SportPitch.findOne(pitchID);

  
    

  }

 
}