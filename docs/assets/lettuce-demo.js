(function(){
  const LETTUCE_URL = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800';
  
  function replaceCameraWithImage() {
    // Find camera feed container (usually has camera icon or video element)
    const containers = document.querySelectorAll('[class*="camera"], [class*="feed"], video');
    
    containers.forEach(el => {
      if (el.tagName === 'VIDEO' || el.classList.contains('camera')) {
        // Replace with image
        const img = document.createElement('img');
        img.src = LETTUCE_URL;
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 8px;';
        img.alt = 'Lettuce Sample';
        el.parentNode.replaceChild(img, el);
      }
    });
    
    // Also try to find and replace common camera placeholder patterns
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
      if (div.innerHTML.includes('Camera') || div.textContent.includes('Point camera')) {
        const img = document.createElement('img');
        img.src = LETTUCE_URL;
        img.style.cssText = 'width: 100%; max-width: 400px; height: auto; border-radius: 8px; display: block; margin: 0 auto;';
        img.alt = 'Lettuce Sample';
        
        if (div.children.length === 0 || div.textContent.includes('Camera Feed')) {
          div.innerHTML = '';
          div.appendChild(img);
        }
      }
    });
  }
  
  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceCameraWithImage);
  } else {
    replaceCameraWithImage();
  }
  
  // Watch for SPA updates
  const observer = new MutationObserver(replaceCameraWithImage);
  observer.observe(document.body, { childList: true, subtree: true });
  
  console.log('[lettuce-demo] loaded');
})();
