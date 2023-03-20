'use client';

import styles from '../../../page.module.css';
import React, { useState } from 'react';

function CreateDiscountPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: input,
    };

    const response = await fetch(
      'http://localhost:3000/discounts',
      requestOptions,
    );
    const data = await response.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>POST /discounts</p>
      </div>

      <div className={styles.grid}>
        <form onSubmit={handleSubmit}>
          <label>
            Request body:
            <textarea
              rows="10"
              cols="50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <br />
        <label>
          Response:
          <textarea rows="10" cols="50" value={response} readOnly />
        </label>
      </div>
    </main>
  );
}

export default CreateDiscountPage;
