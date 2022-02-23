import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ""
    }
  }
})

export const setNotification = (content, time) => {
  return dispatch => {
    window.clearTimeout(window.timeout)
    dispatch(updateNotification(content))
    window.timeout = setTimeout(() => {
      dispatch(removeNotification())
    }, (time * 1000))
  }
}

export const { updateNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
