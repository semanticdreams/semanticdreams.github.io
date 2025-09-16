---
title: Custom Multi-Language XKB Keyboard Layouts
description: Dvorak-based multi-language XKB keyboard layouts for latin and cyrillic alphabets.
date: 2025-08-28
---

# Custom Multi-Language Dvorak-based XKB Keyboard Layouts for Latin and Cyrillic

`hqx` contains all letters for English, German, French, Spanish, Hungarian and Turkish. `bqx` only supports Bulgarian. Both layouts are Dvorak-based.

## Setup

Create files `hqx` and `bqx` in `/usr/share/X11/xkb/symbols/`.

::: code-group

``` [hqx]
default
partial alphanumeric_keys modifier_keys 

xkb_symbols "hqx" {
    name[Group1]= "hqx customized dvorak";

    // Alphanumeric section

    key <TLDE> { [       grave,	asciitilde, U00FC , U00DC] };

    key <AE01> { [	    1,	exclam, exclamdown 		]	};
    key <AE02> { [	    2,	at		]	};

    key <AE03> { [	    3,	numbersign, U00E4, U00C4	]	};
    key <LCTL> { [	    Control_L	]	};

    key <AE04> { [	    4,	dollar, U0171, U0170]	};
    key <LFSH> { [	    Shift_L ]	};

    key <AE05> { [	    5,	percent, dead_breve, dead_breve		]	};
    key <AE06> { [	    6,	asciicircum, dead_circumflex, dead_circumflex ]	};
    key <AE07> { [	    7,	ampersand ]	};
    key <AE08> { [	    8,	asterisk ]	};

    key <AE09> { [	    9,	parenleft, dead_grave]	};
    key <LWIN> { [	    Super_L ]	};

    key <AE10> { [	    0,	parenright, udiaeresis, Udiaeresis	]	};
    key <AE11> { [ bracketleft,	braceleft, acircumflex, Acircumflex	]	};
    key <AE12> { [ bracketright, braceright,  dead_tilde] };

    key <AD01> { [  apostrophe,	quotedbl, dead_acute, dead_diaeresis	] };
    key <AD02> { [	comma,	U00F6,   U151	] };
    key <AD03> { [      period,	U00D6, U150	] };
    key <AD04> { [	    p,	P, U0103, U0102		]	};
    key <AD05> { [	    y,	Y, U00EE, U00CE		]	};
    key <AD06> { [	    f,	F		]	};
    key <AD07> { [	    g,	G		]	};
    key <AD08> { [	    c,	C, ccedilla, Ccedilla		]	};
    key <AD09> { [	    r,	R, scedilla, Scedilla		]	};
    key <AD10> { [	    l,	L, U00E2, U00C2		]	};
    key <AD11> { [	slash,	question, questiondown	]	};
    key <AD12> { [	equal,	plus		]	};

    key <AC01> { [	    a,	A, aacute, Aacute]	};
    key <AC02> { [	    o,	O, oacute, Oacute]	};
    key <AC03> { [	    e,	E, eacute, Eacute]	};
    key <AC04> { [	    u,	U, uacute, Uacute]	};
    key <AC05> { [	    i,	I, iacute, Iacute]	};
    key <AC06> { [	    d,	D		]	};
    key <AC07> { [	    h,	H, idotless, Iabovedot		]	};
    key <AC08> { [	    t,	T, U021B, U021A		]	};
    key <AC09> { [	    n,	N, ntilde, Ntilde		]	};
    key <AC10> { [	    s,	S, ssharp		]	};
    key <AC11> { [	minus,	underscore	]	};

    key <AB01> { [   semicolon,	colon,atilde,Atilde ] };
    key <AB02> { [	    q,	Q, otilde, Otilde		]	};
    key <AB03> { [	    j,	J, ecircumflex, Ecircumflex		]	};
    key <AB04> { [	    k,	K, agrave, Agrave		]	};
    key <AB05> { [	    x,	X 		]	};
    key <AB06> { [	    b,	B		]	};
    key <AB07> { [	    m,	M		]	};
    key <AB08> { [	    w,	W		]	};
    key <AB09> { [	    v,	V		]	};
    key <AB10> { [	    z,	Z		]	};

    key <BKSL> { [  backslash,  bar, U20BA             ]       };

    include "level3(ralt_switch)"
};
```

