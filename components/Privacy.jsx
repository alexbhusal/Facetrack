import React from "react";
import { PrivacyData } from "../util/Listitems";

const Privacy = () => {
  return (
    <>
      <div className="h-full max-w-full mt-10 m-5 shadow-2xl pb-2" data-aos="fade-up-right">
             <div className="">
                 <h1 className='text-xl md:text-3xl font-semibold text-center m-5'>Security and Privacy Assurance</h1>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
               {PrivacyData.map((item,index)=>(
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm " data-aos="zoom-in"  key={index}>
                <img className="rounded-t-lg" src={item.imageUrl} alt="" />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">{item.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 text-center text-base md:text-xl">{item.discription}</p>
                </div>
            </div>
            
               ))}
             </div>
           </div>
     
    </>
  );
};

export default Privacy;
