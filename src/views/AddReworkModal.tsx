import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import useForm from 'react-hook-form'
import Modal from './Modal'
import useAsync from './useAsync'
import container from '../container'
import { useParams } from 'react-router'
import { isEmpty } from './utils/values'
import { ID } from '../types'
import CodeGroupSelect from './CodeGroupSelect'

type AddReworkModalProps = {
  isOpen?: boolean
  productionOrderId: ID
  reload: () => void
  toggle: () => void
}

type NewRejectedPiecesFormData = {
  quantity: string
  eventDatetime: string
  codeGroupId: string
  reworkCodeId: string
}

const AddReworkModal: React.FC<AddReworkModalProps> = ({
  productionOrderId,
  reload,
  ...modalProps
}) => {
  const { companyId, productionLineId } = useParams<{
    companyId: string
    productionLineId: string
  }>()
  const { register, watch, handleSubmit } = useForm<NewRejectedPiecesFormData>({
    defaultValues: {
      eventDatetime: dayjs().format('YYYY-MM-DDTHH:mm')
    }
  })
  const codeGroupId = watch('codeGroupId')

  // Fetch rework codes
  const { run: fetchReworkCodes, data: reworkCodes } = useAsync(
    container.getReworkCodes
  )

  useEffect(() => {
    if (!isEmpty(codeGroupId)) {
      fetchReworkCodes(companyId, codeGroupId)
    }
  }, [codeGroupId, companyId, fetchReworkCodes])

  // Submit
  const [isCreating, setIsCreating] = useState(false)
  const onSubmit = async (formData: NewRejectedPiecesFormData) => {
    setIsCreating(true)
    await container.createEvent({
      data: {
        eventType: 'Rework',
        quantity: Number(formData.quantity),
        eventDatetime: formData.eventDatetime,
        reworkCode: formData.reworkCodeId
      },
      companyId,
      productionLineId,
      productionOrderId
    })

    modalProps.toggle()
    reload()
    setIsCreating(false)
  }

  return (
    <Modal {...modalProps} title="Adicionar retrabalho">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal__body">
          <div className="form__group">
            <label htmlFor="quantity">Quantidade</label>
            <input
              autoFocus
              required
              min={1}
              type="nusmber"
              className="form__field"
              id="quantity"
              name="quantity"
              ref={register}
            />
          </div>

          <div className="form__group">
            <div className="row">
              <div className="col-xs">
                <label htmlFor="eventDatetime">Começou em</label>
                <input
                  type="datetime-local"
                  className="form__field"
                  name="eventDatetime"
                  id="eventDatetime"
                  ref={register}
                />
              </div>
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="codeGroupId">Grupo do motivo</label>
            <div className="form__field form__field--select">
              <CodeGroupSelect
                filterBy="ReworkCode"
                companyId={companyId}
                name="codeGroupId"
                id="codeGroupId"
                ref={register}
                required
              />
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="reworkCodeId">Código de retrabalho</label>
            <div className="form__field form__field--select">
              <select
                name="reworkCodeId"
                id="reworkCodeId"
                ref={register}
                disabled={isEmpty(codeGroupId)}
                required
              >
                {!reworkCodes ? (
                  <option value="">
                    {!isEmpty(codeGroupId) && 'Carregando...'}
                  </option>
                ) : (
                  <>
                    <option value="">Selecione um grupo</option>
                    {reworkCodes.map(reworkCode => (
                      <option key={reworkCode.id} value={reworkCode.id}>
                        {reworkCode.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        <button
          disabled={isCreating}
          className="btn btn--block btn--warning btn--lg"
        >
          {isCreating ? 'Adicionando...' : 'Adicionar retrabalho'}
        </button>
      </form>
    </Modal>
  )
}

export default AddReworkModal
