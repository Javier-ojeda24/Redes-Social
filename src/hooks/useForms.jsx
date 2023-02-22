import React, { useState } from "react";

export const useForms = (initalObj = {}) => {
  const [forms, setForm] = useState(initalObj);

  const changed = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...forms,
      [name]: value,
    });
  };

  return {
    forms,
    changed,
  };
};
