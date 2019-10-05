import React from 'react'

export type NotificationProps = {
  open: boolean
  duration?: number
  type?: NotificationType
  message?: string
  onClose?: () => void
}

export type NotificationType = 'success' | 'error'

const typeIcons = {
  success: 'fas fa-check-circle',
  error: 'fas fa-warning'
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  open,
  duration,
  onClose
}) => {
  if (!type) type = 'success'

  let classNames = ['stack-notification']
  open ? classNames.push('open') : classNames.push('close')

  return (
    <div className={classNames.join(' ')}>
      {duration && (
        <div className="stack-notification__progress">
          <div
            className="stack-notification__progress__bar"
            style={{ animationDuration: `${duration}s` }}
          />
        </div>
      )}

      <span className="stack-notification__icon">
        <i className={typeIcons[type]}></i>
      </span>

      <span className="stack-notification__message">{message}</span>

      {onClose && (
        <button
          type="button"
          className="stack-notification__close"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  )
}

export default Notification
