import { useState } from "react";
import Layout from "./components/Layout/Layout";
import CardContext, { initialState } from "./context/cardContext";

function App() {
  const [state, setState] = useState(initialState);
  return (
    <CardContext.Provider value={{ state, setState }}>
      <Layout />
    </CardContext.Provider>
  );
}

export default App;
