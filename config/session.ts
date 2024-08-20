export const { sessionName, sessionExpires, dateExpires } = {
  sessionName: "tokenSafeliveHub",
  sessionExpires: 60 * 60 * 24 * 365 * 10,
  dateExpires: new Date(new Date().getTime() + 60 * 60 * 24 * 365 * 10 * 1000),
};




