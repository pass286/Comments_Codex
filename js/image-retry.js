/**
 * Image Retry — simple staggered one-by-one retry.
 * Browser loads all → some fail (hidden) → 500ms later, retry one by one with 120ms gaps.
 */
(function() {
  'use strict';
  var API_HOST = window.__IMG_API_HOST__ || 'api.horosama.com';

  function isApi(url) { return url && url.indexOf(API_HOST) !== -1; }

  function retryOne(src) {
    return new Promise(function(resolve) {
      var t = new Image();
      t.onload = function() { resolve(true); };
      t.onerror = function() { resolve(false); };
      t.src = src;
    });
  }

  async function main() {
    await new Promise(function(r) { setTimeout(r, 500); });

    // Collect failed <img> elements
    var failed = Array.from(document.querySelectorAll('img.post-bg')).filter(function(img) {
      return img.complete && img.naturalWidth === 0 && isApi(img.getAttribute('data-original') || '');
    });

    // Retry one by one, 120ms gap
    for (var i = 0; i < failed.length; i++) {
      var src = failed[i].getAttribute('data-original');
      var ok = await retryOne(src);
      if (ok) {
        failed[i].src = src;
        failed[i].classList.remove('img-failed');
        failed[i].style.display = '';
      } else {
        var h = (i * 137.5) % 360;
        failed[i].style.display = 'block';
        failed[i].style.background = 'linear-gradient(135deg, hsl(' + h + ', 55%, 65%), hsl(' + ((h + 40) % 360) + ', 60%, 45%))';
        failed[i].style.minHeight = '230px';
      }
      await new Promise(function(r) { setTimeout(r, 120); });
    }

    // Carousel backgrounds — retry one by one
    var carousels = Array.from(document.querySelectorAll('.carousel-img[data-cover]')).filter(function(el) {
      return isApi(el.getAttribute('data-cover') || '');
    });
    for (var j = 0; j < carousels.length; j++) {
      var cover = carousels[j].getAttribute('data-cover');
      var ok2 = await retryOne(cover);
      if (ok2) {
        carousels[j].style.backgroundImage = 'url(' + cover + ')';
      }
      await new Promise(function(r) { setTimeout(r, 120); });
    }
  }

  if (document.readyState === 'complete') main();
  else window.addEventListener('load', main);
})();