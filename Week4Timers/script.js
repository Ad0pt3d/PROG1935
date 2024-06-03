function startCountdown() {
    

    // let count = 10

    // let timerId = setInterval(() => {
    //     document.write(`<p>${count}</p>`)
    //     count--;
    // }, 1000);

    // setTimeout(() => {
    //     clearInterval(timerId)
    //     document.write(`<p>The End</p>`)
    // }, 11000)

    setInterval(() => {
        let now = new Date();
        let clockHour = now.getHours().toString().padStart(2, '0')
        let clockMinute = now.getMinutes().toString().padStart(2, '0');
        let clockSecond = now.getSeconds().toString().padStart(2, '0');

        let clock = `<p>${clockHour}:${clockMinute}:${clockSecond}</p>`
        document.getElementById("clock").innerHTML = clock
    }, 1000)
}