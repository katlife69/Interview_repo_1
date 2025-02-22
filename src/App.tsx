import "./App.css";
import LoadingScreen from "./components/layout/LoadingScreen";
import AppRouter from "./config/AppRouter";

function App() {
  return (
    <>
      <LoadingScreen />
      <AppRouter />
    </>
  );
}

export default App;
