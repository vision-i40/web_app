import React, { useCallback, useEffect, useRef } from 'react'
import { createContext, useState } from 'react'
import Notification, {
  NotificationProps,
  NotificationType
} from './Notification'

type Notify = (
  message: string,
  type?: NotificationType,
  duration?: number
) => void

export const NotificationContext = createContext<{ notify: Notify }>({
  notify: () => {
    throw new Error('NotificationContext does not load the notify()')
  }
})

const NotificationProvider: React.FC = ({ children }) => {
  const closeTimeout = useRef<number>()
  const [notification, setNotification] = useState<NotificationProps>({
    open: false
  })

  useEffect(() => {
    if (notification.open && notification.duration) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = window.setTimeout(() => {
        setNotification({
          ...notification,
          open: false
        })
      }, notification.duration * 1000)
    }
  }, [notification])

  const notify = useCallback<Notify>((message, type, duration) => {
    setNotification({
      open: true,
      message,
      type,
      duration
    })
  }, [])

  const close = useCallback(() => {
    setNotification(notification => ({
      ...notification,
      open: false
    }))
  }, [])

  return (
    <NotificationContext.Provider value={{ notify }}>
      <Notification onClose={close} {...notification}></Notification>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
