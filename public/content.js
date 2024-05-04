document.addEventListener("focusin", (event) => {
    const focusedElement = event.target;
    
    // got that input is textarea in mobile mode and div in desktop mode in linkedin
    const isTextarea = focusedElement.tagName === "TEXTAREA";
    const isContentEditableDiv = focusedElement.tagName === "DIV" && focusedElement.isContentEditable;
  
    // mobile or in desktop mode
    if (isTextarea || isContentEditableDiv) {
      if (!document.querySelector("#ai-icon")) {
        const aiIcon = document.createElement("img");
        aiIcon.src = chrome.runtime.getURL("icon.png");
        aiIcon.id = "ai-icon";
        aiIcon.style.position = "absolute";
        aiIcon.style.right = "10px";
        aiIcon.style.top = "10px";
        aiIcon.style.cursor = "pointer";
  
        const parentNode = focusedElement.parentNode;
        parentNode.appendChild(aiIcon);
  
        aiIcon.addEventListener("click", () => {
          const modal = document.createElement("div");
          modal.id = "ai-modal";
          modal.style.position = "fixed";
          modal.style.top = "60%";
          modal.style.left = "70%";
          modal.style.transform = "translate(-50%, -50%)";
          modal.style.backgroundColor = "#fff";
          modal.style.padding = "20px";
          modal.style.borderRadius='30px';
          modal.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
          modal.style.zIndex = "1000";
  
          const closeModal = (e) => {
            if (e.target === modal) {
              modal.remove();
              document.removeEventListener("click", closeModal);
            }
          };
  
          document.addEventListener("click", closeModal);
  
          const input = document.createElement("input");
          input.type = "text";
          input.placeholder = "Click on Generate";
  
          const generateButton = document.createElement("button");
          generateButton.innerText = "Generate";
          generateButton.style.backgroundColor = "#1E90FF"; 
          generateButton.style.color = "#fff"; 
          generateButton.style.padding = "5px 10px"; 
          generateButton.style.margin = "5px"; 
          generateButton.style.borderRadius = "5px"; 
  
          generateButton.onclick = () => {
            const response = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
            input.value = response;
          };
  
          const insertButton = document.createElement("button");
          insertButton.innerText = "Insert";
          insertButton.style.backgroundColor = "#1E90FF"; 
          insertButton.style.color = "#fff"; 
          insertButton.style.padding = "5px 10px"; 
          generateButton.style.margin = "5px"; 
          insertButton.style.borderRadius = "5px"; 
  
          insertButton.onclick = () => {
            if (isTextarea) {
              focusedElement.value = input.value; // Insert into textarea (mobile mode)
            } else if (isContentEditableDiv) {
              const newParagraph = document.createElement("p");
              newParagraph.textContent = input.value;
              focusedElement.appendChild(newParagraph); // Insert into contenteditable div (desktop mode)
            }
            modal.remove(); // Close the modal
          };  
  
          modal.appendChild(input);
          modal.appendChild(generateButton);
          modal.appendChild(insertButton);
  
          document.body.appendChild(modal);
        });
      }
    }
  });
  