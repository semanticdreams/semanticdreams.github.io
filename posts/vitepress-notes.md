---
title: VitePress Notes
description: Notes and links for working with VitePress.
date: 2025-08-23
---

# VitePress Notes

Guide: <https://vitepress.dev/guide/what-is-vitepress>  
Markdown: <https://vitepress.dev/guide/markdown>  
Reference: <https://vitepress.dev/reference/site-config>  

---

Variables to overwrite in `.vitepress/theme/custom.css`:
<https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css>  

## Quoting

> “Talk is cheap. Show me the code.”  
> — Linus Torvalds, [source](https://www.goodreads.com/quotes/437173-talk-is-cheap-show-me-the-code)

## Footnotes

Here is a statement^[This is an inline footnote].
Here is a statement that needs a citation[^1].
You can also use named footnotes[^note-name].

[^1]: VitePress. *Markdown Extensions*. Accessed September 11, 2025. [https://vitepress.dev/guide/markdown](https://vitepress.dev/guide/markdown)
[^note-name]: Named footnotes are easier to manage in long documents.

## Strip metadata from images

Use git pre-commit hook (`.git/hooks/pre-commit`):
```bash
#!/bin/sh
# Strip metadata from images in public before commit
# Ensure exiftool is installed: apt install libimage-exiftool-perl

FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '^public/.*\.(jpg|jpeg|png)$')

if [ -n "$FILES" ]; then
  echo "Stripping metadata from public images..."
  for FILE in $FILES; do
    exiftool -all= -overwrite_original "$FILE"
    git add "$FILE"
  done
fi
```
