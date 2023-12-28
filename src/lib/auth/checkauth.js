// utils/auth.js
import { getSession } from "next-auth/react";

export const withAuthServerSideProps = async (handler) => {
  return async (context) => {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }

    return await handler(context, session);
  };
};
