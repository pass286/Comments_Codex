const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const app = express();
const PORT = 3030;
const POSTS_DIR = path.resolve(__dirname, "..", "source", "_posts");

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.static(__dirname));

// List all posts
app.get("/api/posts", (req, res) => {
  if (!fs.existsSync(POSTS_DIR)) return res.json([]);

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        file,
        title: data.title || file.replace(".md", ""),
        date: data.date || null,
        tags: data.tags || [],
        categories: data.categories || [],
      };
    })
    .sort((a, b) => { const da = a.date ? String(a.date) : ""; const db = b.date ? String(b.date) : ""; return db.localeCompare(da); });
  res.json(posts);
});

// Get single post
app.get("/api/post", (req, res) => {
  const { file } = req.query;
  if (!file) return res.status(400).json({ error: "file required" });

  const filePath = path.join(POSTS_DIR, file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "not found" });

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  res.json({ file, title: data.title || "", date: data.date || "", tags: data.tags || [], categories: data.categories || [], content: content.trim() });
});

// Save post (create or update)
app.post("/api/post", (req, res) => {
  const { file, title, date, tags, categories, content } = req.body;
  if (!file) return res.status(400).json({ error: "file required" });

  const safeFile = file.replace(/[/\\]/g, "_");
  if (!safeFile.endsWith(".md")) return res.status(400).json({ error: "must be .md" });

  const filePath = path.join(POSTS_DIR, safeFile);
  const now = date || new Date().toISOString().replace("T", " ").substring(0, 16);

  const frontMatter = [
    "---",
    `title: ${title || safeFile.replace(".md", "")}`,
    `date: ${now}`,
    tags && tags.length > 0 ? `tags: [${tags.map((t) => t.trim()).filter(Boolean).join(", ")}]` : "tags: []",
    categories && categories.length > 0 ? `categories: [${categories.map((c) => c.trim()).filter(Boolean).join(", ")}]` : "categories: []",
    "---",
  ].join("\n");

  const markdown = frontMatter + "\n\n" + (content || "");
  fs.writeFileSync(filePath, markdown, "utf-8");
  res.json({ success: true, file: safeFile });
});

// Delete post
app.delete("/api/post", (req, res) => {
  const { file } = req.body;
  if (!file) return res.status(400).json({ error: "file required" });
  const filePath = path.join(POSTS_DIR, file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "not found" });
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`📝 Editor running at http://localhost:${PORT}`);
  console.log(`📂 Posts dir: ${POSTS_DIR}`);
});
