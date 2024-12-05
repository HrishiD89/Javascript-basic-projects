const data = [
    "Pikachu",
    "Charizard",
    "Bulbasaur",
    "Squirtle",
    "Eevee",
    "Gengar",
    "Mewtwo",
    "Lucario",
    "Gyarados",
    "Dragonite",
    "Mew",
    "Rayquaza",
    "Kyogre",
    "Groudon",
    "Latios",
    "Latias",
    "Dialga",
    "Palkia",
    "Giratina",
    "Reshiram",
    "Zekrom",
    "Kyurem",
    "Xerneas",
    "Yveltal",
    "Zygarde"
  ];
  
  const selectCont = new Set();
  const scont = document.getElementById("selectContainer");
  const cont = document.getElementById("container");
  const search = document.getElementById("search");
  
  search.addEventListener("focus",()=>{
    cont.style.display="flex";
  })
  
  search.addEventListener('click', () => {
      cont.style.display="flex";
  });
  
  cont.addEventListener("mouseover",()=>{
    cont.style.display="flex";
  })
  
  cont.addEventListener('mouseout', () => {
      cont.style.display="none";
  });
  
  let selectedIndex = -1; 
  
  data.forEach((text, index) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    paragraph.classList.add("content");
    paragraph.addEventListener("click", handleClick);
    cont.appendChild(paragraph);
  });
  
  search.addEventListener("input", (e) => {
    let input = e.target.value.toLowerCase();
    const filteredData = data.filter(d => d.toLowerCase().includes(input));
  
    cont.innerHTML = "";
  
    filteredData.forEach((text, index) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      paragraph.classList.add("content");
      paragraph.addEventListener("click", handleClick);
      cont.appendChild(paragraph);
    });
  
    selectedIndex = -1;
  });
  
  function handleClick(e) {
    const text = e.target.textContent;
    selectCont.add(text);
    renderSelectedItems();
  }
  
  search.addEventListener("keydown", (e) => {
    if (event.keyCode === 13 || event.key === "Enter") {
      const text = e.target.value.toLowerCase();
      const filteredSelection = [...data].filter(s => s.toLowerCase().includes(text));
      selectCont.add(text);
      renderSelectedItems();
    } else if (event.keyCode === 40 || event.key === "ArrowDown") {
      if (selectedIndex < data.length - 1 && selectedIndex !== -1) {
        selectedIndex++;
      } else if (selectedIndex === -1) {
        selectedIndex = 0; 
      }
  
      const contents = document.querySelectorAll(".content");
  
      if (contents.length > 0) {
        contents.forEach((p, index) => {
          p.style.backgroundColor = "#d3d3d3";
          p.style.color = "black";
        });
  
        contents[selectedIndex].style.backgroundColor = "grey";
        contents[selectedIndex].style.color = "white";
  
        search.value = contents[selectedIndex].textContent; 
  
        contents[selectedIndex].scrollIntoView({ behavior: 'smooth' });
      }
    } else if (event.keyCode === 38 || event.key === "ArrowUp") {
      if (selectedIndex > 0) {
        selectedIndex--;
      } else {
        selectedIndex = data.length - 1; 
      }
  
      const contents = document.querySelectorAll(".content");
  
      if (contents.length > 0) {
        contents.forEach((p, index) => {
          p.style.backgroundColor = "#d3d3d3";
          p.style.color = "black";
        });
  
        contents[selectedIndex].style.backgroundColor = "grey";
        contents[selectedIndex].style.color = "white";
  
        search.value = contents[selectedIndex].textContent; 
  
        contents[selectedIndex].scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
  
  function renderSelectedItems() {
    scont.innerHTML = ""; 
    for (const text of selectCont) {
      const p1 = document.createElement("p");
      p1.textContent = text;
      p1.setAttribute("id", "select");
  
      const span = document.createElement("span");
      span.textContent = " x ";
      span.addEventListener("click", removeSpan);
  
      p1.appendChild(span);
      scont.appendChild(p1);
    }
  }
  
  function removeSpan(e) {
    const clickedSpan = e.target;
    const parentParagraph = clickedSpan.parentElement;
    const text = parentParagraph.textContent.trim();
    const firstPart = text.split(" ")[0];
    selectCont.delete(firstPart);
    renderSelectedItems();
  }