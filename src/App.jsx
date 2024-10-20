import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(false);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  // Function to generate password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    // Build string based on allowed options
    if (numberAllowed) str += "0123456789";
    if (uppercaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercaseAllowed) str += "abcdefghijklmnopqrstuvwxyz";
    if (specialCharAllowed) str += "!@#$%^&*()-_=+[{]}|;:,.<>/?";

    // Generate password by appending random characters
    if (str.length > 0) {
      for (let i = 0; i < length; i++) {
        let charIndex = Math.floor(Math.random() * str.length);
        pass += str.charAt(charIndex);
      }
    }

    setPassword(pass);
  }, [length, numberAllowed, uppercaseAllowed, lowercaseAllowed, specialCharAllowed]);

  // Copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    // Reset copy status after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, specialCharAllowed, lowercaseAllowed, uppercaseAllowed, passwordGenerator]);

  return (
    <>
      <h1 className="w-full max-w-md mx-auto shadow-md rounded-xl overflow-hidden text-white mb-4 p-4 m-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-center transition-all duration-500 transform hover:scale-105 animate-fadeIn">
        Password Generator
        <div className="flex gap-4 mt-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="text-center p-2 rounded-md w-full my-3 bg-gray-100 text-black transition-all duration-500 transform hover:scale-105"
          />
          <button
            onClick={copyToClipboard}
            className={`bg-slate-500 py-2 px-4 rounded-full text-sm transition-all duration-300 transform hover:scale-110 hover:bg-blue-700 focus:outline-none ${
              copied ? "bg-green-500" : ""
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={8}
            max={36}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="number">Number:</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={lowercaseAllowed}
            onChange={() => setLowercaseAllowed((prev) => !prev)}
          />
          <label htmlFor="lowerCase">LowerCase:</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={uppercaseAllowed}
            onChange={() => setUppercaseAllowed((prev) => !prev)}
          />
          <label htmlFor="Uppercase">Uppercase:</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={specialCharAllowed}
            onChange={() => setSpecialCharAllowed((prev) => !prev)}
          />
          <label htmlFor="specialChar">Special Characters:</label>
        </div>
      </h1>
    </>
  );
}

export default App;
