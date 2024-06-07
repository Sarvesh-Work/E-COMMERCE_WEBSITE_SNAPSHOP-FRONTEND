

import Navbar from './Navbar';
import { SignUp } from './../features/auth/components/SignUp';
import Footer from './Footer';

const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <div className='h-100 mt-4'>
        <SignUp />
      </div>
      <Footer />
    </>
  )
}

export default SignUpPage