import React from "react";
import { TestimonialsUsers } from "../util/Listitems";

const Testimonials = () => {
  return (
    <>
      <div className="h-fill" >
        <div>
          <h1 className="text-3xl font-semibold text-center">
            What people are saying about FaceTrack
          </h1>
        </div >
        <div className="flex flex-col  md:flex-row m-5  items-center justify-start gap-5 overflow-x-auto ">
          {TestimonialsUsers.map((user, index) => (
            <div
              className="border-4 border-black p-10 h-auto w-96 flex-shrink-0 rounded-3xl "  data-aos="fade-in"
              key={index}
            >
              <div>
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-80 h-auto rounded-3xl"
                />
              </div>

              <div className="m-2">
                <h1 className="text-center text-3xl  font-bold">{user.name}</h1>
                <h2 className="text-center text-2xl font-semibold">
                  {user.designation}
                </h2>
                <h3 className="text-center text-xl ">"{user.discription}"</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
