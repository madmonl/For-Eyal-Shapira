import React from 'react';
import Modal from '../modal/Modal';
import { firebaseLogout } from '../auth/authSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Modal />
          <button className="button button--link" onClick={() => dispatch(firebaseLogout())}>Logout</button>
        </div>
      </div>
    </header>
  )
}
