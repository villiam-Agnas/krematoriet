"use client"

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { LogIn } from "@/actions/login-action"
import { logInSchema } from '@/actions/schemas'
import ErrorMessage from '@/components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'

const LogInForm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(logInSchema)
  })

  const {mutate, error} = useMutation({
    mutationFn: LogIn
  })

  return (
    <div>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col max-w-md m-auto border-black rounded-2xl border-3 text-left p-6 mt-6">
        <label htmlFor="email">Enter email</label>
        <input className="input" type="text" {...register("email")} placeholder="Email....." />
        {errors.email && <ErrorMessage error={errors.email.message!} />}

        <label htmlFor="password">Enter password</label>
        <input className="input" type="password" {...register("password")} placeholder="Password....." />
        {errors.password && <ErrorMessage error={errors.password.message!} />}
        
        <button className='button'>Login</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  )
}

export default LogInForm