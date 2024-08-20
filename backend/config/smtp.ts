var nodemailer = require('nodemailer');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getSMTPSettings = async () => {
  const smtpSettings = await prisma.smtp_config.findFirst({
    orderBy: { data: 'desc' },
  });
  return smtpSettings;
};


const smtpTransporter: any = async () => {
  const smtpSettings = await getSMTPSettings();

  const transporter = nodemailer.createTransport({
    service: smtpSettings?.servico,
    host: smtpSettings?.origem,
    port: smtpSettings?.porta,
    secure: false,
    auth: {
      user: smtpSettings?.login,
      pass: smtpSettings?.senha
    },
    ignoreTLS: smtpSettings?.tls,
    tls: {
      rejectUnauthorized: smtpSettings?.certificado
    }
  });
  return transporter;
};



export default smtpTransporter;