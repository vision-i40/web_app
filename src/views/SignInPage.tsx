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
}

const initSignInState = {
  isSignIn: false,
  shouldRender: false
}

const SignInPage: React.FC<RouteComponentProps> = ({ navigate }) => {
  const [state, setState] = useState<SignInState>(initSignInState)
  const { register, handleSubmit } = useForm<SignInForm>()

  useEffect(() => {
    if (container.checkAuthSession()) {
      navigate && navigate('/board')
      return
    }

    setState(state => ({ ...state, shouldRender: true }))
  }, [navigate])

  const onSubmit = async (data: SignInForm) => {
    try {
      setState(state => ({ ...state, isSignIn: true }))
      await container.signIn(data)
      navigate && navigate('/board')
    } catch {
      setState(state => ({ ...state, isSignIn: false }))
    }
  }

  if (!state.shouldRender) return <></>

  return (
    <div className="container">
      <div className="row center-md">
        <div className="col-xs-12 col-md-4">
          <div className="auth">
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

              <div className="form__group">
                <button className="btn btn--success btn--block">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
