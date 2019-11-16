import React, { useEffect } from 'react'
import useForm from 'react-hook-form'
import Modal, { ModalProps } from './Modal'
import ProductSelect from './ProductSelect'
import { useParams } from 'react-router-dom'
import useAsync from './useAsync'
import container from '../container'

export type NewProductionOrderForm = {
  productId: string
  code: string
  quantity: number
}

type NewProductionOrderModalProps = Pick<ModalProps, 'isOpen' | 'toggle'> & {
  onSuccess: () => void
}

const NewProductionOrderModal: React.FC<NewProductionOrderModalProps> = ({
  onSuccess,
  isOpen,
  toggle
}) => {
  const { register, handleSubmit } = useForm<NewProductionOrderForm>()
  const { companyId, productionLineId } = useParams<{
    companyId: string
    productionLineId: string
  }>()
  const { run: runCreateProductionOrder, isLoading, isFinished } = useAsync(
    container.createProductionOrder
  )

  useEffect(() => {
    if (isFinished) {
      toggle()
      onSuccess()
    }
    // Toggle and OnSuccess are not cacheable
    // so it causes a loop
    // eslint-disable-next-line
  }, [isFinished])

  const onSubmit = async (form: NewProductionOrderForm) => {
    runCreateProductionOrder({
      ...form,
      companyId,
      productionLineId
    })
  }

  return (
    <Modal toggle={toggle} isOpen={isOpen} title="Nova Ordem de Produção">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal__body">
          <div className="form__group">
            <label htmlFor="productId">Produto</label>
            <div className="form__field form__field--select">
              <ProductSelect
                companyId={companyId}
                name="productId"
                id="productId"
                ref={register}
                required
              />
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="code">Código da ordem</label>
            <input
              type="text"
              name="code"
              id="code"
              required
              className="form__field"
              ref={register}
            />
          </div>

          <div className="form__group">
            <label htmlFor="">Quantidade</label>
            <input
              required
              id="quantity"
              name="quantity"
              type="number"
              className="form__field"
              min={1}
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

export default NewProductionOrderModal
