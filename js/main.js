document.addEventListener('DOMContentLoaded', () => {
    // ========== 1. 櫻花飄落動畫 ==========
    const sakuraContainer = document.getElementById('sakura-container');
    
    if (sakuraContainer) {
        // 根據螢幕寬度調整花瓣數量，手機版減少數量以提升效能
        const isMobile = window.innerWidth < 768;
        const petalCount = isMobile ? 12 : 25;

        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('sakura-petal');
            
            const size = Math.random() * 15 + 10;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.5 + 0.3;

            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${left}vw`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            petal.style.opacity = opacity;

            sakuraContainer.appendChild(petal);
        }
    }

    // ========== 2. 可展開卡片邏輯 ==========
    const expandableCards = document.querySelectorAll('.expandable-card');
    
    expandableCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // 如果點擊的是內部的連結 (a 標籤)，不要觸發展開
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            // 切換展開狀態
            card.classList.toggle('expanded');
        });

        // 鍵盤無障礙支援：按 Enter 或 Space 展開
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('expanded');
            }
        });
    });

    // ========== 3. 漢堡選單邏輯 ==========
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止點擊事件冒泡到 document
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        // 點擊選單項目後自動關閉選單
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });

        // 點擊選單外區域自動關閉
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            }
        });
    }
});
