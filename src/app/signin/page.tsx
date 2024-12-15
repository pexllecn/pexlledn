import { Metadata } from 'next'
import AuthenticationPage from './AuthenticationPage'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return <AuthenticationPage />
}

