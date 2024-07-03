import type {
  APIGatewayEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { executeSendEmail } from "./lib/myNodemailer";
import { composeEmail } from "./utils/composeEmail";
import { parseContactInfoFromEventBody } from "./utils/parseContactInfoFromPayload";
import { validateOrigin } from "./utils/validateOrigin";

const returnError = (origin: string | undefined) => ({
  statusCode: 401,
  headers: {
    "Access-Control-Allow-Origin": `${origin}`,
  },
  body: JSON.stringify({
    message: "Error occurred.",
  }),
});

export const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  // set lambda func to not wait for event loop to be empty
  // allows lambda func to immediately response to invoker
  context.callbackWaitsForEmptyEventLoop = false;

  // validate origin is allowed
  if (!validateOrigin(event.headers.origin)) {
    return returnError(event.headers.origin);
  }

  // parse payload for contact info
  const { contactInfo } = parseContactInfoFromEventBody(event.body);
  if (!contactInfo) {
    return returnError(event.headers.origin);
  }

  // compose email message with contact info
  const { emailMessage } = composeEmail(contactInfo);
  if (!emailMessage) {
    return returnError(event.headers.origin);
  }

  const { response } = await executeSendEmail(emailMessage);
  console.log(`response -> ${response}`);
  if (!response) {
    return returnError(event.headers.origin);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": `${event.headers.origin}`,
    },
    body: JSON.stringify({ message: "Email sent successfully." }),
  };
};
