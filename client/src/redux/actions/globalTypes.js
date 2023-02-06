export const GLOBALTYPES = {
  AUTH: "AUTH",
  FORM_STATUS: "FORM_STATUS",
  ALERT: "ALERT",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  MODAL: "MODAL",
  THEME: "THEME",
  SOCKET: "SOCKET",
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};
