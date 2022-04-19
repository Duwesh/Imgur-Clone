// require("dotenv").config();
const apiRoot = "https://api.unsplash.com";

const accessKey = "ntYUsa1--Kx5IlmcUtWS5iH1Hl2W-l98Qw7pAUZpGRc";

// const accessKey = process.env.ACCESS_KEY;
const count = 6;

//container
let imageContainer = document.querySelector(".image-container");

//loader
const loader = document.querySelector("#img_loader");

const loadToScreen = (photos) => {
  photos.forEach((photo) => {
    let box = document.createElement("div");
    box.classList.add("image-item");
    box.style.backgroundColor = photo.color;
    box.innerHTML = `<a href="${photo.links.download}" target="_blank"/>
        <img src="${photo.urls.regular}=">
        <div class="overlay">
          <div class="download">+</div>
        </div>
      </a>`;
    imageContainer.appendChild(box);
  });
};

const getMore = async () => {
  let photos = [];

  loader.style.display = "block";
  try {
    const res = await fetch(
      `${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`
    );

    //convert into json format
    const data = await res.json();

    console.log("API data", data);
    photos.push(...data);
    loadToScreen(photos);
    loader.style.display = "none";
  } catch (err) {
    console.log("Something Went Wrong!", err.message);
  }
};

//Infinite Scrolling
window.addEventListener("scroll", () => {
  //logic for infinite scrolling
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
  //     //load more photos
  //     getMore();
  //   }

  //object destructing
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    console.log("At Bottom");
    getMore();
  }
});

//initially will be called once
getMore();
