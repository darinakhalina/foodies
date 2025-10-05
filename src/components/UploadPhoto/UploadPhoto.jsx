import { useState } from 'react';
import clsx from 'clsx';
import css from './UploadPhoto.module.css';

const UploadPhoto = ({ setFieldValue }) => {
  const [preview, setPreview] = useState(null);
  const onChange = e => {
    const file = e.target.files[0];
    setFieldValue('photo', file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className={css.container}>
      <div className={clsx(css.box, preview && css.borderless)}>
        {preview ? (
          <img
            src={preview}
            alt="Recipe preview"
            className="object-cover w-full h-full rounded-xl"
          />
        ) : (
          <label className={css.labelContent}>
            <input type="file" className={css.hidden} onChange={onChange} />
            <svg className={css.icon}>
              <use href="/images/icons.svg#icon-photocamera" />
            </svg>
            <span>Upload a photo</span>
          </label>
        )}
      </div>
      {preview ? (
        <label className={css.another}>
          <input type="file" className={css.hidden} onChange={onChange} />
          <span>Upload another photo</span>
        </label>
      ) : null}
    </div>
  );
};

export default UploadPhoto;
