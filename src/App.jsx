import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
// import "tailwindcss/tailwind.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqestuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*?><";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bgImg min-h-screen flex items-center justify-center bg-gray-100 mx-4">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none  text-orange-500">
        <h1 className="text-white text-center text-xl font-bold mb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-red-400 text-white px-4 py-2"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-y-2 gap-x-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <label className="text-white">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-white">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
