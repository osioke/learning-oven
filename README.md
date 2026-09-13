# The Learning Oven

**Live site: https://osioke.github.io/learning-oven/**

A nine-year account of one idea &mdash; carried through four attempts and a few different names &mdash; told as an interactive, long-form website. It's a personal research account, not a pitch: it names what worked, what didn't, and one specific piece of the original idea that quietly went missing somewhere between the first version and the last, without anyone deciding to cut it.

## What's here

The account exists in two reading depths, switchable at the top of the page:

- **Annotated** &mdash; a mid-length version, written to stand on its own. Every person, place, and number is explained where it first comes up.
- **Full account** &mdash; all fourteen chapters, with the complete detail, quotes, and provenance behind every claim.

Both are the real text, not summaries of each other &mdash; the annotated version is its own independently paced telling of the same nine years, not a trimmed-down copy of the full one.

Three diagrams from the original work are rebuilt as interactive SVG rather than shown as static images:

- The raw 2019 economic-loop diagram and the simplified three-slice version it later became, with a toggle that walks through exactly what got dropped between the two.
- The Community Progression diagram, as a click-through three-step reveal.

A set of small status tags run through the text (*tested twice*, *never reached a user*, *live and unresolved*, etc.) marking, at the point each attempt is discussed, exactly how proven or unproven it actually was &mdash; so nothing on the page reads as more finished than the underlying work.

The account ends on two open questions. Neither is answered here, on purpose.

## How it's built

Vanilla HTML, CSS, and JavaScript. No framework, no build step, no package manager, no dependencies beyond one Google Fonts request (Fraunces for reading text, Archivo for interface labels). Clone it and open `index.html` &mdash; that's the whole setup.

```
.
├── index.html      structure, and both tiers' full text
├── styles.css      layout, type, and colour
└── script.js       depth switching, chapter navigation, diagram interactions
```

The two content tiers, the chapter rail, and the diagram placements were generated from the original source files with a small Python build step (not included in this repo, since the source markdown is the author's own long-form drafts) &mdash; but the shipped site itself has no server-side or build-time dependency. It's static output, meant to be read straight out of the files.

## Why it's built this way

The site follows a few deliberate constraints that shaped every decision in it:

- Nothing is claimed to be more resolved, tested, or successful than the source material says it is. Where a diagram or a chapter is honest that something failed, never reached a user, or is still unresolved, the site carries that forward rather than smoothing it over.
- No fact, quote, number, or date appears that isn't in the original account.
- The two closing questions are left genuinely open. The site doesn't supply an answer, a resolution, or a replacement name for anything the source material deliberately left unnamed.

## Who this might be useful to

Anyone working on community-led economics, open-source-style learning loops, or how ordinary people turn shared knowledge and shared effort into shared value. It's written to be read by someone with no prior context at all.

## Licence

The code (HTML/CSS/JS) in this repository may be reused freely. The written account, the diagrams, and their content are Osioke Itseuwa's own work and are not covered by that same permission &mdash; please ask before reusing the text or diagrams elsewhere. *(If you'd rather formalise this with an actual LICENSE file &mdash; e.g. MIT for the code, all-rights-reserved for the content &mdash; let me know and I can set that up properly.)*

## Author

Written by Osioke Itseuwa.
