import React from 'react'
import { Helmet } from 'react-helmet'
import useSWR from 'swr'
import { RouteComponentProps, Link } from 'react-router-dom'
import container from '../container'
import { ProductionOrder } from '../types'
import { useToggle } from './useToggle'
import NewProductionOrderModal from './NewProductionOrderModal'
import Loading from './Loading'
import dayjs from 'dayjs'
import Dropdown from './Dropdown'

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

  const { data: productionLine } = useSWR(
    [companyId, productionLineId, 'productionLine'],
    container.getProductionLine
  )

  const { data: productionOrders, revalidate } = useSWR(
    [companyId, productionLineId],
    container.getProductionOrders
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
            <div className="board__column board__column--released">
              <div className="board__column__header">Liberada</div>
              <div className="board__column__body">
                {productionOrders.filter(released).map(order => (
                  <div className="board__card" key={order.id}>
                    <Dropdown
                      className="board__card__options"
                      items={[
                        { label: 'Editar', onClick: () => {} },
                        { label: 'Excluir', onClick: () => {} }
                      ]}
                    >
                      <button className="btn btn--icon">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </Dropdown>

                    <div className="board__card__body">
                      <div className="board__card__title">
                        {order.product.name}
                      </div>
                      <div className="board__card__detail">
                        <span className="board__card__id">#{order.code}</span>

                        <span className="board__card__time">
                          <i className="far fa-clock"></i>
                          {dayjs(order.modified).format('HH:mm:ss')}
                        </span>
                      </div>
                    </div>

                    <div className="board__card__actions">
                      <button
                        className="btn"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'InProgress'
                            })
                            .then(revalidate)
                        }
                      >
                        <i className="fas fa-arrow-right"></i>Executar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="board__column board__column--in-progress">
              <div className="board__column__header">Execução</div>
              <div className="board__column__body">
                {productionOrders.filter(inProgress).map(order => (
                  <div className="board__card" key={order.id}>
                    <div className="board__card__body">
                      <div className="board__card__title">
                        {order.product.name}
                      </div>
                      <div className="board__card__detail">
                        <span className="board__card__id">#{order.code}</span>

                        <span className="board__card__time">
                          <i className="far fa-clock"></i>
                          {dayjs(order.modified).format('HH:mm:ss')}
                        </span>
                      </div>
                    </div>

                    <div className="board__card__actions">
                      <button
                        className="btn"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'Interrupted'
                            })
                            .then(revalidate)
                        }
                      >
                        <i className="fas fa-ban"></i>Interromper
                      </button>

                      <button
                        className="btn"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'Done'
                            })
                            .then(revalidate)
                        }
                      >
                        <i className="fas fa-check"></i>Encerrar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="board__column board__column--interrupted">
              <div className="board__column__header">Interrompida</div>
              <div className="board__column__body">
                {productionOrders.filter(interrupted).map(order => (
                  <div className="board__card" key={order.id}>
                    <div className="board__card__body">
                      <div className="board__card__title">
                        {order.product.name}
                      </div>
                      <div className="board__card__detail">
                        <span className="board__card__id">#{order.code}</span>

                        <span className="board__card__time">
                          <i className="far fa-clock"></i>
                          {dayjs(order.modified).format('HH:mm:ss')}
                        </span>
                      </div>
                    </div>

                    <div className="board__card__actions">
                      <button
                        className="btn"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'InProgress'
                            })
                            .then(revalidate)
                        }
                      >
                        <i className="fas fa-arrow-left"></i>Executar
                      </button>

                      <button
                        className="btn"
                        onClick={() =>
                          container
                            .updateProductionOrderStatus({
                              companyId,
                              productionOrderId: order.id,
                              state: 'Done'
                            })
                            .then(revalidate)
                        }
                      >
                        <i className="fas fa-check"></i>Encerrar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="board__column board__column--done">
              <div className="board__column__header">Encerrada</div>
              <div className="board__column__body">
                {productionOrders.filter(done).map(order => (
                  <div className="board__card" key={order.id}>
                    <div className="board__card__body">
                      <div className="board__card__title">
                        {order.product.name}
                      </div>
                      <div className="board__card__detail">
                        <span className="board__card__id">#{order.code}</span>

                        <span className="board__card__time">
                          <i className="far fa-clock"></i>
                          {dayjs(order.modified).format('HH:mm:ss')}
                        </span>
                      </div>
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

      <button
        className="btn btn--success btn--float"
        onClick={toggleIsNewModalOpen}
      >
        <i className="fas fa-plus"></i>
      </button>

      <NewProductionOrderModal
        onSuccess={revalidate}
        isOpen={isNewModalOpen}
        toggle={toggleIsNewModalOpen}
      ></NewProductionOrderModal>
    </div>
  )
}

export default ProductionLinePlanPage
