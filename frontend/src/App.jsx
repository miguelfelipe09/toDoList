import TaskContextProvider from "./contexts/TaskContext";
import Home from "./pages/Home";
const App = () => {
  return (
    <>
      <TaskContextProvider>
        <Home/>     
      </TaskContextProvider>

    </>
  )
};

export default App;
