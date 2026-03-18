/* SMART PERFORMANCE ENGINE */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
        
        // Navbar scroll effect
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) nav.classList.add('nav-scrolled');
        else nav.classList.remove('nav-scrolled');
    });

    // 2. Smart 3D Model Loading (Lag Fix)
    const observeOptions = { root: null, margin: '500px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const container = entry.target;
            const url = container.getAttribute('data-spline');
            
            if (entry.isIntersecting) {
                // Load iframe when in view
                if (!container.querySelector('iframe')) {
                    const iframe = document.createElement('iframe');
                    iframe.src = url;
                    iframe.frameBorder = "0";
                    iframe.style.width = "100%";
                    iframe.style.height = "100%";
                    container.innerHTML = ''; // Remove loader
                    container.appendChild(iframe);
                }
            } else {
                // Remove iframe when far away to save GPU
                container.innerHTML = '<div class="spline-loading"></div>';
            }
        });
    }, observeOptions);

    document.querySelectorAll('.spline-container').forEach(el => observer.observe(el));
});
