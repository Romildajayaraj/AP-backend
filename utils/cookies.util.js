import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const setCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  if (isProduction && process.env.cookie_domain) {
    cookieOptions.domain = process.env.cookie_domain;
  }

  return res.cookie("auth_token", token, cookieOptions);
};

export const clearCookie = (res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };

  if (isProduction && process.env.cookie_domain) {
    cookieOptions.domain = process.env.cookie_domain;
  }

  return res.clearCookie("auth_token", cookieOptions);
};
