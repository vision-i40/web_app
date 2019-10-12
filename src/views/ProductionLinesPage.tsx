import React from 'react'
import { Helmet } from 'react-helmet'
import useAsync from './useAsync'
import { RouteComponentProps, Link } from 'react-router-dom'
import container from '../container'

type ProductionLinesPageProps = RouteComponentProps<{
  companyId: string
}>

const ProductionLinesPage: React.FC<ProductionLinesPageProps> = ({ match }) => {
  const { companyId } = match.params

  const { data: productionLines, isLoading } = useAsync(
    container.getProductionLines,
    { onLoad: true, args: [companyId] }
  )

  return (
    <>
      <Helmet>
        <title>Linhas de Produção - Vision</title>
      </Helmet>

      <div className="topbar">
        <div className="container">
          <div className="topbar__wrapper">
            <div className="topbar__title">Linhas de Produção</div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          {isLoading || !productionLines
            ? 'Carregando...'
            : productionLines.map(productionLine => (
                <Link
                  title={productionLine.name}
                  key={productionLine.id}
                  className="card card--icon left-bar left-bar--success"
                  to={`/companies/${companyId}/production_lines/${productionLine.id}`}
                >
                  <div className="card__icon">
                    <i className="fas fa-network-wired"></i>
                  </div>

                  <div className="card__content">
                    <div>
                      <b>{productionLine.name}</b>
                    </div>
                    {productionLine.in_progress_order ? (
                      <span>
                        {productionLine.in_progress_order.product.name}
                      </span>
                    ) : (
                      <span className="text-secondary">
                        Ordem de produção não definida
                      </span>
                    )}
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  )
}

export default ProductionLinesPage
