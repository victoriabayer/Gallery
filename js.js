function handleImageLoad(loader) {
  loader.style.display = "none";
}

function handleImageError(loader, url) {
  loader.style.display = "none";
  console.error("Ошибка при загрузке изображения:", url);
}

function loadImages() {
  const loader = document.querySelector(".loader");
  const gallery = document.querySelector(".gallery");
  
  if (!loader || !gallery) {
    console.error("Не удалось найти .loader или .gallery элементы");
    return;
  }

  loader.style.display = "block";
  gallery.innerHTML = "";

  fetch("https://api.thecatapi.com/v1/images/search?limit=6")
    .then((response) => response.json())
    .then((data) => {
      for (const photo of data) {
        const img = document.createElement("img");
        img.src = photo.url;
        img.onload = () => handleImageLoad(loader);
        img.onerror = () => handleImageError(loader, photo.url);
        gallery.appendChild(img);
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      console.error("Ошибка загрузки фотографий:", error);
    });
}

const clickBtn = document.querySelector(".content__btn");
clickBtn.addEventListener("click", loadImages);