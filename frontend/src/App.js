import React, { useState } from "react";
import axios from "axios";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [output, setOutput] = useState("");

  const handleAddition = async () => {
    try {
      const res = await axios.post("http://localhost:8080/add", {
        num1,
        num2,
      });
      // console.log(res)
      let str = JSON.stringify(res.data);
      // console.log('str:', str)
      let t = str.replaceAll("},", "}\n");
      // console.log('t:', t)
      setOutput(t);

      setNum1("");
      setNum2("");
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("output",output[0])
  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <h2>Step Addition</h2>
      <div>
        <label>First Number : </label>
        <input
          type="number"
          value={num1}
          required
          placeholder="enter first no."
          onChange={(e) => setNum1(e.target.value)}
        />
        <br />
        <br />
        <label>Second Number : </label>
        <input
          type="number"
          value={num2}
          required
          placeholder="enter second no."
          onChange={(e) => setNum2(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleAddition}>Generate Steps</button>
        <br />
        <br />
      </div>

      {output && (
        <div
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#000",
            color: "#fff",
            width: "30vw",
            height: "20vh",
            textAlign: "center",
            margin: "auto",
          }}
        >
          {output}
        </div>
      )}
    </div>
  );
}

export default App;
