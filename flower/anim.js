document.addEventListener("DOMContentLoaded", () => {
  const panel = document.querySelector(".flower-copy");
  const title = document.querySelector(".titulo");
  const paragraphs = [...title.querySelectorAll("h1, p")].map((block) =>
    block.textContent.trim()
  );
  const output = document.createElement("span");
  output.className = "typed-copy";
  title.replaceChildren(output);

  let started = false;
  window.parent.postMessage("flower-letter-animation-ready", "*");
  window.addEventListener("message", (event) => {
    if (
      event.source !== window.parent ||
      event.data !== "start-flower-letter-animation" ||
      started
    ) {
      return;
    }

    started = true;
    window.setTimeout(() => {
      panel.classList.add("is-visible");
      typeParagraph(0);
    }, 2000);
  });

  function typeParagraph(paragraphIndex) {
    const letters = Array.from(paragraphs[paragraphIndex]);
    let letterIndex = 0;
    output.textContent = "";

    const typeNextLetter = () => {
      output.textContent = letters.slice(0, ++letterIndex).join("");

      if (letterIndex < letters.length) {
        window.setTimeout(typeNextLetter, 50);
        return;
      }

      if (paragraphIndex === paragraphs.length - 1) {
        panel.classList.add("is-final");
        return;
      }

      window.setTimeout(() => {
        panel.classList.add("is-fading");
        window.setTimeout(() => {
          panel.classList.remove("is-fading");
          typeParagraph(paragraphIndex + 1);
        }, 600);
      }, 2000);
    };

    typeNextLetter();
  }
});