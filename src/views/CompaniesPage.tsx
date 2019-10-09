import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Company } from '../types'
import container from '../container'

type CompaniesPageState = {
  isLoading: boolean
  companies?: Company[]
  error?: string
}

const CompaniesPage: React.FC<RouteComponentProps> = () => {
  const [state, setState] = useState<CompaniesPageState>({
    isLoading: true
  })

  useEffect(() => {
    window.document.title = 'Empresas - Vision'
  }, [])

  useEffect(() => {
    container.getCompanies().then(companies => {
      setState({
        isLoading: false,
        companies,
        error: undefined
      })
    })
  }, [])

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar__title">Empresas</div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          {state.isLoading || !state.companies
            ? 'Carregando...'
            : state.companies.map(company => (
                <Link
                  title={company.corporate_name}
                  key={company.id}
                  className="card card--icon left-bar left-bar--success"
                  to={`/companies/${company.id}/production_lines`}
                >
                  <div className="card__icon">
                    <i className="far fa-building"></i>
                  </div>

                  <div className="card__content">
                    <div>
                      <b>{company.corporate_name}</b>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  )
}

export default CompaniesPage
