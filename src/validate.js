const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;

// Validation Rules for each possible field
const validate = {
    login_id: (value)=>{
      return (value !== "")
      ? {  login_id: false, login_idError: false }
      : {  login_id: true,login_idError: "Please fill this field" }
    },
    password: (value)=>{
      return passwordRegex.test(value)
      ? { password: false, passwordError: false }
      : {
          password: true,
          passwordError:
            "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 symbol (@$%#^&*), 1 number (0-9).",
        };
    
}
}
export default validate;
