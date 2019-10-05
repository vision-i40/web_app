import React from 'react'
import useForm from 'react-hook-form'
import Modal from './Modal'
import { UnitOfMeasurement } from '../types'

type NewGoodPieceModalProps = {
  isOpen?: boolean
  toggle: () => void
  units: UnitOfMeasurement[] | undefined
  onSubmit: (data: NewGoodPiecesFormData) => void
}

export type NewGoodPiecesFormData = {
  quantity: string
  eventDatetime: string
}

const NewGoodPiecesModal: React.FC<NewGoodPieceModalProps> = ({
  units,
  onSubmit,
  ...modalProps
}) => {
  const { register, handleSubmit } = useForm<NewGoodPiecesFormData>()

  return (
    <Modal {...modalProps} title="Adicionar peças boas">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal__body">
          <div className="form__group">
            <label htmlFor="">Quantidade</label>
            <input
              required
              name="quantity"
              type="number"
              className="form__field"
              min={1}
              ref={register}
            />
          </div>

          <div className="form__group">
            <label htmlFor="">Quando ocorreu</label>
            <input
              required
              name="eventDatetime"
              type="datetime-local"
              className="form__field"
              ref={register}
            />
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
