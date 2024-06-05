function toggleLoader(displayState) {
  document.getElementById("loader").style.display = displayState;
}

function promiseHandler() {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      Math.random() > 0.5 ? reject("Неудача") : resolve("Успех!");
    }, 2000)
  );
}

async function getRandomImage() {
  try {
    toggleLoader("flex");
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=6"
    );
    const data = await response.json();
    const images = data.map((image) => image.url);
    const imageElements = document.querySelectorAll(".wrap img");

    imageElements.forEach((img, index) => {
      img.src = images[index];
      img.onload = () => {
        if (Array.from(imageElements).every((img) => img.complete)) {
          toggleLoader("none");
        }
      };
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".content__btn")
    .addEventListener("click", async () => {
      const result = await promiseHandler();
      result ? await getRandomImage() : console.error(result);
    });
});
