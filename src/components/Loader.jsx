import React from 'react'

function Loader() {
  return (
    <div>
      <Html>

        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>

            <div className='w-[10vw] h-[10vw] rounded-full'>
                Loading ...
            </div>

        </div>

      </Html>
    </div>
  )
}

export default Loader
