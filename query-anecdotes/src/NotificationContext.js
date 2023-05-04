import { useReducer, createContext, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SUCCESS":
        return action.payload
      case "ERROR":
        return action.payload
      case "RESET":
        return ""
      default:
        return state
    }
  }

const NotificationContext = createContext()
export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "")
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notiAndDispatch = useContext(NotificationContext)
    return notiAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notiAndDispatch = useContext(NotificationContext)
    return notiAndDispatch[1]
}
export default NotificationContext