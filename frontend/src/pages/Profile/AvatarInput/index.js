import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useField } from '@unform/core';

import { toast } from 'react-toastify';
import { Container } from './styles';
import api from '~/services/api';

function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');
  const profile = useSelector((state) => state.user.profile);

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    try {
      const response = await api.post('files', data);
      const { id, url } = response.data;

      setPreview(url);
      setFile(id);
    } catch (err) {
      toast.warn('Algo deu errado ao selecionar a imagem. Tente novamente.');
    }
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview ||
            `https://api.hello-avatar.com/adorables/120/${profile.id}`
          }
          alt=""
        />

        <input
          type="file"
          accept="image/*"
          id="avatar"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default AvatarInput;
