"use client";

import { useState } from "react";

export default function TransferForm() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      recipient,
      amount,
      note,
    });

    alert("Transfer success! Check console for data.");

    setRecipient("");
    setAmount("");
    setNote("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Recipient Email
        </label>
        <input
          type="email"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="example@email.com"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Payment note"
          className="min-h-28 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800"
      >
        Send Money
      </button>
    </form>
  );
}