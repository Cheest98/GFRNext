import React from "react";
import { CardWrapper } from "../shared/CardWrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      {" "}
      Test{" "}
    </CardWrapper>
  );
};
