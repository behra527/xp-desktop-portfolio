(function () {
  const registry = {};
  const openWins = new Map();
  let z = 20;
  let cascade = 0;
  let layer = null;
  let taskbar = null;
  let os = null;
  let lastFocus = null;

  function isCompact() {
    return window.matchMedia("(max-width: 820px)").matches;
  }

  function register(app) {
    registry[app.id] = app;
  }

  function setStatusClass() {
    const anyOpen = Array.from(openWins.values()).some(function (w) { return !w.minimized; });
    os.classList.toggle("has-open-window", anyOpen);
  }

  function topId() {
    let best = null;
    let bestZ = -1;
    openWins.forEach(function (w, id) {
      const zi = parseInt(w.el.style.zIndex || "0", 10);
      if (!w.minimized && zi >= bestZ) {
        bestZ = zi;
        best = id;
      }
    });
    return best;
  }

  function renderTaskbar() {
    XPD.clear(taskbar);
    const active = topId();
    openWins.forEach(function (w, id) {
      const btn = XPD.h("button", {
        type: "button",
        class: "task-btn" + (id === active ? " is-active" : "") + (w.minimized ? " is-min" : ""),
        "aria-label": w.app.title + (w.minimized ? ", minimized" : ""),
        onclick: function () { onTaskbar(id); }
      }, [
        XPIcons.el(w.app.icon),
        XPD.h("span", { text: w.app.title })
      ]);
      taskbar.append(btn);
    });
    setStatusClass();
  }

  function markActive(id) {
    openWins.forEach(function (w, key) {
      w.el.classList.toggle("is-active", key === id && !w.minimized);
    });
    renderTaskbar();
  }

  /* ------------------------------------------------------------------ *
   *  focus() — bring window to front WITHOUT stealing focus from inputs  *
   * ------------------------------------------------------------------ */
  function focus(id, allowWindowFocus) {
    const w = openWins.get(id);
    if (!w) return;
    z += 1;
    w.el.style.zIndex = String(z);
    w.minimized = false;
    w.el.classList.remove("is-min");
    markActive(id);

    /* Only move focus to the window wrapper when:
       1. The caller explicitly opts in (allowWindowFocus !== false), AND
       2. The currently focused element is NOT an editable control.       */
    if (allowWindowFocus !== false) {
      window.requestAnimationFrame(function () {
        if (!w.el.isConnected) return;
        var cur = document.activeElement;
        if (cur) {
          var tag = cur.tagName;
          if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || cur.isContentEditable) return;
          if (w.el.contains(cur) && cur !== w.el) return;
        }
        w.el.focus();
      });
    }
  }

  function minimize(id) {
    const w = openWins.get(id);
    if (!w) return;
    w.minimized = true;
    w.el.classList.add("is-min");
    w.el.classList.remove("is-active");
    const next = topId();
    if (next) markActive(next);
    else renderTaskbar();
  }

  function toggleMax(id) {
    const w = openWins.get(id);
    if (!w || isCompact()) return;
    const btn = w.el.querySelector(".wc-max");
    if (w.maximized) {
      w.maximized = false;
      w.el.classList.remove("is-max");
      if (w.prev) {
        w.el.style.left = w.prev.left;
        w.el.style.top = w.prev.top;
        w.el.style.width = w.prev.width;
        w.el.style.height = w.prev.height;
      }
      if (btn) btn.setAttribute("aria-label", "Maximize");
      w.el.querySelector(".wc-max .glyph").textContent = "\u25a1";
    } else {
      w.prev = {
        left: w.el.style.left,
        top: w.el.style.top,
        width: w.el.style.width,
        height: w.el.style.height
      };
      w.maximized = true;
      w.el.classList.add("is-max");
      if (btn) btn.setAttribute("aria-label", "Restore");
      w.el.querySelector(".wc-max .glyph").textContent = "\u2750";
    }
    focus(id);
  }

  function close(id) {
    const w = openWins.get(id);
    if (!w) return;
    const finish = function () {
      w.el.remove();
      openWins.delete(id);
      const next = topId();
      if (next) markActive(next);
      else renderTaskbar();
      if (lastFocus && lastFocus.isConnected) lastFocus.focus();
      else {
        const start = document.getElementById("startBtn");
        if (start) start.focus();
      }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) finish();
    else {
      w.el.classList.add("is-closing");
      window.setTimeout(finish, 140);
    }
  }

  function onTaskbar(id) {
    const w = openWins.get(id);
    if (!w) return;
    const active = topId();
    if (active === id && !w.minimized) minimize(id);
    else focus(id);
  }

  function bindDrag(win, id) {
    const bar = win.querySelector(".titlebar");
    bar.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      if (e.target.closest("button")) return;
      focus(id);
      const record = openWins.get(id);
      if (!record || record.maximized || isCompact()) return;
      const bounds = layer.getBoundingClientRect();
      const rect = win.getBoundingClientRect();
      const ox = e.clientX - rect.left;
      const oy = e.clientY - rect.top;
      bar.setPointerCapture(e.pointerId);
      document.body.classList.add("is-dragging");

      function move(ev) {
        let x = ev.clientX - bounds.left - ox;
        let y = ev.clientY - bounds.top - oy;
        const maxX = Math.max(0, bounds.width - 140);
        const maxY = Math.max(0, bounds.height - 40);
        x = Math.min(Math.max(-rect.width + 140, x), maxX);
        y = Math.min(Math.max(0, y), maxY);
        win.style.left = x + "px";
        win.style.top = y + "px";
      }
      function up() {
        bar.removeEventListener("pointermove", move);
        bar.removeEventListener("pointerup", up);
        bar.removeEventListener("pointercancel", up);
        document.body.classList.remove("is-dragging");
      }
      bar.addEventListener("pointermove", move);
      bar.addEventListener("pointerup", up);
      bar.addEventListener("pointercancel", up);
    });
    bar.addEventListener("dblclick", function (e) {
      if (e.target.closest("button")) return;
      toggleMax(id);
    });
  }

  function open(id, opener) {
    const app = registry[id];
    if (!app) return;
    lastFocus = opener || document.activeElement;
    if (openWins.has(id)) {
      focus(id);
      return;
    }
    const compact = isCompact();
    const bounds = layer.getBoundingClientRect();
    const width = Math.min(app.width || 680, Math.max(280, bounds.width - 24));
    const height = Math.min(app.height || 480, Math.max(220, bounds.height - 24));
    const slot = cascade % 8;
    cascade += 1;
    const left = Math.min(18 + slot * 26, Math.max(8, bounds.width - width - 8));
    const top = Math.min(12 + slot * 22, Math.max(8, bounds.height - height - 8));

    const win = XPD.h("section", {
      class: "window is-active",
      role: "dialog",
      "aria-modal": "false",
      "aria-labelledby": "title-" + id,
      tabindex: "-1",
      dataset: { app: id }
    });
    win.style.left = left + "px";
    win.style.top = top + "px";
    win.style.width = width + "px";
    win.style.height = height + "px";
    z += 1;
    win.style.zIndex = String(z);

    const titleId = "title-" + id;
    const titlebar = XPD.h("header", { class: "titlebar" }, [
      XPIcons.el(app.icon),
      XPD.h("h2", { id: titleId, class: "window-title", text: app.title }),
      XPD.h("div", { class: "title-controls" }, [
        XPD.h("button", { type: "button", class: "wc wc-min", "aria-label": "Minimize", onclick: function () { minimize(id); } }, [
          XPD.h("span", { class: "glyph", "aria-hidden": "true", text: "\u2014" })
        ]),
        XPD.h("button", { type: "button", class: "wc wc-max", "aria-label": "Maximize", onclick: function () { toggleMax(id); } }, [
          XPD.h("span", { class: "glyph", "aria-hidden": "true", text: "\u25a1" })
        ]),
        XPD.h("button", { type: "button", class: "wc wc-close", "aria-label": "Close", onclick: function () { close(id); } }, [
          XPD.h("span", { class: "glyph", "aria-hidden": "true", text: "\u00d7" })
        ])
      ])
    ]);

    const body = XPD.h("div", { class: "window-body" + (app.pad === false ? " is-bleed" : "") });
    const statusText = XPD.h("span", { text: app.status || "Ready" });
    const status = XPD.h("footer", { class: "statusbar" }, [statusText]);
    win.append(titlebar, body, status);

    /* Clicking anywhere inside the window brings it to front,
       BUT we skip w.el.focus() when the click target is an editable control */
    win.addEventListener("pointerdown", function (e) {
      var tag = e.target.tagName;
      var isEditable = (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" ||
        e.target.isContentEditable || e.target.closest("input, textarea, select, [contenteditable]"));
      focus(id, !isEditable);
    });

    layer.append(win);
    win.classList.add("is-opening");
    window.setTimeout(function () { win.classList.remove("is-opening"); }, 180);
    bindDrag(win, id);

    const record = { el: win, app: app, minimized: false, maximized: false, prev: null };
    openWins.set(id, record);

    const ctx = {
      setStatus: function (text) { statusText.textContent = text; },
      close: function () { close(id); },
      open: open
    };
    try {
      app.render(body, ctx);
    } catch (err) {
      console.error(err);
      body.append(XPD.h("p", { class: "pad error-text", text: "This window could not load its content." }));
    }

    if (compact) win.classList.add("is-max");
    markActive(id);
    window.requestAnimationFrame(function () {
      const target = body.querySelector("[data-autofocus]") || win;
      target.focus();
    });
  }

  function showDesktop() {
    openWins.forEach(function (w, id) {
      if (!w.minimized) minimize(id);
    });
  }

  function closeTop() {
    const id = topId();
    if (id) close(id);
  }

  function init(options) {
    layer = options.layer;
    taskbar = options.taskbar;
    os = options.os;
    window.addEventListener("resize", function () {
      os.classList.toggle("is-compact", isCompact());
      if (isCompact()) {
        openWins.forEach(function (w) { w.el.classList.add("is-max"); });
      }
    });
    os.classList.toggle("is-compact", isCompact());
  }

  window.XPWM = {
    register: register,
    open: open,
    close: close,
    minimize: minimize,
    showDesktop: showDesktop,
    closeTop: closeTop,
    init: init,
    isCompact: isCompact
  };
})();
