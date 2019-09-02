import React from 'react'

export type ModalProps = {
  isOpen?: boolean
  toggle: () => void
  title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggle, title, children }) => {
  if (!isOpen) return <></>

  return (
    <div className="modal__backdrop">
      <div className="modal">
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
