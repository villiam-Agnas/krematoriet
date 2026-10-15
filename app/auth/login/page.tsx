import Link from "next/link"
import LogInForm from "./form"

const LoginPage = () => {
  return (
    <div className="text-center">
      <h1 className="heading my-4">Login</h1>
      <Link href="/auth/signup">don´t have an accout? <span className="text-dustyOlive font-bold">sign up Here</span></Link>
      <LogInForm />
    </div>
  )
}

export default LoginPage