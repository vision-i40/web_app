import React from 'react'
import { Helmet } from 'react-helmet'
import useAsync from './useAsync'
import { RouteComponentProps, Link } from 'react-router-dom'
import container from '../container'
import { ProductionOrder } from '../types'
import { useToggle } from './useToggle'
import NewProductionOrderModal from './NewProductionOrderModal'
import Loading from './Loading'

type ProductionLinePlanPageProps = RouteComponentProps<{
  companyId: string
  productionLineId: string
}>

const inProgress = (productionOrder: ProductionOrder) =>
  productionOrder.state === 'InProgress'
const released = (productionOrder: ProductionOrder) =>
  productionOrder.state === 'Released'
const interrupted = (productionOrder: ProductionOrder) =>
  productionOrder.state === 'Interrupted'
const done = (productionOrder: ProductionOrder) =>
  productionOrder.state === 'Done'

const ProductionLinePlanPage: React.FC<ProductionLinePlanPageProps> = ({
  match
}) => {
  const { companyId, productionLineId } = match.params
  const [isNewModalOpen, toggleIsNewModalOpen] = useToggle()

  const { data: productionLine } = useAsync(container.getProductionLine, {
    onLoad: true,
    args: [companyId, productionLineId]
  })

  const { data: productionOrders, reload } = useAsync(
    container.getProductionOrders,
    {
      onLoad: true,
      args: [companyId, productionLineId]
    }
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
        {productionLine && productionOrders ? (
          <div className="board">
            <div className="board__column">
              <div className="board__column__header">Liberada</div>
              <div className="board__column__body">
                <button
                  className="btn btn--success btn--block"
                  onClick={toggleIsNewModalOpen}
                >
                  Nova Ordem de Produção
                </button>

                {productionOrders.filter(released).map(order => (
                  <div className="board__card" key={order.id}>
                    <div className="board__card__body">
                      <span className="board__card__title">
                        {order.product.name}
                      </span>
                      <p className="board__card__description">{order.code}</p>
                      <p className="board__card__time">Iniciado em 10:00:00</p>
                    </div>

                    <div className="board__card__actions">
                      <button
                        className="btn btn--success"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'InProgress'
                            })
                            .then(reload)
                        }
                      >
                        Executar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="board__column">
              <div className="board__column__header">Execução</div>
              <div className="board__column__body">
                {productionOrders.filter(inProgress).map(order => (
                  <div className="board__card" key={order.id}>
                    <div className="board__card__body">
                      <span className="board__card__title">
                        {order.product.name}
                      </span>
                      <p className="board__card__description">{order.code}</p>
                      <p className="board__card__time">Iniciado em 10:00:00</p>
                    </div>

                    <div className="board__card__actions">
                      <button
                        className="btn btn--danger"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'Interrupted'
                            })
                            .then(reload)
                        }
                      >
                        Interromper
                      </button>

                      <button
                        className="btn btn--green"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'Done'
                            })
                            .then(reload)
                        }
                      >
                        Encerrar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="board__column">
              <div className="board__column__header">Interrompida</div>
              <div className="board__column__body">
                {productionOrders.filter(interrupted).map(order => (
                  <div className="board__card" key={order.id}>
                    <div className="board__card__body">
                      <span className="board__card__title">
                        {order.product.name}
                      </span>
                      <p className="board__card__description">{order.code}</p>
                      <p className="board__card__time">Iniciado em 10:00:00</p>
                    </div>

                    <div className="board__card__actions">
                      <button
                        className="btn btn--success"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'InProgress'
                            })
                            .then(reload)
                        }
                      >
                        Executar
                      </button>

                      <button
                        className="btn btn--green"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'Done'
                            })
                            .then(reload)
                        }
                      >
                        Encerrar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="board__column">
              <div className="board__column__header">Encerrada</div>
              <div className="board__column__body">
                {productionOrders.filter(done).map(order => (
                  <div className="board__card" key={order.id}>
                    <div className="board__card__body">
                      <span className="board__card__title">
                        {order.product.name}
                      </span>
                      <p className="board__card__description">{order.code}</p>
                      <p className="board__card__time">Iniciado em 10:00:00</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>

      <NewProductionOrderModal
        onSuccess={reload}
        isOpen={isNewModalOpen}
        toggle={toggleIsNewModalOpen}
      ></NewProductionOrderModal>
    </div>
  )
}

export default ProductionLinePlanPage
