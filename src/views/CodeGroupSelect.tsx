import React, { HTMLProps, forwardRef, useMemo } from 'react'
import useAsync from './useAsync'
import container from '../container'
import { GroupTypes } from '../types'

type CodeGroupSelectOptions = HTMLProps<HTMLSelectElement> & {
  companyId: string
  filterBy?: GroupTypes
  ref: React.Ref<HTMLSelectElement>
}

const CodeGroupSelect: React.FC<CodeGroupSelectOptions> = forwardRef(
  ({ companyId, filterBy, ...selectProps }, ref) => {
    const { data: codeGroups } = useAsync(container.getCodeGroups, {
      onLoad: true,
      args: [companyId]
    })

    const filteredCodeGroups = useMemo(() => {
      if (codeGroups && filterBy) {
        return codeGroups.filter(group => group.groupType === filterBy)
      }

      return codeGroups
    }, [codeGroups, filterBy])

    return (
      <select {...selectProps} ref={ref}>
        {!filteredCodeGroups ? (
          <option value="">Carregando...</option>
        ) : (
          <>
            <option value="">Selecione um grupo</option>
            {filteredCodeGroups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </>
        )}
      </select>
    )
  }
)

export default CodeGroupSelect
