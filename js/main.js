/* ═══════════════════════════════════════════════
   COMFY — Interactions, i18n & animations
   ═══════════════════════════════════════════════ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HAS_GSAP = typeof window.gsap !== "undefined";
  const HAS_ST = typeof window.ScrollTrigger !== "undefined";

  /* ═══════════ i18n ═══════════ */
  const I18N = {
    en: {
      "nav.story": "The Comfy Story",
      "nav.why": "Why Comfy",
      "nav.collection": "Collection",
      "nav.faq": "FAQ",
      "nav.cta": "Sleep Better Tonight",

      "hero.eyebrow": "Handcrafted beds · Since 2016",
      "hero.title1": "Sleep",
      "hero.title2": "like you're",
      "hero.title3": "floating.",
      "hero.sub": "Cloud-soft mattresses wrapped in breathable silk-touch cotton. Engineered with orthopedic support, obsessed with comfort. Your best sleep starts here.",
      "hero.cta1": "Explore the Collection",
      "hero.cta2": "Our Story →",
      "hero.badge1": "★ 2,400+ sleepers",
      "hero.badge2": "nights trial",
      "hero.badge2num": "100",
      "hero.badge3": "Free",
      "hero.badge3b": "white-glove delivery",
      "hero.scroll": "Scroll to dream",

      "featured.eyebrow": "The Comfy Story",
      "featured.title": "We didn't just make a bed. We engineered a feeling.",
      "featured.body1": "Every Comfy bed is built in small batches by craftspeople who treat sleep as an art form. Six precision layers — from a gel-infused cooling core to a silk-touch bamboo cover — work together so your body sinks in and your mind lets go.",
      "featured.body2": "No springs poking you. No night sweats. No 3 a.m. tossing. Just soft, smooth, uninterrupted sleep — the kind you forgot you were capable of.",
      "featured.stat1": "% sleep better",
      "featured.stat2": "happy sleepers",
      "featured.stat3": "min to fall asleep",
      "featured.float": "6 layers of pure coziness",

      "why.eyebrow": "Why Comfy",
      "why.title": "Softness you can feel. Science you can trust.",
      "why.card1.title": "Silk-Touch Softness",
      "why.card1.body": "A bamboo-cotton weave so smooth it feels like sleeping on a cloud. Gentle on skin, kind to allergies.",
      "why.card2.title": "Cool All Night",
      "why.card2.body": "Gel-infused memory foam channels heat away from your body, so you stay at the perfect temperature until sunrise.",
      "why.card3.title": "Orthopedic Support",
      "why.card3.body": "Zoned support aligns your spine while the plush top layer cradles every curve. Wake up without the aches.",
      "why.card4.title": "100-Night Trial",
      "why.card4.body": "Sleep on it for a hundred nights. If it isn't the best bed you've ever owned, we'll pick it up — free.",

      "collection.eyebrow": "The Collection",
      "collection.title": "Pick your cloud.",
      "collection.note": "Every bed ships free, arrives fully assembled, and comes wrapped in organic cotton.",
      "collection.p1.name": "Cloud Nine",
      "collection.p1.price": "$1,290",
      "collection.p1.desc": "Our signature plush-topper. Medium-firm feel, maximum hug.",
      "collection.p1.tag": "Bestseller",
      "collection.p2.name": "Dream Drift",
      "collection.p2.price": "$1,590",
      "collection.p2.desc": "Extra-deep pillow top with cooling gel. Sleeps cool, feels weightless.",
      "collection.p2.tag": "Cooling",
      "collection.p3.name": "Feather Light",
      "collection.p3.price": "$1,890",
      "collection.p3.desc": "Natural latex core, hand-tufted finish. Firm, airy, eternal.",
      "collection.p3.tag": "Natural Latex",

      "layers.eyebrow": "Inside the Comfy",
      "layers.title": "Six layers between you and the best sleep of your life.",
      "layers.chip1": "Silk cover",
      "layers.chip2": "Bamboo weave",
      "layers.chip3": "Gel foam",
      "layers.chip4": "Support core",
      "layers.chip5": "Breathable base",
      "layers.l1.t": "Silk-touch cover",
      "layers.l1.d": "Removable, washable, impossibly smooth.",
      "layers.l2.t": "Bamboo comfort weave",
      "layers.l2.d": "Wicks moisture, stays cool to the touch.",
      "layers.l3.t": "Plush pillow top",
      "layers.l3.d": "The layer your shoulders dream about.",
      "layers.l4.t": "Gel-infused foam",
      "layers.l4.d": "Pulls heat away, all night long.",
      "layers.l5.t": "Zoned support core",
      "layers.l5.d": "Orthopedic zones for spine alignment.",
      "layers.l6.t": "Reinforced base",
      "layers.l6.d": "Sag-proof for the next twenty years.",

      "testi.eyebrow": "Sleeper Stories",
      "testi.title": '"I didn\'t know beds could feel like this."',
      "testi.t1.body": "Three weeks in and my back pain is gone. I fall asleep in what feels like minutes. It's like the bed hugs you back.",
      "testi.t1.name": "Layla M.",
      "testi.t1.role": "Dubai · Cloud Nine",
      "testi.t2.body": "I used to wake up hot every single night. The cooling layer is not marketing — it genuinely works. Best purchase of the year.",
      "testi.t2.name": "Omar K.",
      "testi.t2.role": "Cairo · Dream Drift",
      "testi.t3.body": "The delivery team carried it in, set it up, took the packaging. I climbed in that same night and slept eleven hours. Eleven!",
      "testi.t3.name": "Sara A.",
      "testi.t3.role": "Riyadh · Feather Light",

      "band.title": "Tonight could be the best sleep you've had in years.",
      "band.cta": "Claim Your 100 Nights",

      "faq.eyebrow": "Questions",
      "faq.title": "Everything you're wondering.",
      "faq.q1": "How does the 100-night trial work?",
      "faq.a1": "Sleep on your new bed for a hundred nights. If you don't love it, we'll arrange a free pickup and refund you in full — no questions, no restocking fees.",
      "faq.q2": "Is delivery really free?",
      "faq.a2": "Yes. Everywhere we deliver. Our team brings it to your bedroom, assembles it, and takes all the packaging with them.",
      "faq.q3": "Which firmness should I choose?",
      "faq.a3": "Side sleepers love Cloud Nine's plush top. Back sleepers thrive on Feather Light's natural latex. Dream Drift sits in the middle — and cools down hot sleepers.",
      "faq.q4": "How do I clean it?",
      "faq.a4": "The cover unzips and machine-washes cold. The core only needs airing out in the sun a couple of times a year.",

      "cta.title": "Your best sleep<br>starts tonight.",
      "cta.sub": "Join 2,400+ sleepers. Free delivery, 100-night trial, zero risk.",
      "cta.placeholder": "your@email.com",
      "cta.button": "Start Sleeping Better",
      "cta.ok": "Welcome to Comfy. Dream big tonight.",
      "cta.bad": "Please enter a valid email address.",
      "cta.label": "View",

      "footer.shop": "Shop",
      "footer.company": "Company",
      "footer.support": "Support",
      "footer.contact": "Contact us",
      "footer.trial": "100-night trial",
      "footer.rights": "© 2026 Comfy Sleep Co. Sleep well.",
      "footer.made": "Made for dreamers ✦",
    },

    ar: {
      "nav.story": "قصتنا",
      "nav.why": "لماذا Comfy",
      "nav.collection": "المجموعة",
      "nav.faq": "أسئلة شائعة",
      "nav.cta": "نم أفضل الليلة",

      "hero.eyebrow": "أسرّة مصنوعة يدوياً · منذ ٢٠١٦",
      "hero.title1": "انَمْ",
      "hero.title2": "كأنك",
      "hero.title3": "تطفو.",
      "hero.sub": "مراتب ناعمة كالسحاب ملفوفة بقطن حريري يسمح بالتهوية. مصممة بدعم طبوغرافي، ومبنية على هوس واحد: راحتك. أفضل نوم لك يبدأ من هنا.",
      "hero.cta1": "استكشف المجموعة",
      "hero.cta2": "قصتنا ←",
      "hero.badge1": "★ أكثر من ٢٤٠٠ نائم",
      "hero.badge2": "ليلة تجربة",
      "hero.badge2num": "١٠٠",
      "hero.badge3": "توصيل",
      "hero.badge3b": "مجاني باب المنزل",
      "hero.scroll": "انزل لتحلم",

      "featured.eyebrow": "قصتنا",
      "featured.title": "لم نصنع سريراً عادياً. لقد صمّمنا إحساساً.",
      "featured.body1": "كل سرير Comfy يُصنع بكميات صغيرة على يد حرفيين treats النوم كفن. ست طبقات دقيقة — من نواة تبريد بالجيل إلى غلاف خيزران يلمس كالحرير — تعمل معاً ليهدأ جسدك وينطلق عقلك.",
      "featured.body2": "لا نوابض تؤذيك. لا تعرّق ليلي. لا تقلّب في الثالثة فجراً. فقط نوم هادئ ناعم متواصل — من النوع الذي نسيت أنك قادر عليه.",
      "featured.stat1": "ينامون أفضل",
      "featured.stat2": "نائم سعيد",
      "featured.stat3": "دقيقة حتى النوم",
      "featured.float": "٦ طبقات من الدفء",

      "why.eyebrow": "لماذا Comfy",
      "why.title": "نعومة تحسّها. علم تثق به.",
      "why.card1.title": "نعومة كالحرير",
      "why.card1.body": "نسيج من الخيزران والقطن ناعم لدرجة أنك تحس أنك تنام على سحابة. لطيف على البشرة، وآمن لمن يعاني الحساسية.",
      "why.card2.title": "برودة طول الليل",
      "why.card2.body": "إسفنج ذاكرة مشبّع بالجيل يبعد الحرارة عن جسدك، لتبقى على الدرجة المثالية حتى الشروق.",
      "why.card3.title": "دعم طبوغرافي",
      "why.card3.body": "مناطق دعم مخصصة توازن عمودك الفقري بينما تحتضن الطبقة العلوية كل منحنى. استيقظ بلا آلام.",
      "why.card4.title": "تجربة ١٠٠ ليلة",
      "why.card4.body": "نم عليه مئة ليلة. وإن لم يكن أفضل سرير امتلكته، سنستعيده مجاناً.",

      "collection.eyebrow": "المجموعة",
      "collection.title": "اختر سحابتك.",
      "collection.note": "كل سرير يُوصل مجاناً، ويصل جاهزاً، ومغلّف بقطن عضوي.",
      "collection.p1.name": "كلاود ناين",
      "collection.p1.price": "$1,290",
      "collection.p1.desc": "طبقة علوية فخمة بملمس متوسط. عناق بأقصى درجة.",
      "collection.p1.tag": "الأكثر مبيعاً",
      "collection.p2.name": "دريم دريفت",
      "collection.p2.price": "$1,590",
      "collection.p2.desc": "وسادة عميقة إضافية مع جل تبريد. بارد كالسحاب.",
      "collection.p2.tag": "تبريد",
      "collection.p3.name": "فيذر لايت",
      "collection.p3.price": "$1,890",
      "collection.p3.desc": "نواة لاتكس طبيعي وتفاصيل مخيطة يدوياً. متين ومنعش للأبد.",
      "collection.p3.tag": "لاتكس طبيعي",

      "layers.eyebrow": "داخل Comfy",
      "layers.title": "ست طبقات بينك وبين أفضل نوم في حياتك.",
      "layers.chip1": "غلاف حريري",
      "layers.chip2": "نسيج خيزران",
      "layers.chip3": "إسفنج الجيل",
      "layers.chip4": "نواة الدعم",
      "layers.chip5": "قاعدة تتنفس",
      "layers.l1.t": "غلاف ملمس الحرير",
      "layers.l1.d": "قابل للفصل والغسل، وناعم بشكل لا يصدق.",
      "layers.l2.t": "نسيج الخيزران المريح",
      "layers.l2.d": "يسحب الرطوبة ويبقى بارداً عند اللمس.",
      "layers.l3.t": "وسادة علوية فخمة",
      "layers.l3.d": "الطبقة التي تحلم بها أكتافك.",
      "layers.l4.t": "إسفنج مشبع بالجيل",
      "layers.l4.d": "يبعد الحرارة، طول الليل.",
      "layers.l5.t": "نواة دعم بمناطق",
      "layers.l5.d": "مناطق طبوغرافية لاستقامة العمود الفقري.",
      "layers.l6.t": "قاعدة معززة",
      "layers.l6.d": "لا تهبط طوال عشرين عاماً.",

      "testi.eyebrow": "قصص النائمين",
      "testi.title": "«لم أكن أعرف أن الأسرّة يمكن أن تكون هكذا.»",
      "testi.t1.body": "بعد ثلاثة أسابيع اختفى ألم ظهري. أنام في دقائق معدودة. كأن السرير يعانقك.",
      "testi.t1.name": "ليلى م.",
      "testi.t1.role": "دبي · كلاود ناين",
      "testi.t2.body": "كنت أستيقظ حاراً كل ليلة. طبقة التبريد ليست دعاية — إنها تعمل فعلاً. أفضل شراء هذا العام.",
      "testi.t2.name": "عمر ك.",
      "testi.t2.role": "القاهرة · دريم دريفت",
      "testi.t3.body": "حملها فريق التوصيل للداخل، وركّبوها، وأخذوا التغليف. نمت تلك الليلة إحدى عشرة ساعة. إحدى عشرة!",
      "testi.t3.name": "سارة أ.",
      "testi.t3.role": "الرياض · فيذر لايت",

      "band.title": "الليلة يمكن أن تكون أفضل نوم نمته منذ سنوات.",
      "band.cta": "احجز مئة ليلتك",

      "faq.eyebrow": "أسئلة",
      "faq.title": "كل ما يدور في بالك.",
      "faq.q1": "كيف تعمل تجربة الـ١٠٠ ليلة؟",
      "faq.a1": "نم على سريرك الجديد مئة ليلة. وإن لم تحبه، نرتب استلامه مجاناً ونعيد لك المبلغ كاملاً — بلا أسئلة ولا رسوم.",
      "faq.q2": "هل التوصيل مجاني فعلاً؟",
      "faq.a2": "نعم، في كل مكان نوصل إليه. يحضره فريقنا لغرفة نومك، ويركّبه، ويأخذ معه كل التغليف.",
      "faq.q3": "أي درجة صلابة أختار؟",
      "faq.a3": "من ينامون على الجانب يعشقون طبقة كلاود ناين الفخمة. ومن ينامون على الظهر يناسبهم لاتكس فيذر لايت الطبيعي. دريم دريفت في الوسط — ويبرد النائمين كثيري الحرارة.",
      "faq.q4": "كيف أنظفه؟",
      "faq.a4": "الغشاء الخارجي يُفتح ويُغسل في الغسالة على البارد. النواة تحتاج فقط للتهوية في الشمس مرتين سنوياً.",

      "cta.title": "أفضل نوم لك<br>يبدأ الليلة.",
      "cta.sub": "انضم لأكثر من ٢٤٠٠ نائم. توصيل مجاني، تجربة ١٠٠ ليلة، بلا مخاطرة.",
      "cta.placeholder": "أدخل بريدك الإلكتروني",
      "cta.button": "ابدأ النوم الأفضل",
      "cta.ok": "أهلاً بك في Comfy. أحلاماً سعيدة الليلة.",
      "cta.bad": "الرجاء إدخال بريد إلكتروني صحيح.",
      "cta.label": "عرض",

      "footer.shop": "تسوّق",
      "footer.company": "الشركة",
      "footer.support": "الدعم",
      "footer.contact": "تواصل معنا",
      "footer.trial": "تجربة ١٠٠ ليلة",
      "footer.rights": "© ٢٠٢٦ Comfy Sleep Co. أنم بسلام.",
      "footer.made": "صُنع لأصحاب الأحلام ✦",
    },
  };

  let lang = localStorage.getItem("comfy-lang") || "en";

  function applyLang(l) {
    lang = l;
    const dict = I18N[l];
    const html = document.documentElement;
    html.lang = l;
    html.dir = l === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    const active = document.getElementById("lang-active");
    const other = document.getElementById("lang-other");
    if (active && other) {
      if (l === "ar") {
        active.textContent = "EN";
        other.textContent = "ع";
      } else {
        active.textContent = "ع";
        other.textContent = "EN";
      }
    }

    localStorage.setItem("comfy-lang", l);
    // keep open FAQ answers sized correctly after text swap
    document.querySelectorAll(".faq-item.is-open .faq-item__a").forEach((a) => {
      a.style.maxHeight = a.scrollHeight + "px";
    });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    applyLang(lang === "en" ? "ar" : "en");
  });

  /* ═══════════ Smooth scroll (Lenis) ═══════════ */
  let lenis = null;
  if (!prefersReduced && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    if (window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
    }
    if (window.gsap) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ═══════════ Preloader + hero intro ═══════════ */
  const preloader = document.getElementById("preloader");
  const preCount = document.getElementById("preloader-count");
  const preFill = document.getElementById("preloader-fill");

  const progress = { v: 0 };
  const introTl = () => {
    const tl = gsap.timeline();
    tl.to(".hero__eyebrow span", { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, 0.1)
      .from(".hero__title .line > *", {
        yPercent: 115, duration: 1.25, ease: "power4.out", stagger: 0.09,
      }, 0.25)
      .from(".hero__sub", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, 0.8)
      .from(".hero__ctas .btn", { y: 26, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0.95)
      .from(".hero__badge", { y: 40, opacity: 0, scale: 0.85, duration: 0.9, ease: "back.out(1.6)", stagger: 0.12 }, 1.1)
      .from(".hero__scroll", { opacity: 0, duration: 0.8 }, 1.5);
    return tl;
  };

  let started = false;
  function startSite() {
    if (started) return;
    started = true;

    if (!HAS_GSAP) {
      preloader?.remove();
      buildScrollAnims();
      return;
    }

    gsap.to(progress, {
      v: 100, duration: prefersReduced ? 0.01 : 1.5, ease: "power2.inOut",
      onUpdate() {
        const v = Math.round(progress.v);
        if (preCount) preCount.textContent = v;
        if (preFill) preFill.style.width = v + "%";
      },
      onComplete() {
        gsap.to(preloader, {
          yPercent: -100, duration: 0.9, ease: "power4.inOut",
          onComplete() { preloader?.remove(); },
        });
        introTl();
        buildScrollAnims();
      },
    });
  }

  // initial states (only meaningful when GSAP is available)
  if (HAS_GSAP) {
    gsap.set(".hero__eyebrow span", { y: 40, opacity: 0 });
    gsap.set(".hero__badge", { opacity: 0 });
    gsap.set(".hero__sub, .hero__ctas .btn, .hero__scroll", { opacity: 0 });
  }

  if (document.readyState === "complete") startSite();
  else window.addEventListener("load", startSite);
  setTimeout(startSite, 3500); // safety net

  /* ═══════════ Scroll animations ═══════════ */
  function buildScrollAnims() {
    if (!HAS_GSAP) return; // CSS fallback keeps everything visible

    if (prefersReduced || !HAS_ST) {
      gsap.set("[data-anim], .reveal-up, .reveal-fade", { opacity: 1, y: 0 });
      document.querySelectorAll(".parallax-img").forEach((img) => gsap.set(img, { yPercent: 0 }));
      return;
    }

    // Generic fade-ups
    gsap.utils.toArray(
      ".section-eyebrow, .section-title, .section-body, .collection__note, .cta__title, .cta__sub, .band__content h2"
    ).forEach((el) => {
      gsap.from(el, {
        y: 56, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
    });

    // Why cards
    gsap.from(".why__card", {
      y: 70, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: ".why__grid", start: "top 82%", once: true },
    });

    // Products
    gsap.utils.toArray(".product").forEach((p, i) => {
      gsap.from(p, {
        y: 90, opacity: 0, duration: 1.1, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: ".collection__grid", start: "top 84%", once: true },
      });
    });

    // Layer list rows
    gsap.from(".layers__list li", {
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: ".layers__list", start: "top 84%", once: true },
    });

    // Layer chips
    gsap.from(".layers__chips span", {
      x: 40, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: ".layers", start: "top 70%", once: true },
    });

    // Testimonials
    gsap.from(".testi-card", {
      y: 70, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.14,
      scrollTrigger: { trigger: ".testimonials__grid", start: "top 84%", once: true },
    });

    // FAQ items
    gsap.from(".faq-item", {
      y: 34, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08,
      scrollTrigger: { trigger: ".faq__list", start: "top 86%", once: true },
    });

    // Marquee slide-in
    gsap.from(".marquee", {
      y: 60, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".marquee", start: "top 95%", once: true },
    });

    // Featured image mask reveal
    gsap.from(".featured__img-wrap", {
      clipPath: "inset(14% 14% 14% 14% round 48px)", duration: 1.4, ease: "power4.out",
      scrollTrigger: { trigger: ".featured", start: "top 72%", once: true },
    });

    // Band & CTA image zoom
    gsap.fromTo(".band__bg img, .cta__bg img",
      { scale: 1.18 },
      { scale: 1, ease: "none",
        scrollTrigger: { trigger: ".band, .cta", start: "top bottom", end: "bottom top", scrub: true } });

    // Parallax images
    gsap.utils.toArray(".parallax-img").forEach((img) => {
      const speed = parseFloat(img.closest("[data-speed]")?.dataset.speed || "0.15");
      gsap.fromTo(img,
        { yPercent: -speed * 40 },
        { yPercent: speed * 40, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // Hero badges parallax + hero content fade on scroll
    gsap.utils.toArray(".hero__badge").forEach((b) => {
      const sp = parseFloat(b.dataset.speed || "0.4");
      gsap.to(b, {
        y: -160 * sp, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    });
    gsap.to(".hero__content", {
      y: -90, opacity: 0.15, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    // Section title char-ish emphasis on enter (subtle)
    gsap.utils.toArray(".section-title").forEach((t) => {
      gsap.fromTo(t, { letterSpacing: "-0.06em" }, {
        letterSpacing: "-0.025em", duration: 1.6, ease: "power2.out",
        scrollTrigger: { trigger: t, start: "top 85%", once: true },
      });
    });
  }

  /* ═══════════ Counters ═══════════ */
  document.querySelectorAll(".counter").forEach((el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const isArabic = () => lang === "ar";
    const fmt = (n) => (isArabic() ? n.toLocaleString("ar-EG") : n.toLocaleString("en-US")) + suffix;
    const obj = { v: 0 };
    let done = false;
    const run = () => {
      done = true;
      if (!HAS_GSAP) { el.textContent = fmt(target); return; }
      gsap.to(obj, {
        v: target, duration: 2, ease: "power2.out",
        onUpdate() { el.textContent = fmt(Math.round(obj.v)); },
      });
    };
    if (HAS_ST) {
      ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: run });
    } else run();
    // refresh number formatting on language switch
    document.getElementById("lang-toggle")?.addEventListener("click", () => {
      if (done) el.textContent = fmt(target);
    });
  });

  /* ═══════════ Nav behavior ═══════════ */
  const nav = document.getElementById("nav");
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("is-solid", y > 60);
    if (y > 240 && y > lastY + 4) nav?.classList.add("is-hidden");
    else if (y < lastY - 4 || y < 240) nav?.classList.remove("is-hidden");
    lastY = y;

    const h = document.documentElement;
    const pct = (y / (h.scrollHeight - h.clientHeight)) * 100;
    const bar = document.getElementById("progress");
    if (bar) bar.style.width = Math.min(pct, 100) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ═══════════ Burger menu ═══════════ */
  const burger = document.getElementById("burger");
  const overlay = document.getElementById("menu-overlay");
  function closeMenu() {
    burger?.classList.remove("is-open");
    overlay?.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    if (lenis) lenis.start();
  }
  burger?.addEventListener("click", () => {
    const open = overlay.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    document.body.classList.toggle("no-scroll", open);
    if (open) lenis?.stop(); else lenis?.start();
  });

  /* ═══════════ FAQ accordion ═══════════ */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-item__q");
    const a = item.querySelector(".faq-item__a");
    q?.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((o) => {
        o.classList.remove("is-open");
        o.querySelector(".faq-item__a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ═══════════ Custom cursor ═══════════ */
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursor-dot");
  const label = document.getElementById("cursor-label");
  if (cursor && dot && window.matchMedia("(hover: hover)").matches) {
    let mx = -100, my = -100, cx = -100, cy = -100;
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll("[data-cursor]").forEach((el) => {
      const mode = el.dataset.cursor;
      el.addEventListener("pointerenter", () => {
        cursor.classList.add(mode === "view" ? "is-view" : "is-hover");
        if (mode === "view" && label) label.textContent = I18N[lang]["cta.label"];
      });
      el.addEventListener("pointerleave", () => {
        cursor.classList.remove("is-hover", "is-view");
      });
    });
  }

  /* ═══════════ Magnetic buttons + tilt (GSAP only) ═══════════ */
  if (HAS_GSAP && !prefersReduced) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(el, { x: x * 0.28, y: y * 0.32, duration: 0.4, ease: "power3.out" });
      });
      el.addEventListener("pointerleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      });
    });

    /* ═══════════ 3D tilt cards ═══════════ */
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotationY: px * 7, rotationX: -py * 7,
          transformPerspective: 900,
          duration: 0.5, ease: "power2.out",
        });
      });
      card.addEventListener("pointerleave", () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
      });
    });
  }

  /* ═══════════ CTA form ═══════════ */
  const form = document.getElementById("cta-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("cta-email");
    const msg = document.getElementById("cta-msg");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
    msg.classList.toggle("is-error", !valid);
    msg.textContent = valid ? I18N[lang]["cta.ok"] : I18N[lang]["cta.bad"];
    if (valid) {
      if (HAS_GSAP) gsap.fromTo(msg, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
      input.value = "";
    } else if (HAS_GSAP) {
      gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    }
  });

  /* ═══════════ Font load refresh ═══════════ */
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => window.ScrollTrigger && ScrollTrigger.refresh());
  }

  /* ═══════════ Init language ═══════════ */
  applyLang(lang);
})();
