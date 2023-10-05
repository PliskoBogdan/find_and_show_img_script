async function imgToWCAGStandartOld() {
		// Vars
		const inputIdAttributeKey = 'data-img-input-id-attribute';
		const imgIdAttrubuteKey = 'data-img-id-attribute';

    /** Get random words from API
     * @param { number } count - how many words we will return
     * @return { string[] } - return list of random words
     */
    async function getRandomWords(count) {
      try {
        const randomWordsListResponse = await fetch(
          `https://random-word-api.herokuapp.com/word?number=${count}`
        );

        return await randomWordsListResponse.json();
      } catch (error) {
        return new Array(count).fill(`${Math.random()}`);
      }
    }

    /** Set up initial IMG node settings (attributes, listeners eth.)
     * @param { HTMLElement } img - current img
     * @param { string } uniqueId - id value for input and imgIdAttribute for IMG
     * @param { string } word - random word from API
     */
    function setIMGSettings(img, uniqueId, word) {
      img.setAttribute("alt", word);
      img.style.border = "2px solid red";
      img.style.cursor = "pointer";
      img.dataset.imgIdAttribute = uniqueId;

      img.addEventListener("click", (e) => {
        const imgsInputsNodes = document.querySelectorAll(
          `input[${inputIdAttributeKey}]`
        );

        // If current input have opened input field - close him
        if (imgsInputsNodes.length === 1) {
          const firstFindedInputId = imgsInputsNodes[0].getAttribute(
            inputIdAttributeKey
          );
          const currentImgId = e.target.getAttribute(imgIdAttrubuteKey);

          if (firstFindedInputId === currentImgId) {
            imgsInputsNodes[0].remove();
            return;
          }
        }

        // Hide old opened inputs
        if (imgsInputsNodes?.length) {
          imgsInputsNodes.forEach((node) => node.remove());
        }

        const input = document.createElement("input");
        input.value = img.getAttribute("alt");
        // input.setAttribute("id", uniqueId);
        input.dataset.imgInputIdAttribute = uniqueId;

        // Set up input for img alt attribute
        input.addEventListener("input", (event) => {
          const inputValue = event.target.value;
          const inputId = event.target.getAttribute(
            inputIdAttributeKey
          );
          const imgInput = document.querySelector(
            `img[${imgIdAttrubuteKey}="${inputId}"]`
          );

          imgInput.setAttribute("alt", inputValue);
        });

        img.insertAdjacentElement("afterend", input);
      });
    }

    // Initial imgs settings setup
    const imgs = document.querySelectorAll("img");
    const randomWordsList = await getRandomWords(imgs.length);

    const imgNodesPromises = Array.from(imgs).map((img, index) =>
      setIMGSettings(img, `${Math.random()}`, randomWordsList[index])
    );
    await Promise.all(imgNodesPromises);

    // check DOM changed (only for Img and Img alt attribute input)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(async (node, index) => {
          if (node.tagName !== "IMG") {
            return;
          }

          const imgs = document.querySelectorAll("img");
          const createdImgIndex = Math.random();
          const randomWord = await getRandomWords(1);

          setIMGSettings(node, createdImgIndex, randomWord[0]);
        });

        mutation.removedNodes.forEach((node) => {
          const nodeIndex = node.getAttribute(imgIdAttrubuteKey);
          const inputNode = document.querySelector(
            `input[data-img-input-id-attribute="${nodeIndex}"]`
          );
          if (inputNode) {
            inputNode.remove();
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function imgToWCAGStandart() {
    /** Get random words from API
     * @param { number } count - how many words we will return
     * @return { string[] } - return list of random words
     */
    async function getRandomWords(count) {
      try {
        const randomWordsListResponse = await fetch(
          `https://random-word-api.herokuapp.com/word?number=${count}`
        );

        return await randomWordsListResponse.json();
      } catch (error) {
        return new Array(count).fill(`${Math.random()}`);
      }
    }

    /** Set up initial IMG node settings (attributes, listeners eth.)
     * @param { HTMLElement } img - current img
     * @param { string } word - random word from API
     */
    function setIMGSettings(img, word) {
      img.setAttribute("alt", word);
      img.style.border = "2px solid red";
      img.style.cursor = "pointer";

      img.addEventListener("click", (e) => {
        const newAltText = prompt(
          "Add new alt text:",
          e.target.getAttribute("alt")
        );

        if (newAltText !== null) {
          e.target.setAttribute("alt", newAltText);
        }
      });
    }

    // Initial imgs settings setup
    const imgs = document.querySelectorAll("img");
    const randomWordsList = await getRandomWords(imgs.length);

    const imgNodesPromises = Array.from(imgs).map((img, index) =>
      setIMGSettings(img, randomWordsList[index])
    );

    await Promise.all(imgNodesPromises);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(async (node, index) => {
          if (node.tagName !== "IMG") {
            return;
          }

          const randomWord = await getRandomWords(1);

          setIMGSettings(node, randomWord[0]);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
