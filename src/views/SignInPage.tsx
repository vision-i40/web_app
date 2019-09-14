import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import useForm from 'react-hook-form'
import container from '../container'

type SignInForm = {
  email: string
  password: string
}

type SignInState = {
  isSignIn: boolean
  shouldRender: boolean
  hasError: boolean
}

const initSignInState = {
  isSignIn: false,
  shouldRender: false,
  hasError: false
}

const SignInPage: React.FC<RouteComponentProps> = ({ navigate }) => {
  const [state, setState] = useState<SignInState>(initSignInState)
  const { register, handleSubmit } = useForm<SignInForm>()

  useEffect(() => {
    if (container.authSession.isActive()) {
      navigate && navigate('/board')
      return
    }

    setState(state => ({ ...state, shouldRender: true }))
  }, [navigate])

  const onSubmit = async (data: SignInForm) => {
    try {
      setState(state => ({ ...state, isSignIn: true, hasError: false }))
      await container.signIn(data)
      const userProfile = await container.getUserProfile()
      navigate &&
        navigate(
          `/companies/${userProfile.default_company.id}/production_lines`
        )
    } catch {
      setState(state => ({ ...state, isSignIn: false, hasError: true }))
    }
  }

  if (!state.shouldRender) return <></>

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
