import React, { useEffect, useState } from "react";
import axios from "axios";

interface AiSubmitProps {
  voice: string;
  civility: string;
  addComments: (newComment: string) => void;
}

const AiSubmit: React.FC<AiSubmitProps> = ({ voice, civility, addComments }) => {
  
  const [history, setHistory] = useState<string[]>([]); // 発言履歴を保存

  /** AI に配信者の発言履歴を考慮させつつコメントを生成 */
  const handleSubmit = async () => {
    try {
      // 過去の発言を最大 5 件まで保存（それ以上なら古いものを削除）
      const newHistory = [...history, voice].slice(-5);
      setHistory(newHistory);

      // 発言履歴を AI に渡す
      const context = newHistory.map((msg, i) => `発言${i + 1}: 「${msg}」`).join("\n");

      // プロンプトの作成
      const prompt = 
      `あなたは配信の視聴者です。
      ・以下の配信者の発言履歴を考慮しながら、コメントを生成してください。
      発言履歴${context}

      ・コメントを生成する際は以下の民度でコメントを生成してください
      民度:${civility}/100

      ・民度が低い配信の特徴としては変な絵文字を使いがち（必ずしも使うとは限らない）,2チャンネルやってそうな人が多い、ネットミームを使いがち

      ・民度が高い配信の特徴としてきれいな絵文字を使いがち、やさしい、フワフワしてる

      ・生成するコメントの個数は１つから５つの間でランダムで生成してください

      ・一つ一つのコメントごとに改行してください

      `;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );


      // AIの出力からコメントを取得
      const aiComments = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.split("\n").filter((line: string) => line.trim() !== "");
      console.log(aiComments)
      if (aiComments) {
        aiComments.forEach((comment: string) => {
          console.log(comment)
          addComments(comment)
        })
      } else {
        console.warn("AIのコメントが取得できませんでした");
      }
    } catch (error) {
      console.error("APIエラー:", error);
    }
  };

  // voice が変わるたびに実行
  useEffect(() => {
    if (voice && voice.trim() !== "") {
      handleSubmit();
    }
  }, [voice]);

  return null;
};

export default AiSubmit;
