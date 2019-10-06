import React, { useState, useContext } from 'react'
import { ResponsivePie } from '@nivo/pie'
import colors from '../config/colors'
import NewGoodPiecesModal, { NewGoodPiecesFormData } from './NewGoodPiecesModal'
import NewRejectedPiecesModal from './NewRejectedPiecesModal'
import NewStopsModal from './NewStopsModal'
import NewScrapsModal from './NewScrapsModal'
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
                      {productionOrder.production_quantity} /{' '}
                      {productionOrder.quantity}
                    </div>
                  </div>
                </div>
              </div>
              <div className="operation__main__info">
                <hgroup>
                  {/* <h3 className="text-secondary">#{productionOrder.code}</h3> */}
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
              <div className="col-xs-12 col-sm-4">
                <div className="operation__card">
                  <div className="operation__title">
                    {/* <span className="operation__title__icon">
                      <i className="fa fa-check"></i>
                    </span>{' '} */}
                    Produzidas
                  </div>
                  <div className="operation__value">
                    {productionOrder.production_quantity}
                  </div>

                  <span className="operation__bg__icon">
                    <i className="fa fa-check"></i>
                  </span>
                </div>
              </div>

              <div className="col-xs-12 col-sm-4">
                <div className="operation__card">
                  <div className="operation__title">
                    {/* <span className="operation__title__icon">
                      <i className="fa fa-check"></i>
                    </span>{' '} */}
                    Retrabalho
                  </div>
                  <div className="operation__value">
                    {productionOrder.rework_quantity}
                  </div>

                  <span className="operation__bg__icon operation__bg__icon--warning">
                    <i className="fa fa-recycle"></i>
                  </span>
                </div>
              </div>

              <div className="col-xs-12 col-sm-4">
                <div className="operation__card">
                  <div className="operation__title">
                    {/* <span className="operation__title__icon">
                      <i className="fa fa-check"></i>
                    </span>{' '} */}
                    Disperdiçadas
                  </div>
                  <div className="operation__value">
                    {productionOrder.waste_quantity}
                  </div>

                  <span className="operation__bg__icon operation__bg__icon--danger">
                    <i className="fas fa-trash-alt"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="operation__data">
          <div className="container">
            <div className="row">
              <div className="col-xs-4">
                <div className="operation__info">
                  <div className="operation__info__label">Boas</div>
                  <div className="operation__info__value">
                    {productionOrder.production_quantity}
                  </div>
                </div>
              </div>

              <div className="col-xs-4">
                <div className="operation__info operation__info--warning">
                  <div className="operation__info__label">Rejeitadas</div>
                  <div className="operation__info__value">
                    {productionOrder.rework_quantity}
                  </div>
                </div>
              </div>

              <div className="col-xs-4">
                <div className="operation__info operation__info--danger-dark">
                  <div className="operation__info__label">Refugos</div>
                  <div className="operation__info__value">
                    {productionOrder.waste_quantity}
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div> */}

        <div className="operation__actions">
          <div className="container">
            <button onClick={toggleNewGoodPieces} className="operation__btn">
              <i className="fas fa-plus"></i>
              <p className="operation__btn__label">Produzida</p>
            </button>
            <button
              onClick={toggleNewRejectedPieces}
              className="operation__btn operation__btn--warning"
            >
              <i className="fas fa-recycle"></i>
              <p className="operation__btn__label">Retrabalho</p>
            </button>
            <button
              onClick={toggleNewScraps}
              className="operation__btn operation__btn--danger"
            >
              <i className="fas fa-trash-alt"></i>
              <p className="operation__btn__label">Disperdiçadas</p>
            </button>
            <button
              onClick={toggleNewStops}
              className="operation__btn operation__btn--danger-dark"
            >
              <i className="fas fa-ban"></i>
              <p className="operation__btn__label">Paradas</p>
            </button>
          </div>
        </div>
      </div>

      <NewGoodPiecesModal
        isLoading={fetchState.state === 'fetching'}
        isOpen={isNewGoodPiecesOpen}
        toggle={toggleNewGoodPieces}
        units={productionOrder.product.units_of_measurement}
        onSubmit={handleNewGoodPiecesSubmit}
      ></NewGoodPiecesModal>
      <NewRejectedPiecesModal
        isOpen={isNewRejectedPiecesOpen}
        toggle={toggleNewRejectedPieces}
      ></NewRejectedPiecesModal>
      <NewStopsModal
        isOpen={isNewStopsOpen}
        toggle={toggleNewStops}
      ></NewStopsModal>
      <NewScrapsModal
        isOpen={isNewScrapsOpen}
        toggle={toggleNewScraps}
      ></NewScrapsModal>
    </>
  )
}

export default ProductionLineBoard
