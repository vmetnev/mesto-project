// Регулярное выражение - латинские и русские буквы цифры пробел и дефис

let regex = /[a-zA-Z0-9а-яёА-ЯЁ-\s]/gmi

// не цифри и не буквы и не пребел и не девич
regex = /[^a-zA-Z0-9а-яёА-ЯЁ-\s]/gi


// не буквы и не пробел и не цифры
regex = /[^a-zA-Zа-яёА-ЯЁ-\s]/gi


let str = "fwef  we"
console.log(regex.test(str))


