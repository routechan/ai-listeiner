import { memo, useRef } from "react";

interface OptionProps {
  isOpenOption: boolean;
  toggleOption: () => void;
  fetchCivility: (input: string) => void;
}

const Option = memo<OptionProps>(({ isOpenOption, toggleOption, fetchCivility }) => {
  const civilityRef = useRef("50");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    civilityRef.current = e.target.value;
  };

  const handleMouseUp = () => {
    fetchCivility(civilityRef.current);
  };

  return (
    <div
    className={`${
      isOpenOption ? "bg-gray-950 opacity-90 fixed top-1/2 left-1/2 transform -translate-x-1/2 rounded-lg container max-w-xl  p-4  z-10" : "hidden"
    }`}
  >
    <div className='flex justify-between items-center'>
    <h2 className='text-white'>Option</h2>
    <svg onClick={toggleOption} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

    </div>
    <h3 className='text-white mt-4'>コメントの民度</h3>
    <form>
    <input
    onChange={handleChange}
    onMouseUp={handleMouseUp}
    onTouchEnd={handleMouseUp}
    value={civilityRef.current}
    type="range"
    min="0"
    max="100"
    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:bg-green-600
    [&::-webkit-slider-thumb]:rounded-full
    [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:h-4
    [&::-moz-range-thumb]:bg-green-600
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:border-0
  "
  />
    </form>
  </div>
  )
})

export default Option