import { useState,useCallback } from "react"

export const useCivility = ()=>{
    const [civility,setCivility] = useState<string>("");
  
    /** 民度を取得 */
const fetchCivility = useCallback((input:string):void=>{
    setCivility(input)
    
  },[civility])
  return {civility,fetchCivility}
}