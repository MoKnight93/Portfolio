// Head Section Title
document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "Software Engineer",
    "MERN Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Engineer",
    "UI/UX Designer",
    "Problem Solver",
    "Competitive Programmer",
    "Critical Thinker",
    "Freelancer",
    "Video Editor",
    "Passionate Person",
    "Knowledge Seeker",
  ];
  let currentTextIndex = 0;

  function typeText(text) {
    return new Promise((resolve) => {
      let index = 0;
      const element = document.getElementById("typed-text");
      const interval = setInterval(() => {
        element.textContent += text[index++];
        if (index === text.length) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  }

  function deleteText() {
    return new Promise((resolve) => {
      const element = document.getElementById("typed-text");
      let index = element.textContent.length;
      const interval = setInterval(() => {
        element.textContent = element.textContent.slice(0, --index);
        if (index === 0) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  async function loopTexts() {
    while (true) {
      await typeText(texts[currentTextIndex]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await deleteText();
      currentTextIndex = (currentTextIndex + 1) % texts.length;
    }
  }

  loopTexts();
});





// About Section Name
document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    { name: "Mohamed Samir", color: "#608BC1" },
    { name: "MoKnight93", color: "#D4BEE4" },
    { name: "Albert Frankenstein", color: "#89AC46" },
  ];
  let currentTextIndex = 0;

  function typeText(text) {
    return new Promise((resolve) => {
      let index = 0;
      const element = document.getElementById("typed-name");
      const interval = setInterval(() => {
        element.textContent += text.name[index++]; // Add one character at a time
        if (index === text.name.length) {
          clearInterval(interval);
          resolve();
        }
      }, 100); // Typing speed (in milliseconds)
    });
  }

  function deleteText() {
    return new Promise((resolve) => {
      const element = document.getElementById("typed-name");
      let index = element.textContent.length;
      const interval = setInterval(() => {
        element.textContent = element.textContent.slice(0, --index); // Remove one character at a time
        if (index === 0) {
          clearInterval(interval);
          resolve();
        }
      }, 50); // Deleting speed (in milliseconds)
    });
  }

  async function loopTexts() {
    while (true) {
      const currentText = texts[currentTextIndex];

      // Set the color for the current text
      document.getElementById("typed-name").style.color = currentText.color;

      // Type the current text
      await typeText(currentText);

      // Pause before deleting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Delete the text
      await deleteText();

      // Move to the next text
      currentTextIndex = (currentTextIndex + 1) % texts.length;
    }
  }

  loopTexts(); // Start the loop
});

document.addEventListener("DOMContentLoaded", function () {
  const progressPath = document.querySelector(".progress-wrap path");
  const progressWrap = document.querySelector(".progress-wrap");

  // Calculate the total length of the SVG path
  const pathLength = progressPath.getTotalLength();
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = pathLength;

  // Update the progress based on scroll position
  function updateProgress() {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;

    // Show/hide the progress wrap based on scroll position
    if (scroll > 50) {
      progressWrap.classList.add("active-progress");
    } else {
      progressWrap.classList.remove("active-progress");
    }
  }

  // Attach scroll event listener
  window.addEventListener("scroll", updateProgress);

  // Scroll to top when the progress wrap is clicked
  progressWrap.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initial call to set the progress
  updateProgress();
});


















// Services Section
const services = [
  // Software Engineering
  "Software Design & Architecture",
  "Writing Efficient & Scalable Code",
  "Code Optimization & Refactoring",
  "Unit Testing & Debugging",
  "Technical Consulting & Solutions",

  // Web Development – Front-End
  "Interactive Web Interfaces",
  "Responsive Web Design",
  "Mobile-Friendly Websites",
  "Fast-Loading Web Pages",
  "Accessible & User-Friendly UI",

  // Web Development – Back-End
  "Server-Side Development",
  "API Development & Integration",
  "Database Management & SQL Queries",
  "Secure Server & Application Logic",
  "Performance Optimization",

  // UI/UX Design
  "User-Centered Interface Design",
  "UI Prototyping & Testing",
  "Designing Intuitive Workflows",
  "Creating Visually Appealing Layouts",

  // Data Analysis / Data Science
  "Data Cleaning & Preprocessing",
  "Insight Generation from Data",
  "Actionable Recommendations",
  "Data Visualization & Storytelling",
  "Statistical Analysis & Reporting",

  // AI / Machine Learning
  "Building Predictive Models",
  "Machine Learning Model Deployment",
  "AI-Driven Automation Solutions",
  "Algorithm Design for ML Tasks",

  // Problem Solving / Competitive Programming
  "Algorithm & Data Structure Optimization",
  "Competitive Programming Solutions",
  "Solving Complex Technical Problems",

  // General Computer Science / Project Skills
  "End-to-End Project Development",
  "Technical Decision Support",
  "System Architecture Planning",
];
const servicesList = document.getElementById("servicesList");

// Create service items
services.forEach((service) => {
  const item = document.createElement("div");
  item.className = "service-item";

  const text = document.createElement("span");
  text.textContent = service;

  const img = document.createElement("img");
  img.src = "https://img.icons8.com/?size=100&id=1651&format=png&color=000000";

  item.appendChild(text);
  item.appendChild(img);

  servicesList.appendChild(item);
});




















// Certificates Section
document.addEventListener("DOMContentLoaded", function () {
  const pdfFiles = [
    "./Assets/Pdf/Certificates/AI For Everyone(AI4E).pdf",
    "./Assets/Pdf/Certificates/Attendance_Certificate (2).pdf",
    "./Assets/Pdf/Certificates/Certifi.pdf",
    "./Assets/Pdf/Certificates/Course_Certificate_En (2).pdf",
    "./Assets/Pdf/Certificates/Course_Certificate_En.pdf",
    "./Assets/Pdf/Certificates/Course_Certificate_En_py.pdf",
    "./Assets/Pdf/Certificates/CS50x.pdf",
    "./Assets/Pdf/Certificates/download.pdf",
    "./Assets/Pdf/Certificates/downloaded - AI.pdf",
    "./Assets/Pdf/Certificates/downloaded - Py.pdf",
    "./Assets/Pdf/Certificates/downloaded - Web.pdf",
    "./Assets/Pdf/Certificates/Mohamed Samir Ahmad AI.pdf",
    "./Assets/Pdf/Certificates/Mohamed Samir Ahmad.pdf",
    "./Assets/Pdf/Certificates/MohamedSamir Ahmad-CyberOps Associa-certificate_2.pdf",
    "./Assets/Pdf/Certificates/MohamedSamir Ahmad-Cybersecurity Es-certificate.pdf",
    "./Assets/Pdf/Certificates/MohamedSamir Ahmad-Entrepreneurship-certificate.pdf",
    "./Assets/Pdf/Certificates/MohamedSamir Ahmad-Introduction to -certificate.pdf",
    "./Assets/Pdf/Certificates/MohamedSamir Ahmad-SUMMER TRAINING -certificate.pdf",
    "./Assets/Pdf/Certificates/NASA Space Apps Challenge.pdf",
  ];

  const swiperWrapper = document.querySelector(".certificates .swiper-wrapper");

  // Dynamically create slides for each PDF file
  pdfFiles.forEach((pdfFile) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const wrapper = document.createElement("div");
    wrapper.className = "pdf-wrapper";

    const iframe = document.createElement("iframe");
    iframe.src = pdfFile + "#toolbar=0&navpanes=0&scrollbar=0&view=Fit&zoom=page-height";
    iframe.title = "Certificate";
    iframe.loading = "lazy";

    wrapper.appendChild(iframe);
    swiperWrapper.appendChild(slide);
    slide.appendChild(wrapper);

    slide.addEventListener("click", () => {
      window.open(pdfFile, "_blank");
    });
  });


  // Initialize Swiper
  try {
    new Swiper(".certificates .mySwiper", {
      direction: "horizontal", // Horizontal scrolling
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true, // Loop through slides indefinitely
      autoHeight: true,
      mousewheel: true,
      pagination: {
        el: ".certificates .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".certificates .swiper-button-next",
        prevEl: ".certificates .swiper-button-prev",
      },
      autoplay: {
        delay: 5000, // Change slide every 5 seconds
        disableOnInteraction: false, // Continue autoplay after user interaction
      },
    });
  } catch (error) {
    console.error("Swiper initialization failed:", error);
  }
});
















// Popover
document.addEventListener("DOMContentLoaded", function () {
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl, {
      trigger: "hover focus", // Enables hover popover
      container: "body", // Prevents positioning issues
    });
  });
});








// Check Coin
function checkCoin() {
  let userInput = prompt("Enter The Treasure Number:");

  if (userInput === null || userInput.trim() === "") {
    alert("🍺 Ye slack-jawed sea rat! Spit it out or walk the plank!");
  } else if (userInput === "93") {
    document.querySelector(".coin").style.filter = "none";
    document.querySelector(".tc5").style.filter = "none";
    document.querySelector(".tc5").style.opacity = "1";
    alert("🏴‍☠️ By the rottin’ guts of Blackbeard, we hit the motherload! Gold, rum, and wenches for all! Now, drink till ye drop!");
  } else {
    alert("☠️ By the devil’s balls! All that work for this rotten, empty heap?! Worse than a dead man’s stench!");
  }
}









// Time
const animationDuration = 4000;
const frameDuration = 1000 / 60;
const totalFrames = Math.round(animationDuration / frameDuration);
const easeOutQuad = (t) => t * (2 - t);
const animateCountUp = (el) => {
  let frame = 0;
  const countTo = parseInt(el.innerHTML, 10);
  const counter = setInterval(() => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    const currentCount = Math.round(countTo * progress);
    if (parseInt(el.innerHTML, 10) !== currentCount) {
      el.innerHTML = currentCount;
    }
    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
};
const countupEls = document.querySelectorAll(".timer");
countupEls.forEach(animateCountUp);

const comicImages = {
  batman: [
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 001.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 003.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 004.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 005.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 006.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 007.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 008.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 009.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 010.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 011.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 012.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 013.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 014.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 015.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 016.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 017.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 018.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 019.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 021.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 022.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 023.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 024.jpg",
  ],
  spiderman: [
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0001.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0005.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0006.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0007.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0008.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0009.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0010.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0011.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0012.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0013.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0014.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0015.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0016.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0060.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0061.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0062.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0063.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0064.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0065.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0066.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0067.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0068.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0069.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0070.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0071.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0072.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0073.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0074.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0075.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0076.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0077.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0078.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0079.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0081.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0082.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0083.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0084.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0085.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0086.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0087.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0088.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0089.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0090.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0091.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0092.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0093.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0094.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0095.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0096.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0097.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0098.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0099.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0100.jpg",
  ],
  daredevil: [
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00001.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00003.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00004.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00005.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00006.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00007.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00008.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00009.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00010.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00011.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00012.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00013.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00014.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00015.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00016.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00017.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00018.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00018.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00019.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00020.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00021.jpg",
    "./Assets/Images/Daredevil/Daredevil 016 (2025) (Digital) (Shan-Empire) 00022.jpg",
  ],
};

// Modal elements
const modal = document.querySelector(".comic-modal");
const modalImg = document.querySelector(".modal-image");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const countDisplay = document.querySelector(".image-count");

let currentComic = "";
let currentIndex = 0;

// Open modal on poster click
document.querySelectorAll(".poster").forEach((poster) => {
  poster.addEventListener("click", () => {
    currentComic = poster.getAttribute("data-comic");
    currentIndex = 0;
    updateModal();
    modal.style.display = "block";
  });
});

// Close modal
document.querySelector(".close-modal").addEventListener("click", () => {
  modal.style.display = "none";
});

// Close on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Navigation
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex =
    (currentIndex - 1 + comicImages[currentComic].length) %
    comicImages[currentComic].length;
  updateModal();
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % comicImages[currentComic].length;
  updateModal();
});

