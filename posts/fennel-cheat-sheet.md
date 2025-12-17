---
title: Fennel Cheat Sheet
description:
date: 2025-08-23
---

# Fennel Cheat Sheet

## Data

### Tables

```fennel
; length only works on consecutive tables, calculate with ipairs otherwise
(length [1 2 3]) ; => 3
(length [1 2 3 nil 8]) ; => 3 or 5
```

## Loops

```fennel
(each [key value (pairs {"key1" 52 "key2" 99})]
  (print key value))

(each [index value (ipairs ["abc" "def" "xyz"])]
  (print index value))

(each [index value (ipairs nil)] ; throws "attempt to index nil value"
  (print index value))

(for [i 1 10 2] ; inclusive stop point
  (print i))

(while (not done?)
  (print :not-done))
```

## Resources

### Repository

<https://git.sr.ht/~technomancy/fennel>  

### Docs

<https://fennel-lang.org/tutorial>  
<https://fennel-lang.org/reference>  

### Articles

<https://andreyor.st/posts/2023-08-27-fennel-libraries-as-single-files/>  

### Testing

<https://gitlab.com/andreyorst/fennel-test>  
<https://martin-fieber.de/blog/how-to-test-your-lua/>  
