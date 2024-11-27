(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialDiv = document.querySelector("#material-div");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  //AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  //functions
  function loadInfoBoxes() {
    //make AJAX call here
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoboxes) => {
        console.log(infoboxes);
        infoboxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const img = document.createElement("img");
          img.src = `images/${infoBox.thumbnail}`;

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          selected.appendChild(img);
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
          "Oops! Something went wrong. We couldn't process your request right now due to " +
          error +
          " or maybe a typo or syntax error.";
        hotspots.appendChild(errorMessage);
      });
  }
  loadInfoBoxes();

  //AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"

  function loadMaterialInfo() {
    //loader toggle here
    loader.classList.toggle("hidden");
    //make AJAX call here
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => response.json())
      .then((materialListData) => {
        materialListData.forEach((material) => {
          const clone = materialTemplate.content.cloneNode(true);
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(
            ".material-description"
          );
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
        loader.classList.toggle("hidden");
        materialTemplate.innerHTML = "";
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
          "Oops! Something went wrong. We couldn't process your request right now due to " +
          error +
          " or maybe a typo or syntax error.";
        materialDiv.appendChild(errorMessage);
      });
  }
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
