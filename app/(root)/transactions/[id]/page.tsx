"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Transaction } from "@/types";
import { useParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import jsPDF from "jspdf";

export default function TransactionDetailPage() {
  const params = useParams();
  const transactionId = params.id as string;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTransaction() {
      try {
        const response = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_TABLE_ID!,
          transactionId
        );

        setTransaction(response as unknown as Transaction);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getTransaction();
  }, [transactionId]);

  if (loading) {
    return <p>Loading transaction detail...</p>;
  }

  if (!transaction) {
    return <p>Transaction not found.</p>;
  }

  const referenceNumber = transaction.$id.slice(0, 8).toUpperCase();

    function downloadReceipt() {
        if (!transaction) return;

        const pdf = new jsPDF();

        pdf.setFontSize(20);
        pdf.text("Transaction Receipt", 20, 20);

        pdf.setFontSize(12);

        pdf.text(`Transaction: ${transaction.title}`, 20, 40);
        pdf.text(`Type: ${transaction.type}`, 20, 50);
        pdf.text(`Amount: $${transaction.amount}`, 20, 60);
        pdf.text(
            `Status: ${transaction.status || "success"}`,
            20,
            70
        );

        pdf.text(
            `Date: ${new Date(
            transaction.date
            ).toLocaleString("id-ID")}`,
            20,
            80
        );

        pdf.text(
            `Reference: ${transaction.$id
            .slice(0, 8)
            .toUpperCase()}`,
            20,
            90
        );

        if (transaction.note) {
            pdf.text(`Note: ${transaction.note}`, 20, 100);
        }

        pdf.save(
            `receipt-${transaction.$id
            .slice(0, 8)
            .toUpperCase()}.pdf`
        );
    }

  return (
    <div>
      <h1 className="text-3xl font-bold">Transaction Detail</h1>

      <p className="mb-8 mt-2 text-gray-500">
        View transaction receipt and details.
      </p>


      <div className="max-w-xl rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
            <div className="mb-6 text-center">
            <CheckCircle
                size={60}
                className="mx-auto text-green-500"
            />

            <h2 className="mt-4 text-2xl font-bold">
                Transaction Successful
            </h2>
            </div>

          <div className="mt-3 flex justify-center">
            <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                transaction.status === "success"
                    ? "bg-green-100 text-green-700"
                    : transaction.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
                {transaction.status || "success"}
            </span>
            </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Transaction</span>
            <span className="font-medium">{transaction.title}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Type</span>
            <span className="font-medium capitalize">{transaction.type}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold">${transaction.amount}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Recipient</span>
            <span className="font-medium">{transaction.recipient}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">
              {new Date(transaction.date).toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">Status</span>
            <span className="font-medium capitalize">
              {transaction.status || "success"}
            </span>
          </div>

          {transaction.note && (
            <div className="border-b pb-3">
              <span className="text-gray-500">Note</span>
              <p className="mt-1 font-medium">{transaction.note}</p>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <span className="text-gray-500">Reference ID</span>
            <span className="font-mono text-sm">{referenceNumber}</span>
          </div>

          <button
            onClick={downloadReceipt}
            className="mt-6 w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
            >
            Download Receipt PDF
          </button>

        </div>
      </div>
    </div>
  );
}