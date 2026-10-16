// pictures from the imgs folder
const images = [
    "20250920_143458.jpg",
    "20250920_143506.jpg",
    "20250920_143527.jpg",
    "20250920_143546.jpg",
    "20250920_143612.jpg",
    "20250920_143623.jpg",
    "20250920_143632.jpg",
    "20250920_143637.jpg",
    "20250920_143645.jpg",
    "20250920_143854.jpg",
    "20250920_144532.jpg",
    "20250920_144534.jpg",
    "20250920_144541.jpg",
    "20250920_145717.jpg",
    "20250920_145739.jpg",
    "20250920_145747.jpg",
    "20250920_150212.jpg",
    "20250920_151437.jpg",
    "20250920_155434.jpg",
    "20250921_162406.jpg",
    "DSC_1268.jpg",
    "DSC_1272.jpg",
    "DSC_1273.jpg",
    "DSC_1275.jpg",
    "DSC_1279.jpg",
    "DSC_1280.jpg",
    "DSC_1284.jpg",
    "DSC_1285.jpg",
    "DSC_1288.jpg",
    "DSC_1290.jpg",
    "DSC_1291.jpg",
    "DSC_1292.jpg",
    "DSC_1293.jpg",
    "DSC_1294.jpg",
    "DSC_1297.jpg",
    "DSC_1299.jpg",
    "DSC_1301.jpg",
    "DSC_1303.jpg",
    "DSC_1305.jpg",
    "DSC_1307.jpg",
    "DSC_1308.jpg",
    "DSC_1309.jpg",
    "DSC_1310.jpg",
    "DSC_1311.jpg",
    "DSC_1313.jpg",
    "DSC_1314.jpg",
    "DSC_1316.jpg",
    "DSC_1317.jpg",
    "DSC_1322.jpg",
    "DSC_1323.jpg",
    "DSC_1324.jpg",
    "DSC_1325.jpg",
    "DSC_1326.jpg",
    "DSC_1328.jpg",
    "DSC_1329.jpg",
    "DSC_1331.jpg",
    "DSC_1334.jpg",
    "DSC_1335.jpg",
    "DSC_1336.jpg",
    "DSC_1339.jpg",
    "DSC_1341.jpg",
    "DSC_1342.jpg",
    "DSC_1343.jpg",
    "DSC_1344.jpg",
    "DSC_1345.jpg",
    "DSC_1347.jpg",
    "DSC_1348.jpg",
    "DSC_1356.jpg",
    "DSC_1357.jpg",
    "DSC_1359.jpg",
    "DSC_1361.jpg",
    "DSC_1362.jpg",
    "DSC_1363.jpg",
    "DSC_1365.jpg",
    "DSC_1367.jpg",
    "DSC_1368.jpg",
    "DSC_1371.jpg",
    "DSC_1374.jpg",
    "DSC_1375.jpg",
    "DSC_1377.jpg",
    "DSC_1385.jpg",
    "DSC_1386.jpg",
    "DSC_1387.jpg",
    "DSC_1388.jpg",
    "DSC_1392.jpg",
    "IMG_2047.jpeg",
    "IMG_2048.jpeg",
    "IMG_2052.jpeg",
    "IMG_2056.jpeg",
];

// references to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// build pages: cover first, then one picture per page side
const pages = [`
    <div class="anniversary-cover">
        <img src="LPCLogo.jpg" alt="LPC Logo">
        <h1 class="anniversary-title">75th Anniversary</h1>
    </div>
`].concat(
    images.map(src => `<img src="imgs/${src}" alt="" loading="lazy">`)
);
if (pages.length % 2 !== 0) pages.push("");

const papers = [];
for (let i = 0; i < pages.length / 2; i++) {
    const paper = document.createElement("div");
    paper.className = "paper";
    paper.id = `p${i + 1}`;
    paper.innerHTML = `
        <div class="front"><div class="front-content">${pages[i * 2]}</div></div>
        <div class="back"><div class="back-content">${pages[i * 2 + 1]}</div></div>`;
    book.appendChild(paper);
    papers.push(paper);
}

// event listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;

papers.forEach((paper, i) => paper.style.zIndex = numOfPapers - i);

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        const paper = papers[currentLocation - 1];
        if(currentLocation === 1) openBook();
        paper.classList.add("flipped");
        paper.style.zIndex = currentLocation;
        if(currentLocation === numOfPapers) closeBook(false);
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        const paper = papers[currentLocation - 2];
        if(currentLocation === 2) closeBook(true);
        if(currentLocation === maxLocation) openBook();
        paper.classList.remove("flipped");
        paper.style.zIndex = numOfPapers - currentLocation + 2;
        currentLocation--;
    }
}
