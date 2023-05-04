import { useDispatch, useSelector } from "react-redux"
import { good, bad, ok, reset } from "./reducers/reducer"

const App = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter)
  const incrementGood = () => {
    dispatch(good())
  }

  const incrementOk = () => {
    dispatch(ok())
  }

  const incrementBad = () => {
    dispatch(bad())
  }

  const zero = () => {
    dispatch(reset())
  }

  return (
    <div>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementOk}>ok</button>
      <button onClick={incrementBad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {counter.good}</div>
      <div>ok {counter.ok}</div>
      <div>bad {counter.bad}</div>
    </div>
  )
}

export default App