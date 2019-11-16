import React, { useState } from 'react'
import useForm from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Modal from './Modal'
import CodeGroupSelect from './CodeGroupSelect'
import useSWR from 'swr'
import container from '../container'
import { isEmpty } from './utils/values'
import { ID } from '../types'

type AddStopModalProps = {
  isOpen?: boolean
  reload: () => void
  toggle: () => void
}

type ProductionLineParams = {
  companyId: string
  productionLineId: string
}

type NewManualStopFormData = {
  start_datetime: string
  end_datetime: string
  stop_code_id: ID
}

const AddStopModal: React.FC<AddStopModalProps> = ({
  reload,
  ...modalProps
}) => {
  const { register, watch, handleSubmit } = useForm<NewManualStopFormData>()
  const { companyId, productionLineId } = useParams<ProductionLineParams>()
  const codeGroupId = watch('codeGroupId')

  // Fetch stop codes
  const { data: stopCodes } = useSWR(
    codeGroupId ? [companyId, codeGroupId, 'stopCodes'] : null,
    container.getStopCodes
  )

  // Submit
  const [isCreating, setIsCreating] = useState(false)
  const onSubmit = async (formData: NewManualStopFormData) => {
    setIsCreating(true)
    await container.createManualStop({
      data: formData,
      companyId,
      productionLineId
    })

    modalProps.toggle()
    reload()
    setIsCreating(false)
  }

  return (
    <Modal {...modalProps} title="Adicionar paradas">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="modal__body">
          <div className="form__group">
            <div className="row">
              <div className="col-xs-6">
                <label htmlFor="start_datetime">Começou em</label>
                <input
                  autoFocus
                  required
                  ref={register}
                  name="start_datetime"
                  id="start_datetime"
                  type="datetime-local"
                  className="form__field"
                />
              </div>

              <div className="col-xs-6">
                <label htmlFor="end_datetime">Terminou em</label>
                <input
                  required
                  ref={register}
                  name="end_datetime"
                  id="end_datetime"
                  type="datetime-local"
                  className="form__field"
                />
              </div>
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="codeGroupId">Grupo do motivo</label>
            <div className="form__field form__field--select">
              <CodeGroupSelect
                filterBy="StopCode"
                companyId={companyId}
                name="codeGroupId"
                id="codeGroupId"
                ref={register}
                required
              />
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="stop_code_id">Código de parada</label>
            <div className="form__field form__field--select">
              <select
                name="stop_code_id"
                id="stop_code_id"
                ref={register}
                disabled={isEmpty(codeGroupId)}
                required
              >
                {!stopCodes ? (
                  <option value="">
                    {!isEmpty(codeGroupId) && 'Carregando...'}
                  </option>
                ) : (
                  <>
                    <option value="">Selecione um grupo</option>
                    {stopCodes.map(stopCode => (
                      <option key={stopCode.id} value={stopCode.id}>
                        {stopCode.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          <button
            disabled={isCreating}
            className="btn btn--block btn--danger-dark btn--lg"
          >
            {isCreating ? 'Adicionando...' : 'Adicionar parada manual'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddStopModal
