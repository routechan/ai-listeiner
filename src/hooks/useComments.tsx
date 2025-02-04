import { useState, useCallback } from "react"

export const useComments = () => {
  const [comments, setComments] = useState<string[]>([])

  /** コメントを追加 */
  const addComments = useCallback((newComment: string): void => {
    // 1~2秒のランダムな遅延を生成
    const delay = Math.random() * 1000; // 1000ms~2000msの範囲

    setTimeout(() => {
      setComments(prevComments => [...prevComments, newComment]);
    }, delay);
  }, []);

  return { comments, addComments }
}

