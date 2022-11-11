import fs from "fs";
import { promisify } from "util";

const appendfile = promisify(fs.appendFile);

const requestLogger = async (req, res, next) => {
  // console.log(err);
  // if (err) {
  //   await appendFile(
  //     "logs/ErrorLogger.txt",
  //     `${new Date().toDateString()} - ${err.message}\n`,
  //     (error) => {
  //       if (error) {
  //         console.log("logging failed");
  //       }
  //     }
  //   );
  //   if (err.status) {
  //     res.status(err.status);
  //   } else {
  //     res.status(500);
  //   }

  //   res.json({
  //     status: "error",
  //     message: err.message,
  //   });
  // } else {
  try {
    const date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    let reqBody =
      (req.method === "POST" || "PUT") && req.body
        ? "- Request Body: " + JSON.stringify(req.body)
        : "";
    const logMessage = `${new Date()} - ${req.method} - ${
      req.url
    } ${reqBody} \n`;
    await appendfile(`logs/log_${date}`, logMessage);
    next();
  } catch (err) {
    next(err);
  }
  // }
};

export default requestLogger;
