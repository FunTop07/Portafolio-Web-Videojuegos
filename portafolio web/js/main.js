(() => {
  "use strict";
  const C = window.PORTFOLIO_CONFIG || { games: {}, formspreeId: "" };
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // URLs de los juegos desde la configuración
  $$("[data-game]").forEach((a) => {
    if (C.games[a.dataset.game]) a.href = C.games[a.dataset.game];
  });

  // Navegación: sección activa y aparición suave del contenido
  const links = $$(".nav a[href^='#']");
  const navObs =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (es) =>
            es.forEach((e) => {
              if (e.isIntersecting)
                links.forEach((l) => {
                  l.hash === "#" + e.target.id
                    ? l.setAttribute("aria-current", "true")
                    : l.removeAttribute("aria-current");
                });
            }),
          { rootMargin: "-45% 0px -50% 0px" },
        )
      : null;
  $$("main section").forEach((s) => navObs && navObs.observe(s));
  const rev =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (es) =>
            es.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                rev.unobserve(e.target);
              }
            }),
          { threshold: 0.12 },
        )
      : null;
  $$("[data-reveal]").forEach((el) =>
    rev ? rev.observe(el) : el.classList.add("in"),
  );

  // Formulario de contacto (Formspree)
  const form = $("#form"),
    status = $("#status"),
    btn = $("button[type=submit]", form);
  const MSG = {
    nombre: "Escribe tu nombre.",
    apellido: "Escribe tu apellido.",
    email: "Escribe tu correo electrónico.",
    emailFmt: "Escribe un correo válido, por ejemplo nombre@dominio.com.",
  };
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const setErr = (n, m) => {
    const i = form.elements[n];
    $("#e-" + n).textContent = m;
    i.toggleAttribute("aria-invalid", !!m);
  };
  const show = (t, ok) => {
    status.textContent = t;
    status.dataset.state = ok ? "ok" : "error";
  };

  function validate() {
    let first = null;
    ["nombre", "apellido", "email"].forEach((n) => {
      const v = form.elements[n].value.trim();
      const m = !v
        ? MSG[n]
        : n === "email" && !EMAIL.test(v)
          ? MSG.emailFmt
          : "";
      setErr(n, m);
      if (m && !first) first = form.elements[n];
    });
    if (first) first.focus();
    return !first;
  }
  ["nombre", "apellido", "email"].forEach((n) =>
    form.elements[n].addEventListener("input", () => setErr(n, "")),
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (btn.disabled) return;
    status.textContent = "";
    delete status.dataset.state;
    if (!validate()) return;
    const id = (C.formspreeId || "").trim();
    if (!id || id === "TU_FORM_ID") {
      show(
        "El formulario aún no está configurado: falta el identificador de Formspree.",
        false,
      );
      return;
    }
    btn.disabled = true;
    form.setAttribute("aria-busy", "true");
    btn.classList.add("loading");
    try {
      const data = new FormData(form);
      ["nombre", "apellido", "email"].forEach((n) =>
        data.set(n, form.elements[n].value.trim()),
      );
      const res = await fetch(
        "https://formspree.io/f/" + encodeURIComponent(id),
        { method: "POST", body: data, headers: { Accept: "application/json" } },
      );
      let body = {};
      try {
        body = await res.json();
      } catch (_) {}
      if (res.ok) {
        form.reset();
        show(
          "¡Gracias por contactarme! He recibido tus datos y podré comunicarme contigo.",
          true,
        );
      } else
        show(
          (body.errors && body.errors.map((x) => x.message).join(" ")) ||
            "No se pudo enviar el formulario. Revisa tus datos e inténtalo de nuevo.",
          false,
        );
    } catch (_) {
      show(
        "No se pudo conectar con el servicio. Revisa tu conexión e inténtalo de nuevo; tus datos siguen en el formulario.",
        false,
      );
    } finally {
      btn.disabled = false;
      form.removeAttribute("aria-busy");
      btn.classList.remove("loading");
    }
  });
})();
