import React from "react";
import { useFormikContext } from "formik";

import AppButtons from "../buttons/AppButton";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return <AppButtons title={title} onPress={handleSubmit} />;
}

export default SubmitButton;
