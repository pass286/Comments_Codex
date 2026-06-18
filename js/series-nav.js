(function() {
  // Read category from page metadata
  var meta = document.querySelector('meta[property="article:section"]');
  if (!meta) return;
  var catName = meta.getAttribute('content');
  if (!catName) return;
  
  // Find all post links in the category page sidebar or from sitemap
  var currentPath = window.location.pathname.replace(/\/$/, '');
  
  // Fetch the category page to get series posts
  var catUrl = '/Comments_Codex/categories/' + encodeURIComponent(catName) + '/';
  
  fetch(catUrl).then(function(res) { return res.text(); }).then(function(html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var links = doc.querySelectorAll('.recent-post-info a.article-title, .post-title a, #article-container a[href]');
    var posts = [];
    links.forEach(function(a) {
      var href = a.getAttribute('href');
      var title = a.textContent.trim();
      if (href && title) posts.push({ href: href, title: title });
    });
    
    if (posts.length < 2) return;
    
    var idx = -1;
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].href.indexOf(currentPath) >= 0 || currentPath.indexOf(posts[i].href.replace(/\/$/, '')) >= 0) {
        idx = i; break;
      }
    }
    if (idx < 0) return;
    
    var prevPost = idx > 0 ? posts[idx - 1] : null;
    var nextPost = idx < posts.length - 1 ? posts[idx + 1] : null;
    if (!prevPost && !nextPost) return;
    
    var html = '<div class="series-nav"><div class="series-nav-label">📚 系列：<a href="' + catUrl + '">' + catName + '</a>（第 ' + (idx + 1) + ' 篇 / 共 ' + posts.length + ' 篇）</div><div class="series-nav-links">';
    
    if (prevPost) {
      html += '<a class="series-nav-prev" href="' + prevPost.href + '" title="' + prevPost.title + '">← ' + prevPost.title + '</a>';
    } else {
      html += '<span class="series-nav-prev series-nav-disabled">已是第一篇</span>';
    }
    
    if (nextPost) {
      html += '<a class="series-nav-next" href="' + nextPost.href + '" title="' + nextPost.title + '">' + nextPost.title + ' →</a>';
    } else {
      html += '<span class="series-nav-next series-nav-disabled">已是最后一篇</span>';
    }
    
    html += '</div></div>';
    
    // Insert before comments or at end of article
    var target = document.querySelector('#post-comment') || document.querySelector('.post-copyright') || document.querySelector('#article-container');
    if (target && target.parentNode) {
      var div = document.createElement('div');
      div.innerHTML = html;
      target.parentNode.insertBefore(div.firstChild, target);
    }
  }).catch(function() {});
})();
