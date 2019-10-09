import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useForm from 'react-hook-form'
import container from '../container'
import { useAuth } from './AuthProvider'

type SignInForm = {
  email: string
  password: string
}

type SignInState = {
  isSignIn: boolean
  hasError: boolean
}

const initSignInState = {
  isSignIn: false,
  hasError: false
}

const SignInPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [state, setState] = useState<SignInState>(initSignInState)
  const { register, handleSubmit } = useForm<SignInForm>()
  const { signIn } = useAuth()

  const onSubmit = async (form: SignInForm) => {
    try {
      setState(state => ({ ...state, isSignIn: true, hasError: false }))
      await signIn(form)
      const userProfile = await container.getUserProfile()
      history.push(
        `/companies/${userProfile.default_company.id}/production_lines`
      )
    } catch {
      setState(state => ({ ...state, isSignIn: false, hasError: true }))
    }
  }

  return (
    <div className="auth">
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <form className="form form--dark" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__group">
                <label htmlFor="email">E-mail</label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  className="form__field"
                  ref={register}
                />
              </div>

              <div className="form__group">
                <label htmlFor="id">Senha</label>
                <input
                  required
                  id="password"
                  name="password"
                  type="password"
                  className="form__field"
                  ref={register}
                />
              </div>

              <div className="form__actions">
                <button
                  disabled={state.isSignIn}
                  className="btn btn--success btn--block"
                >
                  {state.isSignIn ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </form>

            {state.hasError && (
              <p className="text-warning auth__errors">
                Usuário ou senha inválidos.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
