import React, { useEffect, useState, useCallback } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { ProductionLine } from '../types'
import ProductionLineBoard from './ProductionLineBoard'
import container from '../container'

type ProductionLinePageProps = RouteComponentProps<{
  companyId: string
  productionLineId: string
}>

type ProductionLinePageState = {
  productionLine?: ProductionLine
}

const initProductionLinePageState = {
  productionLine: undefined
}

const ProductionLinePage: React.FC<ProductionLinePageProps> = ({ match }) => {
  const { companyId, productionLineId } = match.params
  const [state, setState] = useState<ProductionLinePageState>(
    initProductionLinePageState
  )

  const loadProductionline = useCallback(() => {
    container
      .getProductionLine(companyId, productionLineId)
      .then(productionLine => setState({ productionLine }))
  }, [companyId, productionLineId])

  useEffect(() => {
    window.document.title = 'Linha de Produção - Vision'
  }, [])

  useEffect(() => {
    loadProductionline()
  }, [loadProductionline])

  return (
    <div className="panel">
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
              {state.productionLine
                ? state.productionLine.name
                : 'Linha de Produção'}

              <span className="topbar__subtitle">Manhã</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content content--no-spacing">
        {state.productionLine ? (
          state.productionLine.in_progress_order ? (
            <ProductionLineBoard
              productionLine={state.productionLine}
              productionOrder={state.productionLine.in_progress_order}
              reload={loadProductionline}
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
