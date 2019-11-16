import React, { useRef } from 'react'
import useForm from 'react-hook-form'
import dayjs from 'dayjs'
import Modal from './Modal'
import { UnitOfMeasurement } from '../types'

type NewGoodPieceModalProps = {
  isOpen?: boolean
  isLoading?: boolean
  units: UnitOfMeasurement[] | undefined
  toggle: () => void
  onSubmit: (data: NewGoodPiecesFormData) => void
}

export type NewGoodPiecesFormData = {
  quantity: string
  eventDatetime: string
}

const AddProductionModal: React.FC<NewGoodPieceModalProps> = ({
  units,
  onSubmit,
  isLoading,
  ...modalProps
}) => {
  const quantityRef = useRef<HTMLInputElement | null>(null)
  const { register, handleSubmit } = useForm<NewGoodPiecesFormData>({
    defaultValues: {
      eventDatetime: dayjs().format('YYYY-MM-DDTHH:mm')
    }
  })

  return (
    <Modal {...modalProps} title="Adicionar peças boas">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal__body">
          <div className="form__group">
            <label htmlFor="">Quantidade</label>
            <input
              required
              autoFocus
              id="quantity"
              name="quantity"
              type="number"
              className="form__field"
              min={1}
              ref={e => {
                register(e)
                quantityRef.current = e
              }}
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

          <button
            disabled={isLoading}
            className="btn btn--block btn--success btn--lg"
          >
            {isLoading ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddProductionModal
