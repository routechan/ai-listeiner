import { motion } from "motion/react"

const Comment = ({comment}: {comment: string}) => {

  return (
    <motion.li
    initial={{opacity:0,y:15}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.3}}
    
    className='flex items-center'>
        <div className={`rounded-full overflow-hidden bg-green-500 min-w-8 w-8 h-8 mr-3`}>
          <img className="w-full h-full object-cover" src='../assets/robo-icon.png' alt="ロボットアイコン"></img>
        </div>
        <div className='text-white break-words max-w-[calc(100%-2.5rem)] rounded-md p-3 bg-gray-800'>
        {comment}
        </div>
        </motion.li>
  )
}

export default Comment