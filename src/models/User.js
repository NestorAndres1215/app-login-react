// src/models/User.js
export class User {
  constructor({ id, name, email, role, token }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.token = token;
  }

  isAdmin() {
    return this.role === "admin";
  }

  isUser() {
    return this.role === "user";
  }
}
