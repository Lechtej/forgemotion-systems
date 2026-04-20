// ForgeMotion Systems - site-layout.js (v1.0.1)
// Header + Footer Facebook link (icon + text unified)

export function renderLayout() {

return `
<header>
    <nav>
        <a href="https://www.facebook.com/forgemotionsystems/" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="social-link facebook-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px;">
                <path d="M22 12a10 10 0 1 0-11.63 9.87v-6.99h-2.8v-2.88h2.8V9.41c0-2.76 1.64-4.29 4.15-4.29 1.2 0 2.45.21 2.45.21v2.7h-1.38c-1.36 0-1.78.84-1.78 1.7v2.04h3.03l-.48 2.88h-2.55v6.99A10 10 0 0 0 22 12z"/>
            </svg>
            Facebook
        </a>
    </nav>
</header>

<footer>
    <div class="footer-social">
        <a href="https://www.facebook.com/forgemotionsystems/" 
           target="_blank" 
           rel="noopener noreferrer"
           class="social-link">

            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right:6px;">
                <path d="M22 12a10 10 0 1 0-11.63 9.87v-6.99h-2.8v-2.88h2.8V9.41c0-2.76 1.64-4.29 4.15-4.29 1.2 0 2.45.21 2.45.21v2.7h-1.38c-1.36 0-1.78.84-1.78 1.7v2.04h3.03l-.48 2.88h-2.55v6.99A10 10 0 0 0 22 12z"/>
            </svg>

            Facebook
        </a>
    </div>
</footer>
`;
}
