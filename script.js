(function () {
  "use strict";

  var body = document.body;
  var switchBtns = document.querySelectorAll(".depth-switch button");
  var tierFull = document.getElementById("tier-full");
  var tierAnnotated = document.getElementById("tier-annotated");
  var rail = document.getElementById("chapter-rail");

  function setTier(tier, opts) {
    opts = opts || {};
    body.setAttribute("data-depth", tier);
    tierFull.hidden = tier !== "full";
    tierAnnotated.hidden = tier !== "annotated";
    switchBtns.forEach(function (b) {
      b.classList.toggle("active", b.dataset.tier === tier);
    });
    if (rail) rail.hidden = tier !== "full";
    if (!opts.silent) {
      try {
        localStorage_setSafe("learning-oven-tier", tier);
      } catch (e) {}
    }
    if (!opts.keepScroll) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  // localStorage guarded (artifacts environments sometimes block it; site itself is a plain
  // static export so real browsers are fine, but we degrade quietly either way)
  function localStorage_setSafe(k, v) {
    if (window.localStorage) window.localStorage.setItem(k, v);
  }
  function localStorage_getSafe(k) {
    try {
      return window.localStorage ? window.localStorage.getItem(k) : null;
    } catch (e) {
      return null;
    }
  }

  switchBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTier(btn.dataset.tier);
      history.replaceState(null, "", "#");
    });
  });

  var beginBtn = document.getElementById("begin-reading");
  if (beginBtn) {
    beginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("reading-start").scrollIntoView({ behavior: "smooth" });
    });
  }

  // initial tier: remembered choice, else annotated
  var startTier = localStorage_getSafe("learning-oven-tier") || "annotated";
  setTier(startTier, { silent: true, keepScroll: true });

  // ---------- Chapter rail scrollspy ----------
  var railLinks = document.querySelectorAll(".chapter-rail a");
  var chapterSections = document.querySelectorAll(".tier-full .chapter");

  if ("IntersectionObserver" in window && chapterSections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            railLinks.forEach(function (l) {
              l.classList.toggle("current", l.dataset.slug === id);
            });
          }
        });
      },
      { rootMargin: "-10% 0px -70% 0px" }
    );
    chapterSections.forEach(function (s) {
      observer.observe(s);
    });
  }

  // ---------- Diagram A/B toggle logic (works for all instances on the page) ----------
  function wireDiagramToggle(suffix) {
    var widget = document.getElementById("diagram-ab-widget" + suffix);
    if (!widget) return;
    var btn = document.getElementById("diagram-toggle" + suffix);
    var note = document.getElementById("diagram-note" + suffix);
    var outbound = document.getElementById("a-outbound" + suffix);
    var core = document.getElementById("a-core" + suffix);
    var layerA = document.getElementById("layer-a" + suffix);
    var layerB = document.getElementById("layer-b" + suffix);
    var caption = widget.querySelector(".diagram-caption");
    var state = "a";

    function toB() {
      state = "b";
      btn.textContent = "\u2190 Bring back the full picture";
      caption.textContent = "What's left, redrawn.";
      note.textContent =
        "Nothing on the left is wrong. It's just not the whole diagram any more \u2014 the product, and the four arrows feeding value back out, are gone.";
      outbound.classList.add("fading");
      setTimeout(function () {
        core.style.opacity = "0";
        layerB.style.opacity = "1";
      }, 480);
    }

    function toA() {
      state = "a";
      btn.textContent = "See what got simplified \u2192";
      caption.textContent =
        "The raw version. Nine years old. Nobody but Osioke ever really followed it.";
      note.textContent =
        "The product or service this made, and everything it fed back to \u2014 government, partners, the community, investors \u2014 sat on the right. Watch what happens to it.";
      layerB.style.opacity = "0";
      core.style.opacity = "1";
      setTimeout(function () {
        outbound.classList.remove("fading");
      }, 250);
    }

    btn.addEventListener("click", function () {
      if (state === "a") toB();
      else toA();
    });
  }

  wireDiagramToggle("");
  wireDiagramToggle("-2");
  wireDiagramToggle("-ann");

  // ---------- Diagram C step reveal ----------
  function wireStepDiagram(id, btnId) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    var steps = document.querySelectorAll("#" + id + " .step, ." + id + " .step");
    var widget = btn.closest(".diagram-c");
    if (!widget) return;
    var stepEls = widget.querySelectorAll(".step");
    var i = 0;
    btn.addEventListener("click", function () {
      if (i >= stepEls.length) {
        stepEls.forEach(function (s) {
          s.classList.remove("revealed");
        });
        i = 0;
        btn.textContent = "Walk through it \u2192";
        return;
      }
      stepEls[i].classList.add("revealed");
      i++;
      btn.textContent = i >= stepEls.length ? "Start over" : "Next \u2192";
    });
  }
  wireStepDiagram("diagram-c-widget", "diagram-c-play");

  // ---------- Timeline ----------
  var timelineData = [
    { year: "2016", title: "Devcenter & the observation", copy: "Matching business hits a supply ceiling; peer upskilling noticed happening on its own." },
    { year: "2016\u201317", title: "Learn by Doing", copy: "First deliberate attempt. Real drop-off after ~2 weeks; incentives didn\u2019t fix it." },
    { year: "2018", title: "Frintern / GIS", copy: "TTLS pilots, March\u2013May 2018: 2\u20133 hours, down from Kaufman's 20-hour baseline." },
    { year: "2019", title: "Building Communities into Economies", copy: "Open-access book; the raw economic-loop diagram." },
    { year: "2019\u201325", title: "Growth Clinic / Community Staples", copy: "Two paid client engagements. Wound down end of 2025." },
    { year: "2025", title: "From Knowledge to Judgement", copy: "\u201cHuman Operating System\u201d proposed, then the name dropped." },
    { year: "Now", title: "LORE", copy: "Live, real, and genuinely unresolved." }
  ];
  var timelineEl = document.getElementById("timeline");
  if (timelineEl) {
    timelineData.forEach(function (t) {
      var item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML =
        '<span class="t-year">' + t.year + "</span><h3>" + t.title + "</h3><p>" + t.copy + "</p>";
      timelineEl.appendChild(item);
    });
  }
})();
