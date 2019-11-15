import React, { useState, useContext } from 'react'
import { ResponsivePie } from '@nivo/pie'
import colors from '../config/colors'
import AddProductionModal, { NewGoodPiecesFormData } from './AddProductionModal'
import AddReworkModal from './AddReworkModal'
import AddStopModal from './AddStopModal'
import AddWasteModal from './AddWasteModal'
import { useToggle } from './useToggle'
import { ID, ProductionLine, ProductionOrder } from '../types'
import container from '../container'
import { NotificationContext } from './NotificationProvider'
import { percentage } from './utils/calc'

type ProductionLineBoardProps = {
  productionLine: ProductionLine
  productionOrder: ProductionOrder
  companyId: ID
  reload: () => void
}

const ProductionLineBoard: React.FC<ProductionLineBoardProps> = ({
  productionLine,
  productionOrder,
  companyId,
  reload
}) => {
  const { notify } = useContext(NotificationContext)
  const [isNewGoodPiecesOpen, toggleNewGoodPieces] = useToggle()
  const [isNewRejectedPiecesOpen, toggleNewRejectedPieces] = useToggle()
  const [isNewStopsOpen, toggleNewStops] = useToggle()
  const [isNewScrapsOpen, toggleNewScraps] = useToggle()
  const [fetchState, setFetchState] = useState<{
    state: 'idle' | 'fetching' | 'successed' | 'failed'
    data?: any
    error?: Error
  }>({
    state: 'idle',
    data: undefined,
    error: undefined
  })

  const data = [
    {
      id: 'completed',
      value: productionOrder.production_quantity,
      color: colors.SUCCESS
    },
    {
      id: 'remaining',
      value: productionOrder.quantity - productionOrder.production_quantity,
      color: colors.SECONDARY
    }
  ]

  const handleNewGoodPiecesSubmit = async (formData: NewGoodPiecesFormData) => {
    setFetchState({
      state: 'fetching'
    })

    await container.createEvent({
      data: {
        eventType: 'Production',
        quantity: Number(formData.quantity),
        eventDatetime: formData.eventDatetime
      },
      companyId,
      productionLineId: productionLine.id,
      productionOrderId: productionOrder.id
    })

    setFetchState({ state: 'successed' })
    toggleNewGoodPieces()
    notify('Evento adicionado com sucesso.', 'success', 5)
    reload()
  }

  return (
    <>
      <div className="operation">
        <div className="operation__main">
          <div className="container">
            <div className="operation__main__wrapper">
              <div className="operation__main__chart">
                <div className="chart chart--pie">
                  <ResponsivePie
                    data={data}
                    colors={d => String(d.color)}
                    innerRadius={0.9}
                    enableRadialLabels={false}
                    enableSlicesLabels={false}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    isInteractive={false}
                  />
                  <div className="chart__center">
                    <div className="chart__title">
                      {percentage(
                        productionOrder.production_quantity,
                        productionOrder.quantity
                      ).toFixed(0)}
                      %
                    </div>
                    <div className="chart__subtitle">
                      {productionOrder.production_quantity || 0} /{' '}
                      {productionOrder.quantity}
                    </div>
                  </div>
                </div>
              </div>
              <div className="operation__main__info">
                <hgroup>
                  <h1 className="operation__main__info__title">
                    {productionOrder.product.name}
                  </h1>
                  <div className="operation__main__info__secondary">
                    <span className="operation__main__info__status">
                      <i className="fas fa-check"></i> Ativo
                    </span>

                    <span className="operation__main__info__time">
                      <i className="far fa-clock"></i> 10:00:00
                    </span>
                  </div>
                </hgroup>
              </div>
            </div>
          </div>
        </div>

        <div className="operation__data">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-3">
                <div className="operation__card">
                  <div className="operation__card__body">
                    <div className="operation__title">Produzidas</div>
                    <div className="operation__value">
                      {productionOrder.production_quantity || 0}
                    </div>

                    <span className="operation__bg__icon">
                      <i className="fa fa-check"></i>
                    </span>
                  </div>

                  <button
                    onClick={toggleNewGoodPieces}
                    className="operation__card__action"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <div className="operation__card">
                  <div className="operation__card__body">
                    <div className="operation__title">Retrabalho</div>
                    <div className="operation__value">
                      {productionOrder.rework_quantity || 0}
                    </div>

                    <span className="operation__bg__icon operation__bg__icon--warning">
                      <i className="fa fa-recycle"></i>
                    </span>
                  </div>

                  <button
                    onClick={toggleNewRejectedPieces}
                    className="operation__card__action operation__card__action--warning"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <div className="operation__card">
                  <div className="operation__card__body">
                    <div className="operation__title">Disperdício</div>
                    <div className="operation__value">
                      {productionOrder.waste_quantity || 0}
                    </div>

                    <span className="operation__bg__icon operation__bg__icon--danger">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </div>

                  <button
                    onClick={toggleNewScraps}
                    className="operation__card__action operation__card__action--danger"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="col-xs-12 col-sm-3">
                <div className="operation__card">
                  <div className="operation__card__body">
                    <div className="operation__title">Paradas</div>
                    <div className="operation__value">
                      {productionOrder.waste_quantity || 0}
                    </div>

                    <span className="operation__bg__icon operation__bg__icon--danger-dark">
                      <i className="fas fa-ban"></i>
                    </span>
                  </div>

                  <button
                    onClick={toggleNewStops}
                    className="operation__card__action operation__card__action--danger-dark"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddProductionModal
        isLoading={fetchState.state === 'fetching'}
        isOpen={isNewGoodPiecesOpen}
        toggle={toggleNewGoodPieces}
        units={productionOrder.product.units_of_measurement}
        onSubmit={handleNewGoodPiecesSubmit}
      ></AddProductionModal>
      <AddReworkModal
        reload={reload}
        productionOrderId={productionOrder.id}
        isOpen={isNewRejectedPiecesOpen}
        toggle={toggleNewRejectedPieces}
      ></AddReworkModal>
      <AddWasteModal
        reload={reload}
        productionOrderId={productionOrder.id}
        isOpen={isNewScrapsOpen}
        toggle={toggleNewScraps}
      ></AddWasteModal>
      <AddStopModal
        reload={reload}
        isOpen={isNewStopsOpen}
        toggle={toggleNewStops}
      ></AddStopModal>
    </>
  )
}

export default ProductionLineBoard
