import React, { useCallback, MouseEvent } from 'react'

export type ModalProps = {
  isOpen?: boolean
  toggle: () => void
  title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggle, title, children }) => {
  const handleModalClick = useCallback((event: MouseEvent) => {
    // prevents backdrop click propagation
    event.stopPropagation()
  }, [])

  return (
    <div
      className={`modal__backdrop ${isOpen ? 'open' : 'close'}`}
      onClick={toggle}
    >
      <div className="modal" onClick={handleModalClick}>
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button type="button" className="modal__close" onClick={toggle}>
            <i className="fa fa-times"></i>
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal
