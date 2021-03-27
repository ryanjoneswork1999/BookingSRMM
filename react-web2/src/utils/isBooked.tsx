import { useEffect } from "react";
import { useIsBookedBoolNewQuery } from "../generated/graphql";

export const isBooked = (
  StartTime: string,
  EndTime: string,
  sportpitchid: number,
  RequestedOn: string
) => {
    let ans:any
  
    const [{data}] = useIsBookedBoolNewQuery({
      variables: {
        StartTime: StartTime,
        EndTime: EndTime,
        sportpitchid: sportpitchid,
        RequestedOn: RequestedOn,
      },
    });
    ans = data?.isBookedBoolNew
  

  return ans
  
};
