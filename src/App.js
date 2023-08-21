import Body from "./views/Body";
import Navbar from "./views/Navbar";
import Foot from "./views/Foot";

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Body />
      </div>
      <Foot />
    </div>
  );
}

export default App;
