import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  getDogInfo();
}

function getDogInfo() {
  let doggos = [];
  doggos.push("beagle");
  doggos.push("boxer");
  doggos.push("dalmatian");
  doggos.push("havanese");

  doggos.forEach((doggo) => {
    createBreedInfo(doggo);
  });
}

async function createBreedInfo(breed) {
  const url =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + breed + " dog";
  const dogInfoPromise = await fetch(url);
  const dogInfoJSON = await dogInfoPromise.json();
  const url2 = "https://dog.ceo/api/breed/" + breed + "/images/random";
  const dogImagePromise = await fetch(url2);
  const dogImageJSON = await dogImagePromise.json();

  const appElement = document.getElementById("app");

  let containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "container");

  let wikiItemDiv = document.createElement("div");
  wikiItemDiv.setAttribute("class", "wiki-item");

  let headerForItem = document.createElement("h1");
  headerForItem.setAttribute("class", "wiki-header");
  const breedName = breed.charAt(0).toUpperCase() + breed.slice(1);
  headerForItem.innerText = breedName;

  let breedContentDiv = document.createElement("div");
  breedContentDiv.setAttribute("class", "wiki-content");

  let breedTextParagraph = document.createElement("p");
  breedTextParagraph.setAttribute("class", "wiki-text");
  const info = dogInfoJSON["extract"];
  breedTextParagraph.innerText = info;

  let breedImageDiv = document.createElement("div");
  breedImageDiv.setAttribute("class", "img-container");
  let breedImg = document.createElement("img");
  breedImg.setAttribute("class", "wiki-img");
  const pic = dogImageJSON["message"];
  breedImg.setAttribute("src", pic);

  breedImageDiv.appendChild(breedImg);
  breedContentDiv.appendChild(breedTextParagraph);
  breedContentDiv.appendChild(breedImageDiv);
  wikiItemDiv.appendChild(headerForItem);
  wikiItemDiv.appendChild(breedContentDiv);
  containerDiv.appendChild(wikiItemDiv);
  appElement.appendChild(containerDiv);
}
