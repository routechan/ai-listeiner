import { useCallback, useState } from "react"

export const useOpenOption = () => {
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false)

  /** オプションの開閉 */
  const toggleOption = useCallback((): void => {
    setIsOpenOption(prev => !prev);  // 前の状態を参照する形に変更
  }, []); // 依存配列を空に

  return { isOpenOption, toggleOption }
}