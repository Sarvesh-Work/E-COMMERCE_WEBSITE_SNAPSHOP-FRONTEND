

import Navbar from './Navbar';
import { SignUp } from './../features/auth/components/SignUp';


const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <div className='h-100 mt-4'>
        <SignUp />
      </div>

    </>
  )
}

export default SignUpPage