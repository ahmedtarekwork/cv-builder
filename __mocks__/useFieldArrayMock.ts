import { useState } from "react";

const useFieldArrayMock = () => {
  const [fields, setFields] = useState([{ id: "mock-1", skill: "" }]);

  const append = jest.fn((newField) => {
    setFields((currentFields) => [
      ...currentFields,
      { ...newField, id: `mock-${currentFields.length + 1}` },
    ]);
  });

  const remove = jest.fn((index) => {
    setFields((currentFields) => currentFields.filter((_, i) => i !== index));
  });

  return { fields, append, remove };
};

export default useFieldArrayMock;
