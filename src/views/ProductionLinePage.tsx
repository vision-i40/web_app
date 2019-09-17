import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { ProductionLine } from '../types'
import container from '../container'
import ProductionLineBoard from './ProductionOrderBoard'

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

const ProductionLinePage: React.FC<ProductionLinePageProps> = ({
  companyId,
  productionLineId
}) => {
  const [state, setState] = useState<ProductionLinePageState>(
    initProductionLinePageState
  )

  useEffect(() => {
    window.document.title = 'Linha de Produção - Vision'
  }, [])

  useEffect(() => {
    if (!companyId || !productionLineId) return

    container
      .getProductionLine(companyId, productionLineId)
      .then(productionLine => setState({ productionLine }))
  }, [companyId, productionLineId])

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar__title">Linha de Produção</div>
        </div>
      </div>

      <div className="content content--no-spacing">
        {state.productionLine ? (
          state.productionLine.in_progress_order ? (
            <ProductionLineBoard
              productionOrder={state.productionLine.in_progress_order}
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
    </>
  )
}

export default ProductionLinePage