// Keyboard navigation
window.addEventListener("keydown", (e) => {
  if (modal.style.display === "block") {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "Escape") modal.style.display = "none";
  }
});

function updateModal() {
  modalImg.src = comicImages[currentComic][currentIndex];
  countDisplay.textContent = `${currentIndex + 1}/${comicImages[currentComic].length
    }`;
}












// Party
const musicBoardData = {
  songs: [
    {
      songName: "This Fire Burns",
      artist: "Killswitch Engage",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b273cc5bb1a3f809896baf67dba4",
        song: "./Assets/Audios/Killswitch Engage - This Fire Burns (HQ).mp3",
      },
    },
    {
      songName: "Peligrosa",
      artist: "FloyyMenor",
      files: {
        cover: "https://i.scdn.co/image/ab67616d00001e02d0495d03671b5d9a365db8f5",
        song: "./Assets/Audios/FloyyMenor - Peligrosa (Video Oficial).mp3",
      },
    },
    {
      songName: "MALA",
      artist: "6ix9ine",
      files: {
        cover: "https://i.scdn.co/image/ab67616d00001e0208c1c9cba7dc84118976e66d",
        song: "./Assets/Audios/6ix9ine - MALA (feat. Anuel Aa).mp3",
      },
    },
    {
      songName: "Algo Como Tu",
      artist: "Kaydy Cain",
      files: {
        cover: "http://i.scdn.co/image/ab67616d0000b27374b027d613b42163780513dc",
        song: "./Assets/Audios/Kaydy Cain - Algo Como Tu (Video Oficial).mp3",
      },
    },
    {
      songName: "Take What You Want",
      artist: "Post Malone",
      files: {
        cover: "https://images.genius.com/e5ff99bdbe52cdb142ac91fad7b79a5e.822x822x1.jpg",
        song: "./Assets/Audios/Post Malone - Take What You Want (Audio) ft. Ozzy.mp3",
      },
    },
    {
      songName: "Save Your Tears",
      artist: "The Weeknd",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b273c6af5ffa661a365b77df6ef6",
        song: "./Assets/Audios/The Weeknd - Save Your Tears (Official Audio).mp3",
      },
    },
    {
      songName: "Goosebumps",
      artist: "Travis Scott ft. Kendrick Lamar",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b2738752a7355996e64709247c53",
        song: "./Assets/Audios/Travis Scott - goosebumps ft. Kendrick Lamar.mp3",
      },
    },
    {
      songName: "BUTTERFLY EFFECT",
      artist: "Travis Scott",
      files: {
        cover: "https://i1.sndcdn.com/artworks-AteYKQAUrh4vLE4n-pOmoTA-t1080x1080.jpg",
        song: "./Assets/Audios/Travis Scott - BUTTERFLY EFFECT (Official Music Video).mp3",
      },
    },
    {
      songName: "MOONLIGHT",
      artist: "XXXTENTACION",
      files: {
        cover: "https://images.genius.com/8b673f80818e4cc1b975e8d8cd81344c.1000x1000x1.png",
        song: "./Assets/Audios/XXXTENTACION - MOONLIGHT (OFFICIAL MUSIC VIDEO).mp3",
      },
    },
    {
      songName: "HOLIDAY",
      artist: "Lil Nas X",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b2736771a05f34d77e5fc2bde64c",
        song: "./Assets/Audios/Lil Nas X - HOLIDAY (Official Video).mp3",
      },
    },
    {
      songName: "Industry Baby",
      artist: "Lil Nas X ft. Jack Harlow",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b2731e212a6eff9f90acc8a2ff51",
        song: "./Assets/Audios/Lil Nas X - Industry Baby ft. Jack Harlow.mp3",
      },
    },
    {
      songName: "Old Town Road",
      artist: "Lil Nas X ft. Billy Ray Cyrus",
      files: {
        cover: "https://media.gq.com/photos/5cdeef0e1f8a4e271cddab8d/1:1/w_689,h_689,c_limit/Old-Town-Road-Video-GQ-2019-051719.jpg",
        song: "./Assets/Audios/Lil Nas X - Old Town Road (Official Video) ft. Billy Ray Cyrus.mp3",
      },
    },
    {
      songName: "HIGHEST IN THE ROOM",
      artist: "Travis Scott",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b273e42b5fea4ac4c3d6328b622b",
        song: "./Assets/Audios/Travis Scott - HIGHEST IN THE ROOM (Official Music).mp3",
      },
    },
    {
      songName: "SICKO MODE",
      artist: "Travis Scott ft. Drake",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3",
        song: "./Assets/Audios/Travis Scott - SICKO MODE (Official Audio).mp3",
      },
    },
  ],
};

