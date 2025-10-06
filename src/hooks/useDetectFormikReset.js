import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';

export const useDetectFormikReset = onReset => {
  const { values, initialValues } = useFormikContext();
  const prevValuesRef = useRef(values);

  useEffect(() => {
    const prevValues = prevValuesRef.current;

    const wasReset =
      JSON.stringify(values) === JSON.stringify(initialValues) &&
      JSON.stringify(prevValues) !== JSON.stringify(initialValues);

    if (wasReset) {
      onReset();
    }

    prevValuesRef.current = values;
  }, [values, initialValues, onReset]);
};
