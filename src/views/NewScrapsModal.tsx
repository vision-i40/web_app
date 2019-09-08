import React from 'react'
import Modal from './Modal'

type NewScrapsModalProps = {
  isOpen?: boolean
  toggle: () => void
}

const NewScrapsModal: React.FC<NewScrapsModalProps> = props => {
  return (
    <Modal {...props} title="Adicionar refugos">
      <form action="" className="form">
        <div className="modal__body">
          <div className="form__group">
            <label htmlFor="">Quantidade</label>
            <input type="number" className="form__field" />
          </div>

          <div className="form__group">
            <div className="row">
              <div className="col-xs">
                <label htmlFor="">Começou em</label>
                <input type="date" className="form__field" />
              </div>

              <div className="col-xs">
                <label htmlFor="">Duração em minutos</label>
                <input type="number" className="form__field" />
              </div>
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="">Motivo</label>
            <div className="form__field form__field--select">
              <select name="" id="">
                <option value="">Selecione um motivo</option>
              </select>
            </div>
          </div>
        </div>

        <button className="btn btn--block btn--danger-dark btn--lg">
          <i className="fas fa-recycle"></i> Adicionar refugos
        </button>
      </form>
    </Modal>
  )
}

export default NewScrapsModal
