import React from 'react'
import Modal from './shared/Modal'

type NewGoodPieceModalProps = {
  isOpen?: boolean
  toggle: () => void
}

const NewGoodPiecesModal: React.FC<NewGoodPieceModalProps> = props => {
  return (
    <Modal {...props} title="Adicionar peças boas">
      <form action="" className="form">
        <div className="modal__body">
          <div className="form__group">
            <label htmlFor="">Quantidade</label>
            <input type="number" className="form__field" />
          </div>

          <div className="form__group">
            <label htmlFor="">Unidade de medida</label>
            <div className="form__field form__field--select">
              <select name="" id="">
                <option value="">Selecione uma unidade de medida</option>
              </select>
            </div>
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
