import React from 'react'
import { Helmet } from 'react-helmet'
import useAsync from './useAsync'
import { RouteComponentProps, Link } from 'react-router-dom'
import container from '../container'

type ProductionLinePlanPageProps = RouteComponentProps<{
  companyId: string
  productionLineId: string
}>

const ProductionLinePlanPage: React.FC<ProductionLinePlanPageProps> = ({
  match
}) => {
  const { companyId, productionLineId } = match.params

  const { data: productionLine } = useAsync(container.getProductionLine, {
    onLoad: true,
    args: [companyId, productionLineId]
  })

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
          className="tab__item"
        >
          Ordem atual
        </Link>
        <Link
          to={`/companies/${companyId}/production_lines/${productionLineId}/plan`}
          className="tab__item active"
        >
          Planejamento
        </Link>
      </div>

      <div className="content content--no-spacing">
        {productionLine ? (
          <div className="board">
            <div className="board__column">
              <div className="board__column__header">Liberada</div>
              <div className="board__column__body">
                <div className="board__card">
                  <div className="board__card__body">
                    <span className="board__card__title">TI000004</span>
                    <p className="board__card__description">
                      Água Mineral Boa Viagem
                    </p>
                    <p className="board__card__time">Iniciado em 10:00:00</p>
                  </div>

                  <div className="board__card__actions">
                    <button className="btn btn--success btn--block">
                      Executar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="board__column">
              <div className="board__column__header">Execução</div>
            </div>

            <div className="board__column">
              <div className="board__column__header">Interrompida</div>
            </div>

            <div className="board__column">
              <div className="board__column__header">Encerrada</div>
            </div>
          </div>
        ) : (
          <div className="content">Carregando...</div>
        )}
      </div>
    </div>
  )
}

export default ProductionLinePlanPage
