// Poetry typing animation — center-expand, pause, edge-shrink
(function () {
  const poems = [
    "春风得意马蹄疾，一日看尽长安花",
    "海内存知己，天涯若比邻",
    "落霞与孤鹜齐飞，秋水共长天一色",
    "大漠孤烟直，长河落日圆",
    "会当凌绝顶，一览众山小",
    "但愿人长久，千里共婵娟",
    "采菊东篱下，悠然见南山",
    "人生如逆旅，我亦是行人",
    "长风破浪会有时，直挂云帆济沧海",
    "山重水复疑无路，柳暗花明又一村"
  ];

  function start() {
    var subtitle = document.getElementById("subtitle");
    if (!subtitle) return;

    // Kill any existing Typed.js instance on this element
    if (subtitle._typed) {
      subtitle._typed.destroy();
    }
    if (window.typed && window.typed.el === subtitle) {
      try { window.typed.destroy(); } catch (e) {}
    }

    var poemIdx = 0;
    var charIdx = 0;
    var phase = "expand";
    var holdTimer = null;

    function randomColor() {
      return "hsl(" + Math.floor(Math.random() * 360) + ", 65%, 60%)";
    }

    function render(poem, visible) {
      var chars = poem.split("");
      var mid = Math.floor(chars.length / 2);
      var html = "";
      for (var i = 0; i < chars.length; i++) {
        var dist = Math.abs(i - mid);
        var show = false;
        if (phase === "expand" && visible >= dist) show = true;
        else if (phase === "shrink" && dist < visible) show = true;
        else if (phase === "hold") show = true;
        if (show) {
          html += "<span style=\"color:" + randomColor() + ";text-shadow:0 1px 4px rgba(0,0,0,0.3)\">" + chars[i] + "</span>";
        }
      }
      subtitle.innerHTML = html;
      subtitle.style.display = "block";
    }

    function nextPoem() {
      var poem = poems[poemIdx % poems.length];
      poemIdx++;
      charIdx = 0;
      phase = "expand";
      tick(poem);
    }

    function tick(poem) {
      var chars = poem.split("");
      var mid = Math.floor(chars.length / 2);
      var maxDist = Math.max(mid, chars.length - 1 - mid);

      if (phase === "expand") {
        if (charIdx <= maxDist) {
          render(poem, charIdx);
          charIdx++;
          setTimeout(function () { tick(poem); }, 90);
        } else {
          phase = "hold";
          render(poem, maxDist);
          holdTimer = setTimeout(function () {
            phase = "shrink";
            charIdx = maxDist;
            tick(poem);
          }, 1200);
        }
      } else if (phase === "shrink") {
        if (charIdx >= 0) {
          render(poem, charIdx);
          charIdx--;
          setTimeout(function () { tick(poem); }, 70);
        } else {
          subtitle.innerHTML = "";
          subtitle.style.display = "none";
          phase = "expand";
          charIdx = 0;
          setTimeout(nextPoem, 600);
        }
      }
    }

    nextPoem();
  }

  // Delay start to let typed.js initialize first, then take over
  setTimeout(start, 500);
})();
