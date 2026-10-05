"use strict";

// Phones (480px and below) get the black notice from index.html is shown and nothing here runs.
(() => {
  const narrowScreen = window.matchMedia("(max-width: 480px)");
  if (narrowScreen.matches) {
    narrowScreen.addEventListener("change", (e) => {
      if (!e.matches) location.reload();
    });
    return;
  }

  // ---------------------------------------------------------------------------
  // Shared helpers
  // ---------------------------------------------------------------------------

  // Card colors shared by the Career and Projects sections.
  const PALETTE = ["#495E57", "#7b527a", "#97775a", "#458393", "#704a52"];

  // Picks dark or light text depending on how bright the background is.
  const getTextColor = (hex) => {
    const h = hex.slice(1);
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#141414" : "#FFFDF8";
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  // Libraries that are only needed by one section are fetched when that section gets close.
  const LIBS = {
    bootstrap:
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/js/bootstrap.bundle.min.js",
    swiperJs: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
    swiperCss: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
    emailjs:
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
  };

  const loaded = new Map();
  const loadOnce = (key, create) => {
    if (!loaded.has(key)) {
      loaded.set(
        key,
        new Promise((resolve, reject) => {
          const el = create();
          el.onload = resolve;
          el.onerror = () => {
            loaded.delete(key);
            reject(new Error("Failed to load " + key));
          };
          document.head.appendChild(el);
        }),
      );
    }
    return loaded.get(key);
  };

  const loadScript = (src) =>
    loadOnce(src, () => {
      const script = document.createElement("script");
      script.src = src;
      return script;
    });

  const loadStyle = (href) =>
    loadOnce(href, () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      return link;
    });

  // Runs `fn` when the browser has nothing better to do.
  const idle = (fn) =>
    "requestIdleCallback" in window
      ? requestIdleCallback(fn, { timeout: 2000 })
      : setTimeout(fn, 200);

  // Runs `run` once, the first time `el` gets within `margin` of the viewport.
  const whenNear = (el, run, margin = "1000px") => {
    if (!("IntersectionObserver" in window)) return run();
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      { rootMargin: margin },
    );
    observer.observe(el);
  };

  // Draws a white outline around the shape of a PNG (used by stickers and collectibles).
  // Falls back to the plain image if it can't be loaded or the canvas is blocked.
  const addContourBorder = (src, size, borderPx, extraPad) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onerror = () => resolve(src);
      img.onload = () => {
        try {
          const pad = borderPx + extraPad;
          const scale = Math.min(
            (size - pad * 2) / img.width,
            (size - pad * 2) / img.height,
          );
          const dw = img.width * scale;
          const dh = img.height * scale;
          const dx = (size - dw) / 2;
          const dy = (size - dh) / 2;

          const out = document.createElement("canvas");
          out.width = size;
          out.height = size;
          const ctx = out.getContext("2d");

          const tmp = document.createElement("canvas");
          tmp.width = size;
          tmp.height = size;
          const tctx = tmp.getContext("2d");
          tctx.drawImage(img, dx, dy, dw, dh);
          tctx.globalCompositeOperation = "source-in";
          tctx.fillStyle = "#fff";
          tctx.fillRect(0, 0, size, size);

          const steps = 28;
          for (let i = 0; i < steps; i++) {
            const a = (i / steps) * Math.PI * 2;
            ctx.drawImage(tmp, Math.cos(a) * borderPx, Math.sin(a) * borderPx);
          }
          ctx.drawImage(img, dx, dy, dw, dh);
          resolve(out.toDataURL());
        } catch {
          resolve(src);
        }
      };
      img.src = src;
    });

  // ---------------------------------------------------------------------------
  // Head Section
  // ---------------------------------------------------------------------------
  {
    const texts = [
      "Software Engineer",
      "Mern Stack Developer",
      "Data Scientist",
      "Data Analyst",
      "Machine Learning Engineer",
      "AI Engineer",
      "Problem Solver",
      "Competitive Programmer",
      "Critical Thinker",
      "Freelancer",
      "Video Editor",
      "Passionate Person",
      "Knowledge Seeker",
    ];

    const typed = document.getElementById("typed-text");
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (async () => {
      for (let i = 0; ; i = (i + 1) % texts.length) {
        for (const char of texts[i]) {
          await sleep(200);
          typed.textContent += char;
        }
        await sleep(1000);
        while (typed.textContent) {
          await sleep(50);
          typed.textContent = typed.textContent.slice(0, -1);
        }
      }
    })();

    // Scroll progress ring / back-to-top button
    const progressWrap = document.querySelector(".progress-wrap");
    const progressPath = progressWrap.querySelector("path");
    const pathLength = progressPath.getTotalLength();
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;

    let progressQueued = false;
    const updateProgress = () => {
      progressQueued = false;
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      progressPath.style.strokeDashoffset =
        pathLength - (scroll * pathLength) / height;
      progressWrap.classList.toggle("active-progress", scroll > 50);
    };
    window.addEventListener(
      "scroll",
      () => {
        if (progressQueued) return;
        progressQueued = true;
        requestAnimationFrame(updateProgress);
      },
      { passive: true },
    );
    progressWrap.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
    requestAnimationFrame(updateProgress);
  }

  // ---------------------------------------------------------------------------
  // Music Player (built when the browser is idle, it is not needed for the first paint)
  // ---------------------------------------------------------------------------
  idle(() => {
    const songs = [
      {
        name: "Billie Jean",
        artist: "Michael Jackson",
        cover:
          "https://pure-music.co.uk/wp-content/uploads/2019/04/Thriller-Album-Cover.png",
        src: "./Assets/Audios/Billie Jean - Michael Jackson.mp3",
      },
      {
        name: "E.T.",
        artist: "Katy Perry",
        cover:
          "https://i1.sndcdn.com/artworks-000169037769-5mo3ib-t1080x1080.jpg",
        src: "./Assets/Audios/E.T. - Katy Perry.mp3",
      },
      {
        name: "Peligrosa",
        artist: "FloyyMenor",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273d0495d03671b5d9a365db8f5",
        src: "./Assets/Audios/FloyyMenor - Peligrosa (Video Oficial).mp3",
      },
      {
        name: "Godzilla",
        artist: "Eminem ft. Juice WRLD",
        cover:
          "https://i1.sndcdn.com/artworks-Lz01ANT1WOPlkpio-HwHc7w-t1080x1080.jpg",
        src: "./Assets/Audios/Godzilla _feat. Juice WRLD_ - Eminem.mp3",
      },
      {
        name: "Heathens",
        artist: "Twenty One Pilots",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2732ca3ba8f334ca5a5f0312efb",
        src: "./Assets/Audios/Heathens - Twenty One Pilots.mp3",
      },
      {
        name: "HOLIDAY",
        artist: "Lil Nas X",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2736771a05f34d77e5fc2bde64c",
        src: "./Assets/Audios/HOLIDAY - Lil Nas X.mp3",
      },
      {
        name: "Hope",
        artist: "XXXTENTACION",
        cover:
          "https://cdn-images.dzcdn.net/images/cover/9b6da786cd3ca8b286a04186b3c9079c/500x500.jpg",
        src: "./Assets/Audios/Hope - XXXTENTACION.mp3",
      },
      {
        name: "Soldiers Eyes",
        artist: "Jack Savoretti",
        cover:
          "https://i.scdn.co/image/ab67616d0000b27319bf288d054797b8ce1dd428",
        src: "./Assets/Audios/Jack Savoretti - Soldiers Eyes (Sons of Anarchy).mp3",
      },
      {
        name: "Algo Como Tu",
        artist: "Kaydy Cain",
        cover:
          "https://i.scdn.co/image/ab67616d0000b27374b027d613b42163780513dc",
        src: "./Assets/Audios/Kaydy Cain - Algo Como Tu (Video Oficial).mp3",
      },
      {
        name: "This Fire Burns",
        artist: "Killswitch Engage",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273cc5bb1a3f809896baf67dba4",
        src: "./Assets/Audios/Killswitch Engage - This Fire Burns (HQ).mp3",
      },
      {
        name: "Life is a Highway",
        artist: "Rascal Flatts",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2732ec371a4817eb63da77b1996",
        src: "./Assets/Audios/Life is a Highway.mp3",
      },
      {
        name: "Industry Baby",
        artist: "Lil Nas X ft. Jack Harlow",
        cover:
          "https://static.wikia.nocookie.net/lilnasx/images/8/89/IndustryBabyAlternative.jpg/revision/latest?cb=20211012102258",
        src: "./Assets/Audios/Lil Nas X - Industry Baby ft. Jack Harlow.mp3",
      },
      {
        name: "Old Town Road",
        artist: "Lil Nas X ft. Billy Ray Cyrus",
        cover:
          "https://media.gq.com/photos/5cdeef0e1f8a4e271cddab8d/1:1/w_689,h_689,c_limit/Old-Town-Road-Video-GQ-2019-051719.jpg",
        src: "./Assets/Audios/Lil Nas X - Old Town Road (Official Video) ft. Billy Ray Cyrus.mp3",
      },
      {
        name: "Lose My Mind",
        artist: "Don Toliver ft. Doja Cat",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273d4c0243b55cdf7394323e710",
        src: "./Assets/Audios/Lose My Mind _feat. Doja Cat_ _From F1_ The Movie_ - Don Toliver.mp3",
      },
      {
        name: "Take What You Want",
        artist: "Post Malone ft. Ozzy Osbourne",
        cover:
          "https://images.genius.com/e5ff99bdbe52cdb142ac91fad7b79a5e.822x822x1.jpg",
        src: "./Assets/Audios/Post Malone - Take What You Want (Audio) ft. Ozzy.mp3",
      },
      {
        name: "Go With The Flow",
        artist: "Queens Of The Stone Age",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2739b62c36a1f8ac00d60f460cc",
        src: "./Assets/Audios/Queens Of The Stone Age - Go With The Flow.mp3",
      },
      {
        name: "Real Gone",
        artist: "Sheryl Crow",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2732ec371a4817eb63da77b1996",
        src: "./Assets/Audios/Real Gone - Sheryl Crow.mp3",
      },
      {
        name: "Where Have You Been",
        artist: "Rihanna",
        cover:
          "https://i.scdn.co/image/ab67616d0000b27323afa210dfbdb55703bb97fd",
        src: "./Assets/Audios/Rihanna - Where Have You Been.mp3",
      },
      {
        name: "rockstar",
        artist: "Post Malone ft. 21 Savage",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273d3884f06c92d826ecd87a319",
        src: "./Assets/Audios/rockstar _feat. 21 Savage_ - Post Malone.mp3",
      },
      {
        name: "Self Control",
        artist: "Laura Branigan",
        cover:
          "https://images.genius.com/7d7357942cd36448ff62324f722413f2.600x599x1.png",
        src: "./Assets/Audios/Self Control - Laura Branigan.mp3",
      },
      {
        name: "Superman",
        artist: "Eminem",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
        src: "./Assets/Audios/Superman - Eminem.mp3",
      },
      {
        name: "THE SCOTTS",
        artist: "THE SCOTTS, Travis Scott, Kid Cudi",
        cover:
          "https://i.scdn.co/image/ab67616d0000b27309db38c6c41528684f6ca6a7",
        src: "./Assets/Audios/THE SCOTTS_ Travis Scott_ Kid Cudi - THE SCOTTS .mp3",
      },
      {
        name: "Save Your Tears",
        artist: "The Weeknd",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273c6af5ffa661a365b77df6ef6",
        src: "./Assets/Audios/The Weeknd - Save Your Tears (Official Audio).mp3",
      },
      {
        name: "Till I Collapse",
        artist: "Eminem",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
        src: "./Assets/Audios/Till I Collapse - Eminem.mp3",
      },
      {
        name: "Too Many Nights",
        artist: "Metro Boomin ft. Don Toliver, Future",
        cover: "https://i1.sndcdn.com/artworks-SHc2jKeSx731-0-t500x500.jpg",
        src: "./Assets/Audios/Too Many Nights _feat. Don Toliver _ with Future_ - Metro Boomin.mp3",
      },
      {
        name: "BUTTERFLY EFFECT",
        artist: "Travis Scott",
        cover:
          "https://i1.sndcdn.com/artworks-AteYKQAUrh4vLE4n-pOmoTA-t1080x1080.jpg",
        src: "./Assets/Audios/Travis Scott - BUTTERFLY EFFECT (Official Music Video).mp3",
      },
      {
        name: "FE!N",
        artist: "Travis Scott ft. Playboi Carti",
        cover:
          "https://i.scdn.co/image/ab67616d00001e02d3b5affd8824b4ed301b7137",
        src: "./Assets/Audios/Travis Scott - FE_N (Official Audio) ft. Playboi Carti.mp3",
      },
      {
        name: "goosebumps",
        artist: "Travis Scott ft. Kendrick Lamar",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2738752a7355996e64709247c53",
        src: "./Assets/Audios/Travis Scott - goosebumps ft. Kendrick Lamar.mp3",
      },
      {
        name: "HIGHEST IN THE ROOM",
        artist: "Travis Scott",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273e42b5fea4ac4c3d6328b622b",
        src: "./Assets/Audios/Travis Scott - HIGHEST IN THE ROOM (Official Music).mp3",
      },
      {
        name: "SICKO MODE",
        artist: "Travis Scott ft. Drake",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3",
        src: "./Assets/Audios/Travis Scott - SICKO MODE (Official Audio).mp3",
      },
      {
        name: "STARGAZING",
        artist: "Travis Scott",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273daec894c14c0ca42d76eeb32",
        src: "./Assets/Audios/Travis Scott - STARGAZING (Audio).mp3",
      },
      {
        name: "TELESCOPE",
        artist: "TWXN",
        cover:
          "https://i.scdn.co/image/ab67616d0000b273fd23a2820df48e9533a92222",
        src: "./Assets/Audios/TWXN - TELESCOPE (Official Music Video) dir _twxn.mp3",
      },
      {
        name: "Without Me",
        artist: "Eminem",
        cover:
          "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
        src: "./Assets/Audios/Without Me - Eminem.mp3",
      },
      {
        name: "BAD!",
        artist: "XXXTENTACION",
        cover:
          "https://images.genius.com/8b673f80818e4cc1b975e8d8cd81344c.1000x1000x1.png",
        src: "./Assets/Audios/XXXTENTACION - BAD.mp3",
      },
      {
        name: "MOONLIGHT",
        artist: "XXXTENTACION",
        cover:
          "https://images.genius.com/8b673f80818e4cc1b975e8d8cd81344c.1000x1000x1.png",
        src: "./Assets/Audios/XXXTENTACION - MOONLIGHT.mp3",
      },
    ];

    function formatTime(sec) {
      if (!isFinite(sec) || sec < 0) return "0:00";
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s.toString().padStart(2, "0")}`;
    }

    const PLAY_ICON =
      '<svg class="ico" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    const PAUSE_ICON =
      '<svg class="ico" viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
    const VOL_ICON =
      '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4.03v8.06A4.5 4.5 0 0016.5 12zM14 3.23v2.06c3.39.98 6 4.03 6 7.71s-2.61 6.73-6 7.71v2.06c4.5-1.01 8-5.09 8-9.77s-3.5-8.76-8-9.77z"/>';
    const MUTE_ICON =
      '<path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';

    const els = {
      fab: document.getElementById("musicFab"),
      fabArt: document.getElementById("fabArt"),
      panel: document.getElementById("musicPanel"),
      panelCover: document.getElementById("panelCover"),
      panelTitle: document.getElementById("panelTitle"),
      panelArtist: document.getElementById("panelArtist"),
      panelList: document.getElementById("panelList"),
      playBtn: document.getElementById("playBtn"),
      prevBtn: document.getElementById("prevBtn"),
      nextBtn: document.getElementById("nextBtn"),
      shuffleBtn: document.getElementById("shuffleBtn"),
      muteBtn: document.getElementById("muteBtn"),
      volIcon: document.getElementById("volIcon"),
      notice: document.getElementById("notice"),
      curTime: document.getElementById("curTime"),
      durTime: document.getElementById("durTime"),
      ptrack: document.getElementById("ptrack"),
      pfill: document.getElementById("pfill"),
      phandle: document.getElementById("phandle"),
      volTrack: document.getElementById("volTrack"),
      volFill: document.getElementById("volFill"),
      volHandle: document.getElementById("volHandle"),
      audio: document.getElementById("audio"),
    };

    let currentIndex = 0;
    let isPlaying = false;
    let volume = 0.85;
    let lastVolume = 0.85;
    let isMuted = false;
    let shuffleMode = false;
    let durations = {};
    let panelOpen = false;

    // ---------- Panel open/close (never touches audio) ----------
    function openPanel() {
      panelOpen = true;
      els.panel.classList.add("open");
      els.fab.setAttribute("aria-expanded", "true");
      prefetchDurations();
    }
    function closePanel() {
      panelOpen = false;
      els.panel.classList.remove("open");
      els.fab.setAttribute("aria-expanded", "false");
    }
    els.fab.addEventListener("click", (e) => {
      e.stopPropagation();
      if (panelOpen) closePanel();
      else openPanel();
    });
    els.panel.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", () => {
      if (panelOpen) closePanel();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panelOpen) closePanel();
    });

    // ---------- Playlist ----------
    function renderRows() {
      els.panelList.innerHTML = "";
      songs.forEach((song, i) => {
        const row = document.createElement("div");
        row.className = "track-row";
        row.tabIndex = 0;
        row.dataset.index = i;
        row.innerHTML = `
        <div class="idx-cell">
          <span class="idx-num">${i + 1}</span>
          <span class="idx-icon">${PLAY_ICON}</span>
        </div>
        <div class="track-cell">
          <div class="thumb" style="background-image:url('${song.cover}')"></div>
          <div class="track-text">
            <div class="t">${song.name}</div>
            <div class="a">${song.artist}</div>
          </div>
        </div>
        <div class="dur-cell" data-dur>${durations[i] ? formatTime(durations[i]) : "--:--"}</div>
      `;
        row.addEventListener("click", (e) => {
          e.stopPropagation();
          if (i === currentIndex) togglePlay();
          else loadSong(i, true);
        });
        row.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (i === currentIndex) togglePlay();
            else loadSong(i, true);
          }
        });
        els.panelList.appendChild(row);
      });
    }

    function highlightActive() {
      els.panelList.querySelectorAll(".track-row").forEach((row) => {
        const i = Number(row.dataset.index);
        const active = i === currentIndex;
        row.classList.toggle("active", active);
        const icon = row.querySelector(".idx-icon");
        if (active) {
          icon.innerHTML = isPlaying ? PAUSE_ICON : PLAY_ICON;
        } else {
          icon.innerHTML = PLAY_ICON;
        }
      });
    }

    function setPlayIcon(playing) {
      els.playBtn.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
      els.playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
      els.fab.classList.toggle("playing", playing);
    }

    function loadSong(index, autoplay) {
      currentIndex = index;
      const song = songs[index];
      els.panelTitle.textContent = song.name;
      els.panelArtist.textContent = song.artist;
      els.panelCover.style.backgroundImage = `url('${song.cover}')`;
      els.fabArt.style.backgroundImage = `url('${song.cover}')`;
      els.fab.classList.add("has-art");
      els.notice.classList.remove("show");
      els.curTime.textContent = "0:00";
      els.durTime.textContent = durations[index]
        ? formatTime(durations[index])
        : "0:00";
      els.pfill.style.width = "0%";
      els.phandle.style.left = "0%";
      highlightActive();

      els.audio.src = song.src;
      els.audio.load();
      if (autoplay) play();
      else {
        isPlaying = false;
        setPlayIcon(false);
      }
    }

    function play() {
      els.audio
        .play()
        .then(() => {
          isPlaying = true;
          setPlayIcon(true);
          els.notice.classList.remove("show");
          highlightActive();
        })
        .catch(() => {
          isPlaying = false;
          setPlayIcon(false);
          els.notice.classList.add("show");
          highlightActive();
        });
    }
    function pause() {
      els.audio.pause();
      isPlaying = false;
      setPlayIcon(false);
      highlightActive();
    }
    function togglePlay() {
      if (!els.audio.getAttribute("src")) {
        loadSong(currentIndex, true);
        return;
      }
      if (isPlaying) pause();
      else play();
    }
    function next() {
      if (shuffleMode) {
        shuffleToRandom();
        return;
      }
      loadSong((currentIndex + 1) % songs.length, true);
    }
    function prev() {
      if (shuffleMode) {
        shuffleToRandom();
        return;
      }
      loadSong((currentIndex - 1 + songs.length) % songs.length, true);
    }
    function shuffleToRandom() {
      if (songs.length <= 1) {
        loadSong(currentIndex, true);
        return;
      }
      let r = Math.floor(Math.random() * songs.length);
      if (r === currentIndex) r = (r + 1) % songs.length;
      loadSong(r, true);
    }
    function toggleShuffle() {
      shuffleMode = !shuffleMode;
      els.shuffleBtn.classList.toggle("on", shuffleMode);
      els.shuffleBtn.setAttribute("aria-pressed", String(shuffleMode));
    }

    // ---------- Generic draggable slider (progress + volume) ----------
    function makeSlider(trackEl, fillEl, handleEl, onChange) {
      let dragging = false;
      function pctFromEvent(e) {
        const rect = trackEl.getBoundingClientRect();
        return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      }
      function render(pct) {
        fillEl.style.width = pct * 100 + "%";
        handleEl.style.left = pct * 100 + "%";
      }
      trackEl.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
        dragging = true;
        trackEl.classList.add("dragging");
        trackEl.setPointerCapture(e.pointerId);
        const pct = pctFromEvent(e);
        render(pct);
        onChange(pct, false);
      });
      trackEl.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        e.stopPropagation();
        const pct = pctFromEvent(e);
        render(pct);
        onChange(pct, true);
      });
      function end(e) {
        if (!dragging) return;
        dragging = false;
        trackEl.classList.remove("dragging");
        const pct = pctFromEvent(e);
        onChange(pct, false);
      }
      trackEl.addEventListener("pointerup", (e) => {
        e.stopPropagation();
        end(e);
      });
      trackEl.addEventListener("pointercancel", (e) => {
        e.stopPropagation();
        end(e);
      });
    }

    makeSlider(els.ptrack, els.pfill, els.phandle, (pct) => {
      if (isFinite(els.audio.duration) && els.audio.duration > 0) {
        els.audio.currentTime = pct * els.audio.duration;
        els.curTime.textContent = formatTime(els.audio.currentTime);
      }
    });

    makeSlider(els.volTrack, els.volFill, els.volHandle, (pct) => {
      setVolume(pct);
      if (pct > 0) isMuted = false;
      updateVolUI();
    });

    function setVolume(v) {
      volume = Math.min(1, Math.max(0, v));
      els.audio.volume = isMuted ? 0 : volume;
    }
    function updateVolUI() {
      const shown = isMuted ? 0 : volume;
      els.volFill.style.width = shown * 100 + "%";
      els.volHandle.style.left = shown * 100 + "%";
      els.volIcon.innerHTML = isMuted || volume === 0 ? MUTE_ICON : VOL_ICON;
      els.muteBtn.setAttribute("aria-label", isMuted ? "Unmute" : "Mute");
    }
    els.muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isMuted) {
        isMuted = false;
        setVolume(lastVolume || 0.85);
      } else {
        lastVolume = volume;
        isMuted = true;
        els.audio.volume = 0;
      }
      updateVolUI();
    });
    setVolume(volume);
    updateVolUI();

    // ---------- Audio events ----------
    function onDurationKnown() {
      if (!isFinite(els.audio.duration) || els.audio.duration <= 0) return;
      durations[currentIndex] = els.audio.duration;
      els.durTime.textContent = formatTime(els.audio.duration);
      const durEl = els.panelList.querySelector(
        `.track-row[data-index="${currentIndex}"] [data-dur]`,
      );
      if (durEl) durEl.textContent = formatTime(els.audio.duration);
    }
    els.audio.addEventListener("loadedmetadata", onDurationKnown);
    els.audio.addEventListener("durationchange", onDurationKnown);
    els.audio.addEventListener("canplay", onDurationKnown);
    els.audio.addEventListener("timeupdate", () => {
      els.curTime.textContent = formatTime(els.audio.currentTime);
      if (els.audio.duration && !els.ptrack.classList.contains("dragging")) {
        const pct = (els.audio.currentTime / els.audio.duration) * 100;
        els.pfill.style.width = pct + "%";
        els.phandle.style.left = pct + "%";
      }
    });
    els.audio.addEventListener("ended", next);
    els.audio.addEventListener("error", () => {
      if (els.audio.getAttribute("src")) els.notice.classList.add("show");
    });

    [els.playBtn, els.prevBtn, els.nextBtn, els.shuffleBtn].forEach((btn) => {
      btn.addEventListener("click", (e) => e.stopPropagation());
    });
    els.playBtn.addEventListener("click", togglePlay);
    els.nextBtn.addEventListener("click", next);
    els.prevBtn.addEventListener("click", prev);
    els.shuffleBtn.addEventListener("click", toggleShuffle);

    renderRows();
    loadSong(0, false);

    // Quietly fetch duration metadata for every track in the background,
    // without playing anything, so times populate even before you've
    // clicked on a given song. Only starts once the panel is first opened,
    // so visitors who never touch the player never pay this cost.
    let durationsPrefetchStarted = false;
    function prefetchDurations() {
      if (durationsPrefetchStarted) return;
      durationsPrefetchStarted = true;
      let i = 0;
      function loadNext() {
        if (i >= songs.length) return;
        const idx = i++;
        if (durations[idx]) {
          loadNext();
          return;
        }
        const probe = new Audio();
        probe.preload = "metadata";
        probe.src = songs[idx].src;
        const done = () => {
          if (isFinite(probe.duration) && probe.duration > 0) {
            durations[idx] = probe.duration;
            const durEl = els.panelList.querySelector(
              `.track-row[data-index="${idx}"] [data-dur]`,
            );
            if (durEl) durEl.textContent = formatTime(probe.duration);
            if (idx === currentIndex)
              els.durTime.textContent = formatTime(probe.duration);
          }
          probe.removeEventListener("loadedmetadata", done);
          probe.removeEventListener("error", done);
          probe.removeAttribute("src");
          probe.load();
          loadNext();
        };
        probe.addEventListener("loadedmetadata", done, { once: true });
        probe.addEventListener("error", done, { once: true });
      }
      // three probes at a time
      loadNext();
      loadNext();
      loadNext();
    }
  });

  // ---------------------------------------------------------------------------
  // Easter Egg Section
  // ---------------------------------------------------------------------------
  {
    const collectibles = [
      {
        src: "./Assets/Images/Collectibles/93.png",
        sectionClass: ".header",
        left: "90%",
        top: "0%",
      },
      {
        src: "./Assets/Images/Collectibles/helmet.png",
        sectionClass: ".memory",
        left: "18%",
        top: "50%",
      },
      {
        src: "./Assets/Images/Collectibles/soap.png",
        sectionClass: ".About",
        left: "90%",
        top: "100%",
      },
      {
        src: "./Assets/Images/Collectibles/batmanstand.png",
        sectionClass: ".career",
        left: "0%",
        top: "90%",
      },
      {
        src: "./Assets/Images/Collectibles/pirate.png",
        sectionClass: ".treasure",
        left: "83%",
        top: "60%",
      },
      {
        src: "./Assets/Images/Collectibles/cr7.png",
        sectionClass: ".projects",
        left: "50%",
        top: "15%",
      },
      {
        src: "./Assets/Images/Collectibles/bat.png",
        sectionClass: ".tv-screen",
        left: "95%",
        top: "90%",
      },
      {
        src: "./Assets/Images/Collectibles/spidercamera.png",
        sectionClass: ".skills",
        left: "0%",
        top: "50%",
      },
      {
        src: "./Assets/Images/Collectibles/Dap.png",
        sectionClass: ".comics",
        left: "58%",
        top: "30%",
      },
      {
        src: "./Assets/Images/Collectibles/franky.png",
        sectionClass: ".remarkable",
        left: "95%",
        top: "42%",
      },
      {
        src: "./Assets/Images/Collectibles/mospider.png",
        sectionClass: ".billboard",
        left: "18%",
        top: "42%",
      },
      {
        src: "./Assets/Images/Collectibles/Ronaldo.png",
        sectionClass: ".construction",
        left: "81%",
        top: "80%",
      },
      {
        src: "./Assets/Images/Collectibles/spidercap.png",
        sectionClass: ".footer",
        left: "1%",
        top: "15%",
      },
    ];

    const total = collectibles.length;
    let found = 0;

    const toast = document.getElementById("eastereggToast");
    const toastCount = document.getElementById("eastereggToastCount");
    const completionBadge = document.getElementById("eastereggCompletionBadge");
    let toastTimer;

    const showToast = () => {
      toastCount.textContent = `${found} / ${total}`;
      toast.classList.add("easteregg-show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(
        () => toast.classList.remove("easteregg-show"),
        2000,
      );
    };

    const place = async (item, section) => {
      const el = document.createElement("div");
      el.className = "easteregg-collectible";
      el.style.left = item.left;
      el.style.top = item.top;

      const img = document.createElement("img");
      img.alt = "Hidden collectible";
      img.decoding = "async";
      img.src = await addContourBorder(item.src, 300, 300 * 0.028, 4);
      el.appendChild(img);

      el.addEventListener("click", () => {
        if (el.classList.contains("easteregg-collected")) return;
        el.classList.add("easteregg-collected");
        found++;
        showToast();
        if (found === total) completionBadge.classList.add("easteregg-show");
      });

      section.style.position = section.style.position || "relative";
      section.appendChild(el);
    };

    collectibles.forEach((item) => {
      const section = document.querySelector(item.sectionClass);
      if (section) whenNear(section, () => idle(() => place(item, section)));
    });
  }

  // ---------------------------------------------------------------------------
  // Memory Game Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector("#cards-grid"), async () => {
      const myPhotos = [
        { url: "./Assets/Images/Photos/20211211_085039.jpg", name: "1" },
        { url: "./Assets/Images/Photos/20220824_121120.jpg", name: "2" },
        { url: "./Assets/Images/Photos/20240723_203511.jpg", name: "3" },
        { url: "./Assets/Images/Photos/20251003_102256.jpg", name: "4" },
        { url: "./Assets/Images/Photos/IMG-20251007-WA0002.jpg", name: "5" },
      ];

      const MISMATCH_DELAY = 1000;
      const MATCH_DELAY = 600;

      const grid = document.getElementById("cards-grid");
      let flippedCards = [];
      let canFlip = true;

      const setState = (card, label) =>
        card.element.setAttribute("aria-label", `Memory card, ${label}`);

      const flipCard = (card) => {
        if (!canFlip || card.flipped || card.matched) return;

        card.flipped = true;
        card.element.classList.add("flipped");
        setState(card, "revealed");
        flippedCards.push(card);
        if (flippedCards.length < 2) return;

        canFlip = false;
        const pair = flippedCards;
        const isMatch = pair[0].name === pair[1].name;

        setTimeout(
          () => {
            pair.forEach((c) => {
              if (isMatch) {
                c.matched = true;
                c.element.classList.add("matched");
              } else {
                c.flipped = false;
                c.element.classList.remove("flipped");
              }
              setState(c, isMatch ? "matched" : "hidden");
            });
            flippedCards = [];
            canFlip = true;
          },
          isMatch ? MATCH_DELAY : MISMATCH_DELAY,
        );
      };

      // Two copies of every photo, Fisher-Yates shuffled
      const deck = myPhotos.flatMap((photo) => [{ ...photo }, { ...photo }]);
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

      deck.forEach((photo) => {
        const element = document.createElement("div");
        element.className = "memory-card";
        element.setAttribute("role", "button");
        element.setAttribute("tabindex", "0");
        element.innerHTML = `
        <div class="card-back"></div>
        <div class="card-front"><img src="${photo.url}" alt="Photo ${photo.name}" loading="lazy"></div>
      `;

        const card = {
          element,
          name: photo.name,
          flipped: false,
          matched: false,
        };
        setState(card, "hidden");

        element.addEventListener("click", () => flipCard(card));
        element.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flipCard(card);
          }
        });
        grid.appendChild(element);
      });
    });
  }

  // ---------------------------------------------------------------------------
  // About Section
  // ---------------------------------------------------------------------------
  {
    const items = [
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/gettoknowme.png",
        label: "About Me",
        addBorder: true,
        width: 250,
        msg: "Knock, knock! Who's there?",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Mohamed Samir.png",
        label: "My Name is",
        addBorder: true,
        width: 200,
        msg: "Mohamed Samir",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Moknight93.png",
        label: "My Name is",
        addBorder: true,
        width: 200,
        msg: "MoKnight93",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Albert Frankenstein.png",
        label: "My Name is",
        addBorder: true,
        width: 200,
        msg: "Albert Frankenstein",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Port Said.png",
        label: "I'm From",
        width: 150,
        msg: "Port Said, Egypt",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/pyramids.jpg",
        label: "Nationality",
        width: 250,
        msg: "Proud to be Egyptian",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Software Engineer.png",
        label: "I'm",
        addBorder: true,
        width: 200,
        msg: "Software Engineer",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Suez Canal University.png",
        label: "I'm Graduated From",
        addBorder: true,
        width: 200,
        msg: "Suez Canal University, Egypt | 2020–2024",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Faculty.png",
        label: "Faculty of Computers and Information",
        addBorder: true,
        width: 200,
        msg: "Bachelor of Science in Computer Science | Grade: Very Good | Graduation Project: Excellent",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/html.png",
        label: "Web Development",
        addBorder: true,
        width: 150,
        msg: "Frontend using the right side of my brain, backend using the left side. A true Full-Stack Brain.",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/tensorflow.png",
        label: "AI and Machine Learning",
        addBorder: true,
        width: 150,
        msg: "I have a passion for AI and Machine Learning, and I'll keep learning until my AI clone replaces me or I become a chef!",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/donut.png",
        label: "Data Analysis",
        addBorder: true,
        width: 150,
        msg: "Get dataset → Claude work → Get analysis → Get paid. EASY",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/vscode.png",
        label: "Visual Studio Code",
        addBorder: true,
        width: 150,
        msg: "P1 ??? VS Code P2",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Python.png",
        label: "Python",
        addBorder: true,
        width: 150,
        msg: "C1 (Advanced / Effective Operational Proficiency)",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/cpp.png",
        label: "C++",
        addBorder: true,
        width: 150,
        msg: "B2 (Upper-Intermediate)",
      },

      {
        type: "pic",
        src: "./Assets/Images/About-Me/fightclub.jpg",
        label: "Fight Club",
        width: 250,
        msg: "I know this because Tyler knows this",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/deathnote.jpg",
        label: "Death Note",
        width: 250,
        msg: "WHAT DO YOU THINK OF THAT, L? THIS IS MY PERFECT VICTORY! THAT'S RIGHT, I WIN!",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/socialskills.jpg",
        label: "Social Skills !!!",
        addBorder: true,
        width: 250,
        msg: "Yes, because I'm an introvert",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/licence.jpg",
        label: "BIKINI BOTTOM DRIVER LICENSE",
        addBorder: true,
        width: 250,
        msg: "SPONGEBOB SQUAREPANTS, 124 CONCH ST. BIKINI BOTTOM, SEX: M HAIR: YELLOW EYES: BLUE",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/bananaa.png",
        label: "Art Sold for $6.2 Million — Guess What?",
        addBorder: true,
        width: 200,
        msg: "BANANAAAAAAAA",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/ferrari.png",
        label: "Scuderia Ferrari",
        addBorder: true,
        width: 200,
        msg: "F1 royalty with 31 World Titles (16 Constructors', 15 Drivers') and 251 Grand Prix wins—powered by legends like Ascari, Fangio, Lauda, Prost, Schumacher, Alonso, Vettel, and Hamilton.",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/fifapro.jpg",
        label: "FIFPro World11",
        width: 250,
        msg: "Gianluigi Buffon (GK) Dani Alves (RB), Sergio Ramos (CB), Leonardo Bonucci (CB), Marcelo (LB) Toni Kroos (CM), Luka Modrić (CM), Andrés Iniesta (CM) Lionel Messi (RW), Cristiano Ronaldo (ST), Neymar Jr. (LW)",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/palestine.png",
        width: 150,
        msg: "Free Palestine",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/alibi.png",
        label: "Tom Clancy's Rainbow Six® Siege",
        addBorder: true,
        width: 150,
        msg: "+200 hours Total time played - Best Online Tactical Game - Fvck (Valorant, Fuze)",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/Spaghetti.jpg",
        label: "Spaghetti",
        width: 250,
        msg: "I know what you're thinking, NO",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/CR7.png",
        label: "CR7",
        addBorder: true,
        width: 200,
        msg: "AND RONALDOOOOOOOOOO! WHAT A GOAL FROM CRISTIANO RONALDO!",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/Ali.jpg",
        label: "What's my name? Say my name!",
        width: 250,
        msg: "Cassius Clay is a slave name. I didn't choose it and I don't want it. I am Muhammad Ali, a free name.",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/Koshary.jpg",
        label: "Egyptian Koshary",
        width: 250,
        msg: "Another reason to live another day, Another reason to be proud I'm Egyptian, Another reason to be a human being, Another reason to be a happy man.",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Ronaldo.png",
        label: "Young Ronney",
        addBorder: true,
        width: 250,
        msg: "Madeira, Manchester, Madrid, Turin, and Manchester again!, CR7 reunited!",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/Kyiv.jpg",
        label: "The Last Day of Summer",
        width: 250,
        msg: "???",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/Chef.jpg",
        label: "Anyone can cook!",
        width: 250,
        msg: "If you focus on what you left behind, you will never be able to see what lies ahead.",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/44.jpg",
        label: "Sir Lewis Hamilton",
        width: 150,
        msg: "Being a 7-time World Champion <<< Driving for Ferrari",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/sf.png",
        label: "SF-93",
        addBorder: true,
        width: 200,
        msg: "THIS IS LIKE A MUSHROOM IN MARIO KART, I HAVE THE SEAT FULL OF WATER! LIKE, FULL OF WATER!",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/niki.png",
        label: "Niki Lauda",
        width: 200,
        msg: "2nd Time World Champion, 2nd Most Important Man in Ferrari After Enzo, 2nd Legendary Driver After Michael Schumacher",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/madrid.jpg",
        label: "Once upon a time in Madrid...",
        width: 250,
        msg: "I'm in love with a fairytale Even though it hurts 'Cause I don't care if I lose my mind I'm already cursed",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/pitstop.png",
        label: "Guido",
        addBorder: true,
        width: 200,
        msg: "Pit Stop ???",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/batman.png",
        label: "Batman",
        addBorder: true,
        width: 150,
        msg: "He's a silent guardian. A watchful protector. A Dark Knight.",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Spiderman.png",
        label: "Spiderman",
        addBorder: true,
        width: 150,
        msg: "With Great Power Comes Great Responsibility.",
      },
      {
        type: "sticker",
        src: "./Assets/Images/About-Me/Bechamel.png",
        label: "Béchamel Ingredients",
        addBorder: true,
        width: 200,
        msg: "Layer of Pasta ➔ Layer of Meat ➔ Layer of Béchamel === Layer of Input Data ➔ Layer of Hidden Nodes ➔ Layer of Output",
      },
      {
        type: "pic",
        src: "./Assets/Images/About-Me/15.jpg",
        label: "SOMOSLOS REYES DE EUROPA",
        width: 250,
        msg: "Historia que tú hiciste Historia por hacer Porque nadie resiste Tus ganas de vencer",
      },
    ];

    const DEFAULT_STICKER_SIZE = 90;
    const DEFAULT_PIC_SIZE = 110;

    const board = document.querySelector(".About #board");
    const itemData = new WeakMap();

    const note = document.createElement("div");
    note.className = "note";
    note.innerHTML = "<b></b><span></span>";
    board.appendChild(note);

    const showNote = (item) => {
      note.querySelector("b").textContent = item.label;
      note.querySelector("span").textContent = item.msg;
      note.classList.add("show");
    };

    // One set of pointer listeners for the whole board (mouse, touch and pen).
    let drag = null;

    board.addEventListener("pointerdown", (e) => {
      const el = e.target.closest(".item");
      if (!el) {
        if (e.target === board) note.classList.remove("show");
        return;
      }
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      el.style.zIndex = 50;
      const rect = el.getBoundingClientRect();
      drag = {
        el,
        startX: e.clientX,
        startY: e.clientY,
        offX: e.clientX - rect.left,
        offY: e.clientY - rect.top,
        moved: false,
      };
    });

    board.addEventListener("pointermove", (e) => {
      if (!drag) return;
      if (
        !drag.moved &&
        Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < 3
      )
        return;
      drag.moved = true;

      const rect = board.getBoundingClientRect();
      const elRect = drag.el.getBoundingClientRect();
      const x = ((e.clientX - drag.offX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - drag.offY - rect.top) / rect.height) * 100;
      drag.el.style.left =
        clamp(x, 0, 100 - (elRect.width / rect.width) * 100) + "%";
      drag.el.style.top =
        clamp(y, 0, 100 - (elRect.height / rect.height) * 100) + "%";
    });

    board.addEventListener("pointerup", () => {
      if (drag && !drag.moved) showNote(itemData.get(drag.el));
      drag = null;
    });
    board.addEventListener("pointercancel", () => {
      drag = null;
    });

    const buildItems = async () => {
      // Generate every outlined sticker in parallel, then stack the items in list order.
      const sources = await Promise.all(
        items.map((it) =>
          it.type === "sticker" && it.addBorder
            ? addContourBorder(it.src, 300, 300 * 0.045, 6)
            : it.src,
        ),
      );

      items.forEach((it, i) => {
        const el = document.createElement("div");
        el.className = "item " + it.type;
        el.style.width =
          (it.width ||
            (it.type === "sticker" ? DEFAULT_STICKER_SIZE : DEFAULT_PIC_SIZE)) +
          "px";
        // neat stack: every item starts at the same spot; the first item in the list sits on top
        el.style.left = "3%";
        el.style.top = "4%";
        el.style.zIndex = items.length - i;

        if (it.type === "sticker") {
          const img = document.createElement("img");
          img.alt = it.label;
          img.decoding = "async";
          img.src = sources[i];
          el.appendChild(img);
        } else {
          el.innerHTML = `<div class="frame"><div class="photo" style="background-image:url('${it.src}')"></div></div>`;
        }

        itemData.set(el, it);
        board.appendChild(el);
      });
    };

    whenNear(board, buildItems, "600px");
  }

  // ---------------------------------------------------------------------------
  // Career Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector(".career"), async () => {
      const dataSets = {
        experience: [
          {
            title: "Microsoft ML Engineer Trainee",
            org: "Digital Egypt Pioneers Initiative (DEPI)",
            location: "Port Said, Egypt",
            dates: "11/2025 – 05/2026",
            bullets: [
              "Architected end-to-end AI solutions, translating raw data pipelines into scalable data science models.",
              "Engineered Machine Learning and Deep Learning models from scratch, applying advanced algorithms for pattern recognition across Computer Vision and Natural Language Processing (NLP).",
              "Implemented MLOps workflows using MLflow and Hugging Face to automate model tracking, versioning, and deployment for production-ready AI systems.",
              "Developed Large Language Model (LLM) solutions utilizing Prompt Engineering and Attention-based models to solve complex linguistic tasks.",
              "Mastered Data Preprocessing & Visualization in Python, ensuring high-quality data integrity for training and fine-tuning transfer learning models.",
            ],
          },
          {
            title: "Deep Learning for CV Trainee",
            org: "National Telecommunication Institute (NTI)",
            location: "Port Said, Egypt",
            dates: "01/2026 – 02/2026",
            bullets: [
              "Developed and implemented Deep Learning models using Neural Networks (ANN) and Convolutional Neural Networks (CNN) for complex pattern recognition.",
              "Mastered Image Processing and Feature Extraction techniques to automate visual data analysis and enhance model accuracy.",
              "Applied advanced architectures including ResNet and DenseNet, utilizing Transfer Learning to optimize deep learning workflows for specialized tasks.",
              "Built end-to-end Computer Vision systems for Image Classification, Object Detection, and Face Recognition/Verification.",
              "Delivered practical, hands-on projects focused on designing and deploying object recognition systems based on modern deep learning techniques.",
            ],
          },
          {
            title: "Data Analysis Trainee",
            org: "National Telecommunication Institute (NTI)",
            location: "Port Said, Egypt",
            dates: "11/2025 – 12/2025",
            bullets: [
              "Gained hands-on experience in data analysis and visualization using Excel (including Power Query), SQL Server, Power BI, and Tableau.",
              "Skilled in Python programming for data manipulation and analysis using NumPy, Pandas, Matplotlib, and Seaborn.",
              "Experienced in data preprocessing, handling, and cleaning to ensure high-quality datasets.",
              "Derived actionable insights and recommendations to support business decisions.",
              "Familiar with data modeling, ERD design, and mapping for structured data management.",
              "Applied data warehousing concepts to efficiently organize and retrieve large datasets.",
              "Focused on transforming raw data into meaningful visualizations for effective communication of results.",
            ],
          },
          {
            title: "AI & ML Trainee",
            org: "NTI–Huawei Egyptian Talents Academy (ETA)",
            location: "Port Said, Egypt",
            dates: "08/2025 – 09/2025",
            bullets: [
              "Completed the HCIA–AI V4.0 program offered by Huawei ICT Academy–Egypt in collaboration with the National Telecommunication Institute (NTI).",
              "Received in-depth training in Artificial Intelligence fundamentals, including machine learning and deep learning.",
              "Gained practical experience with Python programming, data preprocessing, TensorFlow, and model evaluation.",
              "Developed a strong understanding of applying AI technologies to solve real-world problems across various domains.",
            ],
          },
          {
            title: "MERN Stack Developer Trainee",
            org: "Digital Egypt Pioneers Initiative (DEPI)",
            location: "Port Said, Egypt",
            dates: "10/2024 – 04/2025",
            bullets: [
              "Studied and applied MERN stack development with a focus on React front-end development.",
              "Gained hands-on experience with HTML, CSS, Bootstrap, Tailwind CSS, JavaScript, TypeScript, and React.",
              "Explored back-end technologies including Node.js, Express, NoSQL (MongoDB), and RESTful API development.",
              "Implemented Authentication & Authorization and performed API testing using Postman.",
              "Used Git/GitHub for version control and collaboration.",
              "Gained experience in cloud hosting and deployment using Vercel.",
            ],
          },
        ],
        volunteering: [
          {
            title: "Video Editor",
            org: "Trosc",
            location: "Ismailia, Egypt",
            dates: "12/2023 – 06/2024",
            bullets: [
              "Volunteered to create educational content in programming for university students.",
              "Produced and edited videos on Data Structures and Algorithms (DSA) topics, including Heap Sort, to simplify complex concepts and enhance student learning.",
              "Collaborated with the media team to ensure high-quality, engaging video materials.",
            ],
          },
          {
            title: "Graphic Designer",
            org: "Msh Hackers",
            location: "Ismailia, Egypt",
            dates: "10/2020 – 10/2022",
            bullets: [
              "Designed visual content to support educational programming initiatives within the university team.",
              "Created graphics that improved the presentation and clarity of learning materials.",
              "Contributed to the overall quality and appeal of educational resources through creative design solutions.",
            ],
          },
        ],
      };

      const topTabsEl = document.getElementById("top-tabs");
      const roleListEl = document.getElementById("role-list");
      const detailPanelEl = document.getElementById("detail-panel");

      function renderPanel(item) {
        detailPanelEl.innerHTML = `
      <div class="detail-fade">
        <div class="detail-title">${item.title}</div>
        <div class="detail-meta">
          <span class="detail-meta-org">${item.org}</span>
          <span class="detail-meta-sub">${item.dates}</span>
          <span class="detail-meta-sub">${item.location}</span>
        </div>
        <ul class="detail-bullets">
          ${item.bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </div>
    `;
      }

      function renderRoleList(sectionKey) {
        const data = dataSets[sectionKey];
        roleListEl.innerHTML = "";

        data.forEach((item, index) => {
          const row = document.createElement("button");
          row.type = "button";
          const color = PALETTE[index % PALETTE.length];
          row.className = "role-row" + (index === 0 ? " active" : "");
          row.style.background = color;
          row.style.color = getTextColor(color);
          row.innerHTML = `
        <span class="role-row-title">${item.title}</span>
        <span class="role-row-dates">${item.dates}</span>
      `;
          row.addEventListener("click", () => {
            roleListEl
              .querySelectorAll(".role-row")
              .forEach((r) => r.classList.remove("active"));
            row.classList.add("active");
            renderPanel(item);
          });
          roleListEl.appendChild(row);
        });

        renderPanel(data[0]);
      }

      topTabsEl.querySelectorAll(".top-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          topTabsEl.querySelectorAll(".top-tab").forEach((t) => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
          });
          tab.classList.add("active");
          tab.setAttribute("aria-selected", "true");
          renderRoleList(tab.dataset.section);
        });
      });

      renderRoleList("experience");
    });
  }

  // ---------------------------------------------------------------------------
  // Treasure Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector(".treasure"), async () => {
      document
        .querySelector(".treasure .coin")
        .addEventListener("click", () => {
          const userInput = prompt("Enter The Treasure Number:");

          if (userInput === null || userInput.trim() === "") {
            alert("Ye slack-jawed sea rat! Spit it out or walk the plank!");
          } else if (userInput === "93") {
            document.querySelector(".treasure .coin").style.filter = "none";

            const tc5 = document.querySelector(".treasure .tc5");
            tc5.style.filter = "none";
            tc5.style.opacity = "1";
            tc5.src = "./Assets/Images/treasure-chest.png";

            alert(
              "By the rottin' guts of Blackbeard, we hit the motherload! Gold, rum, and wenches for all! Now, drink till ye drop!",
            );
          } else {
            alert(
              "By the devil's balls! All that work for this rotten, empty heap?! Worse than a dead man's stench!",
            );
          }
        });

      try {
        await loadScript(LIBS.bootstrap);
      } catch {
        return;
      }

      document
        .querySelectorAll('.treasure [data-bs-toggle="popover"]')
        .forEach((el) => {
          const popover = new bootstrap.Popover(el, {
            trigger: "manual",
            container: "body",
            html: true,
          });
          let hideTimeout;

          const show = () => {
            clearTimeout(hideTimeout);
            popover.show();
          };
          const scheduleHide = () => {
            hideTimeout = setTimeout(() => popover.hide(), 200);
          };

          el.addEventListener("mouseenter", show);
          el.addEventListener("focus", show);
          el.addEventListener("mouseleave", scheduleHide);
          el.addEventListener("blur", scheduleHide);

          // keep it open while the mouse is inside the popover itself
          el.addEventListener("shown.bs.popover", () => {
            const tip = document.getElementById(
              el.getAttribute("aria-describedby"),
            );
            if (!tip) return;
            tip.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
            tip.addEventListener("mouseleave", scheduleHide);
          });
        });
    });
  }

  // ---------------------------------------------------------------------------
  // Projects Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector(".projects"), async () => {
      const projects = [
        {
          id: 0,
          name: "Amazon Electronics Recommendation System",
          tags: ["AI & ML", "Recommendation System"],
          shortDesc:
            "A 9-layer hybrid recommendation engine covering 490,000+ Amazon electronics products.",
          problem:
            "A catalog this large and varied makes simple similarity-based recommendations too slow and too shallow to stay accurate at scale.",
          solution:
            "A hybrid engine that blends graph embeddings, sequence modeling, and matrix factorization into one ranked, sub-millisecond inference pipeline.",
          whatIDid:
            "Documented the system architecture and data flow across LightGCN, SASRec, and ALS/BPR, defined the FAISS HNSW similarity search and LightGBM re-ranking logic, and wrote the Flask/FastAPI deployment guidelines plus the popularity-bias mitigation strategy (IPS debiasing).",
          dates: "Jan 2026 — May 2026",
          live: null,
          source: null,
          tech: [
            "Python",
            "Flask",
            "FastAPI",
            "LightGCN",
            "SASRec",
            "FAISS",
            "LightGBM",
            "Streamlit",
          ],
        },
        {
          id: 1,
          name: "Chest X-Ray (Pneumonia): Image Classification & Captioning",
          tags: ["AI & ML", "Computer Vision", "NLP"],
          shortDesc:
            "A dual-model pipeline that classifies pneumonia in chest X-rays and writes a clinical summary.",
          problem:
            "Reading X-rays for pneumonia and writing a consistent diagnostic note takes time and varies between practitioners.",
          solution:
            "A CNN-Encoder + LSTM-Decoder pipeline that classifies the image and generates a descriptive clinical summary in a single pass.",
          whatIDid:
            "Designed the hybrid CNN/LSTM architecture, applied targeted data augmentation to correct class imbalance, and shipped both a Streamlit prototype and a Flask API, evaluated with precision, recall, and F1-score.",
          dates: "Jan 2026 — Feb 2026",
          live: null,
          source: null,
          tech: [
            "Python",
            "TensorFlow",
            "Keras",
            "Flask",
            "FastAPI",
            "Streamlit",
          ],
        },
        {
          id: 2,
          name: "Telecom Customer Churn Analysis",
          tags: ["Data Analysis", "BI Dashboard"],
          shortDesc:
            "A churn analysis covering 7,043 customers, protecting a $5.47M annual revenue stream.",
          problem:
            "The business had no clear view of which customers were likely to churn, or why, putting recurring revenue at risk.",
          solution:
            "A cleaned, structured dataset behind an interactive Power BI/Tableau dashboard that surfaces the strongest churn drivers.",
          whatIDid:
            "Built the ETL and cleaning routines in SQL and Excel, designed the dashboards, and pinpointed month-to-month contracts and fiber-optic plans as the leading attrition drivers — 69.4% of churned accounts came from fiber plans.",
          dates: "Dec 2025",
          live: null,
          source: null,
          tech: ["SQL Server", "Excel", "Power BI", "Tableau"],
        },
        {
          id: 3,
          name: "Exoplanet Hunting",
          tags: ["AI & ML", "Hackathon"],
          shortDesc:
            "An ML pipeline built at the NASA Space Apps Challenge to detect exoplanets in noisy Kepler data.",
          problem:
            "Raw stellar brightness data from NASA's Kepler telescope is noisy, which makes genuine planetary transits hard to tell apart from cosmic and telemetry artifacts.",
          solution:
            "A denoising convolutional autoencoder paired with a CNN-LSTM classifier and a gradient-boosted ensemble that isolates real transit signals.",
          whatIDid:
            "Designed the autoencoder and CNN-LSTM classifier, combined it with XGBoost and LightGBM in a multi-model ensemble, and validated results with precision-recall, AP, and ROC-AUC under class imbalance.",
          dates: "Oct 2025",
          live: null,
          source: null,
          tech: ["Python", "TensorFlow", "XGBoost", "LightGBM"],
        },
        {
          id: 4,
          name: "Burns Degree Classification",
          tags: ["AI & ML", "Computer Vision"],
          shortDesc:
            "A CNN that classifies burn injury photos into 1st, 2nd, and 3rd-degree burns.",
          problem:
            "Grading burn severity from a photo consistently usually needs trained clinical judgement that isn't always immediately available.",
          solution:
            "A CNN trained on 6,000+ medical images, sharpened with transfer learning, to classify burn severity directly from a photo.",
          whatIDid:
            "Built a custom CNN from scratch (77% accuracy), then improved it to 79% with ResNet50 transfer learning, tuning with EarlyStopping/ReduceLROnPlateau and validating against medical-grade precision and recall.",
          dates: "Sep 2025",
          live: null,
          source: null,
          tech: ["Python", "TensorFlow"],
        },
        {
          id: 5,
          name: "Polaris — Travel Social Platform",
          tags: ["Full-Stack", "Graduation Project"],
          shortDesc:
            "A travel blog and social platform for sharing and discovering travel experiences.",
          problem:
            "Travelers had no single place to document trips and discover other travelers' experiences in a social format.",
          solution:
            "A full MERN social platform with authentication, a responsive Tailwind/Bootstrap interface, and cloud deployment.",
          whatIDid:
            "Built the platform end-to-end on the MERN stack, implemented REST APIs and authentication, and deployed it on Vercel.",
          dates: "Dec 2024 — Apr 2025",
          live: null,
          source: null,
          tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "Tailwind CSS",
            "Bootstrap",
            "React",
            "NodeJS",
            "MongoDB",
            "Express",
            "Vercel",
          ],
        },
        {
          id: 6,
          name: "Nearest Shop",
          tags: ["Full-Stack", "Mobile", "UI/UX", "Graduation Project"],
          shortDesc:
            "A location-based ecosystem matching shopper preferences with local clothing store inventory in real time.",
          problem:
            "Offline clothing retailers had no easy way to reach nearby shoppers whose preferences matched what was already on their shelves.",
          solution:
            "A cross-platform Flutter app for shoppers and a React web platform for shop owners, with a preference chatbot and OCR-based onboarding for personalized recommendations.",
          whatIDid:
            "Engineered the Node/Express/MongoDB backend with OAuth 2.0 and AES-secured HTTPS, integrated Google Cloud Vision OCR and a preference-filtering chatbot, and coordinated sprint delivery across an 8-engineer Agile team.",
          dates: "Dec 2023 — Jun 2024",
          live: "https://nearest-shops.netlify.app/",
          source: null,
          tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "NodeJS",
            "Express",
            "MongoDB",
            "React",
            "Flutter",
            "Figma",
            "Netlify",
          ],
        },
        {
          id: 7,
          name: "Bookie",
          tags: ["Frontend", "Demo"],
          shortDesc:
            "A digital platform for book lovers to explore, read, and share their favorite books.",
          problem:
            "Book lovers lacked a calm, unified space to discover new titles, read summaries, and compare opinions before committing to a book.",
          solution:
            "A serene, interactive reading platform with a rating system that turns solitary reading into a shared, community experience.",
          whatIDid:
            "Designed the interface, built the responsive layout, and implemented the interactive rating and review system from scratch.",
          dates: "Dec 2020",
          live: "https://moknight93.github.io/Bookie/",
          source: null,
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          id: 8,
          name: "Finder — Contractors",
          tags: ["Frontend", "Demo"],
          shortDesc:
            "Connects users with local contractors for home projects like cleaning, plumbing, and repairs.",
          problem:
            "Homeowners struggled to find and vet reliable local contractors for repairs, cleaning, and roofing work.",
          solution:
            "A searchable directory of vetted professionals with pricing references, expert advice, and tools that help contractors grow their own business.",
          whatIDid:
            "Built the search and filter logic, structured the listings, and designed the contractor- and homeowner-facing flows.",
          dates: "Dec 2024 — Jan 2025",
          live: "https://finder-contractors.netlify.app/",
          source: null,
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          id: 9,
          name: "Finder — Real Estate",
          tags: ["Frontend", "Demo"],
          shortDesc:
            "A user-friendly real estate platform for buying, selling, or renting with advanced search filters.",
          problem:
            "Property seekers had to piece listings together from scattered, often unverified sources with no easy way to compare true costs.",
          solution:
            "A bilingual (Arabic/English) real estate platform with verified listings, cost calculators, and light/dark modes for a seamless search experience.",
          whatIDid:
            "Built the bilingual UI system, implemented light/dark mode, and developed the filtering and cost-calculator tools.",
          dates: "Nov 2024 — Dec 2024",
          live: "https://finder-real-estate.netlify.app/",
          source: null,
          tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        },
        {
          id: 10,
          name: "Portfolio",
          tags: ["Portfolio", "Frontend"],
          shortDesc:
            "My personal portfolio — an animated, interactive showcase of my projects, skills, and journey.",
          problem:
            "A plain resume and a static project list don't show personality, interactivity, or the craft that goes into the small details.",
          solution:
            "A fully custom, animated portfolio with a typewriter hero, a scroll progress bar, an interactive certificate carousel, and playful Easter-egg animations throughout.",
          whatIDid:
            "Designed and built the entire site from scratch in vanilla HTML/CSS/JavaScript with Bootstrap — including the custom animations, the certificate viewer with hover popovers, and this interactive projects section itself.",
          dates: "2025 — Present",
          live: "https://moknight93.github.io/Portfolio/",
          source: null,
          tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        },
      ];

      const TECH_COLORS = [
        "#F4C544",
        "#F0955A",
        "#A9CC7A",
        "#B3A6EE",
        "#F0A8C0",
        "#8ECAE6",
        "#9FE2BF",
      ];

      const cardsCol = document.getElementById("cardsCol");
      const detailPanel = document.getElementById("detailPanel");
      const filterPillsEl = document.getElementById("filterPills");
      let activeId = 0;
      let currentFilter = "all";

      function allTags() {
        return [...new Set(projects.flatMap((p) => p.tags))];
      }

      function renderFilterPills() {
        const tags = ["all", ...allTags()];
        filterPillsEl.innerHTML = tags
          .map(
            (t) => `
    <button class="filter-pill${t === currentFilter ? " active" : ""}" data-filter="${t}">
      ${t === "all" ? "All" : t}
    </button>
  `,
          )
          .join("");
      }

      function renderCards() {
        cardsCol.innerHTML = "";
        projects
          .filter(
            (p) => currentFilter === "all" || p.tags.includes(currentFilter),
          )
          .forEach((p) => {
            const card = document.createElement("div");
            // p.id (not the list index) so each project keeps its color when filtering
            const color = PALETTE[p.id % PALETTE.length];
            card.className =
              "project-card" + (p.id === activeId ? " active" : "");
            card.style.background = color;
            card.style.color = getTextColor(color);
            card.dataset.id = p.id;
            card.innerHTML = `
        <div class="card-meta">
          <span class="card-index">Project ${String(p.id + 1).padStart(2, "0")}</span>
          <span class="card-tags">${p.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}</span>
        </div>
        <div class="card-name">${p.name}</div>
        <p class="card-desc">${p.shortDesc}</p>
      `;
            card.addEventListener("click", () => {
              activeId = p.id;
              renderCards();
              renderDetail();
              // stacked layout (below 992px): the details are above the cards, so bring them into view
              if (window.matchMedia("(max-width: 991px)").matches) {
                detailPanel.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            });
            cardsCol.appendChild(card);
          });
      }

      function renderDetail() {
        const p = projects.find((x) => x.id === activeId);
        if (!p) {
          detailPanel.innerHTML = "";
          return;
        }

        detailPanel.innerHTML = `
    <div class="card-meta">
      <span class="card-index">Project ${String(p.id + 1).padStart(2, "0")}</span>
      <span class="card-tags">${p.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}</span>
    </div>
    <div class="detail-title">${p.name}</div>
    <div class="detail-dates">${p.dates}</div>
    <div class="detail-block">
      <h4>The problem</h4>
      <p>${p.problem}</p>
    </div>
    <div class="detail-block">
      <h4>The solution</h4>
      <p>${p.solution}</p>
    </div>
    <div class="detail-block">
      <h4>What I did</h4>
      <p>${p.whatIDid}</p>
    </div>

    <div class="detail-footer">
      <div class="tech-stack">
        ${p.tech
          .map((label, i) => {
            const color = TECH_COLORS[i % TECH_COLORS.length];
            return `<span class="tech-chip" style="border-color:${color};color:${color}">${label}</span>`;
          })
          .join("")}
      </div>
      <div class="action-buttons">
        ${
          p.live
            ? `<a class="action-btn live" href="${p.live}" target="_blank" rel="noopener">Live Demo</a>`
            : `<span class="action-btn live is-disabled">Not published</span>`
        }
        ${
          p.source
            ? `<a class="action-btn source" href="${p.source}" target="_blank" rel="noopener">Source Code</a>`
            : `<span class="action-btn source is-disabled">No Source code</span>`
        }
      </div>
    </div>
  `;
      }

      filterPillsEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-pill");
        if (!btn) return;
        currentFilter = btn.dataset.filter;
        const visible = projects.filter(
          (p) => currentFilter === "all" || p.tags.includes(currentFilter),
        );
        if (!visible.find((p) => p.id === activeId) && visible.length) {
          activeId = visible[0].id;
        }
        renderFilterPills();
        renderCards();
        renderDetail();
      });

      renderFilterPills();
      renderCards();
      renderDetail();
    });
  }

  // ---------------------------------------------------------------------------
  // TV Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector("#tvScreen"), async () => {
      const tvChannels = [
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bzRub29nbTV2c3pyNGg0Z2ZiZHR4Z214bms3NWpjeTIxeHhpMTZuOSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/kHaUMWyVd1hiU/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjg5MHlnNHRpNzl2Mng4bDJjejZvbDhvdnFuNXowbXM2Y20xeWx2byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zwPRprvrP4Lm0/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MnNpNmI4NWIxNmo2d3EwMDQ3ODl0NzRldGxmZHRsNWNndjRmc2phNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Y1L0dHsQrUpkv8Org7/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjgzMnJ4dWluN3dhMnQ4NXlmcjRuaXRwY29zNGFqZmRvNWZzcTV6ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nDSlfqf0gn5g4/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjMwNWk1aXZmOGc5MTk3enFrcHV5cGU4OWlkN3V5OXd3dWoxeWI1dCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/IcAVmvillsBz73mn5K/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NzJpMm1ieDRhb3RtdnBhNHVncjR1ajBmOXdjaDk0eGZ2aGppOGZlOSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/3oEhmGfS6wSQ6uMaOs/giphy.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHR0OTY4N2JvY3kydjhlaHI1NXM5a2o1ZmlnOHdjeGk0cXB5NWtrNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tCzWe3PQwJeuI/giphy.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDJxdnFzZTdmdWo0Njk4YmxuZ3QybWkxaDJ3NXlscXB2dWlqcm1lYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MOWPkhRAUbR7i/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpnYXBqMHAxN295MzN2NWc0eGQ4ZWw2aXprbnM2NW10aHNveHh3MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DEZA7FlHbMesUF1jm9/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnhxc2VvaDdiZGgxOGIwczkydzU0aTFzcDB6OWJpM2E5aDZzZncxZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/aF8IHR5OtfvQk/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXBrNjIxdHR2dmdjaTNsbTFoM2RpaDM2eWQ2MW0wazhwcGp6eWIzcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DuoLKerazS0r61ffGo/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdoN3c3Y3B6M2plOTZ3MWg1M3luZGtiZzRwaDZ5cGl5b3dxaGZvaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rMt21mWOyuxcoLwgwU/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTI3ZmR6YWpueGNqaDhjdjM0OHhjdHdtdjNxa2FhZ284YmlqMmFrZCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/ocAzqRep3bLitRTmKP/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnUwYTBobmJyZmthOTU5dmoyeWJ4bDBzdG9ua2Z2dzhkeHFsNjU4cSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YmZOBDYBcmWK4/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnVsN3VjNGFsd3U4dTQ3Y3F2a3JncTUwMTF5eGFoeGh0b2R6ZWJuZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DRsN032KfVl19CCnqK/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanFkdTdkaWo5OG8zNTFsZW80OWpjd3JnN2oyZnlsbHA5dnQ5cDM0dSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/5guYctWhB0FxK/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Z2x5Y3pydmFoNmdyMW55MXlqanVmdWZuem8yODVrcHl2aXAwY2w5NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dJo9h2zrdANo1GO3pd/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExanNvNHNjbjE0bG05YWVpY213aXI2djFkODh0end1aWhmZnJ1NWV1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/avLffXT6HClxIEidov/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eDlocGEzZHhqMjJpYjB4eXIzYWRlMXZ6Y2ZsM251OHduM3BjeDByMSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/klbAEHKBjZspFgnUuW/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGx5YWszMG5ob2U3MHR0b3dtM25jOHB1dXZzaHU5dnJnbG0yNzYzbiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/WE5IOBJQdRSNIXBVW0/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjJidnkxb3g2ZHVyZjY5YzBtczcyaDk4MTQwZHA5ZWQydnNhbDMzayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y0GzquhmU03NpyOF42/giphy.gif",
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTUybmgycndzbm5uYWQybTZodXNzNG5hdTR5a3UzOGg3NmkxcXpmeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0aIY8ZCncOtgh35ftC/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3g3aDkwNmJ1YWJ0aDhkdmJxOXFjMnU4MTZjNHZyb2FnaWlycHJtZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oMLJaPmbUnoC4/giphy.gif",
      ];

      const tv = document.getElementById("tvScreen");
      const clock = document.getElementById("clock");
      const date = document.getElementById("date");
      const indicator = document.getElementById("channelIndicator");
      const fadeables = [
        "calendar",
        "playButton",
        "channelControls",
        "channelIndicator",
      ].map((id) => document.getElementById(id));

      const updateClock = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        clock.textContent = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
        date.textContent = now.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      };
      updateClock();
      setInterval(updateClock, 1000);

      // The overlay (clock, buttons, channel) fades out a second after the TV turns on.
      let hideTimeout;
      const isOn = () => tv.classList.contains("background");
      const showElements = () =>
        fadeables.forEach((el) => el.classList.remove("hidden"));
      const startHideTimer = () => {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(
          () => fadeables.forEach((el) => el.classList.add("hidden")),
          1000,
        );
      };

      let currentChannel = 0;
      const setChannel = (index) => {
        tv.style.backgroundImage = `url('${tvChannels[index]}')`;
        indicator.textContent = "CH " + String(index + 1).padStart(2, "0");
        indicator.classList.toggle("active", isOn());
      };

      document.getElementById("tvPower").addEventListener("click", () => {
        tv.classList.toggle("background");
        if (isOn()) {
          setChannel(currentChannel);
          startHideTimer();
        } else {
          tv.style.backgroundImage = "";
          indicator.classList.remove("active");
          showElements();
        }
      });

      tv.querySelectorAll(".channel-btn").forEach((button) => {
        button.addEventListener("click", () => {
          if (!isOn()) return;
          currentChannel =
            (currentChannel + Number(button.dataset.dir) + tvChannels.length) %
            tvChannels.length;
          setChannel(currentChannel);
          showElements();
          startHideTimer();
        });
      });

      tv.addEventListener("mouseenter", () => {
        showElements();
        clearTimeout(hideTimeout);
      });
      tv.addEventListener("mouseleave", () => {
        if (isOn()) startHideTimer();
      });
      // also reveal the overlay on tap (touch screens)
      tv.addEventListener("click", () => {
        showElements();
        if (isOn()) startHideTimer();
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Certificates Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector(".certificates"), async () => {
      const pdfFiles = [
        "./Assets/Pdf/Certificates/AI For Everyone(AI4E).pdf",
        "./Assets/Pdf/Certificates/Attendance_Certificate (2).pdf",
        "./Assets/Pdf/Certificates/Certifi.pdf",
        "./Assets/Pdf/Certificates/Certificate - Mohamed Samir Ahmad.pdf",
        "./Assets/Pdf/Certificates/Course_Certificate_En (2).pdf",
        "./Assets/Pdf/Certificates/Course_Certificate_En.pdf",
        "./Assets/Pdf/Certificates/Course_Certificate_En_py.pdf",
        "./Assets/Pdf/Certificates/CS50x.pdf",
        "./Assets/Pdf/Certificates/download.pdf",
        "./Assets/Pdf/Certificates/downloaded - AI.pdf",
        "./Assets/Pdf/Certificates/downloaded - Py.pdf",
        "./Assets/Pdf/Certificates/downloaded - Web.pdf",
        "./Assets/Pdf/Certificates/HCIA-AI V4.0.pdf",
        "./Assets/Pdf/Certificates/Mohamed Samir Ahmad AI.pdf",
        "./Assets/Pdf/Certificates/Mohamed Samir Ahmad Mohamed 2.pdf",
        "./Assets/Pdf/Certificates/Mohamed Samir Ahmad Mohamed.pdf",
        "./Assets/Pdf/Certificates/Mohamed Samir Ahmad.pdf",
        "./Assets/Pdf/Certificates/Mohamed Samir.pdf",
        "./Assets/Pdf/Certificates/MohamedSamir Ahmad-CyberOps Associa-certificate_2.pdf",
        "./Assets/Pdf/Certificates/MohamedSamir Ahmad-Cybersecurity Es-certificate.pdf",
        "./Assets/Pdf/Certificates/MohamedSamir Ahmad-Entrepreneurship-certificate.pdf",
        "./Assets/Pdf/Certificates/MohamedSamir Ahmad-Introduction to -certificate.pdf",
        "./Assets/Pdf/Certificates/MohamedSamir Ahmad-SUMMER TRAINING -certificate.pdf",
        "./Assets/Pdf/Certificates/NASA Space Apps Challenge.pdf",
      ];

      try {
        await Promise.all([
          loadScript(LIBS.swiperJs),
          loadStyle(LIBS.swiperCss),
        ]);
      } catch {
        console.warn(
          "Swiper did not load, the certificates carousel is unavailable.",
        );
        return;
      }

      const THUMB_WIDTH = 900;
      const PARALLEL_RENDERS = 3;
      const PDFJS_SRC =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      const PDFJS_WORKER_SRC =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      const section = document.querySelector(".certificates");
      const swiperWrapper = section.querySelector(".swiper-wrapper");

      const toTitle = (path) =>
        path
          .split("/")
          .pop()
          .replace(/\.pdf$/i, "")
          .replace(/[_-]+/g, " ")
          .replace(/\s*\(\d+\)\s*/g, "")
          .replace(/\s+/g, " ")
          .trim();

      const slideRefs = pdfFiles.map((pdfFile) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
        <div class="cert-card">
          <div class="cert-thumb-wrap loading"></div>
        </div>
      `;
        slide.querySelector(".cert-card").addEventListener("click", () => {
          window.open(pdfFile, "_blank", "noopener");
        });
        swiperWrapper.appendChild(slide);
        return { slide, pdfFile };
      });

      let swiperInstance = null;
      try {
        swiperInstance = new Swiper(".certificates .mySwiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          grabCursor: true,
          keyboard: { enabled: true },
          pagination: {
            el: ".certificates .swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".certificates .swiper-button-next",
            prevEl: ".certificates .swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          },
        });
      } catch (error) {
        console.error("Swiper initialization failed:", error);
      }

      const renderFirstPage = async (pdfFile) => {
        // Spaces/parentheses in filenames must be percent-encoded for fetch to find them
        const pdf = await pdfjsLib.getDocument(encodeURI(pdfFile)).promise;
        const page = await pdf.getPage(1);
        const scale = THUMB_WIDTH / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport })
          .promise;
        return canvas.toDataURL("image/jpeg", 0.82);
      };

      // PDF.js is heavy, so it is only downloaded (and the thumbnails only drawn,
      // a few at a time) once this section is close to the screen.
      const renderThumbnails = async () => {
        try {
          await loadScript(PDFJS_SRC);
        } catch {
          console.warn(
            "PDF.js did not load, certificate previews are unavailable.",
          );
          return;
        }
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;

        let next = 0;
        const worker = async () => {
          while (next < slideRefs.length) {
            const { slide, pdfFile } = slideRefs[next++];
            const wrap = slide.querySelector(".cert-thumb-wrap");
            try {
              const img = document.createElement("img");
              img.alt = toTitle(pdfFile);
              img.onload = () => img.classList.add("loaded");
              img.src = await renderFirstPage(pdfFile);
              wrap.prepend(img);
            } catch (err) {
              console.warn("Thumbnail failed for", pdfFile, err);
            }
            wrap.classList.remove("loading");
          }
        };
        await Promise.all(Array.from({ length: PARALLEL_RENDERS }, worker));

        // Rebuild the looped clones so they contain the finished thumbnails.
        if (swiperInstance) {
          swiperInstance.loopDestroy();
          swiperInstance.loopCreate();
          swiperInstance.update();
        }
      };

      whenNear(section, renderThumbnails, "300px");
    });
  }

  // ---------------------------------------------------------------------------
  // Comics Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector(".comics"), async () => {
      const range = (a, b) =>
        Array.from({ length: b - a + 1 }, (_, i) => a + i);
      const pageNumbers = [
        1,
        ...range(5, 16),
        ...range(60, 79),
        ...range(81, 100),
      ];
      const pages = pageNumbers.map((n) =>
        encodeURI(
          `./Assets/Images/Spider-Verse - Amazing Spider-Man/${String(n).padStart(4, "0")}.jpg`,
        ),
      );

      const modal = document.querySelector(".comic-modal");
      const modalImg = modal.querySelector(".modal-image");
      const prevBtn = modal.querySelector(".prev");
      const nextBtn = modal.querySelector(".next");
      const countDisplay = modal.querySelector(".image-count");
      const pageBadge = document.querySelector(".poster .pages");

      let currentIndex = 0;
      pageBadge.textContent = `${pages.length} pages`;

      const preload = (i) => {
        new Image().src = pages[(i + pages.length) % pages.length];
      };

      const updateModal = () => {
        modalImg.src = pages[currentIndex];
        countDisplay.textContent = `${currentIndex + 1}/${pages.length}`;
        preload(currentIndex + 1);
        preload(currentIndex - 1);
      };

      const closeModal = () => {
        modal.style.display = "none";
        modalImg.removeAttribute("src");
      };

      document.querySelector(".poster").addEventListener("click", () => {
        currentIndex = 0;
        updateModal();
        modal.style.display = "block";
      });

      modal.querySelector(".close-modal").addEventListener("click", closeModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });

      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + pages.length) % pages.length;
        updateModal();
      });
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % pages.length;
        updateModal();
      });

      window.addEventListener("keydown", (e) => {
        if (modal.style.display !== "block") return;
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "Escape") closeModal();
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Hero Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector(".heroes"), async () => {
      const CFG = {
        defaults: ["batman", "joker"], // P1 and P2 when the page opens
        viewerSrc:
          "https://ajax.googleapis.com/ajax/libs/model-viewer/4.2.0/model-viewer.min.js",
        edge: 10, // K.O. odds: higher = stats matter more, 0 = pure coin flip
        minRound: 900, // ms between pressing Fight and the K.O.
      };

      // id, name, model, portrait, color (card), accent (HUD), stats, bio
      const M = "./Assets/Models/",
        P = "./Assets/Images/Model Portraits/";
      const HEROES = [
        {
          id: "spiderman",
          name: "Spider Man",
          model: M + "spider_man__marvel_rivals.glb",
          portrait: P + "img_spider-man.png",
          color: "#0D92F4",
          accent: "#38a8ff",
          stats: { str: 1110, abl: 1170, def: 1050, hp: 1080 },
          bio: "A quick-witted acrobat who swings through the city on web-lines and spider-sense.",
        },
        {
          id: "venom",
          name: "Venom",
          model: M + "venom__marvel_rivals.glb",
          portrait: P + "img_venom.png",
          color: "#5d6b78",
          accent: "#c9d4df",
          stats: { str: 1170, abl: 1120, def: 1120, hp: 1150 },
          bio: "A symbiote-bonded brute with monstrous strength and a hunger for vengeance.",
        },
        {
          id: "joker",
          name: "Joker",
          model: M + "joker_textured_rigged.glb",
          portrait: P + "Injustice2TheJokerLastLaugh.webp",
          color: "#8738ae",
          accent: "#b46be0",
          stats: { str: 920, abl: 1140, def: 940, hp: 1000 },
          bio: "An unpredictable mastermind who turns chaos and theatrical madness into a weapon.",
        },
        {
          id: "batman",
          name: "Batman",
          model: M + "batman_-_arkham_origins_rigged.glb",
          portrait: P + "Injustice2BatmanArkhamKnight.webp",
          color: "#243642",
          accent: "#6aa7d8",
          stats: { str: 1020, abl: 1160, def: 1040, hp: 1040 },
          bio: "A brooding vigilante who turns fear, intellect and martial mastery into justice.",
        },
        {
          id: "thor",
          name: "Thor",
          model: M + "thor__marvel_rivals.glb",
          portrait: P + "img_thor.png",
          color: "#789d40",
          accent: "#a6dc4c",
          stats: { str: 1190, abl: 1150, def: 1160, hp: 1180 },
          bio: "The God of Thunder, wielding Mjolnir and lightning to crush any threat.",
        },
        {
          id: "strange",
          name: "Doctor Strange",
          model: M + "doctor_strange__marvel_rivals.glb",
          portrait: P + "img_doctor-strange.png",
          color: "#7b2d2d",
          accent: "#f0b13a",
          stats: { str: 960, abl: 1195, def: 1080, hp: 1060 },
          bio: "The Sorcerer Supreme, bending reality with mystic arts to guard the multiverse.",
        },
        {
          id: "wolverine",
          name: "Wolverine",
          model: M + "wolverine_-_marvel_rivals_-_animated.glb",
          portrait: P + "img_deadpool-wolverine.png",
          color: "#b9b22b",
          accent: "#f2d43a",
          stats: { str: 1100, abl: 1150, def: 1140, hp: 1130 },
          bio: "A relentless survivor with adamantium claws and a healing factor.",
        },
        {
          id: "deadpool",
          name: "Deadpool",
          model: M + "deadpool_movie_model.glb",
          portrait: P + "img_deadpool.png",
          color: "#a52b2b",
          accent: "#ff5a5f",
          stats: { str: 1060, abl: 1130, def: 1160, hp: 1100 },
          bio: "An unkillable mercenary whose wit, blades and healing factor never quit.",
        },
        {
          id: "blackpanther",
          name: "Black Panther",
          model: M + "black_panther_-_marvel_rivals_-_animated.glb",
          portrait: P + "img_black-panther.png",
          color: "#3b2a5e",
          accent: "#b08cff",
          stats: { str: 1090, abl: 1150, def: 1110, hp: 1090 },
          bio: "The king of Wakanda, striking with vibranium claws and feline agility.",
        },
        {
          id: "hulk",
          name: "Hulk",
          model: M + "hulk_-_marvel_rivals.glb",
          portrait: P + "img_bruce-banner.png",
          color: "#2f7a3a",
          accent: "#69e07a",
          stats: { str: 1200, abl: 1050, def: 1180, hp: 1200 },
          bio: "Unstoppable gamma-powered fury: the angrier he gets, the stronger he gets.",
        },
        {
          id: "captainamerica",
          name: "Captain America",
          model: M + "marvel_rivals_-_captain_america.glb",
          portrait: P + "img_captain-america.png",
          color: "#1b3a6b",
          accent: "#e5484d",
          stats: { str: 1120, abl: 1090, def: 1170, hp: 1140 },
          bio: "The super-soldier who leads from the front with an unbreakable shield and will.",
        },
        {
          id: "daredevil",
          name: "Daredevil",
          model: M + "daredevil_-_marvel_rivals.glb",
          portrait: P + "img_daredevil.png",
          color: "#7a1414",
          accent: "#ff3b3b",
          stats: { str: 1030, abl: 1140, def: 1000, hp: 1020 },
          bio: "The blind lawyer of Hell's Kitchen, fighting by radar sense, batons and stubborn courage.",
        },
        {
          id: "gambit",
          name: "Gambit",
          model: M + "gambit_-_marvel_rivals.glb",
          portrait: P + "img_gambit.png",
          color: "#6a2f4f",
          accent: "#ff6b9d",
          stats: { str: 950, abl: 1160, def: 940, hp: 990 },
          bio: "A Cajun thief who charges ordinary playing cards with kinetic energy and throws them like grenades.",
        },
        {
          id: "humantorch",
          name: "Human Torch",
          model: M + "human_torch_-_marvel_rivals.glb",
          portrait: P + "img_human-torch.png",
          color: "#d9531e",
          accent: "#ffb347",
          stats: { str: 970, abl: 1170, def: 960, hp: 1010 },
          bio: "Johnny Storm, the Fantastic Four's fireball, blazing through the sky and burning hotter each second.",
        },
        {
          id: "moonknight",
          name: "Moon Knight",
          model: M + "moon_knight.glb",
          portrait: P + "img_fist-of-vengeance.png",
          color: "#9aa1b5",
          accent: "#f1f3ff",
          stats: { str: 1050, abl: 1120, def: 1030, hp: 1060 },
          bio: "Marc Spector, a mercenary bound to the moon god Khonshu, fighting by moonlight with crescent blades.",
        },
        {
          id: "mrfantastic",
          name: "Mr. Fantastic",
          model: M + "mr_fantastic__-_marvel_rivals.glb",
          portrait: P + "img_mister-fantastic.png",
          color: "#1c5fa8",
          accent: "#66c4ff",
          stats: { str: 980, abl: 1180, def: 1070, hp: 1040 },
          bio: "Reed Richards, a genius who stretches his body into any shape to outsmart his enemies.",
        },
        {
          id: "thething",
          name: "The Thing",
          model: M + "the_thing_-_marvel_rivals.glb",
          portrait: P + "img_the-thing.png",
          color: "#b5651d",
          accent: "#ffa64d",
          stats: { str: 1180, abl: 960, def: 1190, hp: 1170 },
          bio: "Ben Grimm, the Fantastic Four's rock-skinned powerhouse, who lets his fists do the talking.",
        },
        {
          id: "wintersoldier",
          name: "Winter Soldier",
          model: M + "winter_soldier_-_catws_mcu.glb",
          portrait: P + "img_winter-soldier.png",
          color: "#3b3f47",
          accent: "#9fb3c8",
          stats: { str: 1080, abl: 1090, def: 1050, hp: 1070 },
          bio: "Bucky Barnes, a brainwashed assassin turned ally, with a metal arm and a lifetime of combat skill.",
        },
      ];

      const STATS = [
        { key: "str", label: "STR", name: "Strength", icon: "heroes-i-str" },
        { key: "abl", label: "ABL", name: "Ability", icon: "heroes-i-abl" },
        { key: "def", label: "DEF", name: "Defense", icon: "heroes-i-def" },
        { key: "hp", label: "HP", name: "Health", icon: "heroes-i-hp" },
      ];

      const section = document.querySelector(".heroes");
      const arena = document.querySelector(".heroes .arena");
      if (arena && HEROES.length) init(section, arena);

      function init(section, arena) {
        // Every selector below is a full path from .heroes, so nothing else on the page can match it.
        const A = ".heroes .arena";
        const $ = (sel) => document.querySelector(sel);
        const frames = (n, cb) =>
          requestAnimationFrame(() => (n > 1 ? frames(n - 1, cb) : cb()));
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        const other = (side) => (side === "left" ? "right" : "left");
        const total = (h) =>
          STATS.reduce((sum, s) => sum + (h.stats[s.key] || 0), 0);

        // ------------------------------------------------ loading (the heavy part)
        // model-viewer (+ three.js) and the .glb files are only fetched when the section is near the screen,
        // after the page has finished loading and the browser is idle. Left model first, then right.
        let libPromise = null;
        const loadLib = () =>
          (libPromise ||= import(CFG.viewerSrc)
            .then(() => true)
            .catch((err) => {
              console.warn(
                "model-viewer failed to load; showing portraits only.",
                err,
              );
              return false;
            }));

        const pageIdle = new Promise((resolve) => {
          const idle = () =>
            "requestIdleCallback" in window
              ? requestIdleCallback(() => resolve(), { timeout: 3000 })
              : setTimeout(resolve, 300);
          document.readyState === "complete"
            ? idle()
            : window.addEventListener("load", idle, { once: true });
        });

        // ------------------------------------------------ HUD
        const createHud = (path) => {
          const nameEl = $(`${path} .name .nm`),
            bioEl = $(`${path} .bio`),
            list = $(`${path} .stats`);
          list.innerHTML = STATS.map(
            (s) =>
              `<li title="${s.name}"><span class="head"><svg aria-hidden="true"><use href="#${s.icon}"/></svg>${s.label}</span><b class="val">0</b></li>`,
          ).join("");
          const vals = [...list.querySelectorAll(".val")];
          const icons = [...list.querySelectorAll("svg")];
          return (hero) => {
            nameEl.textContent = hero.name;
            bioEl.textContent = hero.bio || "";
            list.style.borderBottomColor = hero.accent;
            icons.forEach((i) => (i.style.fill = hero.accent));
            STATS.forEach(
              (s, i) => (vals[i].textContent = hero.stats[s.key] || 0),
            );
          };
        };

        // ------------------------------------------------ slot = one fighter + one <model-viewer>. No animation at all: the model shows its own rest pose (T-pose / A-pose).
        const createSlot = (path) => {
          const fighter = $(path);
          const viewer = $(`${path} .mv`);
          const ghost = $(`${path} .ghost`);
          const ghostImg = $(`${path} .ghost img`);
          let hero = null,
            awake = false,
            epoch = 0,
            resolveLoad = () => {};

          const reveal = (e) =>
            frames(2, () => {
              if (e === epoch) fighter.classList.add("ready");
            }); // only once a real frame exists

          const reset = () => {
            epoch++;
            fighter.classList.remove("ready", "is-loser");
          };

          viewer.addEventListener("load", () => {
            if (hero && viewer.getAttribute("src") === hero.model)
              reveal(epoch); // ignore stale loads
            resolveLoad();
          });
          viewer.addEventListener("error", () => {
            console.warn(`Could not load model: ${hero && hero.model}`);
            resolveLoad();
          });

          const load = () => {
            reset();
            viewer.setAttribute("alt", `3D model of ${hero.name}`);
            viewer.setAttribute("camera-orbit", "0deg 84deg 105%");
            const loaded = new Promise((res) => {
              resolveLoad = res;
              setTimeout(res, 20000);
            });
            viewer.setAttribute("src", hero.model);
            return loaded;
          };

          return {
            set(next) {
              hero = next;
              ghost.style.background = hero.color;
              ghostImg.src = hero.portrait || "";
              if (awake) load();
              else reset();
            },
            wake() {
              awake = true;
              return hero ? load() : Promise.resolve();
            },
            sleep() {
              awake = false;
              reset();
              viewer.removeAttribute("src");
            }, // frees the model and its GPU memory
            loser(on) {
              fighter.classList.toggle("is-loser", on);
            },
          };
        };

        // ------------------------------------------------ setup
        const huds = {
          left: createHud(`${A} .stage .hud-left`),
          right: createHud(`${A} .stage .hud-right`),
        };
        const slots = {
          left: createSlot(`${A} .stage .fighter-left`),
          right: createSlot(`${A} .stage .fighter-right`),
        };
        const picks = { left: null, right: null };
        const tiles = new Map();
        const sideButtons = [
          ...document.querySelectorAll(`${A} .dock .versus-bar .pbtn`),
        ];
        const fightBtn = $(`${A} .dock .versus-bar .fight-btn`);
        const status = $(`${A} .heroes__sr`);
        const ko = $(`${A} .stage .ko`);
        let active = "left";
        let busy = false;

        const paint = () =>
          tiles.forEach((tile, hero) => {
            tile.toggleAttribute("data-p1", picks.left === hero);
            tile.toggleAttribute("data-p2", picks.right === hero);
            tile.setAttribute(
              "aria-disabled",
              String(picks.left === hero || picks.right === hero),
            ); // a picked hero can't be pressed again
          });

        const setActive = (side) => {
          active = side;
          arena.dataset.active = side;
          sideButtons.forEach((b) =>
            b.setAttribute("aria-pressed", String(b.dataset.side === side)),
          );
          paint();
        };

        const clearResult = () => {
          delete arena.dataset.result;
          ko.hidden = true;
          slots.left.loser(false);
          slots.right.loser(false);
        };

        const assign = (side, hero) => {
          picks[side] = hero;
          huds[side](hero);
          slots[side].set(hero);
        };

        const choose = (hero) => {
          if (busy || picks.left === hero || picks.right === hero) return;
          const side = active;
          clearResult();
          assign(side, hero);
          setActive(other(side));
          if (status)
            status.textContent = `${side === "left" ? "Player 1" : "Player 2"}: ${hero.name}`;
        };

        const roster = $(`${A} .dock .roster`);
        const fragment = document.createDocumentFragment();
        HEROES.forEach((hero) => {
          const tile = document.createElement("button");
          tile.type = "button";
          tile.className = "tile";
          tile.title = hero.name;
          tile.setAttribute("aria-label", hero.name);
          tile.style.background = hero.color;
          tile.innerHTML =
            '<span class="tab p1">P1</span><span class="tab p2">P2</span>';
          if (hero.portrait) {
            const img = new Image();
            img.alt = "";
            img.width = 300;
            img.height = 400;
            img.loading = "lazy";
            img.decoding = "async";
            img.src = hero.portrait;
            tile.appendChild(img);
          }
          tile.addEventListener("click", () => choose(hero));
          tiles.set(hero, tile);
          fragment.appendChild(tile);
        });
        roster.appendChild(fragment);

        sideButtons.forEach((b) =>
          b.addEventListener("click", () => {
            if (!busy) setActive(b.dataset.side);
          }),
        );

        // ------------------------------------------------ fight + K.O.
        const decide = () => {
          const a = total(picks.left),
            b = total(picks.right);
          const pLeft = 1 / (1 + (b / a) ** CFG.edge); // equal totals = 50/50
          return Math.random() < pLeft ? "left" : "right";
        };

        const setBusy = (on) => {
          busy = on;
          fightBtn.disabled = on;
          sideButtons.forEach((b) => (b.disabled = on));
        };

        fightBtn.addEventListener("click", async () => {
          if (busy) return;
          setBusy(true);
          clearResult();
          await wait(CFG.minRound);

          const win = decide(),
            lose = other(win);
          const w = picks[win],
            l = picks[lose];
          arena.dataset.result = win;
          slots[lose].loser(true);
          const line = $(`${A} .stage .ko span`);
          line.textContent = `${w.name} Wins`;
          line.style.color = w.accent;
          ko.hidden = false;
          if (status) status.textContent = `K.O. ${w.name} defeats ${l.name}.`;
          setBusy(false);
        });

        // start with two different heroes
        const byId = (id) => HEROES.find((h) => h.id === id);
        const first = byId(CFG.defaults[0]) || HEROES[0];
        const second =
          HEROES.find((h) => h !== first && h.id === CFG.defaults[1]) ||
          HEROES.find((h) => h !== first) ||
          first;
        assign("left", first);
        assign("right", second);
        setActive("left");

        // ------------------------------------------------ wake / sleep
        let awake = false,
          sleepTimer = 0,
          token = 0;
        const wakeUp = async () => {
          awake = true;
          const mine = ++token;
          const live = () => awake && mine === token;
          await pageIdle;
          if (!live() || !(await loadLib()) || !live()) return;
          await slots.left.wake();
          if (live()) slots.right.wake();
        };
        const sleepNow = () => {
          awake = false;
          token++;
          slots.left.sleep();
          slots.right.sleep();
        };

        if ("IntersectionObserver" in window) {
          new IntersectionObserver(
            (entries) => {
              const seen = entries[entries.length - 1].isIntersecting;
              clearTimeout(sleepTimer);
              if (seen && !awake) wakeUp();
              else if (!seen && awake) sleepTimer = setTimeout(sleepNow, 4000);
            },
            { rootMargin: "200px 0px" },
          ).observe(section);
        } else {
          wakeUp();
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Remarkable Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector("#cardsContainer"), async () => {
      const memories = [
        {
          id: 1,
          title: "Eng. Hamed Fadel",
          image:
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnV6eWt1ZndmbWlhdjJxaGU3ZjlzcXV4MmR6MDZmN2w4bG1wb3p0MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ui0Qh8Gqz8j1LQ67YS/giphy.gif",
          text: "Mr. Hamed Fadel, I honestly cannot say anything other than thank you. Thank you so much for everything you gave us — for all the effort, time, knowledge, and dedication you put into teaching us. Thank you for bringing my passion for mathematics back. You showed me that math is not just about numbers, equations, and problems that you have to memorize certain steps to solve. You taught me that mathematics is about logic, thinking, problem-solving, paying attention to details, and truly understanding what is in front of you. You taught us that it is not just about passing an exam, but about learning how to approach any problem in life in a logical way. You were never just a teacher who explained math to us. You were like a father and a mentor to all of us. You believed in us, made us believe that we were special, and always gave us the feeling that we could become something great in the future. Insha'Allah, we will never let you down. The news of your passing was a shock to all of us. I am truly sorry that I could not attend your funeral, but my respect for everything you gave us and my sadness over losing you are greater than anything that could make me forget what you meant to us. All I can sincerely say is: may Allah have mercy on you, forgive you, and reward you for every bit of knowledge and goodness you gave us. May everything you taught us continue to be a source of good deeds for you, even after you are gone",
        },
        {
          id: 2,
          title: "Eng. Mahmoud Farag",
          image:
            "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExazJhN2lxYjdjdzluMHh3Y2d2aGx5aGdoeWp6amd0enM1NjA5Y2MybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7xkxbhryQO7hm/giphy.gif",
          text: "I had always wanted to try learning AI, so I decided to apply for an NTI x Huawei course that lasted for a month, hoping that I could at least understand the basics or maybe even build a model. I was honestly surprised when I found out that Eng. Mahmoud was going to be our instructor. What an amazing coincidence — having one of the most talented and knowledgeable AI experts in Egypt as your instructor is something I truly did not expect. In less than a month, I was able to build my first AI model and, more importantly, understand the fundamentals of ML and DL and what AI actually means and how the field works. That month made the path ahead much clearer and made it much easier for me to continue learning and exploring areas like CV, NLP, and RAG. Even now, I feel that this experience helped me understand nearly 60% of the AI field and played a huge role in shaping where I am today in this field. I am genuinely grateful for everything you taught me and for the impact you had on my journey in AI",
        },
        {
          id: 4,
          title: "Eng. Esraa Eleraky",
          image:
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2h2ZjcxaGdheDg2aHNsbWcxZGU2aTAxNWxmY3Q4MTdiZmNsbWYyYyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/Fox4oWLsNMKD3QubO3/giphy.gif",
          text: "Thank you for everything you gave us and taught us in the field of Data Analysis",
        },
        {
          id: 5,
          title: "Ms. Nahla Fayyad",
          image:
            "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aTR0MzRjNmxjNmQ2bmU2Z2h6eG5nd25qM3dnaGhkYzZqdnBiNHpoOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1PB2ZpDj3CwPtaUW1l/giphy.gif",
          text: "There is honestly no single description that could fully capture the kind of person you are. You are a lawyer, a creative artist, a voice actress, a legal affairs manager for several companies, and a soft-skills lecturer. But beyond all of these titles, you are an intelligent, kind, friendly, ambitious, cheerful, passionate, and genuinely helpful person. You are the kind of person people simply want to talk to. You never hesitate to offer help when someone needs it, and it is easy to understand why everyone seems to love you, because you truly care about the people around you. Four sessions were enough for me to realize that you are the kind of person I wish I had known much earlier. Even though the time was short, the impression you left was much bigger than the number of sessions we had. I know that some problems happened with some people, and they were things none of us wanted to happen. On behalf of all of us, I would like to sincerely apologize that this period was not the way you hoped or wished it would be. I truly hope you find your passion again in everything you love, and that you achieve even greater success in everything you pursue. I hope you accomplish your dreams and continue being the amazing person you are. Thank you for everything you gave us, and I genuinely wish you nothing but the best in whatever comes next.",
        },
        {
          id: 6,
          title: "Eng. Basma Abdel Halim",
          image:
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2R5eXA0aXAzZHl4eDkxdjFnbmFqYmp0Z2wyYXllamg2cTVwdHdrMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NSRPQHOnHwV7M8siam/giphy.gif",
          text: "Over the scholarship of six months, I completed my journey of learning MERN Stack Development and built more than five projects, including a graduation project that won the award for Best Web Project across the entire scholarship program, along with financial rewards and official certificates from the Ministry. None of this would have been possible without Allah’s grace first, and then your effort, guidance, teaching, and dedication throughout this journey, Eng. Basma. Thank you so much for everything you taught us, for your support, and for all the effort you put into helping us reach this point. I truly appreciate everything you did for us, and I will always be grateful for the role you played in my journey.",
        },
        {
          id: 7,
          title: "Eng. George Samuel",
          image:
            "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzFoOGEwbjVicmJoc3N4dW5jeHFwZjBjaHdzanptdWJ2MzRsYWk5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RSnbPf5osSUKMdzwog/giphy.gif",
          text: "I have always believed that truly great people are not only good at what they do, but also try to share what they have learned so others can benefit from it. They are willing to invest their time and effort into making sure they provide the best they can. People like that are not easy to come across, and you do not always get the chance to meet or work with them. I consider myself lucky to have met and learned from someone who deserves much more than just a simple “thank you” for everything he has done. Eng. George, it was truly an honor to learn from you and to have the chance to work with such an amazing and dedicated person. Thank you for everything you provided for us throughout the six-month AI scholarship, from organizing and preparing the data all the way to understanding how to build a model that solves a problem in the best possible way. Your effort, dedication, and knowledge made a real difference in my learning journey, and I am genuinely grateful for everything you taught us.",
        },
        {
          id: 8,
          title: "Prof. Mohamed Zorkany",
          image:
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGppOHI5OTV5eTgybzl1dmt2bnhkZHl6a3J2N2o5cXh6NTlicWJyNiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/9xqCs4DOwsmILm7Ohx/giphy.gif",
          text: "It is definitely possible to walk your path alone in pursuit of what you want to achieve, but having someone to guide and support you can not only help you reach your destination faster, but can also help you go much further than you ever could have on your own. That is exactly what I can say to express my respect and gratitude to Professor Mohamed Zorkany. Those 60 hours were truly intense and exhausting, but at the same time, they were incredibly valuable and rewarding, especially in the fields of Computer Vision and Natural Language Processing. Thank you for your time, effort, knowledge, and guidance. I genuinely hope I get the opportunity to learn from you again someday.",
        },
        {
          id: 9,
          title: "Instructor Seddiqa Abouelela",
          image:
            "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTBxc3h5N2M4c25zemlyNHA2d3E2bzU5enZyOTA0bDVnM2tldzZyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Cmr1OMJ2FN0B2/giphy.gif",
          text: "Thanks",
        },
      ];

      const container = document.getElementById("cardsContainer");

      const COLS = 3;
      const CARD_SIZE = 300;
      const GAP = 20;
      const MIN_CARD_SIZE = 200;
      const MAX_CARD_SIZE = 400;
      const PIN_ICON =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/></svg>';

      let drag = null;
      let resize = null;

      // ---- drag (mouse, touch and pen) ----
      const startDrag = (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        const card = e.currentTarget;
        card.setPointerCapture(e.pointerId);
        drag = {
          card,
          startX: e.clientX,
          startY: e.clientY,
          cardX: parseInt(card.style.left) || 0,
          cardY: parseInt(card.style.top) || 0,
          threshold: e.pointerType === "touch" ? 10 : 5,
          moved: false,
        };
      };

      const moveDrag = (e) => {
        if (!drag) return;
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        if (!drag.moved) {
          if (Math.hypot(dx, dy) <= drag.threshold) return;
          drag.moved = true;
          drag.card.classList.add("dragging");
        }
        const rect = container.getBoundingClientRect();
        drag.card.style.left = `${clamp(drag.cardX + dx, 0, rect.width - drag.card.offsetWidth)}px`;
        drag.card.style.top = `${clamp(drag.cardY + dy, 0, rect.height - drag.card.offsetHeight)}px`;
      };

      const endDrag = () => {
        if (!drag) return;
        const { card, moved } = drag;
        drag = null;

        if (!moved) {
          // a click, not a drag: flip this card and turn the others back over
          document.querySelectorAll(".remark-card.flipped").forEach((other) => {
            if (other !== card) other.classList.remove("flipped");
          });
          card.classList.toggle("flipped");
          return;
        }

        card.classList.remove("dragging");
        card.style.transition = "transform 0.2s ease";
        setTimeout(() => (card.style.transition = ""), 200);
      };

      // ---- resize: drag the corner handle, square ratio, clamped to min/max ----
      const startResize = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = e.currentTarget.closest(".remark-card");
        e.currentTarget.setPointerCapture(e.pointerId);
        resize = {
          card,
          startX: e.clientX,
          startY: e.clientY,
          startSize: card.offsetWidth,
        };
        card.classList.add("resizing");
      };

      const moveResize = (e) => {
        if (!resize) return;
        const delta =
          (e.clientX - resize.startX + (e.clientY - resize.startY)) / 2;
        const size = clamp(
          resize.startSize + delta,
          MIN_CARD_SIZE,
          MAX_CARD_SIZE,
        );
        resize.card.style.width = `${size}px`;
        resize.card.style.height = `${size}px`;
      };

      const endResize = () => {
        if (!resize) return;
        resize.card.classList.remove("resizing");
        resize = null;
      };

      const createCard = (memory, posX, posY) => {
        const card = document.createElement("div");
        card.className = "remark-card";
        card.id = `card-${memory.id}`;
        card.style.left = `${posX}px`;
        card.style.top = `${posY}px`;

        card.innerHTML = `
        <div class="pin-indicator">${PIN_ICON}</div>
        <div class="resize-handle"></div>
        <div class="remark-card-front">
          <div class="card_image">
            <img src="${memory.image}" alt="${memory.title}">
          </div>
          <div class="card_title title-white">
            <p>${memory.title}</p>
          </div>
        </div>
        <div class="remark-card-back">
          <div class="memory-text">
            <p>${memory.text}</p>
          </div>
        </div>
      `;

        card.addEventListener("pointerdown", startDrag);
        card.addEventListener("pointermove", moveDrag);
        card.addEventListener("pointerup", endDrag);
        card.addEventListener("pointercancel", endDrag);

        const handle = card.querySelector(".resize-handle");
        handle.addEventListener("pointerdown", startResize);
        handle.addEventListener("pointermove", moveResize);
        handle.addEventListener("pointerup", endResize);
        handle.addEventListener("pointercancel", endResize);

        container.appendChild(card);
      };

      // Lays the cards out in a centered grid (re-run when the window is resized).
      const initCards = () => {
        container.innerHTML = "";

        const containerWidth = container.clientWidth;
        const cardsPerRow = Math.max(
          1,
          Math.min(COLS, Math.floor(containerWidth / (CARD_SIZE + GAP))),
        );
        const numRows = Math.ceil(memories.length / cardsPerRow);
        container.style.minHeight = `${20 + numRows * (CARD_SIZE + GAP)}px`;

        const totalWidth = cardsPerRow * CARD_SIZE + (cardsPerRow - 1) * GAP;
        const startX = (containerWidth - totalWidth) / 2;

        memories.forEach((memory, index) => {
          const row = Math.floor(index / cardsPerRow);
          const col = index % cardsPerRow;
          createCard(
            memory,
            startX + col * (CARD_SIZE + GAP),
            20 + row * (CARD_SIZE + GAP),
          );
        });
      };

      initCards();

      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initCards, 250);
      });

      container.addEventListener("contextmenu", (e) => {
        if (e.target.closest(".remark-card")) e.preventDefault();
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Contact Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector("#contactForm"), async () => {
      const EMAILJS_PUBLIC_KEY = "uUrrgNs_C0Tliopzj";
      const EMAILJS_SERVICE_ID = "service_m24zlrm";
      const EMAILJS_TEMPLATE_ID = "template_ruhliwo";
      const RECEIVER_EMAIL = "mohamedsamir093@gmail.com";

      const form = document.getElementById("contactForm");
      const wrapper = form.closest(".wrapper");
      const submitButton = form.querySelector(".submit-button");

      const emailReady = loadScript(LIBS.emailjs)
        .then(() => emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }))
        .catch(() => {});

      // Errors only; success is shown by the letter/envelope animation.
      const showError = (text) => {
        document.querySelector(".form-notification")?.remove();
        const notification = document.createElement("div");
        notification.className = "form-notification";
        notification.textContent = text;
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.classList.add("leaving");
          setTimeout(() => notification.remove(), 300);
        }, 3000);
      };

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const subject = form.elements.subject.value.trim();
        const message = form.elements.message.value.trim();

        if (!name || !email || !message) {
          alert("Please fill in all required fields.");
          return;
        }

        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Sending";

        try {
          await emailReady;
          if (!window.emailjs) throw new Error("EmailJS is not loaded");
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            name,
            email,
            subject,
            message,
            to_email: RECEIVER_EMAIL,
            time: new Date().toLocaleString(),
          });
          wrapper.classList.add("sent");
          form.reset();
        } catch (error) {
          console.error("EmailJS error:", error);
          showError("Failed to send message. Please try again later.");
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Footer Section
  // ---------------------------------------------------------------------------
  {
    whenNear(document.querySelector("footer.footer"), async () => {
      const messages = [
        "Psst... yes you, scrolling there!",
        "Every great story deserves a good ending",
        "Thanks 🫂 for Visiting My Portfolio",
        "All Rights Reserved © 2026",
        "Developed and Designed by",
        '<a class="link-samir" href="https://www.linkedin.com/in/mohamed-samir-5a2354224/">@Mohamed Samir</a>',
        '<a class="link-albert" href="https://wa.me/+201272964500">@Albert Frankenstein</a>',
        '<a class="link-cv" href="./Assets/Pdf/Mohamed Samir CV.pdf">@MoKnight93</a>',
        "Built with Love ❤️",
        "🟢 Available for new opportunities",
        "Theres a Zombie on your lawn 🧠",
        "We don't want zombies on the lawn 🧠",
        "Dancin' in the moonlight 🕺",
        "Gazing at the stars so bright 💫",
        "Holding you until the sunrise 🌅",
        "Sleeping until the midnight 🌃",
        "🎵Oppan Gangnam style🎵",
        "Eh- Sexy Lady💃",
        "Oh, oh, oh, oh",
        "🎵Oppan Gangnam style🎵",
        "Someone give this guy a coffee break ☕",
        "Scroll up, there's cooler stuff up there",
      ];

      const stage = document.querySelector("footer.footer .walker-stage");
      const walker = stage.querySelector(".walker");
      const bubble = walker.querySelector(".speech-bubble");

      let msgIndex = 0;
      let active = false;
      bubble.innerHTML = messages[0];

      // Walk and rotate messages only while the footer is on screen.
      const setActive = (value) => {
        active = value;
        walker.classList.toggle("active", value);
      };
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
          threshold: 0.1,
        }).observe(stage);
      } else {
        setActive(true);
      }

      setInterval(() => {
        if (!active) return;
        msgIndex = (msgIndex + 1) % messages.length;
        bubble.innerHTML = messages[msgIndex];
      }, 3500);
    });
  }
})();
