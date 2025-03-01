import React from 'react'
import {PrivacyData} from "../util/Listitems"

const Privacy = () => {
  return (
    
      <>
      <div className="h-fill mt-10">
        <div className="">
            <h1 className='text-2xl md:text-3xl font-semibold text-center mb-5 '>Security and Privacy Assurance</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 gap-y-5 m-5 p-5 ">
          {PrivacyData.map((item,index)=>(
              <div key={index} className="h-auto w-auto  col-span-1 border-2 border-black rounded-3xl">
                <h1 className='text-center text-blue-500 text-2xl font-bold p-3'>{item.title}</h1>
                <h2 className='text-start text-2xl font-semibold p-2'>{item.discription}</h2>
            </div>
          ))}

        </div>
      </div>
      </>
    
  )
}

export default Privacy
