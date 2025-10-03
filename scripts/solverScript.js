
//If there's a problem solve it!
//Use Mutation Observer to look for a problem.binary
//calls the function everytime the 
//mutationObserver observes something
//I could have also used some kind of timer
//to just check if there's something new.

const mutationObserver = new MutationObserver(entries => {
    console.log(entries);
    problemSolver();
    //console.log("The problem should be solved.");
});

const problemContainer = document.querySelector(".problem-container");

//If there's a change in the childlist, like when a new problem gets added
//it calls the callback function from earlier
mutationObserver.observe(problemContainer, { childList: true });

function problemSolver() {
    //select a problem
    const problem = document.querySelector(".problem.binary");
    //console.log("Selected a problem.");

    //if there's no problem leave
    if (!problem) {
        console.log("No problem found.");
        return;
    }

    //Identify whether its a click the bits problem or a input decimal problem.
    if (problem.querySelector(".digits.isProblem")) {
        //console.log("It's a input decimal number problem.");

        //Figure out what deciNum it is.
        //Go through the buttons in that problem and if the button has 
        //the class ".bit.on" then add one to the string.
        const buttonArray = problem.querySelectorAll("button");

        let binaryStr = "";

        buttonArray.forEach((btn, i) => {
            //class List contains can only have class, should not have a dot.
            if (btn.classList.contains("on")) {
                binaryStr += 1;
            }
            else {
                binaryStr += 0;
            }
        })

        //parseInt(string, radix or the base)
        const decimalNum = parseInt(binaryStr, 2);

        //console.log("Clicked on the div for digits is Problem");
        problem.querySelector(".digits.isProblem").click();

        const calc = problem.querySelector(".calculator");
        const calcButtons = calc.querySelectorAll("button");

        //changes decimalNum to a string
        const deciStr = decimalNum.toString();

        //splits the string into an array of single digit characters
        const deciCharacters = deciStr.split('');

        //converts the characters to an array of numbers
        const deciDigits = deciCharacters.map(Number);


        for (let i = 0; i < deciDigits.length; ++i) {

            //if the character is 0
            if (deciDigits[i] == 0) {
                //click the 2nd button
                calcButtons[1].click();
            }
            else {
                //the plus 2 comes from the fact that,
                //the array of buttons, is offset by 2 because of
                //the backspace and confirm keys

                calcButtons[deciDigits[i] + 2].click();
            }
            //I could've also just looped through each of 
            //the innerText of the buttons to
            //get a match and then click it, but I decided not to.
        }
        //click the confirm button
        calcButtons[2].click();
    }
    else {
        //console.log("It's an input bits problem.");
        //should only have the class="digits"

        //What number is it?, What is it in binary?
        const deciText = problem.querySelector(".digits").innerText;
        //The 10 means like the base of the system so 10 for decimal.
        const deciNum = parseInt(deciText, 10);


        let binaryArray = [
            { deci: 128, bool: false },
            { deci: 64, bool: false },
            { deci: 32, bool: false },
            { deci: 16, bool: false },
            { deci: 8, bool: false },
            { deci: 4, bool: false },
            { deci: 2, bool: false },
            { deci: 1, bool: false }
        ];

        let tempNum = deciNum;
        binaryArray.forEach(n => {
            //if tempNum - n.deci is greater than or equal to 0
            //then check off the boolean for that number.
            if (tempNum - n.deci >= 0) {
                tempNum -= n.deci;
                n.bool = true;
            }
        })

        //Go through the buttons in that problem, 
        //and if the button needs to be pressed, click it.
        //first get parent, then querySelector all in that parent.
        buttonArray = problem.querySelectorAll("button");

        //index parameter i can loop through
        buttonArray.forEach((btn,i) => {
            if (binaryArray[i].bool && !btn.classList.contains("on")) {
                btn.click();
                //console.log("clicked and turned on a bit");
            }
            else if (!binaryArray[i].bool && btn.classList.contains("on")) {
                btn.click();
                //console.log("click and turned off a bit");
            }
        })

        //another approach is to build a string with 0s and 1s and 
        //use that for the buttons, I applied this method to the input decimal problem
    }


}

//Potential TODO
//Start the Solver Button
//Pause the Solver button.
    //mutationObserver.disconnect();
    //Or pause the script from running on the page