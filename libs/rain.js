let canvas = document.getElementsByClassName('rain')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

function randomNum(max, min) {
    return Math.floor(Math.random() * max) + min;
}

// Изменено: Удалена endy (длина капли), добавлена radius (размер снежинки)
function SnowFlake(x, y, radius, velocity, opacity) {

    this.x = x;
    this.y = y;
    this.radius = radius; // Размер снежинки
    this.velocity = velocity;
    this.opacity = opacity;
    // Добавлено: Горизонтальное смещение для эффекта "колебания"
    this.drift = Math.random() * 0.5 - 0.25; 

    this.draw = function() {
        c.beginPath();
        // Изменено: Рисуем круг (снежинку) вместо линии
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")"; // Снег белый
        c.fill();
    }

    this.update = function() {
        let canvasHeight = window.innerHeight;
        // Проверяем, вышла ли снежинка за нижний край
        if (this.y >= canvasHeight) {
            // Сбрасываем снежинку наверх с новыми случайными параметрами
            this.y = -this.radius; 
            this.x = Math.floor(Math.random() * window.innerWidth) + 1;
            this.velocity = randomNum(3, 0.5); // Новая случайная, более низкая скорость
            this.opacity = Math.random() * 0.8 + 0.2; // Новая случайная прозрачность
            this.radius = randomNum(3, 1); // Новый случайный размер
        } else {
            // Обновляем позицию по вертикали и добавляем горизонтальный "дрейф"
            this.y = this.y + this.velocity;
            this.x = this.x + this.drift; 
        }
        this.draw();
    }
}

let snowArray = [];
// Увеличено количество частиц для более плотного снегопада
let numberOfSnowflakes = 200; 

for (let i = 0; i < numberOfSnowflakes; i++) {
    let snowXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
    let snowYLocation = Math.random() * window.innerHeight; // Начинаем со всей высоты
    let randomRadius = randomNum(3, 1); // Размер снежинки (радиус)
    // Изменено: Скорость значительно ниже, чем у дождя
    let randomSpeed = randomNum(3, 0.5); 
    let randomOpacity = Math.random() * 0.8 + 0.2; // Более высокая минимальная прозрачность
    // Изменено: Использование нового конструктора SnowFlake
    snowArray.push(new SnowFlake(snowXLocation, snowYLocation, randomRadius, randomSpeed, randomOpacity));
}

function animateSnow() {

    // Изменено: Имя функции для ясности
    requestAnimationFrame(animateSnow);
    // Добавлено: Немного прозрачности при очистке для эффекта "следа"
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // Или используйте этот код, чтобы избежать мерцания:
    // c.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    // c.fillRect(0, 0, window.innerWidth, window.innerHeight);
    // c.clearRect(0,0, window.innerWidth, window.innerHeight); // Если вы хотите полную очистку

    for (let i = 0; i < snowArray.length; i++) {
        // Изменено: Использование массива снежинок
        snowArray[i].update();
    }

}

animateSnow();


