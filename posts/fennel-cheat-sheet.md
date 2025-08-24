---
title: Fennel Cheat Sheet
description: Summary of Fennel syntax, functions and macros for quick lookup.
date: 2025-08-23
---

# Fennel Cheat Sheet

## Loops

```fennel
(each [key value (pairs {"key1" 52 "key2" 99})]
  (print key value))

(each [index value (ipairs ["abc" "def" "xyz"])]
  (print index value))

(for [i 1 10 2] ; inclusive stop point
  (print i))

(while (not done?)
  (print :not-done))
```