``` [bqx]
default
partial alphanumeric_keys modifier_keys 

xkb_symbols "bqx" {
    name[Group1]= "bqx customized dvorak";

    // Alphanumeric section

    key <TLDE> { [       grave,	asciitilde, Cyrillic_softsign ] };

    key <AE01> { [	    1,	exclam, Cyrillic_hardsign, Cyrillic_HARDSIGN 		]	};
    key <AE02> { [	    2,	at, U046B, U046A		]	};

    key <AE03> { [	    3,	numbersign	]	};
    key <LCTL> { [	    Control_L	]	};

    key <AE04> { [	    4,	dollar]	};
    key <LFSH> { [	    Shift_L ]	};

    key <AE05> { [	    5,	percent		]	};
    key <AE06> { [	    6,	asciicircum, dead_circumflex, dead_circumflex ]	};
    key <AE07> { [	    7,	ampersand	]	};
    key <AE08> { [	    8,	asterisk	]	};

    key <AE09> { [	    9,	parenleft,  dead_grave]	};
    key <LWIN> { [	    Super_L ]	};

    key <AE10> { [	    0,	parenright	]	};
    key <AE11> { [ bracketleft,	braceleft	]	};
    key <AE12> { [ bracketright, braceright,  dead_tilde] };

    key <AD01> { [  apostrophe,	quotedbl, dead_acute, dead_diaeresis	] };
    key <AD02> { [	comma	] };
    key <AD03> { [      period	] };
    key <AD04> { [	    Cyrillic_pe,	Cyrillic_PE		]	};
    key <AD05> { [	    Cyrillic_ya,	Cyrillic_YA, Cyrillic_yu, Cyrillic_YU	]	};
    key <AD06> { [	    Cyrillic_ef,	Cyrillic_EF		]	};
    key <AD07> { [	    Cyrillic_ghe,	Cyrillic_GHE		]	};
    key <AD08> { [	    Cyrillic_che,	Cyrillic_CHE		]	};
    key <AD09> { [	    Cyrillic_er,	Cyrillic_ER		]	};
    key <AD10> { [	    Cyrillic_el,	Cyrillic_EL		]	};
    key <AD11> { [	slash,	question, questiondown	]	};
    key <AD12> { [	equal,	plus		]	};

    key <AC01> { [	    Cyrillic_a,	Cyrillic_A]	};
    key <AC02> { [	    Cyrillic_o,	Cyrillic_O]	};
    key <AC03> { [	    Cyrillic_ie,	Cyrillic_IE, Cyrillic_e, Cyrillic_E]	};
    key <AC04> { [	    Cyrillic_u,	Cyrillic_U]	};
    key <AC05> { [	    Cyrillic_i,	Cyrillic_I]	};
    key <AC06> { [	    Cyrillic_de,	Cyrillic_DE		]	};
    key <AC07> { [	    Cyrillic_ha,	Cyrillic_HA		]	};
    key <AC08> { [	    Cyrillic_te,	Cyrillic_TE		]	};
    key <AC09> { [	    Cyrillic_en,	Cyrillic_EN		]	};
    key <AC10> { [	    Cyrillic_es,	Cyrillic_ES ]	};
    key <AC11> { [	minus,	underscore	]	};

    key <AB01> { [   semicolon,	colon ] };
    key <AB02> { [	    Cyrillic_tse,	Cyrillic_TSE 		]	};
    key <AB03> { [	    Cyrillic_shorti,	Cyrillic_SHORTI, Cyrillic_yeru, Cyrillic_YERU		]	};
    key <AB04> { [	    Cyrillic_ka,	Cyrillic_KA		]	};
    key <AB05> { [	    Cyrillic_sha,	Cyrillic_SHA, Cyrillic_shcha, Cyrillic_SHCHA 		]	};
    key <AB06> { [	    Cyrillic_be,	Cyrillic_BE		]	};
    key <AB07> { [	    Cyrillic_em,	Cyrillic_EM		]	};
    key <AB08> { [	    Cyrillic_zhe,	Cyrillic_ZHE		]	};
    key <AB09> { [	    Cyrillic_ve,	Cyrillic_VE		]	};
    key <AB10> { [	    Cyrillic_ze,	Cyrillic_ZE		]	};

    key <BKSL> { [  backslash,  bar             ]       };

    include "level3(ralt_switch)"
};
```
:::

Run `rm /var/lib/xkb/* -rf`.
`setxkbmap hqx` and `setxkbmap bqx` should now work.

Add the following to `/usr/share/X11/xkb/rules/evdev.xml` under `<layoutList>`.

```xml
    <layout>
      <configItem>
        <name>hqx</name>
            <description>hqx</description>
      </configItem>
    </layout>
    <layout>
      <configItem>
        <name>bqx</name>
        <description>bqx</description>
      </configItem>
    </layout>
```

hqx and bqx layouts should now become available in language settings.
