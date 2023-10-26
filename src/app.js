const postModal = document.getElementById("postModal");
const tweetTextArea = document.getElementById("tweetTextArea");
const tweetLength = document.getElementById("tweetLength");
const modalTweetPost = document.getElementById("modalTweetPost");
const toast = document.getElementById("toast");
const responseDiv = document.getElementById("responseDiv");

const tweetLengthLimit = 280;
const POST_URL = "https://one00x-data-analysis.onrender.com/posts";

document.addEventListener("DOMContentLoaded", () => {
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

// MAIN FUNCTION TO POST THE TWEET
modalTweetPost.addEventListener("click", async () => {
  try {
    const tweetText = tweetTextArea.value;
    const resp = await fetch(POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: {
          content: tweetText,
        },
      }),
    });

    if (!resp.ok) {
      throw Error("Tweet posting failed");
    }

    const data = await resp.json();
    responseDiv.classList.add("text-success");
    responseDiv.classList.remove("text-error");
    responseDiv.innerText = `Tweet posted successfully! Tweet ID: ${data.id}`;
  } catch (err) {
    responseDiv.classList.add("text-error");
    responseDiv.classList.remove("text-success");
    responseDiv.innerText = `Error: ${err.message}`;
  }
});
