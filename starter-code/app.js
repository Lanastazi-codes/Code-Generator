//! Slider
const slider = document.querySelector(".range__input");
const slideValue = document.querySelector(".slide-value");

slider.oninput = () => {
    let value = slider.value;
    slideValue.textContent = slider.value;
};

slider.addEventListener("mousemove", () => {
    const x = slider.value;
    const color =
        "linear-gradient(90deg, rgb(164, 255, 175)" +
        x * 5 +
        "%," +
        "rgb(24, 23, 31)" +
        x * 5 +
        "%)";
    // console.log(color);
    slider.style.background = color;
});

//! Checkbox

const btn = document.getElementById("btn");
const result = document.querySelector(".field__password");
const clipboard = document.querySelector(".clipboard");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["!", "@", "#", "&", "*"];
//array of 26 items
const characterCodes = Array.from(Array(26)).map((_, i) => i + 97);

const lowercaseLetters = characterCodes.map((code) =>
    String.fromCharCode(code)
);

const uppercaseLetters = lowercaseLetters.map((letter) => letter.toUpperCase());

const generatePassword = (
    length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols
) => {
    let availableCharacters = [
        ...(hasUppercase ? uppercaseLetters : []),
        ...(hasLowercase ? lowercaseLetters : []),
        ...(hasNumbers ? numbers : []),
        ...(hasSymbols ? symbols : []),
    ];

    let password = "";
    if (availableCharacters.length === 0) return "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(
            Math.random() * availableCharacters.length
        );
        password += availableCharacters[randomIndex];
    }
    console.log(password);
    return password;
};

btn.addEventListener("click", () => {
    const length = +slideValue.textContent; //plus turns string into a number

    const checkboxUppercaseValue = document.querySelector(
        ".checkbox__uppercase"
    ).checked;
    const checkboxLowercaseValue = document.querySelector(
        ".checkbox__lowercase"
    ).checked;
    const checkboxNumberseValue =
        document.querySelector(".checkbox__numbers").checked;
    const checkboxSymbolscaseValue =
        document.querySelector(".checkbox__symbols").checked;
    result.innerHTML = generatePassword(
        length,
        checkboxUppercaseValue,
        checkboxLowercaseValue,
        checkboxNumberseValue,
        checkboxSymbolscaseValue
    );
});

// ! Copy to clipboard function

clipboard.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = result.innerText;
    if (!password) return;
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password coppied to clipboard");
});
