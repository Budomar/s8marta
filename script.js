// ===== СОСТОЯНИЕ ПРИЛОЖЕНИЯ =====
const state = {
    collectedFlowers: 0,
    totalFlowers: 6,
    isMagicActive: false,
    compliments: [
        "Ты - настоящий профессионал! Твои идеи вдохновляют, а решения всегда точны.",
        "Твоя женственность и элегантность делают наш офис прекраснее. Ты - его главное украшение!",
        "Твоя доброта и отзывчивость согревают сердца коллег. Спасибо, что ты всегда готова помочь!",
        "Твой оптимизм заразителен! Даже в сложные дни ты умеешь найти повод для улыбки.",
        "Ты - душа нашей команды. С тобой легко и радостно работать, ты создаёшь особую атмосферу.",
        "Ты уникальна! Сочетаешь в себе мудрость и лёгкость, серьёзность и очарование."
    ],
    progressTexts: [
        "Евгения, вы с нами?",
        "Уже теплее!",
        "Вы нам нравитесь!",
        "Мы вас ценим!",
        "Вы особенная!",
        "Почти всё!",
        "МЫ ВАС ЛЮБИМ! ❤️"
    ]
};

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌸 Загружаем весеннее чудо для Евгении...');
    initPreloader();
    initEventListeners();
    createFloatingPetals();
});

// ===== ПРЕЛОАДЕР =====
function initPreloader() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.getElementById('mainContent').classList.remove('hidden');
        }, 1000);
    }, 2000);
}

// ===== ИНИЦИАЛИЗАЦИЯ ОБРАБОТЧИКОВ =====
function initEventListeners() {
    // Открытие конверта
    document.getElementById('openEnvelopeBtn').addEventListener('click', openEnvelope);
    
    // Цветы
    document.querySelectorAll('.flower').forEach(flower => {
        flower.addEventListener('click', () => collectFlower(flower));
    });
    
    // Волшебная сфера
    document.getElementById('magicOrb').addEventListener('click', toggleMagic);
    
    // Лепестковый дождь
    document.getElementById('rainBtn').addEventListener('click', startPetalRain);
    
    // Закрытие секретного модального окна
    document.getElementById('closeSecretBtn').addEventListener('click', closeSecretModal);
    
    // Пасхалки (клавиши)
    document.addEventListener('keydown', handleKeyPress);
    
    // Галерея
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', () => showMemory(card));
    });
}

// ===== ОТКРЫТИЕ КОНВЕРТА =====
function openEnvelope() {
    const topFlap = document.querySelector('.envelope__flap--top');
    const bottomFlap = document.querySelector('.envelope__flap--bottom');
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    
    topFlap.style.transform = 'rotateX(180deg)';
    bottomFlap.style.transform = 'rotateX(-180deg)';
    
    setTimeout(() => {
        envelope.style.opacity = '0';
        
        setTimeout(() => {
            envelope.classList.add('hidden');
            card.classList.remove('hidden');
            
            setTimeout(() => {
                card.classList.add('visible');
                showHint('Нажимайте на цветы, чтобы собрать букет! 🌸');
            }, 100);
        }, 500);
    }, 1000);
}

// ===== СБОР ЦВЕТКА =====
function collectFlower(flower) {
    if (flower.classList.contains('collected')) return;
    
    const flowerId = flower.dataset.id;
    const compliment = flower.dataset.compliment;
    
    // Отмечаем цветок как собранный
    flower.classList.add('collected');
    
    // Увеличиваем счётчик
    state.collectedFlowers++;
    updateCounter();
    
    // Показываем комплимент
    showCompliment(compliment);
    
    // Создаём искры
    createSparkles(flower.getBoundingClientRect());
    
    // Обновляем прогресс
    updateProgress();
    
    // Активируем шаг прогресса
    const step = document.querySelector(`.progress-step[data-step="${flowerId}"]`);
    if (step) step.classList.add('active');
    
    // Проверяем, собраны ли все цветы
    if (state.collectedFlowers === state.totalFlowers) {
        setTimeout(() => {
            showSecretModal();
        }, 500);
    }
}

// ===== ОБНОВЛЕНИЕ СЧЁТЧИКА =====
function updateCounter() {
    document.getElementById('counterValue').textContent = state.collectedFlowers;
}

// ===== ОБНОВЛЕНИЕ ПРОГРЕССА =====
function updateProgress() {
    const progress = (state.collectedFlowers / state.totalFlowers) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    const progressText = document.getElementById('progressText');
    progressText.textContent = state.progressTexts[state.collectedFlowers];
    progressText.style.animation = 'none';
    progressText.offsetHeight;
    progressText.style.animation = 'greetingAppear 0.5s ease-out';
}

// ===== ПОКАЗ КОМПЛИМЕНТА =====
function showCompliment(text) {
    const popup = document.getElementById('complimentPopup');
    const popupText = document.getElementById('complimentText');
    
    popupText.textContent = text;
    popup.classList.remove('hidden');
    
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
}

