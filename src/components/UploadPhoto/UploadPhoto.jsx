import { useState } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import css from './UploadPhoto.module.css';
import { useDetectFormikReset } from '../../hooks/useDetectFormikReset';
const UploadPhoto = ({ setFieldValue }) => {
  const [preview, setPreview] = useState(null);
  const [, meta] = useField('photo');
  useDetectFormikReset(() => {
    setPreview(null);
  });

  const onChange = e => {
    const file = e.target.files[0];
    setFieldValue('photo', file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className={css.container}>
      <div className={clsx(css.box, preview && css.borderless)}>
        {preview ? (
          <img src={preview} alt="Recipe preview" />
        ) : (
          <label
            className={clsx(css.labelContent, meta.touched && meta.error && css['input-error'])}
          >
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
      {meta.touched && meta.error && <div className={css.error}>{meta.error}</div>}
    </div>
  );
};

export default UploadPhoto;
