import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import useForm from 'react-hook-form'
import Modal from './Modal'
import useAsync from './useAsync'
import container from '../container'
import { useParams } from 'react-router'
import { isEmpty } from './utils/values'
import { ID, WasteCode } from '../types'
import CodeGroupSelect from './CodeGroupSelect'

type AddWasteModalProps = {
  isOpen?: boolean
  productionOrderId: ID
  reload: () => void
  toggle: () => void
}

type NewScrapPiecesFormData = {
  quantity: string
  eventDatetime: string
  codeGroupId: string
  wasteCodeId: string
}

const AddWasteModal: React.FC<AddWasteModalProps> = ({
  productionOrderId,
  reload,
  ...modalProps
}) => {
  const { companyId, productionLineId } = useParams<{
    companyId: string
    productionLineId: string
  }>()
  const { register, watch, handleSubmit, reset } = useForm<
    NewScrapPiecesFormData
  >({
    defaultValues: {
      eventDatetime: dayjs().format('YYYY-MM-DDTHH:mm')
    }
  })
  const codeGroupId = watch('codeGroupId')

  // Fetch waste codes
  const { run: fetchWasteCodes, data: reworkCodes } = useAsync<WasteCode[]>(
    container.getWasteCodes
  )
  useEffect(() => {
    if (!isEmpty(codeGroupId)) {
      fetchWasteCodes(companyId, codeGroupId)
    }
  }, [companyId, codeGroupId, fetchWasteCodes])

  // Submit
  const [isCreating, setIsCreating] = useState(false)
  const onSubmit = async (formData: NewScrapPiecesFormData) => {
    setIsCreating(true)
    await container.createEvent({
      data: {
        eventType: 'Waste',
        quantity: Number(formData.quantity),
        eventDatetime: formData.eventDatetime,
        wasteCode: formData.wasteCodeId
      },
      companyId,
      productionLineId,
      productionOrderId
    })

    modalProps.toggle()
    reload()
    setIsCreating(false)
    reset()
  }

  return (
    <Modal {...modalProps} title="Adicionar disperdício">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal__body">
          <div className="form__group">
            <label htmlFor="quantity">Quantidade</label>
            <input
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
                filterBy="WasteCode"
                companyId={companyId}
                name="codeGroupId"
                id="codeGroupId"
                ref={register}
                required
              />
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="wasteCodeId">Código de disperdício</label>
            <div className="form__field form__field--select">
              <select
                name="wasteCodeId"
                id="wasteCodeId"
                ref={register}
                disabled={isEmpty(codeGroupId)}
                required
              >
                {!reworkCodes ? (
                  <option value="">
                    {!isEmpty(codeGroupId) && 'Loading...'}
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
          className="btn btn--block btn--danger btn--lg"
        >
          {isCreating ? 'Adicionando...' : 'Adicionar disperdício'}
        </button>
      </form>
    </Modal>
  )
}

export default AddWasteModal
