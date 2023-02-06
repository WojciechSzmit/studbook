const registerValidation = ({
  fullname,
  username,
  email,
  password,
  confirm_password,
}) => {
  const err = {};

  if (!fullname) {
    err.fullname = "Dodaj swoje imię i nazwisko";
  } else if (fullname.length > 25) {
    err.fullname = "Długość nazwiska i imienia nie może przekraczać 25 zanków";
  }

  if (!username) {
    err.username = "Dodaj swoją nazwę";
  } else if (username.replace(/ /g, "").length > 25) {
    err.username = "Długość nazwy nie może przekraczać 25 zanków";
  }

  if (!email) {
    err.email = "Dodaj swój email";
  } else if (!validateEmail(email)) {
    err.email = "Wpisany adres email jest nieprawidłowy";
  }

  if (!password) {
    err.password = "Wprowadź hasło";
  } else if (password.length < 6) {
    err.password = "Wprowadzone hasło musi mieć minimum 6 zanków";
  }

  if (password !== confirm_password) {
    err.confirm_password = "Wprowadzone hasła nie pasują do siebie";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default registerValidation;
