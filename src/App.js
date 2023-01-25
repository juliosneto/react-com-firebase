import Rotas from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <ToastContainer autoClose={2000}/>
        <Rotas/>
    </div>
  );
}

export default App;
