require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT ||8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("<h1>Server Running...</h1>"));

// Validate the request body to accept only positive numbers
const validNumber = /^\d+$/;

app.post("/add", async (req, res) => {
  let { num1, num2 } = req.body;

  if (!validNumber.test(num1) || !validNumber.test(num2)) {
    return res
      .status(400)
      .send({ error: "Invalid input, only positive numbers are allowed." });
  }

  let n1 = "" + num1,
    n2 = "" + num2;

  if (n1.length - n2.length != 0) {
    let loop_runs = n1.length - n2.length;
    let changeString = loop_runs > 0 ? n2 : n1;

    for (let i = 0; i < Math.abs(loop_runs); i++) {
      changeString = 0 + changeString;
    }
    loop_runs > 0 ? (n2 = changeString) : (n1 = changeString);

    // console.log("changeString:", changeString);
  }
  console.log("n1:", n1, n2);

  let carryArr = [];
  let sumArr = [];
  let carry = 0;

  for (let i = n1.length - 1; i >= 0; i--) {
    let temp = +n1[i] + +n2[i] + carry;
    if (i > 0) {
      if (temp >= 10) {
        carry = 1;
        carryArr.push(carry);
        sumArr.push(temp - 10);
      } else {
        carry = 0;
        carryArr.push(0);
        sumArr.push(temp);
      }
    } else {
      carryArr.unshift("_");
      sumArr.push(temp);
    }
  }

  // console.log("carryArr:", carryArr);
  // console.log("sumArr:", sumArr);
  
  let obj = {},
    c = "",
    s = "";
  for (let i = 0; i < sumArr.length; i++) {
    c = carryArr[i] + c;
    s = sumArr[i] + s;

    obj[`step${i + 1}`] = {
      carryString: c,
      sumString: s,
    };
  }
  // console.log("obj:", obj);

  return res.send(obj);
});

app.listen(port, async () => {
  console.log(`listening at http://localhost:${port}`);
});

