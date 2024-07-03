export const validateOrigin = (origin: string | undefined) => {
  console.log(`origin -> ${origin}`);

  // TODO - wrap in try/catch
  // validate origin is defined
  if (!origin) {
    return false;
  }

  // get env allowed origins string
  const accessControlAllowedOrigins =
    process.env.ACCESS_CONTROL_ALLOWED_ORIGINS;
  console.log(`accessControlAllowedOrigins -> ${accessControlAllowedOrigins}`);

  // convert string of allowed origins to array
  const allowedOrigins = accessControlAllowedOrigins
    ? accessControlAllowedOrigins.split(",")
    : [];
  console.log(`allowedOrigins -> ${allowedOrigins}`);

  // validate allowed origins array is not empty
  if (!allowedOrigins) {
    return false;
  }

  // validate origin exists in allowed origins
  if (!allowedOrigins.includes(origin)) {
    console.log("origin not allowed");
    return false;
  }

  // all validations pass
  return true;
};