// DOM Elements with unique names
const musicBoardPlaylistContainer = document.querySelector('.music-board .playlist');
const musicBoardSwiperWrapper = document.querySelector('.music-board .swiper-wrapper');
const musicBoardAudioPlayer = document.getElementById("musicBoardAudioPlayer");
const musicBoardVolumeRange = document.getElementById("musicBoardVolumeRange");
const musicBoardProgressBar = document.getElementById("musicBoardProgressBar");
const musicBoardPlayPauseBtn = document.getElementById("musicBoardPlayPauseBtn");
const musicBoardPlayPauseIcon = document.getElementById("musicBoardPlayPauseIcon");
const musicBoardPrevBtn = document.getElementById("musicBoardPrevBtn");
const musicBoardNextBtn = document.getElementById("musicBoardNextBtn");
const musicBoardShuffleBtn = document.getElementById("musicBoardShuffleBtn");

// State variables with unique names
let musicBoardCurrentSongIndex = 0;
let musicBoardIsSongLoaded = false;
let musicBoardSongs = [];
let musicBoardPlaylistItems = [];
let musicBoardSongDurations = {};
let musicBoardSwiperInstance = null;

// Initialize the application
function musicBoardInit() {
  musicBoardSongs = musicBoardData.songs;

  // Create Swiper slides
  musicBoardSongs.forEach((song, index) => {
    // Create Swiper slide
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
                    <img src="${song.files.cover}" />
                    <h1>${song.songName}</h1>
                `;
    musicBoardSwiperWrapper.appendChild(slide);

    // Create playlist item
    const playlistItem = document.createElement('div');
    playlistItem.className = 'playlist-item';
    playlistItem.innerHTML = `
                    <img src="${song.files.cover}" alt="${song.songName}" />
                    <div class="song">
                        <p>${song.songName}</p>
                        <p>${song.artist}</p>
                    </div>
                    <div class="duration">--:--</div>
                `;
    musicBoardPlaylistContainer.appendChild(playlistItem);
  });

  // Re-select DOM elements after creation
  musicBoardPlaylistItems = document.querySelectorAll(".music-board .playlist-item");

  // Initialize Swiper with full path
  musicBoardSwiperInstance = new Swiper(".music-board .swiper", {
    effect: "cards",
    cardsEffect: {
      perSlideOffset: 9,
      perSlideRotate: 3,
    },
    grabCursor: true,
    speed: 700,
    initialSlide: musicBoardCurrentSongIndex,
  });

  // Swiper event listener
  musicBoardSwiperInstance.on("slideChange", () => {
    const newIndex = musicBoardSwiperInstance.realIndex;
    if (newIndex !== musicBoardCurrentSongIndex) {
      musicBoardCurrentSongIndex = newIndex;
      musicBoardLoadAndPlaySong(musicBoardCurrentSongIndex);
      musicBoardUpdatePlayPauseIcon(true);
    }
  });

  // Event listeners for playlist items
  musicBoardPlaylistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      musicBoardCurrentSongIndex = index;
      musicBoardLoadAndPlaySong(index);
      if (musicBoardSwiperInstance) {
        musicBoardSwiperInstance.slideTo(index);
      }
    });
  });

  // Initialize with first song
  musicBoardUpdatePlaylistHighlight(musicBoardCurrentSongIndex);
  if (musicBoardSwiperInstance) {
    musicBoardSwiperInstance.slideTo(musicBoardCurrentSongIndex);
  }
}

// Update Swiper to match current song
function musicBoardUpdateSwiperToMatchSong(index) {
  if (musicBoardSwiperInstance && musicBoardSwiperInstance.activeIndex !== index) {
    musicBoardSwiperInstance.slideTo(index);
  }
}

// Update playlist highlight
function musicBoardUpdatePlaylistHighlight(index) {
  musicBoardPlaylistItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add("active-playlist-item");
    } else {
      item.classList.remove("active-playlist-item");
    }
  });
}

// Load and play song
function musicBoardLoadAndPlaySong(index) {
  musicBoardAudioPlayer.src = musicBoardSongs[index].files.song;

  // If we already have the duration, display it
  if (musicBoardSongDurations[index]) {
    musicBoardUpdateDurationDisplay(index, musicBoardSongDurations[index]);
  }

  musicBoardPlaySong();
  musicBoardUpdatePlaylistHighlight(index);
  musicBoardUpdateSwiperToMatchSong(index);
  musicBoardIsSongLoaded = true;

  // Load duration if not already loaded
  if (!musicBoardSongDurations[index]) {
    musicBoardAudioPlayer.addEventListener('loadedmetadata', function () {
      const duration = Math.floor(musicBoardAudioPlayer.duration);
      musicBoardSongDurations[index] = duration;
      musicBoardUpdateDurationDisplay(index, duration);

      // Update progress bar
      musicBoardProgressBar.max = duration;
    }, { once: true });
  }
}

// Update duration display
function musicBoardUpdateDurationDisplay(index, duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  musicBoardPlaylistItems[index].querySelector('.duration').textContent =
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Play song
function musicBoardPlaySong() {
  musicBoardAudioPlayer.play().catch(error => {
    console.log("Play error:", error);
    alert("Audio playback error. This might be due to browser autoplay policies. Please click the play button manually.");
  });
  musicBoardUpdatePlayPauseIcon(true);
}

// Pause song
function musicBoardPauseSong() {
  musicBoardAudioPlayer.pause();
  musicBoardUpdatePlayPauseIcon(false);
}

// Toggle play/pause
function musicBoardTogglePlayPause() {
  if (!musicBoardIsSongLoaded) {
    musicBoardLoadAndPlaySong(musicBoardCurrentSongIndex);
    musicBoardIsSongLoaded = true;
  } else if (musicBoardAudioPlayer.paused) {
    musicBoardPlaySong();
  } else {
    musicBoardPauseSong();
  }
}

// Update play/pause icon
function musicBoardUpdatePlayPauseIcon(isPlaying) {
  if (isPlaying) {
    musicBoardPlayPauseIcon.classList.add("fa-pause");
    musicBoardPlayPauseIcon.classList.remove("fa-play");
  } else {
    musicBoardPlayPauseIcon.classList.add("fa-play");
    musicBoardPlayPauseIcon.classList.remove("fa-pause");
  }
}

// Next song
function musicBoardNextSong() {
  musicBoardCurrentSongIndex = (musicBoardCurrentSongIndex + 1) % musicBoardSongs.length;
  musicBoardLoadAndPlaySong(musicBoardCurrentSongIndex);
  if (musicBoardSwiperInstance) {
    musicBoardSwiperInstance.slideTo(musicBoardCurrentSongIndex);
  }
}

// Previous song
function musicBoardPrevSong() {
  musicBoardCurrentSongIndex = (musicBoardCurrentSongIndex - 1 + musicBoardSongs.length) % musicBoardSongs.length;
  musicBoardLoadAndPlaySong(musicBoardCurrentSongIndex);
  if (musicBoardSwiperInstance) {
    musicBoardSwiperInstance.slideTo(musicBoardCurrentSongIndex);
  }
}

// Player control event listeners
musicBoardPlayPauseBtn.addEventListener("click", musicBoardTogglePlayPause);
musicBoardNextBtn.addEventListener("click", musicBoardNextSong);
musicBoardPrevBtn.addEventListener("click", musicBoardPrevSong);

// Audio player event listeners
musicBoardAudioPlayer.addEventListener("loadedmetadata", () => {
  musicBoardProgressBar.max = musicBoardAudioPlayer.duration;
  musicBoardProgressBar.value = musicBoardAudioPlayer.currentTime;
});

musicBoardAudioPlayer.addEventListener("timeupdate", () => {
  if (!musicBoardAudioPlayer.paused) {
    musicBoardProgressBar.value = musicBoardAudioPlayer.currentTime;
  }
});

// Progress bar event listeners
musicBoardProgressBar.addEventListener("input", () => {
  musicBoardAudioPlayer.currentTime = musicBoardProgressBar.value;
});

musicBoardProgressBar.addEventListener("change", () => {
  musicBoardPlaySong();
});

// Volume control
musicBoardVolumeRange.addEventListener("input", () => {
  var newVolume = musicBoardVolumeRange.value;
  musicBoardAudioPlayer.volume = newVolume / 100;
});

// When song ends, play next
musicBoardAudioPlayer.addEventListener("ended", musicBoardNextSong);

// Shuffle functionality
musicBoardShuffleBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * musicBoardSongs.length);

  if (randomIndex !== musicBoardCurrentSongIndex) {
    musicBoardCurrentSongIndex = randomIndex;
    musicBoardLoadAndPlaySong(musicBoardCurrentSongIndex);
  } else {
    const nextRandomIndex = (randomIndex + 1) % musicBoardSongs.length;
    musicBoardCurrentSongIndex = nextRandomIndex;
    musicBoardLoadAndPlaySong(musicBoardCurrentSongIndex);
  }

  if (musicBoardSwiperInstance) {
    musicBoardSwiperInstance.slideTo(musicBoardCurrentSongIndex);
  }
});

// Initialize the app when page loads
window.addEventListener('load', musicBoardInit);









// Memory Game Photos
const myPhotos = [
  {
    url: "./Assets/Images/Photos/20240723_203511.jpg",
    name: "1"
  },
  {
    url: "./Assets/Images/Photos/20220824_121139.jpg",
    name: "2"
  },
  {
    url: "./Assets/Images/Photos/IMG-20240708-WA0027.jpg",
    name: "3"
  },
  {
    url: "./Assets/Images/Photos/IMG-20251007-WA0002.jpg",
    name: "4"
  },
];

// Game state
const gameState = {
  cards: [],
  flippedCards: [],
  canFlip: true
};

// DOM elements
const cardsGrid = document.getElementById('cards-grid');

// Initialize game
function initGame() {
  gameState.cards = [];
  gameState.flippedCards = [];
  gameState.canFlip = true;

  // Clear grid
  cardsGrid.innerHTML = '';

  // Create card pairs
  const cardPairs = [];
  myPhotos.forEach(photo => {
    cardPairs.push({ ...photo });
    cardPairs.push({ ...photo }); // Add duplicate for pair
  });

  // Shuffle cards using Fisher-Yates algorithm
  const shuffledCards = [...cardPairs];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  // Create card elements
  shuffledCards.forEach((photo, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = index;
    card.dataset.name = photo.name;

    // Card back (same for all)
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';

    // Card front (your photo)
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = `Photo ${photo.name}`;
    img.loading = 'lazy';
    cardFront.appendChild(img);

    // Assemble card
    card.appendChild(cardBack);
    card.appendChild(cardFront);

    // Add click event
    card.addEventListener('click', () => flipCard(card));

    // Add to grid and state
    cardsGrid.appendChild(card);
    gameState.cards.push({
      element: card,
      name: photo.name,
      flipped: false,
      matched: false
    });
  });
}

// Flip card function
function flipCard(cardElement) {
  if (!gameState.canFlip) return;

  const cardIndex = parseInt(cardElement.dataset.index);
  const card = gameState.cards[cardIndex];

  if (card.flipped || card.matched) return;

  // Flip the card
  cardElement.classList.add('flipped');
  card.flipped = true;
  gameState.flippedCards.push(card);

  // Check for match when two cards are flipped
  if (gameState.flippedCards.length === 2) {
    gameState.canFlip = false;

    const card1 = gameState.flippedCards[0];
    const card2 = gameState.flippedCards[1];

    if (card1.name === card2.name) {
      // Match found
      setTimeout(() => {
        card1.matched = true;
        card2.matched = true;
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');

        // Reset flipped cards
        gameState.flippedCards = [];
        gameState.canFlip = true;
      }, 600);
    } else {
      // No match - flip back
      setTimeout(() => {
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
        card1.flipped = false;
        card2.flipped = false;

        // Reset flipped cards
        gameState.flippedCards = [];
        gameState.canFlip = true;
      }, 1000);
    }
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initGame);

// Instructions for customization
console.log('To customize with your photos:');
console.log('1. Replace the URLs in the myPhotos array with your photo URLs');
console.log('2. Update the photo names in the name property');
console.log('3. Change the card-back background by modifying the .card-back::before background-image');







// Hero Section - Simplified and working
(() => {
  const heroesData = [
    { name: "SpiderMan", model: "./Assets/Models/spider-_man_chapter_3_season_2_skin.glb", description: "A quick-witted hero who swings through the city, using his acrobatic agility, web-slinging skills, and spider-sense to outmaneuver enemies and protect the innocent." },
    { name: "Thor", model: "./Assets/Models/thor__marvel_rivals.glb", description: "The mighty God of Thunder wields Mjolnir to summon lightning, crush foes with godly strength, and defend realms with unshakable valor." },
    { name: "Batman", model: "./Assets/Models/stylized_fortnite_batman.glb", description: "A relentless vigilante and tactical genius, wielding fear, combat mastery, and advanced technology to protect Gotham from crime." },
    { name: "Moon Knight", model: "./Assets/Models/moon_knight.glb", description: "A relentless vigilante empowered by Khonshu, striking from the shadows with masterful combat skills, unbreakable will, and multiple identities that keep enemies guessing." },
    { name: "Doctor Strange", model: "./Assets/Models/doctor_strange__marvel_rivals.glb", description: "The Sorcerer Supreme wields mystical arts to bend reality, conjure powerful spells, and protect the multiverse from supernatural threats." },
    { name: "Venom", model: "./Assets/Models/venomvenommarvel_rivals.glb", description: "A fearsome anti-hero bonded with a powerful symbiote, granting superhuman strength, shape-shifting abilities, and a monstrous appetite for justice—or vengeance." },
    { name: "Deadpool", model: "./Assets/Models/deadpool_movie_model.glb", description: "An unkillable mercenary with a razor-sharp wit, unmatched combat skills, and a healing factor that makes him nearly unstoppable—breaking the fourth wall as easily as his enemies." },
    { name: "Wolverine", model: "./Assets/Models/james_howlett_-_wolverine.glb", description: "A fierce warrior with unbreakable claws, accelerated healing, and a relentless fighting spirit, carving through enemies with primal ferocity." }
  ];

  const cardContainer = document.getElementById("heroCardContainer");

  // Build HTML structure
  const buildCards = () => {
    if (!cardContainer) return;
    heroesData.forEach((hero) => {
      const card = document.createElement("div");
      card.className = "hero-card";
      
      card.innerHTML = `
        <div class="overflow">
          <div class="model">
            <model-viewer camera-orbit="0deg 90deg 164m" camera-target="0m 140m 10m" src="${hero.model}" shadow-intensity="0.4"></model-viewer>
          </div>
        </div>
        <div class="glass">
          <div class="gradient-blur">
            <div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
        <div class="content">
          <h2>${hero.name}</h2>
          <p>${hero.description}</p>
        </div>
      `;
      
      cardContainer.appendChild(card);
    });
  };

  // Initialize and set attributes immediately
  const initHeros = () => {
    const modelViewers = document.querySelectorAll(".hero model-viewer");
    const cards = document.querySelectorAll(".hero-card");

    if (modelViewers.length === 0 || cards.length === 0) return;

    // Set attributes immediately and synchronously
    modelViewers.forEach((modelViewer) => {
      modelViewer.setAttribute("camera-orbit", "0deg 90deg 164m");
      modelViewer.setAttribute("camera-target", "auto");
      modelViewer.setAttribute("interpolation-decay", "200");
      modelViewer.style.opacity = "1";
      modelViewer.classList.add("loaded");

      // Ensure visibility on load
      if (modelViewer.loaded) {
        modelViewer.dispatchEvent(new Event("load"));
      }
      modelViewer.addEventListener("load", () => {
        modelViewer.style.opacity = "1";
        modelViewer.classList.add("loaded");
      });
    });

    // Add hover interactions
    cards.forEach((card, index) => {
      const modelViewer = modelViewers[index];
      if (!modelViewer) return;

      const calcOrbit = (xPos, cardRect) => {
        const normalizedX = (xPos - cardRect.left) / cardRect.width;
        const angle = normalizedX * 180 - 90;
        return `${-angle}deg 90deg 164m`;
      };

      card.addEventListener("mousemove", (event) => {
        const cardRect = card.getBoundingClientRect();
        const orbit = calcOrbit(event.clientX, cardRect);
        modelViewer.setAttribute("camera-orbit", orbit);
      });

      card.addEventListener("mouseleave", () => {
        modelViewer.setAttribute("camera-orbit", "0deg 90deg 164m");
      });
    });
  };

  // Execute on DOM ready - synchronized with other events
  const initHeroSection = () => {
    buildCards();
    // Delay initHeros slightly to ensure DOM is fully ready
    setTimeout(initHeros, 50);
  };

  document.addEventListener("DOMContentLoaded", initHeroSection, { once: true });
})();











// TV
function clock() {
  // Save the times in variables
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var month = today.getMonth();
  var day = today.getDate();
  var year = today.getFullYear();
  var monthNames = [
    "JAN.",
    "FEB.",
    "MAR.",
    "APR.",
    "MAY.",
    "JUN.",
    "JUL.",
    "AUG.",
    "SEP.",
    "OCT.",
    "NOV.",
    "DEC.",
  ];
  // Set the AM or PM time
  if (hours >= 12) {
    meridiem = "PM";
  } else {
    meridiem = "AM";
  }
  // Convert hours to 12 hour format and put 0 in front
  if (hours > 12) {
    hours = hours - 12;
  } else if (hours === 0) {
    hours = 12;
  }
  // Put 0 in front of single digit minutes and seconds
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  } else {
    seconds = seconds;
  }
  document.getElementById("clock").innerHTML =
    meridiem + " " + hours + ":" + minutes;
  document.getElementById("date").innerHTML =
    monthNames[month] + " " + day + " " + year;
}
setInterval("clock()", 0);

function background() {
  var tvScreen = document.querySelector(".tv-screen");
  var h1 = document.querySelector("h1");

  // Toggle the background class
  tvScreen.classList.toggle("background");
}









// Loading Screen
setTimeout(() => {
  let loadingContainer = document.getElementById("loadingContainer");
  // Fade out the loading container
  loadingContainer.classList.add("fade-out");

  // After fade-out completes, hide loading container and re-enable scrolling
  setTimeout(() => {
    loadingContainer.remove(); // Remove loading container from DOM
  }, 1500); // Match the duration of the fade-out animation
}, 8000); // Wait 8 seconds before starting the transition

// Frank
var hello;
var interacted = false;
var bod = document.querySelector(".frank .body");

function changePos(dir) {
  var currentBodyPos = parseInt(bod.getAttribute("data-body-pos"));
  var currentArmPos = parseInt(bod.getAttribute("data-arm-pos"));

  if (dir === "up") {
    if (currentBodyPos > 0)
      bod.setAttribute("data-body-pos", currentBodyPos - 1);
    else bod.setAttribute("data-body-pos", 2);
  }

  if (dir === "down") {
    if (currentBodyPos < 2)
      bod.setAttribute("data-body-pos", currentBodyPos + 1);
    else bod.setAttribute("data-body-pos", 0);
  }

  if (dir === "left") {
    if (currentArmPos > 0) bod.setAttribute("data-arm-pos", currentArmPos - 1);
    else bod.setAttribute("data-arm-pos", 4);
  }

  if (dir === "right") {
    if (currentArmPos < 4) bod.setAttribute("data-arm-pos", currentArmPos + 1);
    else bod.setAttribute("data-arm-pos", 0);
  }
}

function wave() {
  if (!interacted) {
    var waveInterval = Math.floor(Math.random() * 5) + 3;
    bod.classList.add("wave");
    setTimeout(wave, waveInterval * 1000);
  }
}

bod.addEventListener("animationend", function () {
  bod.classList.remove("wave");
});

window.addEventListener("keydown", function (e) {
  interacted = true;

  switch (e.key) {
    case "ArrowUp":
      // e.preventDefault();
      changePos("up");
      break;
    case "ArrowDown":
      // e.preventDefault();
      changePos("down");
      break;
    case "ArrowLeft":
      // e.preventDefault();
      changePos("left");
      break;
    case "ArrowRight":
      // e.preventDefault();
      changePos("right");
      break;
    default:
      return false;
  }
});

window.onload = wave();














// Remarkable
const memories = [
  {
    id: 1,
    title: "Mr. Hamed Fadel",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnV6eWt1ZndmbWlhdjJxaGU3ZjlzcXV4MmR6MDZmN2w4bG1wb3p0MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ui0Qh8Gqz8j1LQ67YS/giphy.gif",
    text: "I don’t know what to say except thank you for everything you gave, selflessly and sincerely. Thank you for bringing my passion for mathematics back to life and showing me that it’s not just numbers, but logic, structured thinking, and clarity of mind. You taught me how to think correctly and what it truly means to be a good engineer, not just someone who memorizes. You were like a father figure, not only to me but to many who needed guidance and belief. I regret that I couldn’t attend the funeral, but my respect and sadness remain. All I can offer now is a sincere prayer: may God have mercy on you, and may every piece of knowledge you shared be counted in your good deeds"
  },
  {
    id: 2,
    title: "Dr. Mahmoud Farag",
    image: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExazJhN2lxYjdjdzluMHh3Y2d2aGx5aGdoeWp6amd0enM1NjA5Y2MybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7xkxbhryQO7hm/giphy.gif",
    text: "Imagine being interested in AI while knowing almost nothing about it, joining a course expecting only basic theory, and then discovering that your instructor is one of the most well-known AI educators and speakers in Egypt. In less than one month, I was able to truly understand AI, Machine Learning, and Deep Learning—both theoretically and practically—through hands-on projects. That single month helped me grasp nearly 60% of the AI field and played a major role in shaping who I am today; without him, I honestly wouldn’t be where I am now"
  },
  {
    id: 4,
    title: "Eng. Esraa Eleraky",
    image: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWFiM3B2Z2VqMTc0ZzNhcDcydWJqNDdvdTlhYTFldHBqMXFsdGN2aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tDFmApXRr5b24uI3sd/giphy.gif",
    text: "I don’t know what to say except thank you for everything. You didn’t just teach me how to be a data analyst, you taught me how to think like one to look beyond the numbers and search for context, meaning, and insight in everything I analyze"
  },
  {
    id: 5,
    title: "Eng. Nahla Fayyad",
    image: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aTR0MzRjNmxjNmQ2bmU2Z2h6eG5nd25qM3dnaGhkYzZqdnBiNHpoOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1PB2ZpDj3CwPtaUW1l/giphy.gif",
    text: "In just four sessions, I got to know an incredible person: a voice actor, a lawyer, someone managing the legal affairs of several companies, a freelance lecturer, and a talented painter. On our behalf, I want to apologize that the period wasn’t what you wished it to be, but you gave us something we will never forget. We wish for you to rediscover your passion and achieve even greater success in everything you pursue"
  },
  {
    id: 6,
    title: "Eng. Basma Abdel Halim",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2R5eXA0aXAzZHl4eDkxdjFnbmFqYmp0Z2wyYXllamg2cTVwdHdrMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NSRPQHOnHwV7M8siam/giphy.gif",
    text: "Over the course of six months, I completed my journey learning the MERN stack in full, building more than five projects, including a graduation project that was awarded as the best web project at the scholarship level, along with financial rewards and official certificates from the ministry. None of this would have been possible without God first, and then Engineer Basma. Thank you, thank you, and thank you"
  },
  {
    id: 7,
    title: "Eng. George Samuel",
    image: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzFoOGEwbjVicmJoc3N4dW5jeHFwZjBjaHdzanptdWJ2MzRsYWk5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RSnbPf5osSUKMdzwog/giphy.gif",
    text: "I haven’t finished my mentorship in AI and Data Science yet, and I’ll update this testimonial later once I do. For now, I want to sincerely thank you for everything. I will do my best to ensure that your work with us is highlighted and properly recognized, especially considering the effort, time, and guidance you’ve given me so far. Thank you for believing in me and for your continuous support"
  },
];

// DOM elements
const cardsContainer = document.getElementById('cardsContainer');

// State
let draggedCard = null;
let isDragging = false;
let startX = 0;
let startY = 0;
let cardStartX = 0;
let cardStartY = 0;
let resizeTimeout;

// Initialize cards
function initCards() {
  // Clear container
  cardsContainer.innerHTML = '';

  // Calculate initial positions in a grid (4 columns max)
  const cols = 4;
  const cardWidth = 300;
  const cardHeight = 300;
  const gap = 20;
  const containerWidth = cardsContainer.clientWidth;

  // Calculate how many cards per row (max 4)
  const cardsPerRow = Math.min(cols, Math.floor(containerWidth / (cardWidth + gap)));

  // Calculate number of rows needed
  const numRows = Math.ceil(memories.length / cardsPerRow);

  // Calculate dynamic container height
  const containerHeight = 20 + (numRows * (cardHeight + gap));
  cardsContainer.style.minHeight = `${containerHeight}px`;

  // Calculate starting position to center cards
  const totalWidth = cardsPerRow * cardWidth + (cardsPerRow - 1) * gap;
  const startX = (containerWidth - totalWidth) / 2;

  // Create and position cards
  memories.forEach((memory, index) => {
    const row = Math.floor(index / cardsPerRow);
    const col = index % cardsPerRow;

    const posX = startX + col * (cardWidth + gap);
    const posY = 20 + row * (cardHeight + gap);

    createCard(memory, posX, posY);
  });
}

// Create a card element
function createCard(memory, posX, posY) {
  const card = document.createElement('div');
  card.className = 'remark-card';
  card.id = `card-${memory.id}`;
  card.dataset.id = memory.id;

  // Set initial position
  card.style.left = `${posX}px`;
  card.style.top = `${posY}px`;

  const titleClass = 'title-white';

  card.innerHTML = `
                <div class="pin-indicator">
                    <i class="fas fa-thumbtack"></i>
                </div>
                <div class="remark-card-front">
                    <div class="card_image">
                        <img src="${memory.image}" alt="${memory.title}">
                    </div>
                    <div class="card_title ${titleClass}">
                        <p>${memory.title}</p>
                    </div>
                </div>
                <div class="remark-card-back">
                    <div class="memory-text">
                        <p>${memory.text}</p>
                    </div>
                    ${memory.date ? `<div class="memory-date">${memory.date}</div>` : ''}
                </div>
            `;

  // Add event listeners
  card.addEventListener('mousedown', startDrag);
  card.addEventListener('touchstart', startDragTouch, { passive: false });

  cardsContainer.appendChild(card);
}

// Mouse drag functions
function startDrag(e) {
  // Prevent text selection
  e.preventDefault();

  // Don't start drag if it's a double click or right click
  if (e.button !== 0) return;

  draggedCard = e.currentTarget;
  isDragging = false; // Will be set to true after movement

  // Get starting positions
  startX = e.clientX;
  startY = e.clientY;
  cardStartX = parseInt(draggedCard.style.left) || 0;
  cardStartY = parseInt(draggedCard.style.top) || 0;

  // Add global event listeners
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  // Store initial positions for click detection
  draggedCard.dataset.startX = startX;
  draggedCard.dataset.startY = startY;
}

function onMouseMove(e) {
  if (!draggedCard) return;

  // Calculate movement distance
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Start dragging only if moved more than 5 pixels (prevents accidental drags)
  if (distance > 5 && !isDragging) {
    isDragging = true;
    draggedCard.classList.add('dragging');
  }

  if (isDragging) {
    const container = cardsContainer;
    const containerRect = container.getBoundingClientRect();
    const cardWidth = draggedCard.offsetWidth;
    const cardHeight = draggedCard.offsetHeight;

    // Calculate new position
    let newX = cardStartX + dx;
    let newY = cardStartY + dy;

    // Keep card within container boundaries
    newX = Math.max(0, Math.min(newX, containerRect.width - cardWidth));
    newY = Math.max(0, Math.min(newY, containerRect.height - cardHeight));

    // Update card position smoothly
    draggedCard.style.left = `${newX}px`;
    draggedCard.style.top = `${newY}px`;
  }
}

function onMouseUp(e) {
  if (!draggedCard) return;

  // Calculate movement distance
  const startX = parseFloat(draggedCard.dataset.startX);
  const startY = parseFloat(draggedCard.dataset.startY);
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // If not dragging (movement was less than threshold), it's a click -> flip
  if (!isDragging && distance < 5) {
    // Remove any existing flipped class
    document.querySelectorAll('.remark-card.flipped').forEach(card => {
      if (card !== draggedCard) card.classList.remove('flipped');
    });

    // Toggle flip on current card
    draggedCard.classList.toggle('flipped');
  }

  // Clean up
  if (isDragging) {
    draggedCard.classList.remove('dragging');

    // Add a small animation when dropping
    draggedCard.style.transition = 'transform 0.2s ease';
    setTimeout(() => {
      if (draggedCard) draggedCard.style.transition = '';
    }, 200);
  }

  draggedCard = null;
  isDragging = false;

  // Remove global event listeners
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

// Touch drag functions for mobile
function startDragTouch(e) {
  e.preventDefault();

  if (e.touches.length !== 1) return;

  const touch = e.touches[0];
  draggedCard = e.currentTarget;
  isDragging = false;

  startX = touch.clientX;
  startY = touch.clientY;
  cardStartX = parseInt(draggedCard.style.left) || 0;
  cardStartY = parseInt(draggedCard.style.top) || 0;

  draggedCard.dataset.startX = startX;
  draggedCard.dataset.startY = startY;

  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd);
}

function onTouchMove(e) {
  if (!draggedCard || e.touches.length !== 1) return;

  e.preventDefault();
  const touch = e.touches[0];

  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 10 && !isDragging) {
    isDragging = true;
    draggedCard.classList.add('dragging');
  }

  if (isDragging) {
    const container = cardsContainer;
    const containerRect = container.getBoundingClientRect();
    const cardWidth = draggedCard.offsetWidth;
    const cardHeight = draggedCard.offsetHeight;

    let newX = cardStartX + dx;
    let newY = cardStartY + dy;

    newX = Math.max(0, Math.min(newX, containerRect.width - cardWidth));
    newY = Math.max(0, Math.min(newY, containerRect.height - cardHeight));

    draggedCard.style.left = `${newX}px`;
    draggedCard.style.top = `${newY}px`;
  }
}

function onTouchEnd(e) {
  if (!draggedCard) return;

  const touch = e.changedTouches[0];
  const startX = parseFloat(draggedCard.dataset.startX);
  const startY = parseFloat(draggedCard.dataset.startY);
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (!isDragging && distance < 10) {
    document.querySelectorAll('.remark-card.flipped').forEach(card => {
      if (card !== draggedCard) card.classList.remove('flipped');
    });

    draggedCard.classList.toggle('flipped');
  }

  if (isDragging) {
    draggedCard.classList.remove('dragging');
    draggedCard.style.transition = 'transform 0.2s ease';
    setTimeout(() => {
      if (draggedCard) draggedCard.style.transition = '';
    }, 200);
  }

  draggedCard = null;
  isDragging = false;

  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
  initCards();

  // Handle window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initCards, 250);
  });

  // Disable right-click menu on cards
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.remark-card')) {
      e.preventDefault();
    }
  });
});














// Contact Form
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const messagesList = document.getElementById('messagesList');
  const noMessages = document.getElementById('noMessages');
  const messagesTitle = document.getElementById('messagesTitle');
  
  // Load existing messages from localStorage
  loadMessages();
  
  // Handle form submission
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Create message object
    const messageObj = {
      id: Date.now(),
      name: name,
      email: email,
      subject: subject,
      message: message,
      timestamp: new Date().toLocaleString()
    };
    
    // Save message to localStorage
    saveMessage(messageObj);
    
    // Add message to display
    addMessageCard(messageObj);
    
    // Clear form
    contactForm.reset();
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
  });
  
  // Save message to localStorage
  function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.unshift(message); // Add new message at beginning
    localStorage.setItem('contactMessages', JSON.stringify(messages));
  }
  
  // Load messages from localStorage
  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    if (messages.length > 0) {
      noMessages.style.display = 'none';
      messagesTitle.style.display = 'block';
      
      // Display all messages
      messages.forEach(message => {
        addMessageCard(message);
      });
    } else {
      noMessages.style.display = 'block';
      messagesTitle.style.display = 'none';
    }
  }
  
  // Add message card to the list
  function addMessageCard(message) {
    // Hide "no messages" text if it's visible
    if (noMessages.style.display !== 'none') {
      noMessages.style.display = 'none';
      messagesTitle.style.display = 'block';
    }
    
    // Create message card
    const messageCard = document.createElement('div');
    messageCard.className = 'message-card';
    messageCard.setAttribute('data-id', message.id);
    
    // Format the message card HTML
    messageCard.innerHTML = `
      <div class="message-card-header">
        <div class="message-sender">${escapeHtml(message.name)}</div>
        <div class="message-subject">${escapeHtml(message.subject)}</div>
      </div>
      <div class="message-content">${escapeHtml(message.message)}</div>
      <div class="message-meta">
        <div class="message-email">${escapeHtml(message.email)}</div>
        <div class="message-time">${message.timestamp}</div>
      </div>
    `;
    
    // Add to the top of the messages list
    messagesList.insertBefore(messageCard, messagesList.firstChild);
  }
  
  // Show notification
  function showNotification(text, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = text;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out forwards';
      
      // Add slideOut animation
      const slideOutStyle = document.createElement('style');
      slideOutStyle.textContent = `
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(slideOutStyle);
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  // Helper function to escape HTML (prevent XSS)
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Clear all messages (for testing purposes - optional)
  function clearAllMessages() {
    localStorage.removeItem('contactMessages');
    messagesList.innerHTML = '<div class="no-messages" id="noMessages">No messages yet. Be the first to send a message!</div>';
    noMessages.style.display = 'block';
    messagesTitle.style.display = 'none';
    
    // Reload references
    noMessages = document.getElementById('noMessages');
  }
});