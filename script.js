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
    "./Assets/Pdf/2022-SuezCanalCPC2021-Mohamed Samir-PLACE.pdf",
    "./Assets/Pdf/Attendance_Certificate (2).pdf",
    "./Assets/Pdf/Course_Certificate_En (2).pdf",
    "./Assets/Pdf/Course_Certificate_En.pdf",
    "./Assets/Pdf/CS50x.pdf",
    "./Assets/Pdf/MohamedSamir Ahmad-CyberOps Associa-certificate_2.pdf",
    "./Assets/Pdf/MohamedSamir Ahmad-CyberOps Associa-letter.pdf",
    "./Assets/Pdf/MohamedSamir Ahmad-Cybersecurity Es-certificate.pdf",
    "./Assets/Pdf/MohamedSamir Ahmad-Introduction to -certificate.pdf",
    "./Assets/Pdf/MohamedSamir Ahmad-Entrepreneurship-certificate.pdf",
    "./Assets/Pdf/MohamedSamir Ahmad-SUMMER TRAINING -certificate.pdf",
    "./Assets/Pdf/MohamedSamir Ahmad-SUMMER TRAINING -letter.pdf",
  ];

  const swiperWrapper = document.querySelector(".certificates .swiper-wrapper");

  // Dynamically create slides for each PDF file
  pdfFiles.forEach((pdfFile) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const iframe = document.createElement("iframe");
    iframe.src = pdfFile + "#toolbar=0&navpanes=0&scrollbar=0"; // Hide all controls
    iframe.title = "Certificate";

    slide.appendChild(iframe);
    swiperWrapper.appendChild(slide);
  });

  // Initialize Swiper
  try {
    new Swiper(".mySwiper", {
      direction: "horizontal", // Horizontal scrolling
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: true, // Enable mousewheel navigation
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 5000, // Change slide every 5 seconds
        disableOnInteraction: false, // Continue autoplay after user interaction
      },
      loop: true, // Loop through slides indefinitely
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
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 025.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 026.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 027.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 028.jpg",
    "./Assets/Images/Batman/Batman - Dark Patterns 003 (2025) 029.jpg",
  ],
  spiderman: [
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0001.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0004.jpg",
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
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0017.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0018.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0019.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0020.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0021.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0022.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0023.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0024.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0025.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0026.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0027.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0028.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0029.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0030.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0031.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0032.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0033.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0034.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0035.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0036.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0037.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0038.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0039.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0040.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0041.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0042.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0043.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0044.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0045.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0046.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0047.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0048.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0049.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0050.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0051.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0052.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0053.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0054.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0055.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0056.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0057.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0058.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0059.jpg",
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
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0080.jpg",
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
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0101.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0102.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0103.jpg",
    "./Assets/Images/Spider-Verse - Amazing Spider-Man/0104.jpg"
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
  countDisplay.textContent = `${currentIndex + 1}/${
    comicImages[currentComic].length
  }`;
}












// Party
let indexSong = 0;
let isLocked = false;
let songsLength = null;
let selectedSong = null;
let songIsPlayed = false;
let progress_elmnt = null;
let songName_elmnt = null;
let sliderImgs_elmnt = null;
let singerName_elmnt = null;
let progressBar_elmnt = null;
let playlistSongs_elmnt = [];
let musicPlayerInfo_elmnt = null;
let progressBarIsUpdating = false;
let broadcastGuarantor_elmnt = null;
const root = querySelector("#root");

// Your songs data
const songsData = {
  songs: [
    {
      songName: "Bugatti",
      artist: "Ace Hood ft. Future, Rick Ross",
      files: {
        cover: "https://images.genius.com/db8ec0d7fef01bcd9d372326fff4ea47.640x640x1.jpg",
        song: "./Assets/Audios/Ace Hood - Bugatti (Explicit Version_Closed Captioned) ft. Future_ Rick Ross.mp3",
      },
    },
    {
      songName: "Heaven Only Knows",
      artist: "Bob Moses",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b2738339bb10e2145dd4124857b2",
        song: "./Assets/Audios/Bob Moses - Heaven Only Knows (Official Audio).mp3",
      },
    },
    {
      songName: "Rather Be",
      artist: "Clean Bandit ft. Jess Glynne",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b2737e519297d9876b6afff2ab7b",
        song: "./Assets/Audios/Clean Bandit - Rather Be ft. Jess Glynne [Official Video].mp3",
      },
    },
    {
      songName: "Still D.R.E.",
      artist: "Dr. Dre ft. Snoop Dogg",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b2739b19c107109de740bad72df5",
        song: "./Assets/Audios/Dr. Dre - Still D.R.E. ft. Snoop Dogg.mp3",
      },
    },
    {
      songName: "Without Me",
      artist: "Eminem",
      files: {
        cover:
          "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
        song: "./Assets/Audios/Eminem - Without Me (Official Music Video).mp3",
      },
    },
    {
      songName: "How It Was",
      artist: "Future",
      files: {
        cover: "https://i1.sndcdn.com/artworks-000065619625-5o4ydw-t500x500.jpg",
        song: "./Assets/Audios/How It Was (feat. Future).mp3",
      },
    },
    {
      songName: "You Know How We Do It",
      artist: "Ice Cube",
      files: {
        cover: "https://m.media-amazon.com/images/M/MV5BZmY5MmU4YTctY2NiNS00MmY3LWI3MzctOWFmNzU0MjQ0M2EzXkEyXkFqcGc@._V1_.jpg",
        song: "./Assets/Audios/Ice Cube - You Know How We Do It.mp3",
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
      songName: "ZEZE",
      artist: "Kodak Black ft. Travis Scott, Offset",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b2738a5a04dbb1c7a3242fdfdfe8",
        song: "./Assets/Audios/Kodak Black - ZEZE (feat. Travis Scott _ Offset) [Official Audio].mp3",
      },
    },
    {
      songName: "HOLIDAY",
      artist: "Lil Nas X",
      files: {
        cover:
          "https://i.scdn.co/image/ab67616d0000b2736771a05f34d77e5fc2bde64c",
        song: "./Assets/Audios/Lil Nas X - HOLIDAY (Official Video).mp3",
      },
    },
    {
      songName: "Old Town Road",
      artist: "Lil Nas X ft. Billy Ray Cyrus",
      files: {
        cover:
          "https://media.gq.com/photos/5cdeef0e1f8a4e271cddab8d/1:1/w_689,h_689,c_limit/Old-Town-Road-Video-GQ-2019-051719.jpg",
        song: "./Assets/Audios/Lil Nas X - Old Town Road (Official Video) ft. Billy Ray Cyrus.mp3",
      },
    },
    {
      songName: "Rihanna - Where Have You Been",
      artist: "Rihanna",
      files: {
        cover: "https://i.scdn.co/image/ab67616d0000b273bef074de9ca825bddaeb9f46",
        song: "./Assets/Audios/Rihanna - Where Have You Been.mp3",
      },
    },
    {
      songName: "Sickick - Talking to the Moon (Bruno Mars Remix)",
      artist: "Sickick",
      files: {
        cover: "https://i1.sndcdn.com/artworks-KnuZQJTOW0SJLR6G-z8cZiw-t500x500.jpg",
        song: "./Assets/Audios/Sickick - Talking to the Moon (Bruno Mars Remix).mp3",
      },
    },
    {
      songName: "Save Your Tears",
      artist: "The Weeknd",
      files: {
        cover:
          "https://i.scdn.co/image/ab67616d0000b273c6af5ffa661a365b77df6ef6",
        song: "./Assets/Audios/The Weeknd - Save Your Tears (Official Audio).mp3",
      },
    },
    {
      songName: "BUTTERFLY EFFECT",
      artist: "Travis Scott",
      files: {
        cover:
          "https://i1.sndcdn.com/artworks-AteYKQAUrh4vLE4n-pOmoTA-t1080x1080.jpg",
        song: "./Assets/Audios/Travis Scott - BUTTERFLY EFFECT (Official Music Video).mp3",
      },
    },
    {
      songName: "HIGHEST IN THE ROOM",
      artist: "Travis Scott",
      files: {
        cover:
          "https://i.scdn.co/image/ab67616d0000b273e42b5fea4ac4c3d6328b622b",
        song: "./Assets/Audios/Travis Scott - HIGHEST IN THE ROOM (Official Music).mp3",
      },
    },
    {
      songName: "SICKO MODE",
      artist: "Travis Scott ft. Drake",
      files: {
        cover:
          "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3",
        song: "./Assets/Audios/Travis Scott - SICKO MODE (Official Audio).mp3",
      },
    },
  ],  
};

