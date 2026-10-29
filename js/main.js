(function () {
  const h = XPD.h;
  const D = XPData;
  const ICON_KEY = "mbh-icon-positions";

  function init() {
    const os = document.getElementById("os");
    const layer = document.getElementById("windowLayer");
    const taskbar = document.getElementById("taskbarApps");
    const iconLayer = document.getElementById("iconLayer");
    const startBtn = document.getElementById("startBtn");
    const startMenu = document.getElementById("startMenu");
    const clockBtn = document.getElementById("clockBtn");
    const calendar = document.getElementById("calendarPop");
    const welcome = document.getElementById("welcome");

    XPWM.init({ os: os, layer: layer, taskbar: taskbar });
    buildIcons(iconLayer);
    buildStart(startMenu, startBtn);
    startClock(clockBtn, calendar);
    setupWelcome(welcome);
    setupGlobalKeys(startMenu, calendar, welcome);
    layoutIcons();
    window.addEventListener("resize", debounce(layoutIcons, 120));

    iconLayer.addEventListener("click", function (e) {
      if (e.target === iconLayer) clearSelection();
    });
  }

  function buildIcons(layer) {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(ICON_KEY) || "{}"); } catch (e) { saved = {}; }
    D.desktopIcons.forEach(function (item) {
      const btn = h("button", {
        type: "button",
        class: "desk-icon",
        "aria-label": item.label,
        dataset: { app: item.id }
      }, [
        XPIcons.el(item.icon),
        h("span", { class: "label", text: item.label })
      ]);
      if (saved[item.id]) btn.dataset.custom = "1";
      layer.append(btn);
      bindIcon(btn);
    });
  }

  function bindIcon(btn) {
    let suppress = false;
    btn.addEventListener("click", function () {
      if (suppress) {
        suppress = false;
        return;
      }
      select(btn);
      if (XPWM.isCompact()) XPWM.open(btn.dataset.app, btn);
    });
    btn.addEventListener("dblclick", function (e) {
      e.preventDefault();
      if (!XPWM.isCompact()) XPWM.open(btn.dataset.app, btn);
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        XPWM.open(btn.dataset.app, btn);
      }
    });
    btn.addEventListener("pointerdown", function (e) {
      if (e.button !== 0 || XPWM.isCompact()) return;
      select(btn);
      const startX = e.clientX;
      const startY = e.clientY;
      const origX = btn.offsetLeft;
      const origY = btn.offsetTop;
      let moved = false;
      function move(ev) {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        if (!moved && Math.hypot(dx, dy) > 6) {
          moved = true;
          document.body.classList.add("is-dragging");
        }
        if (!moved) return;
        btn.dataset.custom = "1";
        btn.style.left = (origX + dx) + "px";
        btn.style.top = (origY + dy) + "px";
      }
      function up() {
        btn.removeEventListener("pointermove", move);
        btn.removeEventListener("pointerup", up);
        btn.removeEventListener("pointercancel", up);
        document.body.classList.remove("is-dragging");
        if (moved) {
          suppress = true;
          clampIcon(btn);
          saveIcons();
        }
      }
      btn.addEventListener("pointermove", move);
      btn.addEventListener("pointerup", up);
      btn.addEventListener("pointercancel", up);
    });
  }

  function select(btn) {
    document.querySelectorAll(".desk-icon").forEach(function (icon) {
      icon.classList.toggle("is-selected", icon === btn);
    });
  }

  function clearSelection() {
    document.querySelectorAll(".desk-icon.is-selected").forEach(function (icon) {
      icon.classList.remove("is-selected");
    });
  }

  function layoutIcons() {
    const layer = document.getElementById("iconLayer");
    const icons = Array.prototype.slice.call(layer.querySelectorAll(".desk-icon"));
    if (XPWM.isCompact()) return;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(ICON_KEY) || "{}"); } catch (e) { saved = {}; }
    const gapX = 100;
    const gapY = 96;
    const rows = Math.max(1, Math.floor((layer.clientHeight - 12) / gapY));
    icons.forEach(function (btn, index) {
      const custom = saved[btn.dataset.app];
      if (btn.dataset.custom === "1" && custom) {
        btn.style.left = custom.x + "px";
        btn.style.top = custom.y + "px";
        clampIcon(btn);
        return;
      }
      const col = Math.floor(index / rows);
      const row = index % rows;
      btn.style.left = (10 + col * gapX) + "px";
      btn.style.top = (8 + row * gapY) + "px";
    });
  }

  function clampIcon(btn) {
    const layer = document.getElementById("iconLayer");
    const maxX = Math.max(4, layer.clientWidth - btn.offsetWidth - 4);
    const maxY = Math.max(4, layer.clientHeight - btn.offsetHeight - 4);
    const x = Math.min(Math.max(4, parseInt(btn.style.left, 10) || 4), maxX);
    const y = Math.min(Math.max(4, parseInt(btn.style.top, 10) || 4), maxY);
    btn.style.left = x + "px";
    btn.style.top = y + "px";
  }

  function saveIcons() {
    const data = {};
    document.querySelectorAll(".desk-icon").forEach(function (btn) {
      if (btn.dataset.custom === "1") {
        data[btn.dataset.app] = {
          x: parseInt(btn.style.left, 10) || 0,
          y: parseInt(btn.style.top, 10) || 0
        };
      }
    });
    try { localStorage.setItem(ICON_KEY, JSON.stringify(data)); } catch (e) { /* storage may be blocked */ }
  }

  function buildStart(menu, button) {
    const programs = h("div", { class: "start-programs" });
    const places = h("div", { class: "start-places" });
    const flyout = h("div", { class: "flyout", hidden: true });
    const search = h("input", { type: "search", class: "search", placeholder: "Search this PC", "aria-label": "Search programs" });
    D.startPrograms.forEach(function (item) {
      programs.append(programButton(item));
    });
    D.allPrograms.forEach(function (item) {
      places.append(programButton(item, true));
      flyout.append(programButton(item));
    });
    const allBtn = h("button", {
      type: "button",
      class: "all-programs",
      "aria-expanded": "false",
      onclick: function () {
        const open = flyout.hidden;
        flyout.hidden = !open;
        allBtn.setAttribute("aria-expanded", open ? "true" : "false");
      }
    }, [h("span", { text: "All Programs" })]);
    const left = h("div", { class: "start-left" }, [search, programs, allBtn, flyout]);
    const right = h("div", { class: "start-right" }, [
      h("p", { class: "places-label", text: "Places" }),
      places
    ]);
    const photo = h("img", { src: D.profile.photo, alt: "", width: "42", height: "42" });
    photo.addEventListener("error", function () { photo.remove(); });
    menu.append(
      h("div", { class: "start-user" }, [
        photo,
        h("div", {}, [
          h("strong", { text: D.profile.name }),
          h("span", { text: "AI Engineer" })
        ])
      ]),
      h("div", { class: "start-body" }, [left, right])
    );

    search.addEventListener("input", function () {
      const q = search.value.trim().toLowerCase();
      menu.querySelectorAll(".start-item").forEach(function (item) {
        const label = item.textContent.toLowerCase();
        item.hidden = q ? label.indexOf(q) === -1 : false;
      });
    });

    button.addEventListener("click", function () {
      const willOpen = menu.hidden;
      setStart(willOpen);
      if (willOpen) {
        search.value = "";
        menu.querySelectorAll(".start-item").forEach(function (item) { item.hidden = false; });
        search.focus();
      }
    });

    document.addEventListener("pointerdown", function (e) {
      if (menu.hidden) return;
      if (menu.contains(e.target) || button.contains(e.target)) return;
      setStart(false);
    });

    function setStart(open) {
      menu.hidden = !open;
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.classList.toggle("is-open", open);
      if (!open) flyout.hidden = true;
    }
    menu._setStart = setStart;
  }

  function programButton(item, compact) {
    return h("button", {
      type: "button",
      class: "start-item" + (compact ? " start-item-place" : ""),
      onclick: function (e) {
        const menu = document.getElementById("startMenu");
        if (menu._setStart) menu._setStart(false);
        XPWM.open(item.id, e.currentTarget);
      }
    }, [
      XPIcons.el(item.icon),
      h("span", { text: item.label })
    ]);
  }

  function startClock(button, calendar) {
    function tick() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const suffix = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const time = hours + ":" + minutes + " " + suffix;
      const date = now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
      button.querySelector(".clock-time").textContent = time;
      button.setAttribute("aria-label", "Current time " + time + ", " + date + ". Open calendar");
      button.title = date;
    }
    tick();
    window.setInterval(tick, 1000);
    button.addEventListener("click", function () {
      if (calendar.hidden) {
        renderCalendar(calendar, new Date());
        calendar.hidden = false;
      } else calendar.hidden = true;
    });
    document.addEventListener("pointerdown", function (e) {
      if (calendar.hidden) return;
      if (calendar.contains(e.target) || button.contains(e.target)) return;
      calendar.hidden = true;
    });
  }

  function renderCalendar(calendar, cursor) {
    XPD.clear(calendar);
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const label = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    const grid = h("div", { class: "cal-grid" });
    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach(function (day) {
      grid.append(h("span", { class: "cal-dow", text: day }));
    });
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    for (let i = 0; i < first; i += 1) grid.append(h("span", { class: "cal-empty" }));
    for (let day = 1; day <= days; day += 1) {
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
      grid.append(h("span", { class: "cal-day" + (isToday ? " is-today" : ""), text: String(day) }));
    }
    calendar.append(
      h("div", { class: "cal-head" }, [
        h("button", { type: "button", class: "xp-btn", "aria-label": "Previous month", text: "‹", onclick: function () {
          renderCalendar(calendar, new Date(year, month - 1, 1));
        } }),
        h("strong", { text: label }),
        h("button", { type: "button", class: "xp-btn", "aria-label": "Next month", text: "›", onclick: function () {
          renderCalendar(calendar, new Date(year, month + 1, 1));
        } })
      ]),
      grid
    );
  }

  function setupWelcome(welcome) {
    const compact = XPWM.isCompact();
    welcome.append(
      h("strong", { text: "Welcome" }),
      h("p", { text: compact
        ? "Tap an icon to open Muhammad Behram Hassan's portfolio."
        : "Double-click an icon, or press Enter, to open an application." }),
      h("button", { type: "button", class: "xp-btn", text: "OK", onclick: function () { welcome.hidden = true; } })
    );
    welcome.hidden = false;
    window.setTimeout(function () { welcome.hidden = true; }, 9000);
  }

  function setupGlobalKeys(menu, calendar, welcome) {
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!welcome.hidden) {
        welcome.hidden = true;
        return;
      }
      if (!calendar.hidden) {
        calendar.hidden = true;
        return;
      }
      if (!menu.hidden) {
        menu._setStart(false);
        document.getElementById("startBtn").focus();
        return;
      }
      XPWM.closeTop();
    });
    function hideWindows() { XPWM.showDesktop(); }
    document.getElementById("showDesktop").addEventListener("click", hideWindows);
    const deskEdge = document.getElementById("showDesktopEdge");
    if (deskEdge) deskEdge.addEventListener("click", hideWindows);
    document.getElementById("quickTerminal").addEventListener("click", function (e) {
      XPWM.open("terminal", e.currentTarget);
    });
    document.getElementById("quickAssistant").addEventListener("click", function (e) {
      XPWM.open("assistant", e.currentTarget);
    });
  }

  function debounce(fn, ms) {
    let timer = 0;
    return function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(fn, ms);
    };
  }

  init();
})();
