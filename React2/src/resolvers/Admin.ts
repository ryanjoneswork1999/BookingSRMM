import moment from "moment";
import { Booking } from "../entites/Booking";
import { SportPitch } from "../entites/SportPitch";
import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import e from "express";


@ObjectType()
class Data {
  @Field(() => [[String]], { nullable: true })
  Pitch?: [[String]]
  
  
}

@ObjectType()
class Datap {
  @Field()
  field: string;

  @Field()
  message: string;
}

type DataPoint {
  Pitch:[[String]]
  Value:[[String]]
}
@Resolver()
export class AdminResolver {

    @Query(() => [[String]])
    async AdminScreen(
      @Arg("RequestedOn", () => String) RequestedOn: string
    ): Promise<String[][]> {

      const bookingRep = getConnection().getRepository(Booking)

      const BOKO= await (Booking).find({where:{ RequestedOn}})
      let pitch = await SportPitch.find();
      var x_world_map_tiles = pitch.length;
      var y_world_map_tiles = 20;
      
    var world_map_array = new Array(x_world_map_tiles);
//     for (let i=0; i<2; i++)//create a two dimensional array 
// {
//     world_map_array[i]=new Array(y_world_map_tiles);
// }

     

      const total3: any[][] = [];
      
      

      

      

      console.log(pitch.length)
      // get bookings for a date
      // filter bookings by sport pitchID
      // compare bookingsstart times to times pitch is open
      // if its taken true is added to 
      pitch:for(let i = 0; i < pitch.length; i++){
        
        console.log("SINDIEDE")
        let filterd = null
        let time2 = Number(moment(pitch[i]?.StartTime, "HH:mm:ss").format("H"));
        let time = Number(moment(pitch[i]?.EndTime, "HH:mm:ss").format("H"));
    
        let sTime = moment(pitch[i]?.StartTime, "HH:mm:ss").format("HH:mm:ss");
        let eTime = moment(pitch[i]?.StartTime, "HH:mm:ss").format("HH:mm:ss");
        
        var total = time - time2;
        
        world_map_array[i]=new Array(total);

         filterd = await BOKO.filter(BOKO => BOKO.sportpitchid == pitch[i].id)
         console.log("Reached here")
        if(filterd.length==0){
          
          for( let j = 0; j<await total ; j++){
            //total3[i][j]=""
            world_map_array[i][j]="";
            world_map_array[i][j]="white";
            
            
          
          
          }
          console.log("ive broke")
          
          continue pitch
        }
        
        console.log(filterd)
        time:for( let j = 0; j<total ; j++){
          
          eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
          
          for(let k=0; k<filterd.length;k++){
            console.log("INSIDE GREEN ")
            console.log(sTime + eTime)
            if(filterd[k].StartTime == sTime && filterd[k].EndTime == eTime){
            // total3[i][j]+="green "+filterd[k].id
            world_map_array[i][j]="green";
             console.log("INSIDE EQUALS")
            }else{
              //total3[i][j]+="white "
              world_map_array[i][j]="white";
            }
          }
          
          sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
        }
      }
      console.log(world_map_array)
       
      return world_map_array
    }
  

    
}