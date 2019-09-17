import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import colors from '../config/colors'
import NewGoodPiecesModal from './NewGoodPiecesModal'
import NewRejectedPiecesModal from './NewRejectedPiecesModal'
import NewStopsModal from './NewStopsModal'
import NewScrapsModal from './NewScrapsModal'
import { useToggle } from './useToggle'
import MeasurementService, { Unit } from '../MeasurementService'
import { ProductionOrder } from '../types'

type ProductionOrderBoardProps = {
  productionOrder: ProductionOrder
}

type UnitsState = {
  items: Unit[] | undefined
  loading: boolean
}

type BoardState = {
  units: UnitsState
}

const toggleNames = [
  'newGoodPieces',
  'newRejectedPieces',
  'newStops',
  'newScraps'
]

const initBoardState: BoardState = {
  units: {
    items: undefined,
    loading: false
  }
}

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
  const [boardState, setBoardState] = useState<BoardState>(initBoardState)

  useEffect(() => {
    const measurementService = MeasurementService()
    const startLoading = (state: UnitsState) => ({ ...state, loading: true })
    const stopLoading = (state: UnitsState) => ({ ...state, loading: false })
    const setItems = (items: Unit[]) => (state: UnitsState) => ({
      ...state,
      items
    })

    setBoardState(boardState => ({
      ...boardState,
      units: startLoading(boardState.units)
    }))

    measurementService
      .fetchAllUnits()
      .then(units => {
        setBoardState(boardState => ({
          ...boardState,
          units: setItems(units)(stopLoading(boardState.units))
        }))
      })
      .finally(() =>
        setBoardState(boardState => ({
          ...boardState,
          units: stopLoading(boardState.units)
        }))
      )
  }, [])

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
                  <h1>{productionOrder.product.name}</h1>
                  <h2 className="text-secondary">{productionOrder.code}</h2>
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
              <div className="col-xs">
                <div className="operation__info">
                  <div className="operation__info__label">Boas</div>
                  <div className="operation__info__value">37.675</div>
                </div>
              </div>

              <div className="col-xs">
                <div className="operation__info operation__info--warning">
                  <div className="operation__info__label">Rejeitadas</div>
                  <div className="operation__info__value">37.675</div>
                </div>
              </div>

              <div className="col-xs">
                <div className="operation__info operation__info--danger">
                  <div className="operation__info__label">Paradas</div>
                  <div className="operation__info__value">37.675</div>
                </div>
              </div>

              <div className="col-xs">
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
        units={boardState.units.items}
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
