import React from 'react';

export default function Clientform() {
  return (
    <div>
      <h1>טופס לקוח</h1>
      <form>
        <label>
          שם פרטי:
          <input type="text" name="firstName" />
        </label>
        <br />
        <label>
          שם משפחה:
          <input type="text" name="lastName" />
        </label>
        <br />
        <label>
          טלפון:
          <input type="tel" name="phone" />
        </label>
        <br />
        <button type="submit">שלח</button>
      </form>
    </div>
  );
}