function App({ songs }) {
  function handleChangeMusic({ isPrev = false, playListIndex = null }) {
    if (isLocked || indexSong === playListIndex) return;
  
    if (playListIndex || playListIndex === 0) {
      indexSong = playListIndex;
    } else {
      indexSong = isPrev ? (indexSong -= 1) : (indexSong += 1);
    }
  
    if (indexSong < 0) {
      indexSong = 0;
      return;
    } else if (indexSong > songsLength) {
      indexSong = songsLength;
      return;
    }
  
    selectedSong.pause();
    selectedSong.currentTime = 0;
    progressBarIsUpdating = false;
    selectedSong = playlistSongs_elmnt[indexSong];
  
    // Always play the new song when selected
    selectedSong.play();
    songIsPlayed = true;
    broadcastGuarantor_elmnt.classList.add("click");
  
    setProperty(sliderImgs_elmnt, "--index", -indexSong);
    updateInfo(singerName_elmnt, songs[indexSong].artist);
    updateInfo(songName_elmnt, songs[indexSong].songName);
  }

  return dom(
    "div",
    { class: "music-player flex-column" },
    dom(Slider, { slides: songs, handleChangeMusic: handleChangeMusic }),
    dom(Playlist, { list: songs, handleChangeMusic: handleChangeMusic })
  );
}

