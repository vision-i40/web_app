import React, { ReactElement, useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { useTransition, animated } from 'react-spring'
import { useToggle } from './useToggle'

type DropdownItem = {
  label: string
  onClick: () => void
}

type DropdownProps = {
  className: string
  items: DropdownItem[]
  children: ReactElement
}

const Dropdown: React.FC<DropdownProps> = ({ className, children, items }) => {
  const ref = useRef(null)
  const [isOpen, toggle] = useToggle()
  useOnClickOutside(ref, () => isOpen && toggle())
  const dropdownItemsTransitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'scale(0.5)', transformOrigin: 'top right' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.5)' },
    config: {
      tension: 250
    }
  })

  return (
    <div ref={ref} className={`${className} dropdown`}>
      {React.cloneElement(children, { onClick: toggle })}

      {dropdownItemsTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.ul style={props} key={key} className="dropdown__items">
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    toggle()
                    item.onClick()
                  }}
                  className="dropdown__item"
                >
                  {item.label}
                </li>
              ))}
            </animated.ul>
          )
      )}
    </div>
  )
}

export default Dropdown
