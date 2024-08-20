import axios from "axios";

type ActionLog = {
  app: string;
  action: string;
  user: string;
  desc: string;
  origin: string;
};

type AccessLog = {
  app: string;
  user: string;
};

export async function logActionDevhub({ app, action, user, desc, origin }: ActionLog) {
  await axios.post('https://devhub.gruponewland.com.br/api/logs/app',
    {
      "app": app,
      "action": action,
      "user": user,
      "desc": desc,
      "origin": origin
    },
    {
      headers: {
        token: process.env.TOKEN_DEVHUB,
      }
    }
  );
}

export async function logAccessDevhub({ app, user }: AccessLog) {
  await axios.post('https://devhub.gruponewland.com.br/api/logs/access',
    {
      "app": app,
      "user": user
    },
    {
      headers: {
        token: process.env.TOKEN_DEVHUB,
      }
    }
  );
}