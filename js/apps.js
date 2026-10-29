(function () {
  const h = XPD.h;
  const ext = XPD.ext;
  const D = XPData;
  let githubCache = null;

  function chips(items, className) {
    return h("ul", { class: className || "chips" }, items.map(function (item) {
      return h("li", { text: item });
    }));
  }

  function monthValue(label) {
    if (!label) return 0;
    const parts = label.split(" ");
    const months = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };
    const year = parseInt(parts[1], 10) || 0;
    return year * 12 + (months[parts[0]] || 0);
  }

  function about(root, ctx) {
    const tabs = [
      { id: "general", label: "General" },
      { id: "education", label: "Education" },
      { id: "profiles", label: "Profiles" }
    ];
    const panels = h("div", { class: "tab-panels" });
    const bar = h("div", { class: "tabbar", role: "tablist", "aria-label": "About sections" });
    root.append(bar, panels);

    function show(id) {
      panels.querySelectorAll(".tab-panel").forEach(function (p) {
        const on = p.dataset.tab === id;
        p.hidden = !on;
      });
      bar.querySelectorAll("[role=tab]").forEach(function (t) {
        const on = t.dataset.tab === id;
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
      });
    }

    tabs.forEach(function (tab, index) {
      bar.append(h("button", {
        type: "button",
        class: "tab" + (index === 0 ? " is-on" : ""),
        role: "tab",
        "aria-selected": index === 0 ? "true" : "false",
        dataset: { tab: tab.id },
        onclick: function () { show(tab.id); }
      }, [tab.label]));
    });

    const photo = h("img", {
      src: D.profile.photo,
      alt: "Portrait of Muhammad Behram Hassan",
      class: "avatar",
      width: "148",
      height: "148"
    });
    photo.addEventListener("error", function () {
      photo.replaceWith(h("div", { class: "avatar avatar-fallback", text: "MBH" }));
    });

    const general = h("section", { class: "tab-panel", dataset: { tab: "general" } }, [
      h("div", { class: "profile-head" }, [
        photo,
        h("div", {}, [
          h("h3", { class: "profile-name", text: D.profile.name }),
          h("p", { class: "profile-role", text: D.profile.title }),
          h("p", { class: "muted", text: D.profile.location })
        ])
      ]),
      h("h4", { class: "block-title", text: "Professional summary" }),
      h("p", { class: "body-copy", text: D.profile.summary }),
      h("h4", { class: "block-title", text: "Technical specialties" }),
      chips(D.profile.specialties)
    ]);

    const education = h("section", { class: "tab-panel", hidden: true, dataset: { tab: "education" } }, [
      h("article", { class: "info-card" }, [
        h("h3", { text: D.profile.education.degree }),
        h("p", { text: D.profile.education.school }),
        h("p", { class: "muted", text: D.profile.education.period }),
        h("p", {}, [
          h("span", { class: "pill", text: "CGPA " + D.profile.education.cgpa })
        ])
      ])
    ]);

    const profiles = h("section", { class: "tab-panel", hidden: true, dataset: { tab: "profiles" } }, [
      h("div", { class: "link-list" }, [
        ext(D.contact.linkedin, "LinkedIn profile", "xp-btn"),
        ext(D.contact.github, "GitHub profile", "xp-btn"),
        h("a", { class: "xp-btn", href: "mailto:" + D.contact.email, text: "Email" }),
        h("a", { class: "xp-btn", href: "tel:" + D.contact.phone, text: "Phone" })
      ])
    ]);
    panels.append(general, education, profiles);
    ctx.setStatus("System properties");
  }

  function resume(root, ctx) {
    const actions = h("div", { class: "resume-actions" }, [
      h("a", {
        class: "xp-btn primary",
        href: D.contact.cv,
        download: D.contact.cvName,
        text: "Download Resume"
      }),
      h("button", { type: "button", class: "xp-btn", onclick: printResume, text: "Print" })
    ]);
    const head = h("header", { class: "resume-head" }, [
      h("div", {}, [
        h("h3", { text: D.profile.name }),
        h("p", { text: D.profile.title }),
        h("p", { class: "muted", text: D.profile.location + " · " + D.contact.email })
      ]),
      actions
    ]);
    const note = h("p", {
      class: "note",
      text: "Roles are listed from the most recent end date. Some dates overlap and are shown as supplied."
    });
    const list = h("ol", { class: "timeline" }, D.experience.map(function (job) {
      return h("li", { class: "job" }, [
        h("div", { class: "job-mark", "aria-hidden": "true" }),
        h("div", {}, [
          h("h3", { text: job.role }),
          h("p", { class: "job-org", text: job.org }),
          h("p", { class: "muted", text: job.dates + " · " + job.location + " · " + job.mode }),
          h("ul", { class: "duties" }, job.duties.map(function (duty) {
            return h("li", { text: duty });
          }))
        ])
      ]);
    }));
    root.append(head, note, list);
    ctx.setStatus(D.experience.length + " positions");
  }

  function printResume() {
    const sheet = document.getElementById("printSheet");
    XPD.clear(sheet);
    sheet.append(
      h("header", {}, [
        h("h1", { text: D.profile.name }),
        h("p", { text: D.profile.title }),
        h("p", { text: D.profile.location + " · " + D.contact.email + " · " + D.contact.phoneDisplay })
      ]),
      h("h2", { text: "Summary" }),
      h("p", { text: D.profile.summary }),
      h("h2", { text: "Education" }),
      h("p", { text: D.profile.education.degree + ", " + D.profile.education.school }),
      h("p", { text: D.profile.education.period + " · CGPA " + D.profile.education.cgpa }),
      h("h2", { text: "Experience" })
    );
    D.experience.forEach(function (job) {
      sheet.append(
        h("h3", { text: job.role + " — " + job.org }),
        h("p", { text: job.dates + " · " + job.location + " · " + job.mode }),
        h("ul", {}, job.duties.map(function (duty) { return h("li", { text: duty }); }))
      );
    });
    sheet.append(h("h2", { text: "Selected projects" }));
    D.projects.forEach(function (project) {
      sheet.append(h("p", { text: project.title + " — " + project.repo }));
    });
    window.print();
  }

  function projects(root, ctx) {
    let cat = "all";
    let query = "";
    let detail = null;
    const shell = h("div", { class: "explorer" });
    const side = h("nav", { class: "explorer-side", "aria-label": "Project categories" });
    const main = h("div", { class: "explorer-main" });
    shell.append(side, main);
    root.append(shell);

    D.projectCategories.forEach(function (item) {
      const count = item.id === "all" ? D.projects.length : D.projects.filter(function (p) {
        return p.categories.indexOf(item.id) !== -1;
      }).length;
      side.append(h("button", {
        type: "button",
        class: "side-link" + (item.id === "all" ? " is-on" : ""),
        dataset: { cat: item.id },
        onclick: function () {
          cat = item.id;
          detail = null;
          side.querySelectorAll(".side-link").forEach(function (btn) {
            btn.classList.toggle("is-on", btn.dataset.cat === cat);
          });
          paint();
        }
      }, [
        XPIcons.el("folder"),
        h("span", { text: item.label }),
        h("span", { class: "count", text: String(count) })
      ]));
    });

    function matches(project) {
      const inCat = cat === "all" || project.categories.indexOf(cat) !== -1;
      const blob = (project.title + " " + project.description + " " + project.tech.join(" ")).toLowerCase();
      return inCat && blob.indexOf(query.trim().toLowerCase()) !== -1;
    }

    function paintDetail(project) {
      XPD.clear(main);
      const catLabels = project.categories.map(function (id) {
        const found = D.projectCategories.filter(function (c) { return c.id === id; })[0];
        return found ? found.label : id;
      });
      main.append(
        h("div", { class: "explorer-toolbar" }, [
          h("button", {
            type: "button",
            class: "xp-btn",
            onclick: function () { detail = null; paint(); },
            text: "Back"
          }),
          h("span", { class: "crumb", text: project.title })
        ]),
        h("article", { class: "detail" }, [
          h("h3", { text: project.title }),
          h("p", { class: "body-copy", text: project.description }),
          project.note ? h("p", { class: "note", text: project.note }) : null,
          h("h4", { class: "block-title", text: "Categories" }),
          chips(catLabels),
          h("h4", { class: "block-title", text: "Technologies" }),
          chips(project.tech),
          h("div", { class: "link-list" }, [
            ext(project.repo, "View repository", "xp-btn primary")
          ])
        ])
      );
      ctx.setStatus(project.repoName);
    }

    function paint() {
      if (detail) {
        paintDetail(detail);
        return;
      }
      const found = D.projects.filter(matches);
      XPD.clear(main);
      const search = h("input", {
        type: "search",
        class: "search",
        placeholder: "Search projects",
        "aria-label": "Search projects",
        value: query
      });
      search.addEventListener("input", function () {
        query = search.value;
        paint();
        const next = main.querySelector(".search");
        if (next) {
          next.focus();
          const pos = next.value.length;
          next.setSelectionRange(pos, pos);
        }
      });
      const grid = h("div", { class: "card-grid" });
      if (!found.length) {
        grid.append(h("p", { class: "empty", text: "No projects match this view." }));
      }
      found.forEach(function (project) {
        grid.append(h("button", {
          type: "button",
          class: "file-card",
          onclick: function () { detail = project; paint(); }
        }, [
          XPIcons.el("folder"),
          h("span", { class: "file-title", text: project.title }),
          h("span", { class: "file-desc", text: project.description })
        ]));
      });
      main.append(h("div", { class: "explorer-toolbar" }, [search]), grid);
      ctx.setStatus(found.length + " project" + (found.length === 1 ? "" : "s"));
    }
    paint();
  }

  function github(root, ctx) {
    const mount = h("div", { class: "gh" });
    root.append(mount);

    function banner(text, retry) {
      const row = h("div", { class: "notice", role: "status" }, [
        h("p", { text: text })
      ]);
      if (retry) {
        row.append(h("button", { type: "button", class: "xp-btn", text: "Retry", onclick: function () { load(true); } }));
      }
      return row;
    }

    function repoCard(item) {
      const body = [
        h("h3", { text: item.title }),
        h("p", { class: "file-desc", text: item.description })
      ];
      if (item.language) body.push(h("p", { class: "muted", text: "Language: " + item.language }));
      if (item.updated) body.push(h("p", { class: "muted", text: "Updated " + item.updated }));
      const links = [ext(item.url, "View repository", "xp-btn primary")];
      if (item.homepage) links.push(ext(item.homepage, "Open homepage", "xp-btn"));
      body.push(h("div", { class: "link-list" }, links));
      return h("article", { class: "repo-card" }, body);
    }

    function paint(state) {
      XPD.clear(mount);
      mount.append(h("div", { class: "gh-head" }, [
        XPIcons.el("github"),
        h("div", {}, [
          h("h3", { text: "behra527" }),
          h("p", { class: "muted", text: "Public GitHub profile" })
        ]),
        ext(D.contact.github, "Open profile", "xp-btn")
      ]));

      if (state.error === "rate") {
        mount.append(banner("GitHub is limiting requests from this network. Saved repository links are shown below.", true));
      } else if (state.error) {
        mount.append(banner("GitHub could not be reached. Saved repository links are shown below.", true));
      }

      mount.append(h("h4", { class: "block-title", text: "Featured repositories" }));
      const featured = h("div", { class: "repo-list" });
      D.projects.forEach(function (project) {
        const live = state.map && state.map[project.repoName.toLowerCase()];
        featured.append(repoCard({
          title: project.title,
          description: project.description,
          url: (live && live.html_url) || project.repo,
          language: live && live.language,
          homepage: safeHome(live && live.homepage),
          updated: live && live.pushed_at ? formatDate(live.pushed_at) : ""
        }));
      });
      mount.append(featured);

      const others = [];
      const known = {};
      D.projects.forEach(function (project) { known[project.repoName.toLowerCase()] = true; });
      if (state.repos) {
        state.repos.forEach(function (repo) {
          if (repo.fork || known[repo.name.toLowerCase()]) return;
          others.push(repo);
        });
        others.sort(function (a, b) {
          return new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0);
        });
      }
      mount.append(h("h4", { class: "block-title", text: "Other public repositories" }));
      if (!state.repos) {
        const fallback = h("div", { class: "repo-list" });
        D.extraRepos.forEach(function (repo) {
          fallback.append(repoCard({
            title: repo.name,
            description: "Public repository linked from this portfolio. A description appears when GitHub data is available.",
            url: repo.html_url
          }));
        });
        mount.append(fallback);
      } else if (!others.length) {
        mount.append(h("p", { class: "empty", text: "No additional public repositories were returned." }));
      } else {
        const list = h("div", { class: "repo-list" });
        others.forEach(function (repo) {
          list.append(repoCard({
            title: repo.name,
            description: repo.description || "No description published on GitHub.",
            url: repo.html_url,
            language: repo.language,
            homepage: safeHome(repo.homepage),
            updated: repo.pushed_at ? formatDate(repo.pushed_at) : ""
          }));
        });
        mount.append(list);
      }
      ctx.setStatus(state.error ? "Offline list" : "GitHub");
    }

    function load(force) {
      if (githubCache && !force) {
        paint(githubCache);
        return;
      }
      XPD.clear(mount);
      mount.append(h("div", { class: "loading", role: "status" }, [
        h("span", { class: "spinner", "aria-hidden": "true" }),
        h("p", { text: "Loading public repositories…" })
      ]));
      fetch(D.githubApi, { headers: { Accept: "application/vnd.github+json" } })
        .then(function (res) {
          if (res.status === 403 || res.status === 429) {
            const error = new Error("rate");
            error.code = "rate";
            throw error;
          }
          if (!res.ok) throw new Error("status");
          return res.json();
        })
        .then(function (data) {
          if (!root.isConnected) return;
          if (!Array.isArray(data)) throw new Error("shape");
          const map = {};
          data.forEach(function (repo) { map[(repo.name || "").toLowerCase()] = repo; });
          githubCache = { repos: data, map: map, error: data.length ? null : "empty" };
          paint(githubCache);
        })
        .catch(function (err) {
          if (!root.isConnected) return;
          paint({ error: err && err.code === "rate" ? "rate" : "network" });
        });
    }
    load(false);
  }

  function safeHome(url) {
    if (typeof url !== "string") return "";
    if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) return url;
    return "";
  }

  function formatDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function skills(root, ctx) {
    let active = D.skills[0].id;
    let query = "";
    const bar = h("div", { class: "tabbar", role: "tablist", "aria-label": "Skill categories" });
    const search = h("input", {
      type: "search",
      class: "search search-block",
      placeholder: "Search skills",
      "aria-label": "Search skills"
    });
    const panel = h("div", { class: "skill-panel" });
    root.append(search, bar, panel);
    D.skills.forEach(function (group) {
      bar.append(h("button", {
        type: "button",
        class: "tab",
        role: "tab",
        dataset: { id: group.id },
        onclick: function () { active = group.id; paint(); }
      }, [group.label]));
    });
    search.addEventListener("input", function () {
      query = search.value;
      paint();
    });

    function paint() {
      const q = query.trim().toLowerCase();
      bar.hidden = Boolean(q);
      bar.querySelectorAll("[role=tab]").forEach(function (tab) {
        const on = tab.dataset.id === active;
        tab.classList.toggle("is-on", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });
      XPD.clear(panel);
      if (q) {
        const hits = [];
        D.skills.forEach(function (group) {
          group.items.forEach(function (item) {
            if (item.toLowerCase().indexOf(q) !== -1) hits.push(item);
          });
        });
        if (!hits.length) panel.append(h("p", { class: "empty", text: "No skills match that search." }));
        else panel.append(chips(hits, "chips chips-lg"));
        ctx.setStatus(hits.length + " matches");
        return;
      }
      const group = D.skills.filter(function (item) { return item.id === active; })[0];
      panel.append(h("h3", { class: "block-title", text: group.label }), chips(group.items, "chips chips-lg"));
      ctx.setStatus(group.items.length + " items");
    }
    paint();
  }

  function certifications(root, ctx) {
    const groups = ["All"].concat(uniqueGroups());
    let group = "All";
    let query = "";
    const filters = h("div", { class: "filter-row", role: "toolbar", "aria-label": "Certification filters" });
    const search = h("input", { type: "search", class: "search", placeholder: "Search certificates", "aria-label": "Search certificates" });
    const list = h("div", { class: "cert-list" });
    root.append(h("div", { class: "explorer-toolbar" }, [search]), filters, list);
    groups.forEach(function (name) {
      filters.append(h("button", {
        type: "button",
        class: "chip-btn",
        dataset: { group: name },
        onclick: function () { group = name; paint(); }
      }, [name]));
    });
    search.addEventListener("input", function () { query = search.value; paint(); });

    function paint() {
      filters.querySelectorAll(".chip-btn").forEach(function (btn) {
        btn.classList.toggle("is-on", btn.dataset.group === group);
      });
      const q = query.trim().toLowerCase();
      const items = D.certifications.filter(function (cert) {
        const groupOk = group === "All" || cert.group === group;
        const blob = (cert.title + " " + cert.issuer + " " + (cert.id || "")).toLowerCase();
        return groupOk && blob.indexOf(q) !== -1;
      }).slice().sort(function (a, b) { return monthValue(b.date) - monthValue(a.date); });
      XPD.clear(list);
      if (!items.length) list.append(h("p", { class: "empty", text: "No certificates match this view." }));
      items.forEach(function (cert) {
        const meta = [cert.issuer];
        if (cert.date) meta.push(cert.date);
        if (cert.note) meta.push(cert.note);
        const card = h("article", { class: "cert-card" }, [
          XPIcons.el("cert"),
          h("div", {}, [
            h("h3", { text: cert.title }),
            h("p", { class: "muted", text: meta.join(" · ") }),
            cert.id ? h("p", { class: "mono", text: "Credential ID " + cert.id }) : null,
            cert.expired ? h("p", { class: "status-expired", text: "Expired " + cert.expired }) : null,
            cert.url ? ext(cert.url, "View certificate", "text-link") : null
          ])
        ]);
        list.append(card);
      });
      ctx.setStatus(items.length + " certificates");
    }
    paint();
  }

  function uniqueGroups() {
    const seen = [];
    D.certifications.forEach(function (cert) {
      if (seen.indexOf(cert.group) === -1) seen.push(cert.group);
    });
    return seen;
  }

  function contact(root, ctx) {
    const info = h("div", { class: "contact-grid" }, [
      contactLink("mail", "Email", D.contact.email, "mailto:" + D.contact.email),
      contactLink("mail", "Phone", D.contact.phoneDisplay, "tel:" + D.contact.phone),
      contactLink("user", "LinkedIn", "muhammadbehramhassan", D.contact.linkedin, true),
      contactLink("github", "GitHub", "behra527", D.contact.github, true)
    ]);
    const status = h("div", { class: "form-status", role: "status", "aria-live": "polite" });
    const form = h("form", { class: "contact-form", novalidate: "novalidate" });
    const fields = [
      field("name", "Name", "text", true, "name"),
      field("email", "Email", "email", true, "email"),
      field("subject", "Subject", "text", true),
      field("phone", "Phone", "tel", false, "tel"),
      field("message", "Message", "textarea", true)
    ];
    fields.forEach(function (item) { form.append(item.wrap); });
    const submit = h("button", { type: "submit", class: "xp-btn primary", text: "Send message" });
    form.append(h("div", { class: "form-actions" }, [submit]), status);
    root.append(info, h("h3", { class: "block-title", text: "Send a message" }), form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";
      let invalid = false;
      const data = {};
      fields.forEach(function (item) {
        const value = item.input.value.trim();
        data[item.name] = value;
        const emailBad = item.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const missing = item.required && !value;
        const bad = missing || emailBad;
        item.input.setAttribute("aria-invalid", bad ? "true" : "false");
        item.error.textContent = bad ? (emailBad && value ? "Enter a valid email address." : "This field is required.") : "";
        if (bad) invalid = true;
      });
      if (invalid) {
        status.textContent = "Check the highlighted fields.";
        status.classList.add("is-error");
        return;
      }
      submit.disabled = true;
      submit.textContent = "Sending…";
      sendMail(data).then(function () {
        status.textContent = "Message sent. Behram will reply to the email address you entered.";
        status.classList.add("is-ok");
        form.reset();
        ctx.setStatus("Message sent");
      }).catch(function (err) {
        console.error('[EmailJS] FAILED:', err);
        status.textContent = "The message could not be sent from this page.";
        status.classList.add("is-error");
        const mail = mailtoLink(data);
        status.append(document.createTextNode(" "));
        status.append(h("a", { href: mail, text: "Open an email draft instead." }));
        ctx.setStatus("Send failed");
      }).finally(function () {
        submit.disabled = false;
        submit.textContent = "Send message";
      });
    });
    ctx.setStatus("Contact");
  }

  function field(name, label, type, required, auto) {
    const input = type === "textarea"
      ? h("textarea", { id: "c-" + name, name: name, rows: "5", required: required ? "required" : null })
      : h("input", { id: "c-" + name, name: name, type: type, autocomplete: auto || null, required: required ? "required" : null });
    const error = h("span", { class: "field-error" });
    const wrap = h("label", { class: "field", for: "c-" + name }, [
      h("span", { text: label + (required ? "" : " (optional)") }),
      input,
      error
    ]);
    return { wrap: wrap, input: input, error: error, name: name, required: required };
  }

  function contactLink(icon, label, value, href, external) {
    const link = h("a", { class: "contact-link", href: href }, [
      XPIcons.el(icon),
      h("span", {}, [
        h("strong", { text: label }),
        h("span", { text: value })
      ])
    ]);
    if (external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    return link;
  }

  function mailtoLink(data) {
    const body = "Name: " + data.name + "\nEmail: " + data.email + "\nPhone: " + (data.phone || "") + "\n\n" + data.message;
    return "mailto:" + D.contact.email + "?subject=" + encodeURIComponent(data.subject) + "&body=" + encodeURIComponent(body);
  }

  function sendMail(data) {
    return sendViaEmailJS(data).catch(function () {
      return sendViaFormspree(data);
    });
  }

  function sendViaEmailJS(data) {
    if (!window.emailjs || !D.emailjs.publicKey) {
      return Promise.reject(new Error("unconfigured"));
    }
    emailjs.init(D.emailjs.publicKey);
    var now = new Date().toLocaleString("en-PK", {
      weekday: "long", year: "numeric", month: "long",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    });
    /* Main notification email to Behram */
    var params = {
      from_name:  data.name,
      from_email: data.email,
      subject:    data.subject,
      phone:      data.phone || "Not provided",
      message:    data.message,
      to_email:   D.contact.email,
      reply_to:   data.email,
      time:       now
    };
    console.log('[EmailJS] Sending with serviceID:', D.emailjs.serviceID, 'templateID:', D.emailjs.templateID, 'publicKey:', D.emailjs.publicKey);
    console.log('[EmailJS] Params:', params);
    return emailjs.send(D.emailjs.serviceID, D.emailjs.templateID, params)
      .then(function (res) {
        console.log('[EmailJS] SUCCESS:', res.status, res.text);
        /* Auto-reply email to the sender */
        var reply = {
          from_name:  data.name,
          from_email: data.email,
          subject:    data.subject,
          message:    data.message,
          to_email:   data.email,
          reply_to:   D.contact.email,
          time:       now
        };
        return emailjs.send(D.emailjs.serviceID, D.emailjs.autoReplyTemplateID, reply)
          .catch(function () { return null; });
      });
  }

  function sendViaFormspree(data) {
    if (!D.contact.formspree) return Promise.reject(new Error("unconfigured"));
    return fetch(D.contact.formspree, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        phone: data.phone || "",
        message: data.message
      })
    }).then(function (res) {
      if (!res.ok) throw new Error("formspree");
    });
  }

  function recycle(root, ctx) {
    root.append(h("div", { class: "empty-bin" }, [
      XPIcons.el("recycle"),
      h("h3", { text: "Recycle Bin is empty" }),
      h("p", { text: "No deleted files. I keep my code clean." })
    ]));
    ctx.setStatus("0 objects");
  }

  function computer(root, ctx) {
    const places = [
      ["about", "About Me", "user"],
      ["resume", "My Resume", "resume"],
      ["projects", "My Projects", "folder"],
      ["github", "GitHub", "github"],
      ["skills", "Technical Skills", "skills"],
      ["certifications", "Certifications", "cert"],
      ["contact", "Contact Me", "mail"]
    ];
    root.append(h("div", { class: "computer" }, [
      h("section", { class: "sys" }, [
        h("h3", { text: D.profile.name }),
        h("dl", {}, [
          row("Full name", D.profile.name),
          row("Role", D.profile.title),
          row("Location", D.profile.location),
          row("Education", D.profile.education.degree),
          row("University", D.profile.education.school),
          row("CGPA", D.profile.education.cgpa)
        ])
      ]),
      h("section", {}, [
        h("h3", { class: "block-title", text: "Places" }),
        h("div", { class: "places" }, places.map(function (place) {
          return h("button", {
            type: "button",
            class: "place",
            onclick: function () { ctx.open(place[0]); }
          }, [XPIcons.el(place[2]), h("span", { text: place[1] })]);
        }))
      ])
    ]));
    ctx.setStatus("My Computer");
  }

  function row(term, value) {
    return h("div", { class: "sys-row" }, [
      h("dt", { text: term }),
      h("dd", { text: value })
    ]);
  }

  function terminal(root, ctx) {
    const out = h("div", { class: "term-out", role: "log", "aria-live": "polite" });
    const input = h("input", {
      class: "term-input",
      "aria-label": "Command",
      "data-autofocus": "true",
      spellcheck: "false",
      autocapitalize: "off"
    });
    const line = h("form", { class: "term-line" }, [
      h("span", { class: "prompt", "aria-hidden": "true", text: "C:\\Users\\Behram>" }),
      input
    ]);
    root.append(h("div", { class: "term" }, [out, line]));
    const history = [];
    let cursor = 0;
    write("Muhammad Behram Hassan portfolio shell");
    write("Type help and press Enter.");

    const commands = {
      help: function () {
        return [
          "Available commands:",
          "help, about, skills, projects, education, experience,",
          "certifications, github, contact, open, clear",
          "Example: open projects"
        ].join("\n");
      },
      about: function () {
        return D.profile.name + "\n" + D.profile.title + "\n" + D.profile.location + "\n\n" + D.profile.summary;
      },
      skills: function () {
        return D.skills.map(function (group) {
          return group.label + "\n  " + group.items.join(", ");
        }).join("\n\n");
      },
      projects: function () {
        return D.projects.map(function (project) {
          return project.title + "\n  " + project.description + "\n  " + project.repo;
        }).join("\n\n");
      },
      education: function () {
        const edu = D.profile.education;
        return edu.degree + "\n" + edu.school + "\n" + edu.period + "\nCGPA " + edu.cgpa;
      },
      experience: function () {
        return D.experience.map(function (job) {
          return job.role + " — " + job.org + "\n" + job.dates + " · " + job.location + " · " + job.mode;
        }).join("\n\n");
      },
      certifications: function () {
        return D.certifications.map(function (cert) {
          return cert.issuer + " — " + cert.title + (cert.date ? " (" + cert.date + ")" : "") + (cert.expired ? " [Expired " + cert.expired + "]" : "");
        }).join("\n");
      },
      github: function () {
        return "https://github.com/behra527";
      },
      contact: function () {
        return "Email: " + D.contact.email + "\nPhone: " + D.contact.phoneDisplay + "\nLinkedIn: " + D.contact.linkedin + "\nGitHub: " + D.contact.github;
      },
      open: function (arg) {
        const key = (arg || "").toLowerCase();
        const alias = { resume: "resume", about: "about", projects: "projects", github: "github", skills: "skills", certifications: "certifications", contact: "contact", computer: "computer", recycle: "recycle", terminal: "terminal", assistant: "assistant", certs: "certifications" };
        if (!alias[key]) return "Usage: open about | resume | projects | github | skills | certifications | contact | computer | recycle | assistant";
        ctx.open(alias[key]);
        return "Opening " + key + ".";
      },
      clear: function () {
        XPD.clear(out);
        return "";
      }
    };

    function write(text) {
      if (!text) return;
      out.append(h("pre", { text: text }));
      out.scrollTop = out.scrollHeight;
    }

    line.addEventListener("submit", function (e) {
      e.preventDefault();
      const raw = input.value;
      const trimmed = raw.trim();
      write("C:\\Users\\Behram> " + raw);
      input.value = "";
      if (!trimmed) return;
      history.push(trimmed);
      cursor = history.length;
      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ");
      if (!commands[cmd]) {
        write("'" + parts[0] + "' is not recognized as a command. Type help to see available commands.");
        return;
      }
      write(commands[cmd](arg));
      ctx.setStatus(cmd);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!history.length) return;
        cursor = Math.max(0, cursor - 1);
        input.value = history[cursor] || "";
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        cursor = Math.min(history.length, cursor + 1);
        input.value = history[cursor] || "";
      }
    });
    ctx.setStatus("Command Prompt");
  }

  function assistant(root, ctx) {
    const log = h("div", { class: "chat-log", role: "log", "aria-live": "polite" });
    const suggestions = [
      "What are Behram's technical skills?",
      "Show his AI projects.",
      "Summarize his professional experience.",
      "How can I contact him?"
    ];
    const suggestRow = h("div", { class: "suggest" });
    const input = h("input", { type: "text", "aria-label": "Ask about this portfolio", placeholder: "Ask about skills, projects, or experience" });
    const form = h("form", { class: "chat-form" }, [
      input,
      h("button", { type: "submit", class: "xp-btn primary", text: "Ask" })
    ]);
    root.append(
      h("p", { class: "note", text: "Portfolio guide. Answers are written from the information on this desktop. This is not a live language model." }),
      log,
      suggestRow,
      form
    );
    suggestions.forEach(function (text) {
      suggestRow.append(h("button", {
        type: "button",
        class: "chip-btn",
        onclick: function () { ask(text); }
      }, [text]));
    });
    push("guide", "I can walk through Behram's skills, projects, experience, education, certifications, and contact details.");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      ask(text);
    });

    function ask(text) {
      push("user", text);
      push("guide", reply(text));
      ctx.setStatus("Portfolio guide");
    }

    function push(role, text) {
      log.append(h("div", { class: "bubble bubble-" + role }, [
        h("span", { class: "who", text: role === "user" ? "You" : "Guide" }),
        h("p", { text: text })
      ]));
      log.scrollTop = log.scrollHeight;
    }

    function reply(text) {
      const s = text.toLowerCase();
      if (/contact|email|phone|reach|hire|linkedin/.test(s)) {
        return "Email " + D.contact.email + ", call " + D.contact.phoneDisplay + ", or visit " + D.contact.linkedin + " and " + D.contact.github + ".";
      }
      if (/skill|stack|technolog|know|tools|language/.test(s)) {
        return D.skills.map(function (group) { return group.label + ": " + group.items.join(", "); }).join(" ");
      }
      if (/project|built|portfolio|github repo/.test(s)) {
        return D.projects.map(function (project) { return project.title + " (" + project.description + ")"; }).join(" ");
      }
      if (/experience|work|job|intern|resume|career/.test(s)) {
        return D.experience.map(function (job) { return job.role + " at " + job.org + ", " + job.dates + "."; }).join(" ");
      }
      if (/educat|university|degree|cgpa|gpa|school/.test(s)) {
        const edu = D.profile.education;
        return edu.degree + " at " + edu.school + ", " + edu.period + ". CGPA " + edu.cgpa + ".";
      }
      if (/certif|course|ibm|credential/.test(s)) {
        return "There are " + D.certifications.length + " listed certificates, including IBM machine learning and generative AI courses, Google AI Essentials, EC-Council Ethical Hacking Essentials, a Thinkcloudly SIEM bootcamp, and a ULEFUSA certificate marked expired in February 2026. Open Certifications for credential IDs and verification links.";
      }
      if (/who|about|behram|location|where/.test(s)) {
        return D.profile.name + " is a " + D.profile.title + " based in " + D.profile.location + ". " + D.profile.summary;
      }
      return "Try asking about skills, AI projects, professional experience, education, certifications, or contact details.";
    }
  }

  const apps = [
    { id: "about", title: "About Me", icon: "user", width: 740, height: 540, render: about },
    { id: "resume", title: "My Resume", icon: "resume", width: 780, height: 580, render: resume },
    { id: "projects", title: "My Projects", icon: "folder", width: 880, height: 580, pad: false, render: projects },
    { id: "github", title: "GitHub", icon: "github", width: 760, height: 560, render: github },
    { id: "skills", title: "Technical Skills", icon: "skills", width: 740, height: 520, render: skills },
    { id: "certifications", title: "Certifications", icon: "cert", width: 760, height: 560, render: certifications },
    { id: "contact", title: "Contact Me", icon: "mail", width: 680, height: 620, render: contact },
    { id: "recycle", title: "Recycle Bin", icon: "recycle", width: 440, height: 340, render: recycle },
    { id: "computer", title: "My Computer", icon: "computer", width: 680, height: 500, render: computer },
    { id: "terminal", title: "Command Prompt", icon: "terminal", width: 680, height: 440, pad: false, render: terminal },
    { id: "assistant", title: "Behram AI Assistant", icon: "assistant", width: 480, height: 560, render: assistant }
  ];

  apps.forEach(function (app) { XPWM.register(app); });
  window.XPPrint = printResume;
})();
