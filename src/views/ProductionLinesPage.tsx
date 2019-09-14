import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
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

const ProductionLinesPage: React.FC<ProductionLinesPageProps> = ({
  companyId
}) => {
  const [state, setState] = useState<ProductionLinesPageState>(
    initialProductionLinesPageState
  )

  useEffect(() => {
    if (!companyId) return

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
          <div className="topbar__title">Linhas de Produção</div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          {state.isLoading || !state.productionLines ? (
            <p>Loading...</p>
          ) : (
            state.productionLines.map(productionLine => (
              <div
                className="card left-bar left-bar--success"
                key={productionLine.id}
              >
                <div className="h6">
                  <b>{productionLine.name}</b>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ProductionLinesPage
