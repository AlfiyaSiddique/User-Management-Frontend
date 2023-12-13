// Required Regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;
const phoneRegex = /^[0-9]+$/;

// Validation Rules for each possible field
const validate = {
  login_id: (value) => {
    return value !== ""
      ? { login_id: false, login_idError: false }
      : { login_id: true, login_idError: "Please fill this field" };
  },
  password: (value) => {
    return passwordRegex.test(value)
      ? { password: false, passwordError: false }
      : {
          password: true,
          passwordError:
            "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 symbol (@$%#^&*), 1 number (0-9).",
        };
  },
  first_name:(value) => {
    if (!value) return { first_name: true, first_nameError: "First Name field cannot be empty" };
    else {
      return value.length < 3
        ? { first_name: true, first_nameError: "First Name must be atleast 3 characters long." }
        : { first_name: false, first_nameError: false };
    }
  },
  last_name: (value)=>{
    if (!value) return { last_name: true, last_nameError: "Last Name field cannot be empty" };
    else {
      return value.length < 3
        ? { last_name: true, last_nameError: "Last Name must be atleast 3 characters long." }
        : { last_name: false, last_nameError: false };
    }
  },

  require:  (value, name) => {
    return value !== ""
      ? { [name]: false, [`${name}Error`]: false }
      : { [name]: true, [`${name}Error`]: "Please fill this field" };
  },

  phone: (value) => {
    return phoneRegex.test(value)
      ? { phone: false, phoneError: false }
      : {
          phone: true,
          phoneError:
            "Please enter valid phone number",
        };
  },
  address: (value)=>{
    const numOfWords = value.split(" ").length;

    if (numOfWords < 10 || numOfWords > 30) {
      return {address: true, addressError: "Characters min. 10 - max. 30 Words"};
    } else {
      return {address: false, addressError: false};
    }
  }, 
};
export default validate;
