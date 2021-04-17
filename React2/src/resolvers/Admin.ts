import moment from "moment";
import { Booking } from "../entites/Booking";
import { SportPitch } from "../entites/SportPitch";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class AdminResolver {

    @Query(() => [String])
    async AdminScreen(
      @Arg("RequestedOn", () => String) RequestedOn: string
    ): Promise<String[]> {

      const bookingRep = getConnection().getRepository(Booking)

      const BOKO= await (Booking).find({where:{ RequestedOn}})



     

      const total3: any[] = [];
      
      

      

      let pitch = await SportPitch.find();

      console.log(pitch.length)
      // get bookings for a date
      // filter bookings by sport pitchID
      // compare bookingsstart times to times pitch is open
      // if its taken true is added to 
      pitch:for(let i = 0; i < pitch.length; i++){
        total3[i]=""
        console.log("SINDIEDE")
        let filterd = null
        let time2 = Number(moment(pitch[i]?.StartTime, "HH:mm:ss").format("H"));
        let time = Number(moment(pitch[i]?.EndTime, "HH:mm:ss").format("H"));
    
        let sTime = moment(pitch[i]?.StartTime, "HH:mm:ss").format("HH:mm:ss");
        let eTime = moment(pitch[i]?.StartTime, "HH:mm:ss").format("HH:mm:ss");
        
        var total = time - time2;
        
        
         filterd = BOKO.filter(BOKO => BOKO.sportpitchid == pitch[i].id)
        
        if(filterd.length==0){
          
          for(let j = 0; j<await total ; j++){
           
          total3[i]+="white "
            
          
          
          
          }
          console.log("ive broke")
          
          continue pitch
        }
        
        console.log(filterd)
        time:for(let j = 0; j<total ; j++){
          
          eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
          
          for(let k=0; k<filterd.length;k++){
            console.log("INSIDE GREEN ")
            console.log(sTime + eTime)
            if(filterd[k].StartTime == sTime && filterd[k].EndTime == eTime){
             total3[i]+="green "+filterd[k].id
             
             
            }else{
              total3[i]+="white "
            }
          }
          
          sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
        }
      }
       
      return total3
    }
  

    
}