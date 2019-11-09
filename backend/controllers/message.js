import config from "config";
import validate from "validate.js";
import { SITE_MESSAGE_VALIDATION } from "../constants/validation";
import CodingChipmunksBot from "../services/telegramBot";

const CHANNEL_ID = config.get("group_chat_id");

export const handleSiteMessage = async form => {
  const errors = await validate(form, SITE_MESSAGE_VALIDATION);

  if (errors) {
    throw errors;
  }

  await sendMessageToChannel(form);
};

export const sendMessageToChannel = async form => {
  CodingChipmunksBot.sendMessage(CHANNEL_ID, generateSiteMessage(form), {
    parse_mode: "HTML"
  });
};

export const generateSiteMessage = (form) => {
  return `
<b>Hello CodingChipmunks Team</b>
You have new message from client

<pre>Full Name: ${form.name};

Email: ${form.email};

Subject: ${form.subject};

Messages: ${form.message};</pre>`;
};
