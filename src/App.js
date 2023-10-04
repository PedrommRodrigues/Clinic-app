import Header from "./Components/Layout/Header";
import "./App.css";
import SideBar from "./Components/Layout/SideBar";
import PatientProvider from "./Components/Store/PatientProvider";

function App() {
  return (
    <div className="container">
      <PatientProvider>
        <SideBar />
      </PatientProvider>
      <Header />
    </div>
  );
}

export default App;
