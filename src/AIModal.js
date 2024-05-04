import React, { useState, useEffect } from 'react';
import aiicon  from './assets/icon.png'

const AIModal = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedElement, setFocusedElement] = useState(null);

  const handleFocusIn = (event) => {
    const focused = event.target;
    const isTextarea = focused.tagName === 'TEXTAREA';
    const isContentEditableDiv = focused.tagName === 'DIV' && focused.isContentEditable;

    if (isTextarea || isContentEditableDiv) {
      setIsFocused(true);
      setFocusedElement(focused);
    } else {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  const handleIconClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false);
    }
  };

  const handleGenerateText = () => {
    // Here you can call an AI API or generate text locally
    return 'Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.';
  };

  const handleInsertText = () => {
    const generatedText = handleGenerateText();
    if (focusedElement.tagName === 'TEXTAREA') {
      focusedElement.value = generatedText;
    } else if (focusedElement.isContentEditable) {
      const newParagraph = document.createElement('p');
      newParagraph.textContent = generatedText;
      focusedElement.appendChild(newParagraph);
    }
    setModalVisible(false);
  };

  return (
    <div>
      {isFocused && (
        <img
          src={aiicon}
          alt="AI Icon"
          className="absolute top-2 right-2 cursor-pointer" 
          onClick={handleIconClick}
        />
      )}

      {modalVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center" 
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative" 
          >
            <input
              type="text"
              placeholder="Generated text will appear here..."
              className="border border-gray-300 p-2 rounded mb-4 w-full" 
              readOnly
            />
            <div className="flex justify-end">
              <button
                onClick={handleGenerateText}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600" 
              >
                Generate
              </button>
              <button
                onClick={handleInsertText}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" 
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIModal;
