function showSurprise() {
    const surprise = document.getElementById('surprise');
    surprise.classList.toggle('hidden');
    
    if (!surprise.classList.contains('hidden')) {
        createConfetti();
        playCelebration();
    }
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#FF6B6B', '#4CAF50', '#FFD700', '#FF8E8E'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            const size = Math.random() * 15 + 5;
            const rotation = Math.random() * 360;
            
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -20px;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                transform: rotate(${rotation}deg);
                clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                animation: fall ${Math.random() * 4 + 3}s linear forwards;
                z-index: 9999;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 8000);
        }, i * 30);
    }
}

// Добавляем стили для конфетти
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .confetti-piece {
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
`;
document.head.appendChild(style);

function playCelebration() {
    // Создаем эффект "конфетти" из эмодзи
    const emojis = ['🌸', '🌷', '🌹', '🌺', '🌼', '💐', '🎉', '✨', '💝', '💖'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -30px;
                font-size: ${Math.random() * 30 + 20}px;
                animation: floatDown ${Math.random() * 5 + 3}s linear forwards;
                z-index: 10000;
                pointer-events: none;
                filter: drop-shadow(0 0 5px gold);
            `;
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 8000);
        }, i * 100);
    }
}

// Добавляем анимацию для падающих эмодзи
const emojiStyle = document.createElement('style');
emojiStyle.textContent = `
    @keyframes floatDown {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(emojiStyle);

// Эффект печатающегося текста при загрузке
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌸 Открытка для Евгении загружена! 🌸');
    
    // Добавляем небольшие анимации для элементов
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        nameElement.style.animation = 'glow 2s ease-in-out infinite';
    }
    
    // Создаем мерцающие звездочки на фоне
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: twinkle ${Math.random() * 4 + 2}s ease-in-out infinite;
            z-index: 0;
            pointer-events: none;
        `;
        document.body.appendChild(star);
    }
});

// Добавляем стиль для мерцания
const starStyle = document.createElement('style');
starStyle.textContent = `
    @keyframes twinkle {
        0%, 100% {
            opacity: 0.2;
            transform: scale(1);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(starStyle);

// Обработка нажатия на клавиши (пасхалка)
document.addEventListener('keydown', (e) => {
    if (e.key === 'j' || e.key === 'J') {
        showSurprise();
    }
});