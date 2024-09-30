import React from 'react';
import generateIcon from '@/assets/generateIcon.svg';
import regenerateIcon from '@/assets/regenerateIcon.svg';
import insertIcon from '@/assets/insertIcon.svg';

interface PromptModalProps {
  closePromptModal: () => void;
  textBox: HTMLElement | null;
}

const PromptModal: React.FC<PromptModalProps> = ({
  closePromptModal,
  textBox,
}: PromptModalProps) => {
  const [userInput, setUserInput] = useState<string>('');
  const [userResponse, setUserResponse] = useState<string>('');
  const aiResponse = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLDivElement).id === 'overlay') {
      closePromptModal();
    }
  };

  const handleInsert = () => {
    const childElement = textBox?.children?.[0] as HTMLElement;
    if (childElement) {
      const currentText = childElement.textContent?.trim() || '';
      childElement.textContent =
        currentText.length === 0 ? aiResponse : currentText + aiResponse;
      childElement.dispatchEvent(new Event('input', { bubbles: true }));

      setUserResponse('');
      setUserInput('');
      closePromptModal();
    }
  };

  const handleGenerate = () => {
    setUserResponse(userInput);
    setUserInput('');
  };

  return (
    <div
      id='overlay'
      className='z-50 w-screen h-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleOverlayClick} // Handle clicks outside modal to close
    >
      <div className='bg-gray-50 rounded-lg shadow-lg w-[44rem] p-6'>
        {userResponse.length > 0 && (
          <div className='flex flex-col gap-4 mb-6 text-xl overflow-y-auto'>
            <div className='self-end max-w-[70%]'>
              <p className='p-3 text-slate-500 bg-[#dfe1e7] rounded-lg break-words'>
                {userResponse}
              </p>
            </div>

            <div className='self-start max-w-[70%]'>
              <p className='p-3 text-slate-500 bg-[#dbeafe] rounded-lg break-words'>
                {aiResponse}
              </p>
            </div>
          </div>
        )}

        <div>
          <input
            type='text'
            name='prompt'
            placeholder='Your prompt'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='w-full outline-none border border-gray-300 placeholder:text-gray-400 px-2 py-3 text-gray-500 rounded-lg text-xl'
          />
        </div>

        {userResponse.length > 0 ? (
          <div className='mt-6 flex justify-end items-center space-x-3'>
            <button
              className='flex justify-between items-center space-x-2 p-2 bg-[#f9fafb] text-[#666D80] border border-[#666D80] text-xl rounded-md'
              onClick={handleInsert}
            >
              <img src={insertIcon} alt='logo' className='h-4 w-4' />
              <span>Insert</span>
            </button>
            <button className='flex justify-between  items-center border border-transparent space-x-2 px-4 py-2 bg-blue-500 text-white text-xl rounded-md'>
              <img src={regenerateIcon} alt='logo' className='h-5 w-5' />
              <span>Regenerate</span>
            </button>
          </div>
        ) : (
          <div className='mt-6 flex justify-end'>
            <button
              className={`flex justify-between items-center space-x-2 px-5 py-2 text-xl rounded-md
                ${
                  userInput.trim().length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white'
                }`}
              onClick={handleGenerate}
            >
              <img src={generateIcon} alt='logo' className='h-5 w-5' />
              <span>Generate</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptModal;
