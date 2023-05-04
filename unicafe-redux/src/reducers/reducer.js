import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    good(state, action) {
      return {
        ...state,
        good: state.good + 1
      }
    },
    ok(state, action) {
      return {
        ...state,
        ok: state.ok + 1
      }
    },
    bad(state, action) {
      return {
        ...state,
        bad: state.bad + 1
      }
    },
    reset(state, action) {
      return initialState
    }
  }
})

export const { good, ok, bad, reset } = counterReducer.actions
export default counterReducer.reducer
