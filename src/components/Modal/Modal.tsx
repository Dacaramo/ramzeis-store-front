import { FC, ReactNode } from 'react';

interface Props {
  id: string;
  children: ReactNode;
}

const Modal: FC<Props> = ({ id, children }) => {
  return (
    <dialog
      id={id}
      className='modal modal-bottom sm:modal-middle'
    >
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button className='btn btn-sm rounded-lg btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
