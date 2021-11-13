const listImg = [
    './assets/img/lf_groove_2010_1.jpg',
    './assets/img/lf_groove_2010_deck_1.jpg',
    './assets/img/lf_groove_2010_bottom_1.jpg',
];
const imageDetail = document.getElementById("image-detail");
const listImgSmall = document.getElementById('list-img-small')
const imgZoom = document.getElementById("img-zoom");
const zoomScreen = document.getElementById('zoom-screen');
const statusPage = document.getElementById('status-page');
//button control
const btnClose = document.getElementById("btn-close")
const btnNext = document.getElementById("btn-next")
const btnPrev = document.getElementById("btn-prev")
const btnZoom = document.getElementById("btn-zoom")
//init data 
document.getElementById("image-detail").src = listImg[0]
listImg.forEach((url, index) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `img-small-${index}`;
    img.addEventListener('click', () => {
        listImg.forEach((__, index) => {
            listImgSmall.children[index].classList.remove("selected")
        });
        imageDetail.src = url;
        img.classList.add("selected")
    })
    listImgSmall.appendChild(img)
});
listImgSmall.children[0].classList.add("selected")
statusPage.textContent = `1/${listImg.length}`
//action click show image
imageDetail.addEventListener('click', () => {
    const index = listImg.findIndex(url => `${imageDetail.src}`.includes(url.slice(1)));
    statusPage.textContent = `${index + 1}/${listImg.length}`;
    imgZoom.src = imageDetail.src;
    imgZoom.style.cursor = "zoom-in";
    zoomScreen.classList.remove("hide");
    zoomScreen.classList.add("show");
})
// action close zoom in
btnClose.addEventListener("click", () => {
    zoomScreen.classList.remove("show");
    zoomScreen.classList.add("hide");
    imgZoom.style.maxWidth = "500px";
    imgZoom.style.width = "70%";
})
//action next
btnNext.addEventListener("click", () => {
    handleNext()
})
//action prev
btnPrev.addEventListener("click", () => {
    handlePrev()
})
//action zoom in 
btnZoom.addEventListener("click", () => {
    imgZoom.style.maxWidth = "620px";
    imgZoom.style.width = "90%";
    btnZoom.disabled = true;
    imgZoom.style.cursor = "zoom-out";
})
// handle press key
window.addEventListener("keydown", (event) => {
    if (zoomScreen.classList[0] === "show") {
        event.key === "ArrowRight" && handleNext();
        event.key === "ArrowLeft" && handlePrev();
    }
})
// handle click zoom-in or zoom-out in image
imgZoom.addEventListener("click", () => {
    if (imgZoom.style.cursor === "zoom-out") {
        imgZoom.style.maxWidth = "500px";
        imgZoom.style.width = "70%";
        btnZoom.disabled = false;
        imgZoom.style.cursor = "zoom-in";
    }
    else if (imgZoom.style.cursor === "zoom-in") {
        imgZoom.style.maxWidth = "620px";
        imgZoom.style.width = "90%";
        btnZoom.disabled = true;
        imgZoom.style.cursor = "zoom-out";
    }
})

const handleNext = () => {
    const index = listImg.findIndex(url => `${imgZoom.src}`.includes(url.slice(1)));
    imgZoom.src = index < listImg.length - 1 ? listImg[index + 1] : listImg[index];
    statusPage.textContent = index + 2 <= listImg.length ? `${index + 2}/${listImg.length}` : statusPage.textContent;
    imageDetail.src = imgZoom.src;
    listImg.forEach((__, i) => {
        listImgSmall.children[i].classList.remove("selected")
    });
    listImgSmall.children[index < listImg.length - 1 ? index + 1 : index].classList.add("selected")
}

const handlePrev = () => {
    const index = listImg.findIndex(url => `${imgZoom.src}`.includes(url.slice(1)));
    imgZoom.src = index > 0 ? listImg[index - 1] : listImg[index];
    statusPage.textContent = index > 0 ? `${index}/${listImg.length}` : statusPage.textContent;
    imageDetail.src = imgZoom.src;
    listImg.forEach((__, i) => {
        listImgSmall.children[i].classList.remove("selected")
    });
    listImgSmall.children[index > 0 ? index - 1 : index].classList.add("selected")
}