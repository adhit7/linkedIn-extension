import React from 'react';
import reactLogo from '@/assets/writeIcon.svg';

interface MessageIconProps {
  openPromptModal: () => void;
}

const MessageIcon: React.FC<MessageIconProps> = ({
  openPromptModal,
}: MessageIconProps) => {
  return (
    <div
      onClick={openPromptModal}
      className='absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-md m-2'
    >
      <img src={reactLogo} alt='logo' className='h-6 w-6' />
    </div>
  );
};

export default MessageIcon;
