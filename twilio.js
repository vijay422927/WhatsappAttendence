import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { required_token } from './controllers/Auth.js';
import { termid }         from './controllers/term.js';
import { attendance_ }    from './controllers/Attendence.js';
import { sendWhatsAppMessage } from './controllers/whatsapp.js';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/test', async (req, res) => {
    
  const raw = req.body.Body?.trim(); 
 

  console.log('Incoming:', raw);

  //1) Must include a comma
  if (!raw || !raw.includes(',')) {
    await sendWhatsAppMessage(
      'To get attendance, send:\nemail@example.com,your_password'
    );
    return res.send('<Response></Response>');
  }

  // 2) Split email & password
  const [email, password] = raw.split(',', 2).map(s => s.trim());
  if (!email || !password) {
    await sendWhatsAppMessage(
      'Invalid format. Use:\nemail@example.com,your_password'
    );
    return res.send('<Response></Response>');
  }

  try {
    // 3) Authenticate user
    const auth = await required_token(email, password);
    if (!auth || !auth.token) throw new Error('Auth failed');

    const { token, ukid, programid, batchYear } = auth;
    console.log(' Auth OK:', { ukid, programid, batchYear });

    // 4) Get term ID
    const term_id = await termid(programid, batchYear, token);
    console.log(' term_id:', term_id);

    // 5) Fetch attendance (your Attendance.js should accept ukid & term_id)
    const reportText = await attendance_(ukid, term_id,token);
    console.log( reportText);

    // 6) Reply back on WhatsApp
    await sendWhatsAppMessage(reportText);

  } catch (err) {
    console.error('Error in flow:', err.message);
    await sendWhatsAppMessage(
      'Failed to login or fetch attendance. Please check your credentials and try again.'
    );
  }

  // 7) Always respond to Twilio
  res.send('<Response></Response>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
