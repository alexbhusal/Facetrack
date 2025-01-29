import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

const Loading = () => {
  return (<>
    <DotLottieReact
    src="https://lottie.host/23f00351-a82e-4616-9fef-aa9df652b1c8/0iW94McOIh.lottie"
      loop
      autoplay
    />
    {/* <Link className='text-center ' href={"/login"}>Go to Login</Link> */}
    </>
  );
};
export default Loading;
