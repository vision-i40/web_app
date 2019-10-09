import React, { useEffect, useState } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { ProductionLine } from '../types'
import container from '../container'

type ProductionLinesPageProps = RouteComponentProps<{
  companyId: string
}>

type ProductionLinesPageState = {
  isLoading: boolean
  productionLines?: ProductionLine[]
  error?: string
}

const initialProductionLinesPageState: ProductionLinesPageState = {
  isLoading: true
}

const ProductionLinesPage: React.FC<ProductionLinesPageProps> = ({ match }) => {
  const companyId = match.params.companyId
  const [state, setState] = useState<ProductionLinesPageState>(
    initialProductionLinesPageState
  )

  useEffect(() => {
    window.document.title = 'Linhas de Produção - Vision'
  }, [])

  useEffect(() => {
    container.getProductionLines(companyId).then(productionLines => {
      setState({
        isLoading: false,
        productionLines,
        error: undefined
      })
    })
  }, [companyId])

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar__wrapper">
            <div className="topbar__title">Linhas de Produção</div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          {state.isLoading || !state.productionLines
            ? 'Carregando...'
            : state.productionLines.map(productionLine => (
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
