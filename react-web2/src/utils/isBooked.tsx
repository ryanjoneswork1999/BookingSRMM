import { useEffect } from "react";
import { useIsBookedBoolNewQuery } from "../generated/graphql";

export const isBooked = (
  StartTime: string,
  EndTime: string,
  sportpitchid: number,
  RequestedOn: string
) => {

  let data;
  useEffect(() => {
    data = useIsBookedBoolNewQuery({
      variables: {
        StartTime: StartTime,
        EndTime: EndTime,
        sportpitchid: sportpitchid,
        RequestedOn: RequestedOn,
      },
    });
  });

  if (data === undefined || !data) {
    return false;
  } else {
    return data
  }
};
