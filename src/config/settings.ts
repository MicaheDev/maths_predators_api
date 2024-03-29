import path from "path";

/* eslint-disable global-require */
if (process.env.NODE_ENV !== "production") {
  if (process.env.NODE_ENV === "test") {
    require("dotenv").config({ path: path.join(__dirname, "../../test.env") });
  } else {
    require("dotenv").config({ path: path.join(__dirname, "../../dev.env") });
  }
} else {
  require("dotenv").config();
}

const setting = {
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,
  TOKEN: process.env.TOKEN,
  OWNER: process.env.OWNER,
  REPO: process.env.REPO,
};

export default setting;
