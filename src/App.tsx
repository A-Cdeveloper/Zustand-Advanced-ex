import "./App.css";
import { CountContextProvider, useCountStore } from "./store/CountProvider";

function App() {
  return (
    <>
      <h1>Zustand with Context</h1>
      <CountContextProvider initialCount={10}>
        <DemoComponent />
      </CountContextProvider>
    </>
  );
}
export default App;

/////
const DemoComponent = () => {
  const count = useCountStore((state) => state.count);
  const incFn = useCountStore((state) => state.inc);
  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={incFn}>Increment</button>
    </>
  );
};
