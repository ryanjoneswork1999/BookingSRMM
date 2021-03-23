import { BookingInput } from "../resolvers/BookingInput";

export const validateBooking = (options: BookingInput) =>{
    if ( options.StartTime >= options.EndTime){
        return  [
            {
              field: "EndTime",
              message: "Error: end time must be greater than start time",
            },
          ];
        }

        if ( options.sportpitchid < 1){
            return  [
                {
                  field: "sportpitchid",
                  message: "Error: invalid sportpitch",
                },
              ];
            }

            if ( options.statusid < 1){
                return  [
                    {
                      field: "statusid",
                      message: "Error: invalid Status",
                    },
                  ];
                }

            return null
}