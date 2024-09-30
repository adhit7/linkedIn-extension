import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import MessageIcon from './components/MessageIcon';
import PromptModal from './components/PromptModal';

const AIChat = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openPromptModal = () => setIsOpen(true);
  const closePromptModal = () => setIsOpen(false);

  const textBoxRef = useRef<HTMLElement | null>(null);
  const placeholderRef = useRef<HTMLElement | null>(null);

  // Function to handle clicks the contentEditable div
  const handleFocusEvent = (event: MouseEvent) => {
    textBoxRef.current = document.querySelector('.msg-form__contenteditable');
    // Check if focus is not null before proceeding
    if (
      textBoxRef.current &&
      !textBoxRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    } else {
      if (!placeholderRef.current) {
        placeholderRef.current = document.querySelector(
          '.msg-form__placeholder'
        );
      }
      setIsFocused(true);
    }
  };

  // Function to inject Tailwind CSS styles only once
  const injectTailwindStyles = (shadowRoot: ShadowRoot) => {
    if (!shadowRoot.querySelector('style')) {
      // Only inject if style doesn't exist
      const style = document.createElement('style');
      style.textContent = `
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css');
      `;
      shadowRoot.appendChild(style);
    }
  };

  useEffect(() => {
    // Attach the event listener for clicks
    document.addEventListener('click', handleFocusEvent);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', handleFocusEvent);
    };
  }, []);

  useEffect(() => {
    if (isFocused && placeholderRef.current) {
      // Check if ShadowRoot already exists
      let shadowRoot =
        placeholderRef.current.shadowRoot ||
        placeholderRef.current.attachShadow({ mode: 'open' });

      // Check if the container already exists to avoid re-creating it
      let iconContainer = shadowRoot.querySelector('.icon-container');

      if (!iconContainer) {
        iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container', 'relative', 'h-full');

        shadowRoot.appendChild(iconContainer);

        // Inject Tailwind CSS styles only once
        injectTailwindStyles(shadowRoot);
      }

      const root = ReactDOM.createRoot(iconContainer);

      // Render the React component only if the input is focused
      if (isFocused) {
        root.render(<MessageIcon openPromptModal={openPromptModal} />);
      } else {
        root.unmount(); // Unmount if not focused
      }

      // Cleanup function to unmount when the component is unmounted
      return () => {
        root.unmount(); // Unmount the React component
      };
    }
  }, [isFocused, placeholderRef.current]);

  return (
    <div className='h-full flex items-center justify-center'>
      {isOpen && (
        <PromptModal
          closePromptModal={closePromptModal}
          textBox={textBoxRef.current}
        />
      )}
    </div>
  );
};

export default AIChat;
