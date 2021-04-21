import moment from "moment";
import { Arg, Query, Resolver } from "type-graphql";
import { Booking } from "../entites/Booking";
import { SportPitch } from "../entites/SportPitch";



@Resolver()
export class AdminResolver {

    @Query(() => [[String]])
    async AdminScreen(
      @Arg("RequestedOn", () => String) RequestedOn: string
    ): Promise<String[][]> {

     

      const BOKO= await (Booking).find({where:{ RequestedOn}})
      let pitch = await SportPitch.find();
      var x_world_map_tiles = pitch.length;
      
      
    var world_map_array = new Array(x_world_map_tiles);
//     for (let i=0; i<2; i++)//create a two dimensional array 
// {
//     world_map_array[i]=new Array(y_world_map_tiles);
// }

     

      
      
      

      

      

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
         
        world_map_array[i][0]=pitch[i]?.name
         filterd = await BOKO.filter(BOKO => BOKO.sportpitchid == pitch[i].id)
         console.log("Reached here")
        if(filterd.length==0){
          
          for( let j = 1; j<=await total ; j++){
            //total3[i][j]=""
            world_map_array[i][j]="";
            world_map_array[i][j]="white";
            
            
          
          
          }
          console.log("ive broke")
          
          continue pitch
        }
        
        console.log(filterd)
        time:for( let j = 1; j<=total ; j++){
          
          eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
          
          for(let k=0; k<filterd.length;k++){
            
            //console.log("STime:"+sTime + "Booking start time" +filterd[k].StartTime + filterd[k].EndTime + eTime)
            if(filterd[k].StartTime == sTime && filterd[k].EndTime == eTime){
              
            // total3[i][j]+="green "+filterd[k].id
            world_map_array[i][j]="green - " + ((await filterd[k].userhasbooking.user).username);
            sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
            continue time
             
            }
          }
          world_map_array[i][j]="white";
          sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
        }
      }
      
      console.log(world_map_array)
       
      return world_map_array
    }
  

    
}