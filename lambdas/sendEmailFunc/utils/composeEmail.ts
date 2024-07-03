import { ContactInfo } from "../types/index";

export const composeEmail = (
  contactInfo: ContactInfo
): { emailMessage: string | null } => {
  try {
    const emailMessage: string = `
      Contact Info
        - Name: ${contactInfo.contactName}
        - Email: ${contactInfo.contactEmail}
        - Message: ${contactInfo.contactEmailMessage}

        ------------------------
        AUTOMATED EMAIL
        ACCOUNT IS NOT MONITORED
      `;
    return { emailMessage };
  } catch (error) {
    console.error(error);
    return { emailMessage: null };
  }
};
