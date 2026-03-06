document.addEventListener('DOMContentLoaded', () => {
    console.log('🌸 Открытка загружается...');
    initPreloader();
});

// Состояние
let collectedFlowers = 0;
const totalFlowers = 6;

// Инициализация прелоадера
function initPreloader() {
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hidden');
            document.getElementById('mainContent').classList.remove('hidden');
        }, 1000);
    }, 2000);
}

// Открытие конверта
document.getElementById('openBtn').addEventListener('click', () => {
    const topFlap = document.querySelector('.envelope__flap--top');
    const bottomFlap = document.querySelector('.envelope__flap--bottom');
    
    topFlap.style.transform = 'rotateX(180deg)';
    bottomFlap.style.transform = 'rotateX(-180deg)';
    
    setTimeout(() => {
        document.getElementById('envelope').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('envelope').classList.add('hidden');
            document.getElementById('card').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('card').classList.add('visible');
                showHint('Нажимайте на цветы, чтобы собрать букет! 🌸');
            }, 100);
        }, 500);
    }, 1000);
});

// Сбор цветов
document.querySelectorAll('.flower').forEach(flower => {
    flower.addEventListener('click', function() {
        if (!this.classList.contains('collected')) {
            this.classList.add('collected');
            collectedFlowers++;
            
            // Создаем искры
            createSparkles(this.getBoundingClientRect());
            
            // Показываем прогресс
            if (collectedFlowers < totalFlowers) {
                showHint(`Собрано ${collectedFlowers} из ${totalFlowers} цветов! 🌷`);
            }
            
            // Если собрали все цветы
            if (collectedFlowers === totalFlowers) {
                setTimeout(() => {
                    showSecretModal();
                }, 500);
            }
        }
    });
});

// Кнопка сюрприза
document.getElementById('surpriseBtn').addEventListener('click', () => {
    createPetalRain();
    createConfetti();
    showHint('🌸 Лепестковый дождь! 🌸');
    
    // Анимация всех цветов
    document.querySelectorAll('.flower').forEach(flower => {
        flower.style.animation = 'none';
        flower.offsetHeight;
        flower.style.animation = 'float 3s infinite';
    });
});

// Закрытие секретного окна
document.getElementById('closeSecretBtn').addEventListener('click', () => {
    document.getElementById('secretModal').classList.remove('visible');
    createConfetti(100);
    showHint('С праздником, Евгения! 💝');
});

// Показать секретное окно
function showSecretModal() {
    document.getElementById('secretModal').classList.add('visible');
    createConfetti(50);
}

// Создание конфетти
function createConfetti(count = 50) {
    const colors = ['#667eea', '#764ba2', '#ff9a9e', '#fad0c4', '#a8edea', '#fed6e3'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.cssText = `
                left: ${left}%;
                top: -20px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                animation-delay: ${Math.random() * 2}s;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Создание лепесткового дождя
function createPetalRain() {
    const petals = ['🌸', '🌷', '🌹', '🌺', '🌼', '💐'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.textContent = petals[Math.floor(Math.random() * petals.length)];
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = Math.random() * 3 + 2 + 's';
            petal.style.fontSize = Math.random() * 20 + 20 + 'px';
            document.body.appendChild(petal);
            
            setTimeout(() => petal.remove(), 5000);
        }, i * 50);
    }
}

// Создание искр
function createSparkles(rect) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: ${Math.random() * 20 + 10}px;
                animation: sparklePop 0.5s ease-out forwards;
                pointer-events: none;
                z-index: 10000;
            `;
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 500);
        }, i * 30);
    }
}

// Показать подсказку
function showHint(text) {
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = text;
    document.body.appendChild(hint);
    
    setTimeout(() => hint.remove(), 3000);
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes sparklePop {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Пасхалка: нажмите клавишу S для сюрприза
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's') {
        document.getElementById('surpriseBtn').click();
    }
    if (e.key.toLowerCase() === 'c') {
        if (collectedFlowers === totalFlowers) {
            showSecretModal();
        }
    }
});

// Эффект при наведении на цветы
document.querySelectorAll('.flower').forEach(flower => {
    flower.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) rotate(10deg)';
    });
    
    flower.addEventListener('mouseleave', function() {
        if (!this.classList.contains('collected')) {
            this.style.transform = '';
        }
    });
});

// Анимация появления текста
document.querySelectorAll('.message__line').forEach((line, index) => {
    line.style.animation = `slideIn 0.5s forwards ${index * 0.2 + 0.2}s`;
});

// Добавляем интерактивности пожеланиям
document.querySelectorAll('.wish-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.backgroundColor = '#f0f5ff';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 200);
    });
});

// Приветствие в консоли
console.log('🌸 С 8 марта, Евгения! 🌸');
console.log('💝 Открытка создана специально для вас!');