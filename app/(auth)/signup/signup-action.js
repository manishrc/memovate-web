'use server';

export const signupAction = async (prevState, formData) => {
  const { email, password, name } = Object.fromEntries(formData);

  return await fetch(`${process.env.BACKEND_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then((response) => response.json());
};