function Slider({ slides, handleChangeMusic }) {
  function handleResizeSlider({ target }) {
    if (isLocked) {
      return;
    } else if (target.classList.contains("music-player__info")) {
      this.classList.add("resize");
      setProperty(this, "--controls-animate", "down running");
      return;
    } else if (target.classList.contains("music-player__playlist-button")) {
      this.classList.remove("resize");
      setProperty(this, "--controls-animate", "up running");
      return;
    }
  }

  function handlePlayMusic() {
    if (selectedSong.currentTime === selectedSong.duration) {
      handleChangeMusic({});
      return;
    }
  
    this.classList.toggle("click");
    songIsPlayed = !songIsPlayed;
    selectedSong.paused ? selectedSong.play() : selectedSong.pause();
  }

  return dom(
    "div",
    { class: "slider center", onClick: handleResizeSlider },
    dom(
      "div",
      { class: "slider__content center" },
      dom(
        "button",
        { class: "music-player__playlist-button center button" },
        dom("i", { class: "icon-playlist" })
      ),
      dom(
        "button",
        {
          onClick: handlePlayMusic,
          class: "music-player__broadcast-guarantor center button",
        },
        dom("i", { class: "icon-play" }),
        dom("i", { class: "icon-pause" })
      ),
      dom(
        "div",
        { class: "slider__imgs flex-row" },
        slides.map(({ songName, files: { cover } }) =>
          dom("img", { src: cover, class: "img", alt: songName })
        )
      )
    ),
    dom(
      "div",
      { class: "slider__controls center" },
      dom(
        "button",
        {
          class: "slider__switch-button flex-row button",
          onClick: () => handleChangeMusic({ isPrev: true }),
        },
        dom("i", { class: "icon-back" })
      ),
      dom(
        "div",
        { class: "music-player__info text_trsf-cap" },
        dom(
          "div",
          null,
          dom(
            "div",
            { class: "music-player__singer-name" },
            dom("div", null, slides[0].artist)
          )
        ),
        dom(
          "div",
          null,
          dom(
            "div",
            { class: "music-player__subtitle" },
            dom("div", null, slides[0].songName)
          )
        )
      ),
      dom(
        "button",
        {
          class: "slider__switch-button flex-row button",
          onClick: () => handleChangeMusic({ isPrev: false }),
        },
        dom("i", { class: "icon-next" })
      ),
      dom(
        "div",
        {
          class: "progress center",
          onPointerdown: (e) => {
            handleScrub(e);
            progressBarIsUpdating = true;
          },
        },
        dom(
          "div",
          { class: "progress__wrapper" },
          dom("div", { class: "progress__bar center" })
        )
      )
    )
  );
}

