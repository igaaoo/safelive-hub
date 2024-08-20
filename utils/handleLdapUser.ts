import dotenv from 'dotenv';
const ldap = require('ldapjs');
const assert = require('assert');
dotenv.config();
import { getLDAPSettings } from '@/backend/config/activeDirectory';



export async function getLdapUser(login_ad: string) {
  const ldapSettings = await getLDAPSettings();

  const userPrincipalName = ldapSettings?.login;
  const password = ldapSettings?.senha;
  const adSuffix = "dc=gruponewland,dc=local";

  const client = ldap.createClient({
    url: process.env.AD_URL
  });

  client.bind(userPrincipalName, password, (err: any) => {
    assert.ifError(err);
  });


  const opts = {
    // filter: '(objectClass=*)',
    filter: `(sAMAccountName=${login_ad})`,
    scope: 'sub',

  };

  return new Promise((resolve, reject) => {
    client.search(adSuffix, opts, (err: any, res: any) => {
      assert.ifError(err);

      const userData: any = {}; // Objeto para armazenar os dados do usuário
      const utilData: any = {};

      res.on('searchEntry', async (entry: any) => {
        const user = await entry;

        if (user && user.attributes) {
          user.attributes.forEach((attribute: { type: any; values: string | any[]; }) => {
            const attributeName = attribute.type;

            if (attribute.values && attribute.values.length > 0) {
              if (attribute.values.length > 1) {
                userData[attributeName] = attribute.values;
              } else {
                userData[attributeName] = attribute.values[0];
              }
            } else {
              userData[attributeName] = null;
            }
          });
        } else {
          console.log('Nenhum atributo encontrado para o usuário.');
        }
        utilData['name'] = userData.name || null;
        utilData['email'] = userData.mail || null;
        utilData['login'] = userData.sAMAccountName || null;
        utilData['description'] = userData.description || null;
        utilData['permissions'] = userData.memberOf || null;
        utilData['distinguishedName'] = userData.distinguishedName || null;
        utilData['userAccountControl'] = userData.userAccountControl || null;

        resolve(utilData);
        // resolve(userData);
      });

      res.on('end', () => {
        client.unbind((err: any) => {
          assert.ifError(err);
        });
      });
    });
  });
}

export async function blockLdapUser(login_ad: string) {
  return new Promise<string>(async (resolve, reject) => {
    const ldapSettings = await getLDAPSettings();

    const userPrincipalName = ldapSettings?.login;
    const password = ldapSettings?.senha;

    const client = ldap.createClient({
      url: process.env.AD_URL
    });

    client.bind(userPrincipalName, password, async (bindErr: any) => {
      if (bindErr) {
        console.error('Erro ao fazer login no AD:', bindErr);
        reject(new Error('Erro ao fazer login no AD'));
        return;
      }

      try {
        const userToBlock = await getLdapUser(login_ad) as any;

        if (!userToBlock) {
          console.error('Usuário não encontrado no AD.');
          reject(new Error('Usuário não encontrado no AD'));
          return;
        }

        // Define o valor "514" para o atributo "userAccountControl" (bloqueio)
        const change = new ldap.Change({
          operation: 'replace',
          modification: {
            type: 'userAccountControl',
            values: ['514'],
          },
        });

        const dn = userToBlock.distinguishedName;
        console.log("DN: ", dn);

        // Atualiza o atributo "userAccountControl" para bloquear o usuário
        client.modify(dn, change, (modifyErr: any) => {
          if (modifyErr) {
            console.error('Erro ao bloquear o usuário:', modifyErr);
            reject(new Error('Erro ao bloquear o usuário'));
          } else {
            console.log(`Usuário ${login_ad} bloqueado com sucesso.`);
            resolve('Usuário bloqueado com sucesso.');
          }

          // Encerra a conexão com o AD
          client.unbind((unbindErr: any) => {
            if (unbindErr) {
              console.error('Erro ao fazer unbind:', unbindErr);
              reject(new Error('Erro ao fazer unbind'));
            }
          });
        });
      } catch (error) {
        console.error('Erro ao processar usuário LDAP:', error);
        reject(new Error('Erro ao processar usuário LDAP'));
      }
    });
  });
}


export async function unblockLdapUser(login_ad: string) {
  return new Promise<string>(async (resolve, reject) => {
    const ldapSettings = await getLDAPSettings();

    const userPrincipalName = ldapSettings?.login;
    const password = ldapSettings?.senha;


    const client = ldap.createClient({
      url: process.env.AD_URL
    });

    client.bind(userPrincipalName, password, async (err: any) => {
      if (err) {
        reject(new Error('Erro ao fazer login no AD'));
        return;
      }

      try {
        const userToBlock = await Promise.resolve(getLdapUser(login_ad)) as any;

        if (!userToBlock) {
          console.error('Usuário não encontrado no AD.');
          client.unbind((unbindErr: any) => {
            if (unbindErr) {

              reject(new Error('Erro ao fazer unbind'));
              return;
            }
          });
        }

        // Define o valor "514" para o atributo "userAccountControl" (bloqueio)
        const change = new ldap.Change({
          operation: 'replace',
          modification: {
            type: 'userAccountControl',
            values: ['512'],
          },
        });

        const dn = userToBlock.distinguishedName;

        // Atualiza o atributo "userAccountControl" para bloquear o usuário
        client.modify(dn, change, (modifyErr: any) => {
          if (modifyErr) {
            reject(new Error('Erro ao desbloquear o usuário'));
          } else {
            resolve('Usuário desbloqueado com sucesso.');
          }

          // Encerra a conexão com o AD
          client.unbind((unbindErr: any) => {
            if (unbindErr) {
              reject(new Error('Erro ao fazer unbind'));
            }
          });
        });
      } catch (error) {
        reject(new Error('Erro ao processar usuário LDAP'));
      }
    });
  });
}


