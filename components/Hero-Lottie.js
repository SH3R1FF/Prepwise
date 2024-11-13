"use client"

import Lottie from 'react-lottie-player'
import Hero  from '@/public/hero2.json'

const HeroLottie = () => {
  return (
    <>
    <Lottie
        loop
        animationData={Hero}
        play
        className="max-sm:mt-20"
        // className="sm:max-w-[70vh] max-w-[40vh] object-contain object-center overflow-hidden"
    />
    </>
  )
}

export default HeroLottie