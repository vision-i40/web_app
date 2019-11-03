import React, { useCallback, MouseEvent } from 'react'
import { useTransition, animated } from 'react-spring'

export type ModalProps = {
  isOpen?: boolean
  toggle: () => void
  title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggle, title, children }) => {
  const backdropTransitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 100
    }
  })

  const modalTransitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'scale(0.9) translateY(250px)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0)' },
    leave: { opacity: 0, transform: 'scale(0.9) translateY(250px)' },
    config: {
      duration: 100
    }
  })

  const handleModalClick = useCallback((event: MouseEvent) => {
    // prevents backdrop click propagation
    event.stopPropagation()
  }, [])

  return (
    <>
      {backdropTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="modal__backdrop"
              onClick={toggle}
            >
              {modalTransitions.map(
                ({ item, key, props }) =>
                  item && (
                    <animated.div
                      key={key}
                      style={props}
                      className="modal"
                      onClick={handleModalClick}
                    >
                      <div className="modal__header">
                        <div className="modal__title">{title}</div>
                        <button
                          type="button"
                          className="modal__close"
                          onClick={toggle}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>

                      {children}
                    </animated.div>
                  )
              )}
            </animated.div>
          )
      )}
    </>
  )
}

export default Modal