function Playlist({ list, handleChangeMusic }) {
  function loadedAudio() {
    const duration = this.duration;
    const target = this.parentElement.querySelector(
      ".music-player__song-duration"
    );

    let min = parseInt(duration / 60);
    if (min < 10) min = "0" + min;

    let sec = parseInt(duration % 60);
    if (sec < 10) sec = "0" + sec;

    target.appendChild(document.createTextNode(`${min}:${sec}`));
  }

  function updateTheProgressBar() {
    const duration = this.duration;
    const currentTime = this.currentTime;

    const progressBarWidth = (currentTime / duration) * 100;
    setProperty(progressBar_elmnt, "--width", `${progressBarWidth}%`);

    if (songIsPlayed && currentTime === duration) {
      handleChangeMusic({});
    }

    if (
      indexSong === songsLength &&
      this === selectedSong &&
      currentTime === duration
    ) {
      songIsPlayed = false;
      broadcastGuarantor_elmnt.classList.remove("click");
    }
  }

  return dom(
    "ul",
    { class: "music-player__playlist list" },
    list.map(({ songName, artist, files: { cover, song } }, index) => {
      return dom(
        "li",
        {
          class: "music-player__song",
          onClick: () =>
            handleChangeMusic({ isPrev: false, playListIndex: index }),
        },
        dom(
          "div",
          { class: "flex-row _align_center" },
          dom("img", { src: cover, class: "img music-player__song-img" }),
          dom(
            "div",
            { class: "music-player__playlist-info text_trsf-cap" },
            dom("b", { class: "text_overflow" }, songName),
            dom(
              "div",
              { class: "flex-row _justify_space-btwn" },
              dom("span", { class: "music-player__subtitle" }, artist),
              dom("span", { class: "music-player__song-duration" })
            )
          )
        ),
        dom("audio", {
          src: song,
          onLoadeddata: loadedAudio,
          onTimeupdate: updateTheProgressBar,
        })
      );
    })
  );
}

function dom(tag, props, ...children) {
  if (typeof tag === "function") return tag(props, ...children);

  function addChild(parent, child) {
    if (Array.isArray(child)) {
      child.forEach((nestedChild) => addChild(parent, nestedChild));
    } else {
      parent.appendChild(
        child.nodeType ? child : document.createTextNode(child.toString())
      );
    }
  }

  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith("on") && name.toLowerCase() in window) {
      element[name.toLowerCase()] = value;
    } else if (name === "style") {
      Object.entries(value).forEach(([styleProp, styleValue]) => {
        element.style[styleProp] = styleValue;
      });
    } else {
      element.setAttribute(name, value.toString());
    }
  });

  children.forEach((child) => {
    addChild(element, child);
  });

  return element;
}

// Render the App component with the songs data
root.appendChild(dom(App, { songs: songsData.songs }));

// Initialize the necessary variables after rendering
songsLength = songsData.songs.length - 1;
progress_elmnt = querySelector(".progress");
playlistSongs_elmnt = querySelectorAll("audio");
sliderImgs_elmnt = querySelector(".slider__imgs");
songName_elmnt = querySelector(".music-player__subtitle");
musicPlayerInfo_elmnt = querySelector(".music-player__info");
singerName_elmnt = querySelector(".music-player__singer-name");
selectedSong = playlistSongs_elmnt[indexSong];
progressBar_elmnt = querySelector(".progress__bar");
broadcastGuarantor_elmnt = querySelector(".music-player__broadcast-guarantor");

controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);

function controlSubtitleAnimation(parent, child) {
  if (child.classList.contains("animate")) return;

  const element = child.firstChild;

  if (child.clientWidth > parent.clientWidth) {
    child.appendChild(element.cloneNode(true));
    child.classList.add("animate");
  }

  setProperty(child.parentElement, "width", `${element.clientWidth}px`);
}

function handleResize() {
  const vH = window.innerHeight * 0.01;
  setProperty(document.documentElement, "--vH", `${vH}px`);
}

function querySelector(target) {
  return document.querySelector(target);
}

function querySelectorAll(target) {
  return document.querySelectorAll(target);
}

function setProperty(target, prop, value = "") {
  target.style.setProperty(prop, value);
}

function updateInfo(target, value) {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }

  const targetChild_elmnt = document.createElement("div");
  targetChild_elmnt.appendChild(document.createTextNode(value));
  target.appendChild(targetChild_elmnt);
  target.classList.remove("animate");
  controlSubtitleAnimation(musicPlayerInfo_elmnt, target);
}

function handleScrub(e) {
  const progressOffsetLeft = progress_elmnt.getBoundingClientRect().left;
  const progressWidth = progress_elmnt.offsetWidth;
  const duration = selectedSong.duration;
  const currentTime = (e.clientX - progressOffsetLeft) / progressWidth;

  selectedSong.currentTime = currentTime * duration;
}

handleResize();

window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", handleResize);
window.addEventListener("transitionstart", ({ target }) => {
  if (target === sliderImgs_elmnt) {
    isLocked = true;
    setProperty(sliderImgs_elmnt, "will-change", "transform");
  }
});
window.addEventListener("transitionend", ({ target, propertyName }) => {
  if (target === sliderImgs_elmnt) {
    isLocked = false;
    setProperty(sliderImgs_elmnt, "will-change", "auto");
  }
  if (target.classList.contains("slider") && propertyName === "height") {
    controlSubtitleAnimation(musicPlayerInfo_elmnt, songName_elmnt);
    controlSubtitleAnimation(musicPlayerInfo_elmnt, singerName_elmnt);
  }
});
window.addEventListener("pointerup", () => {
  if (progressBarIsUpdating) {
    selectedSong.muted = false;
    progressBarIsUpdating = false;
  }
});
window.addEventListener("pointermove", (e) => {
  if (progressBarIsUpdating) {
    handleScrub(e);
    selectedSong.muted = true;
  }
});














