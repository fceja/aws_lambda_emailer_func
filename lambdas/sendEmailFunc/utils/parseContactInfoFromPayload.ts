import { ContactInfo } from "../types/index";

export const parseContactInfoFromEventBody = (
  eventBody: string | null
): { contactInfo: ContactInfo | null } => {
  try {
    // define var
    let contactInfo: ContactInfo | null = null;

    // parse contact info from payload
    const payload = eventBody ? JSON.parse(eventBody) : {} || {};
    const { contactName, contactEmail, contactEmailMessage } = payload;

    // verify contact info exists
    if (contactName && contactEmail && contactEmailMessage) {
      contactInfo = {
        contactName,
        contactEmail,
        contactEmailMessage,
      };
    } else {
      throw new Error("Error parsing contact info");
    }

    return { contactInfo };
  } catch (error) {
    return { contactInfo: null };
  }
};
