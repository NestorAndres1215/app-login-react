// src/models/RegisterUser.js
export class RegisterUser {
  constructor({ name, email, password, roleName = "user" }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.roleName = roleName;
  }
}
