

import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (body) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_NUMBER,  // Twilio Sandbox number
      to: process.env.MY_WHATSAPP,      // Your WhatsApp number
      body: body
    });
    console.log('WhatsApp message sent:', message.sid);
  } catch (err) {
    console.error(' Failed to send WhatsApp message:', err.message);
  }
};
