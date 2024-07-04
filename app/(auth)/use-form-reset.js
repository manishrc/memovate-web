import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

const EMPTY_FORM_STATE = { status: 'idle', timestamp: 0 };

const useFormReset = (action) => {
  const [formState, formAction] = useFormState(action, EMPTY_FORM_STATE);

  const formRef = useRef(null);

  useEffect(() => {
    if (formState.status === 'success') {
      formRef.current.reset();
    }
  }, [formState.status, formState.timestamp]);

  return formRef;
};

export { useFormReset };
