import { useEffect, memo, useRef } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

interface VoiceFetchProps {
  fetchVoice: (input: string) => void;
}

const VoiceFetch = memo<VoiceFetchProps>(({ fetchVoice }) => {
  
  const streamingStatusRef = useRef(true)

  const {
    transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return <span>ブラウザが音声認識未対応です</span>;
      }
     
   
       // 1秒間無言が続いたらtranscriptをチェックしてfetchVoiceを呼び出す
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    let intervalId: number | undefined;
    if (listening) {
      intervalId = setInterval(() => {
        if (transcript.trim()) {
          console.log(transcript)
          fetchVoice(transcript);
          resetTranscript(); // すでに送信済みのテキストをクリア
        }
      }, 2000);
    }

    return () => {
      // クリーンアップ（リスナー停止時にインターバルをクリア）
      clearInterval(intervalId);
    };
  }, [transcript, listening, fetchVoice, resetTranscript]);

      
    /** 配信ボタンのオンオフ */
    const toggleStreamingStatus = () => {
      streamingStatusRef.current = !streamingStatusRef.current;
    }

  return (
    <>
{
streamingStatusRef.current ? 
   <button type="button"
   onClick={() => {
   SpeechRecognition.startListening({ continuous: true }); 
   toggleStreamingStatus()}}
    className='bg-green-600 rounded-md p-2 flex items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
</svg>
配信スタート</button>

:

<button className='bg-red-600 rounded-md p-2 flex items-center' type="button" onClick={() => {
  SpeechRecognition.stopListening();
  toggleStreamingStatus();
  }}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
</svg>
 配信終了
      </button>
}
    </>
  )
}
)

export default VoiceFetch