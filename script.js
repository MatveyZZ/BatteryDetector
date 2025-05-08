initBattery(); // Инициализация функции для отслеживания состояния батареи

function initBattery() { // Определение функции initBattery
    const batteryLiquid = document.querySelector(".Bliquid"); // Получение элемента, представляющего уровень жидкости в батарее
    const batteryStatus = document.querySelector(".Bstatus"); // Получение элемента для отображения статуса батареи
    const Bpercentage = document.querySelector(".Bpercentage"); // Получение элемента для отображения процента заряда батареи
    navigator.getBattery().then((batt) => { // Запрос информации о батарее
        updateBattery = () => { // Определение функции для обновления состояния батареи
            let level = Math.floor(batt.level * 100); // Получение уровня заряда батареи в процентах
            Bpercentage.innerHTML = level + "%"; // Обновление текста с процентом заряда
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`; // Установка высоты элемента уровня жидкости в зависимости от заряда
            if (level == 100) { // Если уровень заряда 100%
                batteryStatus.innerHTML = `Battery Full <i class="ri-battery-2-fill green-color"></i>`; // Обновление статуса на "Батарея полная"
                batteryLiquid.style.height = "103%"; // Установка высоты жидкости выше 100% для визуального эффекта
            } else if (level <= 20 & !batt.charging) { // Если уровень заряда 20% или меньше и батарея не заряжается
                batteryStatus.innerHTML = `Low Charge <i class="ri-plug-line animated-red animated-red"></i>`; // Обновление статуса на "Низкий заряд"
            } else if (batt.charging) { // Если батарея заряжается
                batteryStatus.innerHTML = `Charging ... <i class="ri-flashlight-line animated-green"></i>`; // Обновление статуса на "Зарядка"
            } else { // В противном случае
                batteryStatus.innerHTML = ""; // Очистка статуса
            }

            // Установка классов для изменения цвета уровня жидкости в зависимости от заряда
            if (level <= 20) { // Если уровень заряда 20% или меньше
                batteryLiquid.classList.add("gradient-color-red"); // Добавление красного цвета
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow"); // Удаление других цветов
            } else if (level <= 48) { // Если уровень заряда от 21% до 48%
                batteryLiquid.classList.add("gradient-color-orange"); // Добавление оранжевого цвета
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-yellow"); // Удаление других цветов
            } else if (level <= 80) { // Если уровень заряда от 49% до 80%
                batteryLiquid.classList.add("gradient-color-yellow"); // Добавление желтого цвета
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-red"); // Удаление других цветов
            } else { // Если уровень заряда выше 80%
                batteryLiquid.classList.add("gradient-color-green"); // Добавление зеленого цвета
                batteryLiquid.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-yellow"); // Удаление других цветов
            }
        }
        updateBattery(); // Вызов функции обновления состояния батареи
        batt.addEventListener("chargingchange", () => { updateBattery() }); // Добавление слушателя события изменения состояния зарядки
        batt.addEventListener("levelchange", () => { updateBattery }); // Добавление слушателя события изменения уровня заряда
    })
}