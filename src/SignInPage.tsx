import React from 'react'
import { RouteComponentProps } from '@reach/router'
import useForm from 'react-hook-form'

const SignInPage: React.FC<RouteComponentProps> = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className="container">
      <div className="row center-md">
        <div className="col-md-4">
          <div className="auth">
            <form className="form form--dark" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__group">
                <label htmlFor="email">E-mail</label>
                <input
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