// Photos
const photo_swiper = new Swiper(".photo .swiper", {
  loop: true,
  slidesPerView: 3, // Show 3 slides at once
  spaceBetween: 20, // Add space between slides
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});









// Hero
(() => {
  const modelViewers = document.querySelectorAll("model-viewer");
  const cards = document.querySelectorAll(".hero-card");

  // Function to ensure models are loaded and visible
  const ensureModelLoaded = (modelViewer) => {
    if (!modelViewer) return;

    // Force the model to load and display in its original size
    modelViewer.setAttribute("camera-orbit", "0deg 90deg 164m");
    modelViewer.setAttribute("camera-target", "auto");
    modelViewer.setAttribute("interpolation-decay", "200");
    modelViewer.style.opacity = "1"; // Ensure visibility
    modelViewer.classList.add("loaded"); // Add loaded class for CSS animations
  };

  // Initialize all models
  modelViewers.forEach((modelViewer) => {
    // Ensure the model is loaded and visible immediately
    ensureModelLoaded(modelViewer);

    // Force load event if the model is already loaded
    if (modelViewer.loaded) {
      modelViewer.dispatchEvent(new Event("load"));
    }

    // Add a load event listener to ensure visibility
    modelViewer.addEventListener("load", () => {
      ensureModelLoaded(modelViewer);
    });
  });

  // Optional: Add rotation on hover (if desired)
  cards.forEach((card, index) => {
    const modelViewer = modelViewers[index];

    if (!modelViewer) {
      console.warn(`⚠️ No model found for card at index: ${index}`);
      return;
    }

    const calcOrbit = (xPos, cardRect) => {
      const normalizedX = (xPos - cardRect.left) / cardRect.width;
      const angle = normalizedX * 180 - 90; // Adjust angle range for smoother rotation
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
  e.preventDefault();

  interacted = true;

  switch (e.key) {
    case "ArrowUp":
      changePos("up");
      break;
    case "ArrowDown":
      changePos("down");
      break;
    case "ArrowLeft":
      changePos("left");
      break;
    case "ArrowRight":
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
    id: 3,
    title: "Weeza",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDh1c3p1YThuYnRhOHhsdHhqcHQyams0dGZzOHdhcDJkeWh1NHhwYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/syEfLvksYQnmM/giphy.gif",
    text: "First meeting was a fight. Two fucking losers. Two motherfuckers. Two dreamers dreaming of becoming millionaires, chasing money to waste on super classic cars, Whores, drugs, and weed chasing ruling the business world, owning companies that own the world, laughing about ending up with our names on the Epstein list. Still dreaming. Still fucked up. Two idiots smiling while getting thrown into hell. From this fucked-up life, I walked away with one thing only: one real friend"
  },
  {
    id: 4,
    title: "Dr. Esraa Eleraky",
    image: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWFiM3B2Z2VqMTc0ZzNhcDcydWJqNDdvdTlhYTFldHBqMXFsdGN2aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tDFmApXRr5b24uI3sd/giphy.gif",
    text: "I don’t know what to say except thank you for everything. You didn’t just teach me how to be a data analyst, you taught me how to think like one to look beyond the numbers and search for context, meaning, and insight in everything I analyze"
  },
  {
    id: 5,
    title: "Dr. Nahla Fayyad",
    image: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aTR0MzRjNmxjNmQ2bmU2Z2h6eG5nd25qM3dnaGhkYzZqdnBiNHpoOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1PB2ZpDj3CwPtaUW1l/giphy.gif",
    text: "In just five sessions, I got to know an incredible person: a voice actor, a lawyer, someone managing the legal affairs of several companies, a freelance lecturer, and a talented painter. On our behalf, I want to apologize that the period wasn’t what you wished it to be, but you gave us something we will never forget. We wish for you to rediscover your passion and achieve even greater success in everything you pursue"
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

  // Determine title color based on image brightness
  const isLightImage = memory.id === 4; // Assuming 4th image needs black text
  const titleClass = isLightImage ? 'title-white' : 'title-white';

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


