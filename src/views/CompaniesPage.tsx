import React from 'react'
import useSWR from 'swr'
import { Helmet } from 'react-helmet'
import { Link, RouteComponentProps } from 'react-router-dom'
import container from '../container'
import Loading from './Loading'

const CompaniesPage: React.FC<RouteComponentProps> = () => {
  const { data: companies } = useSWR('companies', container.getCompanies)

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
          {!companies ? (
            <Loading />
          ) : (
            companies.map(company => (
              <Link
                title={company.corporate_name}
                key={company.id}
                className="card card--icon"
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
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default CompaniesPage
