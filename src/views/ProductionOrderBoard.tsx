import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import colors from '../config/colors'
import NewGoodPiecesModal from './NewGoodPiecesModal'
import NewRejectedPiecesModal from './NewRejectedPiecesModal'
import NewStopsModal from './NewStopsModal'
import NewScrapsModal from './NewScrapsModal'
import { useToggle } from './useToggle'
import { ProductionOrder } from '../types'

type ProductionOrderBoardProps = {
  productionOrder: ProductionOrder
}

const toggleNames = [
  'newGoodPieces',
  'newRejectedPieces',
  'newStops',
  'newScraps'
]

const data = [
  {
    id: 'completed',
    value: 126,
    color: colors.SUCCESS
  },
  {
    id: 'remaining',
    value: 567,
    color: colors.SECONDARY
  }
]

const ProductionOrderBoard: React.FC<ProductionOrderBoardProps> = ({
  productionOrder
}) => {
  const { toggle, getToggleValue } = useToggle(toggleNames)

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
                    <div className="chart__title">100%</div>
                    <div className="chart__subtitle">
                      {productionOrder.production_quantity} / 3.000
                    </div>
                  </div>
                </div>
              </div>
              <div className="operation__main__info">
                <hgroup>
                  <h3 className="text-secondary">#{productionOrder.code}</h3>
                  <h1>{productionOrder.product.name}</h1>
                  <h3 className="text-secondary text-regular">
                    Iniciado de 10:00:00
                  </h3>
                </hgroup>
              </div>
            </div>
          </div>
        </div>

        <div className="operation__data">
          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-md-3">
                <div className="operation__info">
                  <div className="operation__info__label">Boas</div>
                  <div className="operation__info__value">37.675</div>
                </div>
              </div>

              <div className="col-xs-6 col-md-3">
                <div className="operation__info operation__info--warning">
                  <div className="operation__info__label">Rejeitadas</div>
                  <div className="operation__info__value">37.675</div>
                </div>
              </div>

              <div className="col-xs-6 col-md-3">
                <div className="operation__info operation__info--danger">
                  <div className="operation__info__label">Paradas</div>
                  <div className="operation__info__value">37.675</div>
                </div>
              </div>

              <div className="col-xs-6 col-md-3">
                <div className="operation__info operation__info--danger-dark">
                  <div className="operation__info__label">Refugos</div>
                  <div className="operation__info__value">37.675</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="operation__actions">
          <div className="container">
            <button
              onClick={toggle('newGoodPieces')}
              className="operation__btn"
            >
              <i className="fas fa-plus"></i>
            </button>
            <button
              onClick={toggle('newRejectedPieces')}
              className="operation__btn operation__btn--warning"
            >
              <i className="fas fa-recycle"></i>
            </button>
            <button
              onClick={toggle('newStops')}
              className="operation__btn operation__btn--danger"
            >
              <i className="fas fa-ban"></i>
            </button>
            <button
              onClick={toggle('newScraps')}
              className="operation__btn operation__btn--danger-dark"
            >
              <i className="fas fa-recycle"></i>
            </button>
          </div>
        </div>
      </div>

      <NewGoodPiecesModal
        isOpen={getToggleValue('newGoodPieces')}
        toggle={toggle('newGoodPieces')}
        units={productionOrder.product.units_of_measurement}
      ></NewGoodPiecesModal>
      <NewRejectedPiecesModal
        isOpen={getToggleValue('newRejectedPieces')}
        toggle={toggle('newRejectedPieces')}
      ></NewRejectedPiecesModal>
      <NewStopsModal
        isOpen={getToggleValue('newStops')}
        toggle={toggle('newStops')}
      ></NewStopsModal>
      <NewScrapsModal
        isOpen={getToggleValue('newScraps')}
        toggle={toggle('newScraps')}
      ></NewScrapsModal>
    </>
  )
}

export default ProductionOrderBoard
