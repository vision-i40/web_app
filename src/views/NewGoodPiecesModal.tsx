import React from 'react'
import Modal from './Modal'
import { UnitOfMeasurement } from '../types'

type NewGoodPieceModalProps = {
  isOpen?: boolean
  toggle: () => void
  units: UnitOfMeasurement[] | undefined
}

const NewGoodPiecesModal: React.FC<NewGoodPieceModalProps> = ({
  units,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps} title="Adicionar peças boas">
      <form className="form">
        <div className="modal__body">
          <div className="form__group">
            <label htmlFor="">Quantidade</label>
            <input type="number" className="form__field" />
          </div>

          <div className="form__group">
            <label htmlFor="unitId">Unidade de medida</label>
            {!units ? (
              <p>Carregando...</p>
            ) : (
              <div className="form__field form__field--select">
                <select id="unitId" required>
                  <option value="">Selecione uma unidade de medida</option>
                  {units.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <button className="btn btn--block btn--success btn--lg">
          <i className="fas fa-plus"></i> Adicionar peça boa
        </button>
      </form>
    </Modal>
  )
}

export default NewGoodPiecesModal
