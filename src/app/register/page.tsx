import { Metadata } from 'next'
import RegisterPage from './RegisterPage'

export const metadata: Metadata = {
  title: 'Register',
}

export default function Register() {
  return <RegisterPage />
}

