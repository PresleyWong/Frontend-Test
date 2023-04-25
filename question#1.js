// 1. Develop a function f(n) that will be looping from 1 to n
// 2. During the looping, when the counter is divided by 3, print "fizz"
// 3. During the looping, when the counter is divided by 5, print "buzz"
// 4. During the looping, when the counter is divided both 3 and 5, print "fizzbuzz"
// 5. else print out number
// 6. In the end of the program, run f(15)
// 7. Keep the program until the demo session

const f = (input) => {
  if (Number.isInteger(input) && input >= 0) {
    for (const x of Array(input).keys()) {
      const value = x + 1;
      if (value % 3 === 0 && value % 5 === 0) {
        console.log("fizzbuzz");
      } else if (value % 3 === 0) {
        console.log("fizz");
      } else if (value % 5 === 0) {
        console.log("buzz");
      } else {
        console.log(value);
      }
    }
  } else {
    console.log("Wrong input type. Only positive integer allow.");
  }
};

f(15);
