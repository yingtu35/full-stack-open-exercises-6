import { createSlice } from "@reduxjs/toolkit"

const initialState = ""
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage(state, action) {
      return initialState
    }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions
export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, duration*1000)
  }
}
export default notificationSlice.reducer