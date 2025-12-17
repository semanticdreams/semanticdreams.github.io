---
title: OOP Patterns in Fennel
description:
date: 2025-08-24
---

# OOP Patterns in Fennel

```fennel
; my-classes.fnl
(fn MyClass [opts]
  (fn method1 [self]
    (print "method1"))
  {: method1})

{: MyClass}

; use
(local {: MyClass} (require :my-classes))
(local o (MyClass {}))
(o:method1)
```

```fennel
(local MyClass (fn []
  (let [self {}]
    (fn method1 []
      )
    self)))
(local o (MyClass))
(o.method1)
```

```fennel
(fn MyClass []
  (let [cls {}]
    (fn cls:new [] (init-stuff))
    cls))
```

```fennel
(fn MyClass []
  (let [cls {}]
    (fn cls:new []
      (let [obj (setmetatable {} {:__index cls})]
        (print "init" obj)
        obj))
    cls))
```

```fennel
(local M {})

(fn M.new []
  (let [self {}]
    (fn self:method1 [val]
      )
    self))

M
```
