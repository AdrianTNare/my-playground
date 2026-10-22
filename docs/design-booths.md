# Booth shell — design plan

Written with the `frontend-design` skill before building Phase 1. The landing page's look is
locked; this plan covers only the new surfaces: sidebar, mobile booths menu, booth headers,
entry lists, project detail, Now, Unoffice Hours, the home "explore" note.

## Subject, audience, job

- **Subject:** one developer's playground, presented as a shell session you walk around in.
- **Audience:** engineers, recruiters, friends — people who'll get a terminal joke but came
  for the content.
- **Primary job:** make the visitor open a second booth. The home page's job is to hand them
  the map.

## Tokens (all existing)

| Role | Token | Hex |
|---|---|---|
| Page | `ink` | `#1e1916` |
| Raised surface | `panel` / `panel2` | `#251e1a` / `#2c2420` |
| Rules, borders | `edge` | `#38302a` |
| Headline text | `bright` | `#f3e9d8` |
| Body text | `#d6c8b3` / `clay` | — / `#b6a892` |
| Prompts (`$ …`) | `amber` | `#cf9b5c` |
| Current location, actions | `accent` (picker) | `#c0613f` default |
| Secondary meta | `muted` | `#8a7c6e` |

Type: Space Grotesk for booth titles only (same treatment as the hero name, smaller); JetBrains
Mono for everything else. Scale: 13 (meta) / 14.5 (body) / 17 (entry title) / clamp(32–48)
(booth title). Body lines capped at ~68ch.

## Layout

Desktop (`lg+`): the sidebar is the output of `tree`, not a menu of buttons.

```
┌─────────────────────┬────────────────────────────────────────────┐
│ adrian@nare:~$ tree │  $ ls ~/writing/til                        │
│ .                   │  TIL                     (display, bright) │
│ ├── home         ▌  │  Small things learned, written down fast.  │
│ ├── now             │                                            │
│ ├── unoffice-hours  │  ┌──────────────────────────────────────┐  │
│ ├── media           │  │ 2026-10-22  coming soon        [wip] │  │
│ ├── reads/          │  │ This booth is being built.           │  │
│ │   ├── refs        │  ├──────────────────────────────────────┤  │
│ │   └── bliki       │  │ …                                    │  │
│ ├── writing/        │  └──────────────────────────────────────┘  │
│ │   ├── til         │                                            │
│ │   ├── reflections │                                            │
│ │   └── blog        │                                            │
│ ├── projects        │                                            │
│ └── tinkering/      │                                            │
│     ├── terminal    │                                            │
│     └── toolset     │                                            │
│                     │                                            │
│ sound: on           │                                            │
└─────────────────────┴────────────────────────────────────────────┘
```

- Groups are directories (`reads/`), always expanded: the tree is short and expanded branches
  are the map. No collapse state to manage.
- The current booth is bright text plus the blinking accent block cursor. That cursor is the
  one bold move in the shell: it says "you are here" in the site's own vocabulary.
- Entry lists are one panel with hairline dividers (an `ls -l` listing), not a grid of
  separate cards. Date column left, aligned.

Mobile (`< lg`): a sticky top bar shows the current path as a prompt (`~/now $`) and a
`☰ booths` button. It opens a full-screen native `<dialog>` with the same tree at 44px row
height, closed by Esc, `close`, or picking a booth.

Home: hero unchanged, then the explore note: a terminal window running `ls booths/` whose
output lists each booth with a one-line description; each line is a link. Then Stack, About
and Contact as before (they have no booth of their own). The old anchor nav goes away.

## Principles

1. The shell is the metaphor; never decorate it. Tree glyphs, prompts and `cd ..` are
   navigation, not ornament.
2. One bold element per screen: the hero on home, the cursor in the tree elsewhere.
3. Motion only answers the visitor: menu open/close and the click tick. No scroll reveals.
4. Plain copy. Booth descriptions say what's there, in one sentence.

## Review against the brief

- *Generic sidebar with icons + labels* was the first idea. Replaced with the `tree` output,
  which only makes sense on this site.
- *Card grid for entries* is the SaaS default. Replaced with a single listing panel.
- *Uppercase tracked labels* appear in the locked landing sections; the new surfaces don't add
  more. Meta (dates, location) sits in its own column or line rather than a `·`-joined string.
- Unoffice Hours "good for / not for" uses diff markers (`+` / `-`) in sage and muted, a
  terminal-native way to show a yes/no list.
