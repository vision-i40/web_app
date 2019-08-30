import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import colors from './colors'

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

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="operation">
        <div className="operation__main">
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
                  <div className="chart__subtitle">2.000 / 3.000</div>
                </div>
              </div>
            </div>
            <div className="operation__main__info">
              <hgroup>
                <h1>Água Mineral Boa Viagem</h1>
                <h2 className="text-secondary">TI000004</h2>
                <h3 className="text-secondary text-regular">
                  Iniciado de 10:00:00
                </h3>
              </hgroup>
            </div>
          </div>
        </div>

        <div className="operation__data">
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

        <div className="operation__actions">
          <button className="operation__btn">
            <i className="fas fa-plus"></i>
          </button>
          <button className="operation__btn operation__btn--warning">
            <i className="fas fa-recycle"></i>
          </button>
          <button className="operation__btn operation__btn--danger">
            <i className="fas fa-ban"></i>
          </button>
          <button className="operation__btn operation__btn--danger-dark">
            <i className="fas fa-recycle"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
