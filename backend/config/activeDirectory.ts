import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
dotenv.config();

export const getLDAPSettings = async () => {
  const ldapSettings = await prisma.ldap_config.findFirst({
    orderBy: { data: 'desc' },
  });
  return ldapSettings;
};


