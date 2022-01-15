import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const UseIsAuth = () => {
const {data, loading} = useMeQuery();

  const router = useRouter();

  useEffect(() =>{
    if(!loading && !data?.me){
      router.replace("/login?next="+ encodeURIComponent( router.asPath));
    }
  }, [loading ,data,router])
}