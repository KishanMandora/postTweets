const tweetBtn = document.getElementById("tweetBtn");
const postModal = document.getElementById("postModal");
const closePostModal = document.getElementById("closePostModal");
const tweetTextArea = document.getElementById("tweetTextArea");
const tweetLength = document.getElementById("tweetLength");
const modalTweetPost = document.getElementById("modalTweetPost");
const tweetText = document.getElementById("tweetText");
const tweetPost = document.getElementById("tweetPost");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

const tweetLengthLimit = 280;

tweetBtn.addEventListener("click", () => {
  postModal.showModal();
});

closePostModal.addEventListener("click", () => {
  postModal.close();
});

tweetPost.addEventListener("click", () => {
  console.log(tweetText.value);
  tweetTextArea.innerText = tweetText.value;
  tweetLength.innerText = tweetText.value.length;
  tweetLength.classList.add(
    tweetText.value.length >= tweetLengthLimit
      ? "text-error"
      : "text-neutral-500",
  );
  postModal.showModal();
});

tweetTextArea.addEventListener("keyup", () => {
  if (
    tweetTextArea.value.length >= tweetLengthLimit ||
    tweetTextArea.value.length < 1
  ) {
    tweetLength.classList.add("text-error");
    tweetLength.innerText =
      tweetTextArea.value.length >= tweetLengthLimit
        ? tweetLengthLimit - tweetTextArea.value.length
        : tweetTextArea.value.length;
    modalTweetPost.disabled = true;
    modalTweetPost.classList.add("bg-primary-200");
    modalTweetPost.classList.add("cursor-not-allowed");
    modalTweetPost.classList.remove("bg-primary-100");
  } else {
    tweetLength.classList.remove("text-error");
    tweetLength.innerText = tweetTextArea.value.length;
    modalTweetPost.disabled = false;
    modalTweetPost.classList.remove("bg-primary-200");
    modalTweetPost.classList.remove("cursor-not-allowed");
    modalTweetPost.classList.add("bg-primary-100");
  }
});

tweetText.addEventListener("keyup", () => {
  if (
    tweetText.value.length >= tweetLengthLimit ||
    tweetText.value.length < 1
  ) {
    tweetPost.disabled = true;
    tweetPost.classList.add("bg-primary-200");
    tweetPost.classList.add("cursor-not-allowed");
    tweetPost.classList.remove("bg-primary-100");
  } else {
    tweetPost.disabled = false;
    tweetPost.classList.remove("bg-primary-200");
    tweetPost.classList.remove("cursor-not-allowed");
    tweetPost.classList.add("bg-primary-100");
  }
});

copyBtn.addEventListener("click", () => {
  toast.classList.remove("hidden");
  toast.classList.add("block");

  setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("block");
  }, 3000);
});
