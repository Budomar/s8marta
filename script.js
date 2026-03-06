// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌸 Открытка для Евгении загружена!');
    
    // Создаем плавающие лепестки
    createFloatingPetals();
    
    // Эффект появления элементов
    animateOnScroll();
});

// Создание плавающих лепестков
function createFloatingPetals() {
    const petalsContainer = document.querySelector('.floating-petals');
    const petalEmojis = ['🌸', '🌷', '🌹', '🌺', '🌼', '💐', '✨', '💝'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.innerHTML = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
            
            const size = Math.random() * 20 + 15;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            petal.style.cssText = `
                position: fixed;
                left: ${left}%;
                top: -50px;
                font-size: ${size}px;
                opacity: ${Math.random() * 0.3 + 0.2};
                animation: floatPetals ${animationDuration}s linear ${delay}s infinite;
                z-index: 0;
                pointer-events: none;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            petalsContainer.appendChild(petal);
        }, i * 200);
    }
}

// Кнопка "Открыть волшебство"
document.getElementById('magicBtn').addEventListener('click', () => {
    const mainCard = document.getElementById('mainCard');
    const surpriseCard = document.getElementById('surpriseCard');
    
    // Анимация исчезновения основной карточки
    mainCard.style.transform = 'scale(0.8)';
    mainCard.style.opacity = '0';
    
    setTimeout(() => {
        mainCard.style.display = 'none';
        surpriseCard.classList.remove('hidden');
        
        // Запускаем конфетти
        createConfetti();
        
        // Запускаем волшебные искры
        createSparkles();
        
        // Показываем подарочную анимацию
        animateGiftBox();
    }, 300);
});

// Кнопка закрытия сюрприза
document.getElementById('closeBtn').addEventListener('click', () => {
    const mainCard = document.getElementById('mainCard');
    const surpriseCard = document.getElementById('surpriseCard');
    
    surpriseCard.classList.add('hidden');
    mainCard.style.display = 'block';
    
    setTimeout(() => {
        mainCard.style.transform = 'scale(1)';
        mainCard.style.opacity = '1';
    }, 50);
});

// Создание конфетти
function createConfetti() {
    const colors = [
        '#ff8da1', '#ffb6c1', '#ffe4e9', '#f7cac9', 
        '#e2d1ff', '#c5e0d8', '#fed7b0', '#e6a8b0'
    ];
    
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            
            const size = Math.random() * 15 + 8;
            const left = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const rotation = Math.random() * 360;
            const duration = Math.random() * 3 + 2;
            
            confetti.style.cssText = `
                position: fixed;
                left: ${left}%;
                top: -30px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                transform: rotate(${rotation}deg);
                box-shadow: 0 0 10px rgba(255, 141, 161, 0.5);
                animation: confettiFall ${duration}s ease-in forwards;
                z-index: 10000;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 20);
    }
    
    // Добавляем стили для конфетти, если их нет
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Создание волшебных искр
function createSparkles() {
    const sparkleCount = 50;
    const surpriseCard = document.querySelector('.surprise-card');
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 20 + 10;
            
            sparkle.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                font-size: ${size}px;
                animation: sparklePop 1s ease-out forwards;
                pointer-events: none;
                z-index: 10001;
            `;
            
            surpriseCard.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 30);
    }
    
    // Добавляем стили для искр
    if (!document.getElementById('sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
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
    }
}

// Анимация подарочной коробки
function animateGiftBox() {
    const giftBox = document.querySelector('.gift-box');
    const lid = document.querySelector('.gift-box__lid');
    
    giftBox.style.animation = 'giftBoxShake 0.5s ease-in-out';
    
    setTimeout(() => {
        lid.style.transform = 'rotate(-5deg) translateY(-5px)';
        
        setTimeout(() => {
            lid.style.transform = 'rotate(5deg) translateY(-5px)';
            
            setTimeout(() => {
                lid.style.transform = 'rotate(0) translateY(0)';
                giftBox.style.animation = 'float 3s ease-in-out infinite';
            }, 200);
        }, 200);
    }, 250);
    
    if (!document.getElementById('giftbox-style')) {
        const style = document.createElement('style');
        style.id = 'giftbox-style';
        style.textContent = `
            @keyframes giftBoxShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Анимация при скролле (для красоты)
function animateOnScroll() {
    const elements = document.querySelectorAll('.wishes-list__item, .flower-bloom, .photo-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1) translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8) translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        observer.observe(element);
    });
}

// Эффект мерцания для названия отдела
setInterval(() => {
    const hearts = document.querySelector('.signature-area__hearts');
    if (hearts) {
        hearts.style.opacity = '0.8';
        setTimeout(() => {
            hearts.style.opacity = '1';
        }, 200);
    }
}, 2000);

// Пасхалка: нажмите клавишу J для сюрприза
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'j') {
        document.getElementById('magicBtn').click();
    }
});

// Добавляем интерактивности цветам
document.querySelectorAll('.flower-bloom').forEach((flower, index) => {
    flower.addEventListener('mouseenter', () => {
        flower.style.transform = 'scale(1.3) rotate(10deg)';
        
        // Создаем маленькие искры при наведении
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.innerHTML = '✨';
                spark.style.cssText = `
                    position: fixed;
                    left: ${event.clientX}px;
                    top: ${event.clientY}px;
                    font-size: 15px;
                    animation: sparklePop 0.5s ease-out forwards;
                    pointer-events: none;
                    z-index: 1000;
                `;
                document.body.appendChild(spark);
                
                setTimeout(() => spark.remove(), 500);
            }, i * 50);
        }
    });
    
    flower.addEventListener('mouseleave', () => {
        flower.style.transform = '';
    });
});

// Приветственное сообщение
console.log('🌸 С 8 марта, Евгения! 🌸');
console.log('💝 Открытка создана с любовь для вас!');