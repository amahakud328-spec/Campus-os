import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Receipt,
  HelpCircle,
  Send,
  Printer,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { feeData } from '../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const FeesPage = () => {
  const { studentProfile, showToast } = useCampus();

  const [activeReceipt, setActiveReceipt] = useState(null);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryCategory, setQueryCategory] = useState('Payment Reconciliation');
  const [queryDescription, setQueryDescription] = useState('');
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false);

  const percentagePaid = Math.round((feeData.paidAmount / feeData.totalFee) * 100);

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!queryDescription.trim()) {
      showToast('Please describe your fee inquiry', 'warning');
      return;
    }

    setIsSubmittingQuery(true);
    setTimeout(() => {
      setIsSubmittingQuery(false);
      setShowQueryModal(false);
      setQueryDescription('');
      showToast('Fee query #FQ-892 raised successfully! Accounts Cell will respond in 24h.', 'success');
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Fee Information & Receipts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track semester tuition dues, hostel advances, payment histories, and download tax receipts.
          </p>
        </div>

        <button
          onClick={() => setShowQueryModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors self-start cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-cyan-300" />
          <span>Raise Fee Query</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Annual Fee</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">
            ₹{feeData.totalFee.toLocaleString()}
          </h3>
          <p className="text-xs text-slate-500 mt-2">Tuition + Hostel + Mess</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Amount Paid</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-2">
            ₹{feeData.paidAmount.toLocaleString()}
          </h3>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> 2 Installments Cleared
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Remaining Balance</p>
          <h3 className="text-3xl font-black text-amber-600 mt-2">
            ₹{feeData.remainingAmount.toLocaleString()}
          </h3>
          <p className="text-xs text-amber-700 font-medium mt-2">Sem 6 Final Installment</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Next Due Date</p>
          <h3 className="text-2xl font-black text-slate-900 mt-2">{feeData.nextDueDate}</h3>
          <p className="text-xs text-slate-500 mt-2">No late fee applied</p>
        </div>
      </div>

      {/* Fee Clearance Progress Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Academic Year Fee Clearance</h4>
            <p className="text-slate-500 text-[11px]">75% paid • ₹35,000 pending due</p>
          </div>
          <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full text-xs">
            {percentagePaid}% Cleared
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 transition-all duration-1000"
            style={{ width: `${percentagePaid}%` }}
          />
        </div>
      </div>

      {/* Transactions History Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="font-bold text-base text-slate-900">Payment & Transaction Ledger</h3>
            <p className="text-xs text-slate-500">Official digital receipts with bank transaction references</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Transaction ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Payment Mode</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {feeData.transactions.map((txn) => {
                const isPaid = txn.status === 'Paid';
                return (
                  <tr key={txn.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-2 font-mono font-bold text-indigo-700">
                      {txn.id}
                    </td>

                    <td className="py-3.5 text-slate-600">{txn.date}</td>

                    <td className="py-3.5 font-medium text-slate-900">{txn.description}</td>

                    <td className="py-3.5 text-slate-500">{txn.mode}</td>

                    <td className="py-3.5 text-right font-black text-slate-900">
                      ₹{txn.amount.toLocaleString()}
                    </td>

                    <td className="py-3.5 text-center">
                      <StatusBadge status={txn.status} />
                    </td>

                    <td className="py-3.5 pr-2 text-right">
                      {isPaid ? (
                        <button
                          onClick={() => setActiveReceipt(txn)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => showToast('Redirecting to Student Payment Gateway...', 'info')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
                        >
                          <span>Pay Now</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Receipt Modal */}
      <Modal
        isOpen={!!activeReceipt}
        onClose={() => setActiveReceipt(null)}
        title="Official College Fee Receipt"
        maxWidth="max-w-xl"
      >
        {activeReceipt && (
          <div className="space-y-6 text-xs">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center relative">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Receipt className="w-6 h-6 text-indigo-600" />
                <h3 className="text-base font-black uppercase text-slate-900 tracking-wider">
                  CampusConnect Institution of Technology
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 uppercase font-semibold">
                Accounts & Fee Collection Department
              </p>
              <div className="w-20 h-0.5 bg-slate-200 mx-auto my-3" />

              <div className="text-2xl font-black text-slate-900 mt-2">
                ₹{activeReceipt.amount.toLocaleString()}.00
              </div>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                Payment Verified & Received
              </span>
            </div>

            <div className="space-y-2.5 bg-white p-4 rounded-xl border border-slate-100 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Student Name:</span>
                <span className="font-bold text-slate-900">{studentProfile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student Roll / ID:</span>
                <span className="font-mono font-bold text-slate-900">{studentProfile.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Receipt Voucher No:</span>
                <span className="font-mono font-bold text-indigo-600">{activeReceipt.receiptId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Date:</span>
                <span className="font-semibold text-slate-900">{activeReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Purpose:</span>
                <span className="font-semibold text-slate-900">{activeReceipt.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Channel:</span>
                <span className="font-semibold text-slate-900">{activeReceipt.mode}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" /> Print Official Receipt
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Raise Fee Query Modal */}
      <Modal
        isOpen={showQueryModal}
        onClose={() => setShowQueryModal(false)}
        title="Submit Fee Discrepancy or Query"
      >
        <form onSubmit={handleQuerySubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Query Category
            </label>
            <select
              value={queryCategory}
              onChange={(e) => setQueryCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
            >
              <option value="Payment Reconciliation">Bank Payment Deducted but Not Reflected</option>
              <option value="Scholarship Adjustment">Scholarship / Fee Waiver Adjustment</option>
              <option value="Hostel Fee Discrepancy">Hostel / Mess Charge Clarification</option>
              <option value="Extension Request">Payment Deadline Extension Request</option>
              <option value="Tax Certificate">Income Tax 80E Certificate Request</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Query Description & Bank Reference
            </label>
            <textarea
              rows={4}
              required
              value={queryDescription}
              onChange={(e) => setQueryDescription(e.target.value)}
              placeholder="Provide transaction reference number, date of transfer, bank branch, or scholarship details..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
            />
          </div>

          <div className="p-3 bg-indigo-50/50 rounded-xl text-indigo-800 text-[11px]">
            The Accounts Department typically resolves reconciliation discrepancies within 24 business hours.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowQueryModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmittingQuery}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmittingQuery ? 'Submitting...' : 'Send to Accounts Desk'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default FeesPage;
