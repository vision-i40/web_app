import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { useAsync } from 'react-async'
import { RouteComponentProps, Link } from 'react-router-dom'
import ProductionLineBoard from './ProductionLineBoard'
import container from '../container'

type ProductionLinePageProps = RouteComponentProps<{
  companyId: string
  productionLineId: string
}>

const ProductionLinePage: React.FC<ProductionLinePageProps> = ({ match }) => {
  const { companyId, productionLineId } = match.params

  const fetchProductionLine = useCallback(
    () => container.getProductionLine(companyId, productionLineId),
    [companyId, productionLineId]
  )

  const { data: productionLine, reload } = useAsync({
    promiseFn: fetchProductionLine
  })

  return (
    <div className="panel">
      <Helmet>
        <title>Linha de Produção - Vision</title>
      </Helmet>
      <div className="topbar topbar--dense">
        <div className="container">
          <div className="topbar__wrapper">
            <div className="topbar__left-action">
              <Link
                title="Back to Production Lines"
                to={`/companies/${companyId}/production_lines/`}
                className="btn btn--icon"
              >
                <i className="fas fa-arrow-left"></i>
              </Link>
            </div>

            <div className="topbar__title">
              {productionLine ? productionLine.name : 'Linha de Produção'}

              <span className="topbar__subtitle">Manhã</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content content--no-spacing">
        {productionLine ? (
          productionLine.in_progress_order ? (
            <ProductionLineBoard
              productionLine={productionLine}
              productionOrder={productionLine.in_progress_order}
              reload={reload}
              companyId={companyId}
            ></ProductionLineBoard>
          ) : (
            <div className="container">
              <div className="content">
                Nenhum ordem de produção ativa para esta linha.
              </div>
            </div>
          )
        ) : (
          <div className="container">
            <div className="content">Carregando...</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductionLinePage
