import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 30;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalBody = styled.div`
  position: relative;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #888;
  max-width: 350px;
  z-index: 35;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  transition: all 0.3s ease-in-out;
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
`;

const CloseButton = styled.button`
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
  border: none;
  padding: 0;
  align-self: center;
  background-color: white;
  background-color: transparent;

  span {
    display: inline-block;
    background-color: transparent;
  }
  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  flex-basis: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em 1em 1em;
`;

const Portal = ({ children }) => {
  let modalRoot = document.getElementById('modal');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  }
  // will mount in modal-root
  const element = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(element);

    //cleanup
    return () => modalRoot.removeChild(element);
  });
  return createPortal(children, element);
};

const Modal = ({ children, close, render, buttonRef }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.focus();
    //when modal closes because of player drafted put focus on top of undraftedPlayers list
    return () => buttonRef.current && buttonRef.current.focus();
  }, []);
  return (
    <Portal>
      <>
        <ModalWrapper
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
          ref={modalRef}
          onKeyDown={e => e.keyCode === 27 && close()}
        >
          <ModalBody
            aria-label="draft player action"
            onKeyDown={e => e.keyCode === 27 && close()}
          >
            <CloseButtonWrapper>
              <CloseButton
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden>&times;</span>
              </CloseButton>
            </CloseButtonWrapper>
            <ChildrenWrapper>{render(children) || children}</ChildrenWrapper>
          </ModalBody>
        </ModalWrapper>
        <Overlay onClick={close} />
      </>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  close: PropTypes.func,
  render: PropTypes.func,
  buttonRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(React.Component),
  ]),
};

export default Modal;
