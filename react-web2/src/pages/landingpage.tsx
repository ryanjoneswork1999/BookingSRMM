import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";


const landingpage: React.FC<{}> = () => {
   
    return (
        <iframe
        height="800"
        width="600"
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FLondon&src=cnlhbmpvbmVzd29yazE5OTlAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679"
      ></iframe>
    );
}


export default withUrqlClient(createUrqlClient)(landingpage);
