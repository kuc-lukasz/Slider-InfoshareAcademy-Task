const slider = document.querySelector("#slider");
const btnPrev = document.querySelector("#prev");
const btnNext = document.querySelector("#next");
const btnNumbers = document.querySelector("#navigation");

const activeElement = 0;

fetch("photos.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    data.forEach(function (dataImage, index) {
      console.log(dataImage);
      const container = document.createElement("div");
      container.classList.add("typeofdisplay");
      const image = document.createElement("img");
      const disciprion = document.createElement("p");
      image.src = dataImage.url;
      disciprion.innerHTML = dataImage.author + ": " + dataImage.caption;

      const imgNumberBtn = document.createElement("button");
      imgNumberBtn.innerHTML = dataImage.id;
      imgNumberBtn.addEventListener("click", () => setImage(dataImage.id));

      slider.appendChild(container);
      container.appendChild(image);
      container.appendChild(disciprion);
      btnNumbers.appendChild(imgNumberBtn);

      if (activeElement === index) {
        container.classList.add("showDiv");
      }

      imgNumberBtn.onclick = function () {
        clearInterval(myInterval);
        console.log("stop interval");
      };
      image.onclick = function () {
        clearInterval(myInterval);
        console.log("stop interval2");
      };
      btnPrev.onclick = function () {
        clearInterval(myInterval);
        console.log("stop interval3");
      };
    });
  });

const myInterval = setInterval(() => {
  if (activeElement < 6) {
    btnNext.click();
  }
}, 3000);
btnNext.addEventListener("click", (event) => {
  if (event.isTrusted == true) {
    clearInterval(myInterval);
    console.log("stop interval4");
  }
});

const setImage = (id) => {
  const images = document.querySelectorAll("#slider > div");
  images.forEach((image) => {
    image.classList.remove("showDiv");
  });
  images[id - 1].classList.add("showDiv");

  if (images.id !== null) {
    document.querySelector("#next").disabled = undefined;
    document.querySelector("#prev").disabled = undefined;
  }

  if (document.querySelector(".showDiv").nextElementSibling === null) {
    document.querySelector("#next").disabled = true;
    document.querySelector("#prev").disabled = undefined;
  }

  if (document.querySelector(".showDiv").previousElementSibling === null) {
    document.querySelector("#next").disabled = undefined;
    document.querySelector("#prev").disabled = true;
  }
};

function nextImage() {
  const currentDiv = document.querySelector(".showDiv");
  currentDiv.nextElementSibling.classList.add("showDiv");
  currentDiv.classList.remove("showDiv");

  if (document.querySelector(".showDiv").nextElementSibling === null) {
    document.querySelector("#next").disabled = true;
  }

  if (document.querySelector(".showDiv").previousElementSibling) {
    document.querySelector("#prev").disabled = undefined;
  }
}

function prevImage() {
  const currentDiv = document.querySelector(".showDiv");
  currentDiv.previousElementSibling.classList.add("showDiv");
  currentDiv.classList.remove("showDiv");

  if (document.querySelector(".showDiv").previousElementSibling === null) {
    document.querySelector("#prev").disabled = true;
  }
  if (document.querySelector(".showDiv").previousElementSibling) {
    document.querySelector("#next").disabled = undefined;
  }
}
if (activeElement === 0) {
  document.querySelector("#prev").disabled = true;
}

btnNext.addEventListener("click", nextImage);
btnPrev.addEventListener("click", prevImage);
