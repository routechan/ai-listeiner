import { useState ,useCallback} from "react"

export const useVoice = () =>{
    const [voice,setVoice] = useState<string>("");
    /** ユーザーの発した音声テキストを保存 */
const fetchVoice = useCallback((input:string):void=>{
    setVoice(input)
    
  },[voice])

  return { voice , fetchVoice}
}