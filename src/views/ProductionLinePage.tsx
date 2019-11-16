import React from 'react'
import useSWR from 'swr'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, Link } from 'react-router-dom'
import ProductionLineBoard from './ProductionLineBoard'
import container from '../container'
import Loading from './Loading'

type ProductionLinePageProps = RouteComponentProps<{
  companyId: string
  productionLineId: string
}>

const ProductionLinePage: React.FC<ProductionLinePageProps> = ({ match }) => {
  const { companyId, productionLineId } = match.params

  const { data: productionLine, revalidate } = useSWR(
    [companyId, productionLineId, 'productionLine'],
    container.getProductionLine
  )

  return (
    <div className="panel">
      <Helmet>
        <title>Linha de Produção - Vision</title>
      </Helmet>

      <div className="topbar topbar--dense topbar--plan">
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

            <span className="topbar__subtitle">
              {productionLine && productionLine.turn}
            </span>
          </div>
        </div>
      </div>

      <div className="tabs">
        <Link
          to={`/companies/${companyId}/production_lines/${productionLineId}`}
          className="tab__item active"
        >
          Ordem atual
        </Link>
        <Link
          to={`/companies/${companyId}/production_lines/${productionLineId}/plan`}
          className="tab__item"
        >
          Planejamento
        </Link>
      </div>

      <div className="content content--no-spacing">
        {productionLine ? (
          productionLine.in_progress_order ? (
            <ProductionLineBoard
              productionLine={productionLine}
              productionOrder={productionLine.in_progress_order}
              reload={revalidate}
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
          <Loading />
        )}
      </div>
    </div>
  )
}

export default ProductionLinePage
