import logo from "./logo.svg";
import TodoList from "./TodoList";
import AudioPlayer from "./AudioPlayer";
import Orderbook from "./Orderbook";
import "./App.css";

/*
  <TodoList />
  <Todo />
*/

/*
 1st iteration
 1. We want to have play/pause - Done
 2. Forward and rewind by how many 5s - Done
 3. Audio speeds - 0.5, 1, 1.5, 2. - Done
 4. Share button - Done
 5. Transcript
*/

/*
  Transcription Component

  1. It will accept JSON as props
  2. We need to have separate transcript lines for each item
  3. Highlighting the word based on start time and end time
*/

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        {/* Todo List */}
        {/* <TodoList /> */}
        {/* <AudioPlayer /> */}
        <Orderbook />
      </div>
    </div>
  );
}

export default App;
