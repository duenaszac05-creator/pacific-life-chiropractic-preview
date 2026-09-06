(function () {
  var btn = document.querySelector("[data-menu]");
  var nav = document.querySelector("[data-mobile-nav]");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var spec = { 1: [[8, 12], [15, 18]], 2: [[15, 18]], 3: [[8, 12]], 4: [[15, 18]], 5: [[8, 12]], 6: [[8, 12]], 0: [] };
  var el = document.querySelector("[data-hours-status]");
  if (el) {
    var now = new Date(new Date().toLocaleString("en-US", { timeZone: "Pacific/Guam" }));
    var day = now.getDay();
    var hour = now.getHours() + now.getMinutes() / 60;
    var open = (spec[day] || []).some(function (r) { return hour >= r[0] && hour < r[1]; });
    el.textContent = open ? "Open now. Call to see if a same-day visit is available." : "Currently closed. Request a visit and we will call you back.";
    el.dataset.state = open ? "open" : "closed";
  }

  var form = document.querySelector("[data-lead-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("[name=name]").value.trim();
      var phone = form.querySelector("[name=phone]").value.replace(/\D/g, "");
      var consent = form.querySelector("[name=consent]");
      if (!name || phone.length < 7 || (consent && !consent.checked)) {
        alert("Please add your name, a valid phone number, and consent so the front desk can call you.");
        return;
      }
      var payload = {};
      new FormData(form).forEach(function (v, k) { payload[k] = v; });
      try { localStorage.setItem("plc-lead-demo", JSON.stringify(payload)); } catch (err) {}
      var ok = document.querySelector("[data-form-success]");
      if (ok) { ok.style.display = "block"; form.style.display = "none"; }
    });
  }
})();
