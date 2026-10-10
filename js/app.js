/* =========================================================
   SS — Struggle of Students · Interactions
   All content comes from js/data.js
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  /* ---------- helpers ---------- */
  // Use a specific link if provided, otherwise fall back (usually to the join form)
  const linkOr = (url, fallback = LINKS.joinForm) => (url && url.trim()) || fallback;
  const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const icon = (name) => `<i data-lucide="${name}"></i>`;
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const toast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("is-show"), 2800);
  };

  const parseDateTime = (date, time = "12:00 AM") => {
    const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    const d = new Date(`${date}T00:00:00`);
    if (m) {
      let h = +m[1];
      const ap = (m[3] || "").toUpperCase();
      if (ap === "PM" && h < 12) h += 12;
      if (ap === "AM" && h === 12) h = 0;
      d.setHours(h, +m[2]);
    }
    return d;
  };

  const fmtDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  // Volunteer / seat capacity state
  const capacityState = (filled, cap, forcedClosed = false) => {
    const left = Math.max(cap - filled, 0);
    const pct = cap ? Math.min((filled / cap) * 100, 100) : 100;
    if (forcedClosed || left === 0) return { left, pct, key: "full", label: forcedClosed && left > 0 ? "Applications Closed" : "Slots Full" };
    if (left / cap <= 0.25) return { left, pct, key: "low", label: `Only ${left} left` };
    return { left, pct, key: "open", label: "Open" };
  };

  /* ---------- global links ---------- */
  function wireLinks() {
    $$(".js-join").forEach((a) => (a.href = LINKS.joinForm));
    $$(".js-whatsapp").forEach((a) => {
      if (LINKS.whatsapp) a.href = LINKS.whatsapp;
      else a.addEventListener("click", (e) => { e.preventDefault(); toast("WhatsApp community link coming soon!"); });
    });

    const email = $("#footer-email"), phone = $("#footer-phone");
    email.textContent = LINKS.email; email.href = `mailto:${LINKS.email}`;
    phone.textContent = LINKS.phone; phone.href = `tel:${LINKS.phone.replace(/\s/g, "")}`;
    $("#year").textContent = new Date().getFullYear();

    const svg = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
    const BRAND = {
      instagram: svg('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'),
      linkedin: svg('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
      youtube: svg('<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>'),
      twitter: svg('<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>'),
    };
    const socials = [
      ["whatsapp", icon("message-circle"), "WhatsApp"],
      ["whatsappGroup", icon("users"), "WhatsApp Group"],
      ["instagram", BRAND.instagram, "Instagram"],
      ["linkedin", BRAND.linkedin, "LinkedIn"],
      ["youtube", BRAND.youtube, "YouTube"],
      ["twitter", BRAND.twitter, "Twitter"],
    ];
    $("#socials").innerHTML =
      socials.map(([k, ic, label]) => `<a href="${esc(LINKS[k] || "#")}" ${LINKS[k] ? 'target="_blank" rel="noopener"' : 'data-soon="1"'} aria-label="${label}" id="social-${k}">${ic}</a>`).join("") +
      `<a href="mailto:${esc(LINKS.email)}" aria-label="Email" id="social-email">${icon("mail")}</a>`;
    $$("#socials [data-soon]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); toast("Link coming soon!"); }));
  }

  /* ---------- ticker ---------- */
  function renderTicker() {
    const items = UPDATES.map((u) => `<span>${esc(u)}</span>`).join("");
    $("#ticker-items").innerHTML = items + items; // duplicated for seamless loop
  }

  /* ---------- opportunities ---------- */
  function renderOpportunities() {
    const grid = $("#opp-grid");
    grid.innerHTML =
      OPPORTUNITIES.map((o, i) => `
        <a class="opp reveal" href="${esc(LINKS.joinForm)}" target="_blank" rel="noopener" data-tag="${esc(o.tag)}" id="opp-${i}" style="transition-delay:${(i % 4) * 60}ms">
          <div class="opp__icon">${icon(o.icon)}</div>
          <h3>${esc(o.title)}</h3>
          <p>${esc(o.text)}</p>
          <div class="opp__foot"><span class="opp__tag">${esc(o.tag)}</span><span class="opp__link">Apply ${icon("arrow-up-right")}</span></div>
        </a>`).join("") +
      `<a class="opp opp--cta reveal" href="${esc(LINKS.joinForm)}" target="_blank" rel="noopener" data-tag="all" id="opp-cta">
          <div><h3>Don't see your thing?</h3><p>Join the community and tell us what you need — we'll build it with you.</p></div>
          <div class="opp__foot"><span class="opp__link" style="color:var(--lime)">Join SS ${icon("arrow-up-right")}</span></div>
       </a>`;

    $$("#opp-filters .chip").forEach((chip) =>
      chip.addEventListener("click", () => {
        $$("#opp-filters .chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        const f = chip.dataset.filter;
        $$(".opp", grid).forEach((card) => {
          const show = f === "all" || card.dataset.tag === f || card.dataset.tag === "all";
          card.classList.toggle("is-hidden", !show);
        });
      })
    );
  }

  /* ---------- events ---------- */
  function eventState(ev) {
    return capacityState(ev.volunteersFilled, ev.volunteerCapacity, ev.status === "closed");
  }

  function slotsHTML(st, filled, cap, noun = "Volunteer slots") {
    const badgeIcon = st.key === "full" ? "lock" : st.key === "low" ? "flame" : "circle-check";
    return `
      <div class="slots is-${st.key}">
        <div class="slots__row"><span>${noun}: <b>${filled}/${cap}</b></span><span class="badge badge--${st.key}">${icon(badgeIcon)} ${st.label}</span></div>
        <div class="slots__bar"><div class="slots__fill" data-pct="${st.pct}"></div></div>
      </div>`;
  }

  function renderEvents() {
    const upcoming = EVENTS.filter((e) => parseDateTime(e.date, "11:59 PM") >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
    const grid = $("#events-grid");
    if (!upcoming.length) {
      grid.innerHTML = `<p style="color:var(--muted)">New events are being planned — join the community to hear first.</p>`;
      return;
    }
    grid.innerHTML = upcoming.map((ev, i) => {
      const d = new Date(`${ev.date}T00:00:00`);
      const st = eventState(ev);
      const full = st.key === "full";
      return `
        <article class="event reveal" id="event-${esc(ev.id)}" style="transition-delay:${i * 80}ms">
          <div class="event__top">
            <div class="event__date"><small>${MONTHS[d.getMonth()]}</small><b>${d.getDate()}</b></div>
            <div>
              <span class="event__cat">${esc(ev.category)}</span>
              <h3>${esc(ev.title)}</h3>
              <div class="event__meta"><span>${icon("clock")} ${esc(ev.time)}</span><span>${icon("map-pin")} ${esc(ev.venue)}</span></div>
            </div>
          </div>
          <div class="event__body">
            <p class="event__desc">${esc(ev.description)}</p>
            ${slotsHTML(st, Math.min(ev.volunteersFilled, ev.volunteerCapacity), ev.volunteerCapacity)}
            <div class="event__actions">
              <button class="btn btn--ghost" data-event="${esc(ev.id)}" id="details-${esc(ev.id)}">${icon("info")} Details</button>
              ${full
                ? `<button class="btn" disabled id="apply-${esc(ev.id)}">${icon("lock")} Slots Full</button>`
                : `<a class="btn btn--primary" href="${esc(linkOr(ev.volunteerForm))}" target="_blank" rel="noopener" id="apply-${esc(ev.id)}">Volunteer ${icon("arrow-up-right")}</a>`}
            </div>
          </div>
        </article>`;
    }).join("");

    $$("[data-event]", grid).forEach((b) => b.addEventListener("click", () => openEvent(b.dataset.event)));
  }

  function openEvent(id) {
    const ev = EVENTS.find((e) => e.id === id);
    if (!ev) return;
    const st = eventState(ev);
    const full = st.key === "full";
    $("#event-modal-body").innerHTML = `
      <button class="modal__close" data-close aria-label="Close" id="modal-close">${icon("x")}</button>
      <span class="event__cat">${esc(ev.category)}</span>
      <h3>${esc(ev.title)}</h3>
      <div class="event__meta">
        <span>${icon("calendar")} ${fmtDate(ev.date)}</span>
        <span>${icon("clock")} ${esc(ev.time)}</span>
        <span>${icon("map-pin")} ${esc(ev.venue)}</span>
      </div>
      <p>${esc(ev.description)}</p>
      <h4 style="margin-bottom:.7rem">Volunteer opportunities</h4>
      <div class="roles">${ev.roles.map((r) => `<div>${icon("hand-heart")} ${esc(r)}</div>`).join("")}</div>
      ${slotsHTML(st, Math.min(ev.volunteersFilled, ev.volunteerCapacity), ev.volunteerCapacity)}
      <div class="modal__actions">
        <a class="btn btn--ghost" href="${esc(linkOr(ev.registerForm))}" target="_blank" rel="noopener" id="modal-register">${icon("ticket")} Register to attend</a>
        ${full
          ? `<button class="btn" disabled id="modal-apply">${icon("lock")} Volunteer Slots Full</button>`
          : `<a class="btn btn--primary" href="${esc(linkOr(ev.volunteerForm))}" target="_blank" rel="noopener" id="modal-apply">Apply as Volunteer ${icon("arrow-up-right")}</a>`}
      </div>`;
    const modal = $("#event-modal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lucide.createIcons();
    requestAnimationFrame(() => animateBars(modal));
  }

  function closeModal() {
    const modal = $("#event-modal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------- sessions ---------- */
  function sessionPhase(s) {
    const start = parseDateTime(s.date, s.time);
    const end = new Date(start.getTime() + (s.durationMins || 60) * 60000);
    const reveal = new Date(start.getTime() - (s.revealLinkHoursBefore || 2) * 3600000);
    const now = new Date();
    if (now > end) return { phase: "ended", start };
    if (now >= reveal) return { phase: "live", start };
    return { phase: "upcoming", start };
  }

  const countdownText = (to) => {
    let diff = Math.max(0, to - new Date()) / 1000;
    const d = Math.floor(diff / 86400); diff -= d * 86400;
    const h = Math.floor(diff / 3600); diff -= h * 3600;
    const m = Math.floor(diff / 60);
    return d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`;
  };

  function renderSessions() {
    const grid = $("#sessions-grid");
    const list = SESSIONS.filter((s) => sessionPhase(s).phase !== "ended");
    if (!list.length) {
      grid.innerHTML = `<p style="color:#A1A1AA">No sessions scheduled right now — follow the WhatsApp community for the next one.</p>`;
      return;
    }
    grid.innerHTML = list.map((s, i) => {
      const { phase, start } = sessionPhase(s);
      const st = capacityState(s.registered, s.capacity);
      const full = st.key === "full";
      const registerBtn = full
        ? `<button class="btn" disabled id="session-register-${i}">${icon("lock")} Seats Full</button>`
        : `<a class="btn btn--lime" href="${esc(linkOr(s.registerForm))}" target="_blank" rel="noopener" id="session-register-${i}">Register ${icon("arrow-up-right")}</a>`;
      const joinBtn = phase === "live" && s.meetingLink
        ? `<a class="btn btn--outline-light" href="${esc(s.meetingLink)}" target="_blank" rel="noopener" id="session-join-${i}">${icon("video")} Join Meeting</a>`
        : "";
      const note = phase === "live"
        ? (s.meetingLink ? `${icon("radio")} Meeting link is live` : `${icon("radio")} Link will be shared on WhatsApp`)
        : `${icon("lock-keyhole")} Link unlocks ${s.revealLinkHoursBefore || 2}h before · starts in <span class="countdown" data-start="${start.toISOString()}">${countdownText(start)}</span>`;
      return `
        <article class="session reveal" id="session-${i}" style="transition-delay:${i * 80}ms">
          <div class="session__head"><span class="session__platform">${icon("video")} ${esc(s.platform)}</span><span class="badge badge--${st.key}">${st.label}</span></div>
          <div><h3>${esc(s.title)}</h3><p class="session__host">by ${esc(s.host)}</p></div>
          <div class="session__meta"><span>${icon("calendar")} ${fmtDate(s.date)}</span><span>${icon("clock")} ${esc(s.time)}</span><span>${icon("timer")} ${s.durationMins} min</span></div>
          ${slotsHTML(st, Math.min(s.registered, s.capacity), s.capacity, "Seats")}
          <div class="session__actions">${registerBtn}${joinBtn}</div>
          <p class="session__note">${note}</p>
        </article>`;
    }).join("");
  }

  function tickCountdowns() {
    $$(".countdown[data-start]").forEach((el) => {
      const to = new Date(el.dataset.start);
      if (to - new Date() <= 0) { renderSessions(); lucide.createIcons(); observeReveal(); return; }
      el.textContent = countdownText(to);
    });
  }

  /* ---------- services ---------- */
  function renderServices() {
    const tabs = $("#services-tabs");
    tabs.innerHTML = SERVICES.map((s, i) => `<button class="svc-tab ${i === 0 ? "is-active" : ""}" data-i="${i}" role="tab" id="service-tab-${i}">${icon(s.icon)}<span>${esc(s.name)}</span></button>`).join("");
    const show = (i) => {
      const s = SERVICES[i];
      const enquiry = linkOr(LINKS.enquiryForm);
      $("#services-panel").innerHTML = `
        <div class="svc">
          <div class="svc__head">${icon(s.icon)}<div><h3>${esc(s.name)}</h3><p>${esc(s.tagline)}</p></div></div>
          <div class="svc__grid">
            <div><h4>What we provide</h4><ul>${s.provide.map((p) => `<li>${icon("check")} ${esc(p)}</li>`).join("")}</ul></div>
            <div><h4>How to approach us</h4><p class="svc__approach">${esc(s.approach)}</p></div>
          </div>
          <div class="contact-card">
            <div class="contact-card__who">
              <div class="avatar">${initials(s.contactName)}</div>
              <div><b>${esc(s.contactName)}</b>
                <small><a href="tel:${esc(s.contactPhone.replace(/\s/g, ""))}">${esc(s.contactPhone)}</a><a href="mailto:${esc(s.contactEmail)}">${esc(s.contactEmail)}</a></small>
              </div>
            </div>
            <a class="btn btn--primary btn--sm" href="${esc(enquiry)}" target="_blank" rel="noopener" id="service-enquire-${i}">Send Enquiry ${icon("send")}</a>
          </div>
        </div>`;
      lucide.createIcons();
    };
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest(".svc-tab");
      if (!b) return;
      $$(".svc-tab", tabs).forEach((t) => t.classList.remove("is-active"));
      b.classList.add("is-active");
      show(+b.dataset.i);
    });
    show(0);
  }

  /* ---------- placements ---------- */
  function renderPlacements() {
    $("#place-grid").innerHTML = PLACEMENTS.map((p, i) => `
      <article class="place reveal" id="placement-${i}" style="transition-delay:${(i % 3) * 70}ms">
        <div class="place__head">
          <div class="place__logo"><span>${initials(p.company)}</span><b>${esc(p.company)}</b></div>
          <div class="place__num"><strong>${p.placed}</strong><small>students placed</small></div>
        </div>
        <div class="place__roles">${p.roles.map((r) => `<span>${esc(r)}</span>`).join("")}</div>
        ${p.students && p.students.length ? `
        <div class="place__students">
          <div class="stack">${p.students.slice(0, 3).map((s) => `<span title="${esc(s)}">${initials(s)}</span>`).join("")}</div>
          <span>${esc(p.students.slice(0, 2).join(", "))}${p.placed > 2 ? ` & ${p.placed - Math.min(2, p.students.length)} more` : ""}</span>
        </div>` : ""}
      </article>`).join("");
  }

  /* ---------- team ---------- */
  function renderTeam() {
    $("#lead-grid").innerHTML = LEADERSHIP.map((l, i) => {
      const founder = /founder/i.test(l.role);
      return `
        <article class="lead reveal ${founder ? "lead--founder" : ""}" id="leader-${i}" style="transition-delay:${i * 80}ms">
          <div class="lead__photo">
            ${l.photo ? `<img src="${esc(l.photo)}" alt="${esc(l.name)}" loading="lazy" />` : `<span class="lead__initials">${initials(l.name)}</span>`}
            ${founder ? `<span class="lead__badge">FOUNDER</span>` : ""}
          </div>
          <div class="lead__body">
            <h3>${esc(l.name)}</h3>
            <div class="lead__role">${esc(l.role)}</div>
            <p>${esc(l.bio)}</p>
            ${l.area ? `<span class="lead__area">${icon("target")} ${esc(l.area)}</span>` : ""}
          </div>
        </article>`;
    }).join("");

    const shown = TEAM.slice(0, 9);
    const more = Math.max(STATS.activeTeamMembers - shown.length, 0);
    $("#team-faces").innerHTML =
      shown.map((m) => `<div class="avatar" title="${esc(m.name)} · ${esc(m.role)}">${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" />` : initials(m.name)}</div>`).join("") +
      (more ? `<div class="avatar avatar--more">+${more}</div>` : "");
  }

  /* ---------- counters / progress bars / reveal ---------- */
  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const target = STATS[el.dataset.count] || 0;
    const dur = 1600, t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function animateBars(root = document) {
    $$(".slots__fill", root).forEach((b) => (b.style.width = `${b.dataset.pct}%`));
  }

  let io;
  function observeReveal() {
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("is-visible");
        if (el.dataset.count) animateCount(el);
        $$("[data-count]", el).forEach(animateCount);
        animateBars(el);
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal:not(.is-visible), [data-count]:not([data-done])").forEach((el) => io.observe(el));
  }

  /* ---------- nav ---------- */
  function initNav() {
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    $("#nav-toggle").addEventListener("click", () => nav.classList.toggle("is-open"));
    $$("#nav-links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("is-open")));

    // Highlight current section in nav
    const links = $$("#nav-links a");
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${en.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((l) => { const s = $(l.getAttribute("href")); if (s) spy.observe(s); });
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    wireLinks();
    renderTicker();
    renderOpportunities();
    renderEvents();
    renderSessions();
    renderServices();
    renderPlacements();
    renderTeam();
    initNav();

    if (window.lucide) lucide.createIcons();
    observeReveal();
    setInterval(tickCountdowns, 30000);

    $("#event-modal").addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  });
})();
