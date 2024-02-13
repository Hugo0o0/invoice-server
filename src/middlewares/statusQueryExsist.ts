import tryCatch from "@/utils/tryCatch";

const statusQueryExsist = tryCatch(async (req, res, next) => {
  if (req.query.status) {
    // @ts-ignore
    req.query.status = req.query.status.split(",");
  } else {
    req.query.status = ["draft", "paid", "pending"];
  }
  next();
});

export default statusQueryExsist;
