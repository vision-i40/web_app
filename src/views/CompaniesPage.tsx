import React from 'react'
import { Helmet } from 'react-helmet'
import { useAsync } from 'react-async'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Company } from '../types'
import container from '../container'

const CompaniesPage: React.FC<RouteComponentProps> = () => {
  const { data: companies, isLoading } = useAsync<Company[]>({
    promiseFn: container.getCompanies
  })

  return (
    <>
      <Helmet>
        <title>Empresas - Vision</title>
      </Helmet>

      <div className="topbar">
        <div className="container">
          <div className="topbar__title">Empresas</div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          {isLoading || !companies
            ? 'Carregando...'
            : companies.map(company => (
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
