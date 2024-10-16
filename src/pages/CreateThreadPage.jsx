import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = (e) => {
    e.preventDefault();
    const newThread = {
      title,
      category,
      body,
    };
    dispatch(asyncAddThread(newThread));
    navigate('/');
  };

  return (
    <div className="new-thread-page">
      <h2>Buat Diskusi Baru</h2>
      <form className="new-thread-input" onSubmit={onAddThread}>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          className="input-body"
          placeholder="Isi diskusi"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Buat</button>
      </form>
    </div>
  );
}

export default CreateThreadPage;
