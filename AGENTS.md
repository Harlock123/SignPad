# AGENTS.md

Notes for anyone, human or AI agent, changing this code. `README.md` is one line; this file covers what is here
and how to change it.

## What this is

A proof of concept for collecting a signature in a web page: a `<canvas>` you draw on with a mouse or a finger,
which can then be turned into a PNG. It is plain TypeScript compiled to browser JavaScript, with no build system,
no package manager and no framework.

## Commands

```bash
tsc --sourceMap Signpad.ts       # rebuild Signpad.js and Signpad.js.map (needs the TypeScript compiler)
```

Then open `index.html` in a browser. There is no `tsconfig.json`, so `tsc` uses its defaults; the committed
`Signpad.js` is ES5-style output (the class becomes a function). There are no tests yet.

## Layout

- `Signpad.ts`: the `Signpad` class, the real source.
  - The constructor takes the canvas element and hooks window resize, mouse and touch events.
  - `FillCanvas` resizes the canvas to its displayed width and clears it to the background colour.
  - `SetBackgroundColor` and `SetDrawColor` change a colour and clear the canvas.
  - `GetImage` returns an `<img>` tag whose `src` is the canvas as a PNG data URL.
- `Signpad.js`, `Signpad.js.map`: the compiled output that the page loads. Commit them with any `.ts` change.
- `index.html`: a demo page with buttons to clear, change the background, log the image tag and show the image.
- `JS/jquery-1.10.2.min.js`: an old jQuery copy; its script tag in `index.html` is commented out and nothing uses it.

## Rules that keep it working

- **Edit the TypeScript, not the JavaScript.** `Signpad.js` is generated; regenerate it with `tsc` after changing
  `Signpad.ts`.
- **Handlers are arrow-function fields** (`HandleMouseMove = (ev) => ...`) so `this` stays bound when they are
  passed to `addEventListener`. Keep new handlers in the same form.
- **Changing a colour or resizing clears the drawing.** Every path through `FillCanvas` wipes the canvas.
- **Known rough edges**, worth knowing before you build on it:
  - Mouse drawing uses `offsetX`/`offsetY` (canvas coordinates), but touch drawing uses `clientX`/`clientY`
    (page coordinates), so finger strokes are offset when the canvas is not at the top left of the window.
  - `resizeCanvas` contains `this.resize;` without parentheses, which does nothing; `FillCanvas` does the resize.
  - Strokes are added to one path that is never reset with `beginPath`, so the path grows as you draw.
