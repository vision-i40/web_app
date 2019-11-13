import React, { HTMLProps, forwardRef } from 'react'
import useAsync from './useAsync'
import container from '../container'

type ProductSelectOptions = HTMLProps<HTMLSelectElement> & {
  companyId: string
  ref: React.Ref<HTMLSelectElement>
}

const ProductSelect: React.FC<ProductSelectOptions> = forwardRef(
  ({ companyId, ...selectProps }, ref) => {
    const { data: products } = useAsync(container.getProducts, {
      onLoad: true,
      args: [companyId]
    })

    return (
      <select {...selectProps} ref={ref}>
        {!products ? (
          <option value="">Carregando...</option>
        ) : (
          <>
            <option value="">Selecione um produto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </>
        )}
      </select>
    )
  }
)

export default ProductSelect
