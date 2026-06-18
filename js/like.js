/* Post Like Button - 文章点赞 */
(function () {
  var KEY_PREFIX = "blog_like_";

  function getPostPath() {
    var path = window.location.pathname;
    return path.replace(/\/$/, "") || "/";
  }

  function getLikeKey() {
    return KEY_PREFIX + getPostPath();
  }

  function getLikeCount() {
    return parseInt(localStorage.getItem(getLikeKey()) || "0", 10);
  }

  function getLiked() {
    return localStorage.getItem(getLikeKey() + "_user") === "1";
  }

  function saveLike(count, liked) {
    localStorage.setItem(getLikeKey(), count);
    if (liked) {
      localStorage.setItem(getLikeKey() + "_user", "1");
    } else {
      localStorage.removeItem(getLikeKey() + "_user");
    }
  }

  function renderBtn() {
    var container = document.createElement("div");
    container.id = "post-like-btn";
    container.style.cssText =
      "text-align:center;margin:2rem 0;user-select:none;cursor:pointer;";

    var count = getLikeCount();
    var liked = getLiked();

    container.innerHTML =
      '<span id="like-heart" style="font-size:2rem;display:inline-block;transition:transform .3s ease;' +
      (liked ? "color:#e74c3c;" : "color:#999;") +
      '">' +
      (liked ? "❤️" : "🤍") +
      '</span>' +
      '<span id="like-count" style="display:block;font-size:.9rem;color:#888;margin-top:.3rem;">' +
      (count > 0 ? count + " 人觉得很赞" : "点赞鼓励一下~") +
      "</span>";

    container.addEventListener("click", function () {
      var nowLiked = !getLiked();
      var newCount = getLikeCount() + (nowLiked ? 1 : -1);
      if (newCount < 0) newCount = 0;
      saveLike(newCount, nowLiked);

      var heart = document.getElementById("like-heart");
      var countEl = document.getElementById("like-count");

      heart.style.transform = "scale(1.4)";
      heart.textContent = nowLiked ? "❤️" : "🤍";
      heart.style.color = nowLiked ? "#e74c3c" : "#999";
      countEl.textContent =
        newCount > 0 ? newCount + " 人觉得很赞" : "点赞鼓励一下~";

      setTimeout(function () {
        heart.style.transform = "scale(1)";
      }, 200);
    });

    return container;
  }

  function insertBtn() {
    var postArticle = document.querySelector(
      "#post .post-content, .post-content, article.post-content"
    );
    if (!postArticle) return;
    var existing = document.getElementById("post-like-btn");
    if (existing) return;
    postArticle.appendChild(renderBtn());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertBtn);
  } else {
    insertBtn();
  }

  // Pjax support - re-insert on page change
  document.addEventListener("pjax:complete", insertBtn);
})();
