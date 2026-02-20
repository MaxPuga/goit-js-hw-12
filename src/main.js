import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;
let currentQuery = "";
let totalHits = 0;

form.addEventListener("submit", async event => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (!query) return;

  page = 1;
  currentQuery = query;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    totalHits = data.totalHits;

    createGallery(data.hits);

    const perPage = 15;

    if (totalHits > perPage) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
      });
    }

  } catch {
    iziToast.error({ message: "Something went wrong!" });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    const totalLoaded = page * 15;

    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();

      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    const { height } =
      document.querySelector(".gallery-item").getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: "smooth",
    });
  } catch {
    iziToast.error({ message: "Something went wrong!" });
  } finally {
    hideLoader();
  }
});