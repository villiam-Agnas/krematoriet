import Link from "next/link"
import SignUpForm from "./form"

const SignupPage = () => {
  return (
    <div className="text-center">
      <h1 className="heading my-4">Sign up</h1>
      <Link href="/auth/login">Already have an accout? <span className="text-dustyOlive font-bold hover:underline">Log In Here</span></Link>
      <SignUpForm />
    </div>
  )
}

export default SignupPage