// ===== СОЗДАНИЕ ИСКР =====
function createSparkles(rect) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: ${Math.random() * 20 + 15}px;
                animation: sparklePop 0.5s ease-out forwards;
                pointer-events: none;
                z-index: 10000;
            `;
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 500);
        }, i * 30);
    }
}

// ===== ПЕРЕКЛЮЧЕНИЕ ВОЛШЕБСТВА =====
function toggleMagic() {
    state.isMagicActive = !state.isMagicActive;
    const bg = document.getElementById('magicalBg');
    const orb = document.getElementById('magicOrb');
    
    if (state.isMagicActive) {
        bg.classList.add('magic');
        orb.style.animation = 'orbPulse 0.5s ease-in-out infinite';
        showHint('🌟 Волшебство активировано! 🌟');
        
        // Меняем цвета элементов
        document.querySelectorAll('.card__content, .wish-item, .memory-card').forEach(el => {
            el.style.borderColor = '#f093fb';
            el.style.boxShadow = '0 0 30px rgba(240, 147, 251, 0.3)';
        });
    } else {
        bg.classList.remove('magic');
        orb.style.animation = 'orbPulse 2s ease-in-out infinite';
        showHint('✨ Волшебство утихло... ✨');
        
        // Возвращаем цвета
        document.querySelectorAll('.card__content, .wish-item, .memory-card').forEach(el => {
            el.style.borderColor = '';
            el.style.boxShadow = '';
        });
    }
}

// ===== ЛЕПЕСТКОВЫЙ ДОЖДЬ =====
function startPetalRain() {
    const petals = ['🌸', '🌷', '🌹', '🌺', '🌼', '💐'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = Math.random() * 3 + 2 + 's';
            petal.style.fontSize = Math.random() * 20 + 20 + 'px';
            document.body.appendChild(petal);
            
            setTimeout(() => petal.remove(), 5000);
        }, i * 50);
    }
    
    showHint('🌸 Лепестковый дождь! 🌸');
}

// ===== ПОКАЗ СЕКРЕТНОГО ПОСЛАНИЯ =====
function showSecretModal() {
    const modal = document.getElementById('secretModal');
    modal.classList.add('visible');
    
    // Фейерверк
    createFireworks();
}

// ===== ЗАКРЫТИЕ СЕКРЕТНОГО ПОСЛАНИЯ =====
function closeSecretModal() {
    document.getElementById('secretModal').classList.remove('visible');
    showHint('С праздником, Евгения! 💝');
}

// ===== СОЗДАНИЕ ФЕЙЕРВЕРКА =====
function createFireworks() {
    const colors = ['#f093fb', '#f5576c', '#ff9a9e', '#fad0c4', '#a8edea', '#fed6e3', '#ffd700'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'confetti';
            
            const size = Math.random() * 15 + 5;
            firework.style.cssText = `
                left: ${Math.random() * 100}%;
                top: -20px;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                animation-duration: ${Math.random() * 3 + 2}s;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 5000);
        }, i * 20);
    }
}

// ===== ПОКАЗ ПАМЯТИ =====
function showMemory(card) {
    const memory = card.dataset.memory;
    showHint(`💭 ${memory}`);
}

// ===== СОЗДАНИЕ ПЛАВАЮЩИХ ЛЕПЕСТКОВ =====
function createFloatingPetals() {
    const container = document.getElementById('floatingPetals');
    const petals = ['🌸', '🌷', '🌹', '🌺', '🌼'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = Math.random() * 10 + 10 + 's';
            petal.style.fontSize = Math.random() * 20 + 15 + 'px';
            petal.style.opacity = '0.3';
            container.appendChild(petal);
            
            setTimeout(() => petal.remove(), 20000);
        }, i * 200);
    }
    
    setInterval(() => {
        if (!document.getElementById('card').classList.contains('hidden')) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = Math.random() * 10 + 10 + 's';
            petal.style.fontSize = Math.random() * 20 + 15 + 'px';
            petal.style.opacity = '0.2';
            container.appendChild(petal);
            
            setTimeout(() => petal.remove(), 20000);
        }
    }, 5000);
}

// ===== ПОКАЗ ПОДСКАЗКИ =====
function showHint(text) {
    const container = document.getElementById('hintContainer');
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = text;
    container.innerHTML = '';
    container.appendChild(hint);
    
    setTimeout(() => {
        if (hint.parentNode) {
            hint.remove();
        }
    }, 3000);
}

// ===== ОБРАБОТКА НАЖАТИЯ КЛАВИШ =====
function handleKeyPress(e) {
    const key = e.key.toLowerCase();
    
    switch(key) {
        case 'e':
            if (state.collectedFlowers === state.totalFlowers) {
                showSecretModal();
            } else {
                showHint('Соберите все цветы сначала! 🌸');
            }
            break;
        case 'f':
            startPetalRain();
            break;
        case 'm':
            toggleMagic();
            break;
        case 'j':
            showHint('💝 Для самой лучшей Евгении! 💝');
            createSparkles(document.querySelector('.title-block__name').getBoundingClientRect());
            break;
    }
}

// ===== ДОБАВЛЯЕМ СТИЛИ ДЛЯ АНИМАЦИЙ =====
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

// ===== ПРИВЕТСТВИЕ В КОНСОЛИ =====
console.log('🌸 С 8 марта, Евгения! 🌸');
console.log('💝 Открытка создана специально для вас!');
console.log('✨ Советы: нажимайте E, F, M для секретов');