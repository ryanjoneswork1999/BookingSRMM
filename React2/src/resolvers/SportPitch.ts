import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { SportPitch } from "../entites/SportPitch";


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


  @Query(() => SportPitch)
  async searchPitch(
    @Arg("ID", () => Int) pitchID: number
  ):Promise<SportPitch | undefined>{
    

    return SportPitch.findOne(pitchID);

  
    

  }

 
}