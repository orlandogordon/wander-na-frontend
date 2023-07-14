import React from 'react'
import { FadeLoader } from 'react-spinners'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='flex justify-center h-full w-full'><FadeLoader className=' h-32 w-32' /></div>
  )
}

export default Loading