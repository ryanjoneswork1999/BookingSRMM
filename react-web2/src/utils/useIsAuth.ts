import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const UseIsAuth = () => {
const [{data, fetching}] = useMeQuery();

  const router = useRouter();

  useEffect(() =>{
    if(!fetching && !data?.me){
      router.replace("/login?next="+ router.asPath);
    }
  }, [fetching ,data,router])
}