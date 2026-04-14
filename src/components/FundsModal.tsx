import React from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface FundsModalProps {
  isOpen: boolean;
  mode: 'deposit' | 'withdraw';
  balance: number;
  onClose: () => void;
  onSubmit: (amount: number) => boolean;
}

export const FundsModal: React.FC<FundsModalProps> = ({ isOpen, mode, balance, onClose, onSubmit }) => {
  const [amount, setAmount] = React.useState('100');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setAmount('100');
      setError('');
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const isDeposit = mode === 'deposit';

  const handleSubmit = () => {
    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Enter a valid amount greater than zero.');
      return;
    }

    if (!isDeposit && parsedAmount > balance) {
      setError('You cannot withdraw more than your current balance.');
      return;
    }

    const success = onSubmit(parsedAmount);
    if (success) {
      onClose();
    } else {
      setError('Unable to complete this transaction.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <motion.button
          type="button"
          aria-label="Close funds dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-surface-container-low p-6 shadow-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6 pr-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              {isDeposit ? 'Add Funds' : 'Withdraw Funds'}
            </p>
            <h2 className="mt-2 text-2xl font-black text-on-surface">
              {isDeposit ? 'Deposit cash' : 'Withdraw cash'}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {isDeposit
                ? 'Move money into your exchange balance.'
                : `Current balance: $${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </p>
          </div>

          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Amount
          </label>
          <input
            autoFocus
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min="0"
            step="0.01"
            className="w-full rounded-2xl border border-white/10 bg-surface-container-highest px-4 py-3 text-white outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            placeholder="100.00"
          />

          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-white/10 px-4 py-3 font-bold text-zinc-200 transition-colors hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 rounded-2xl bg-primary px-4 py-3 font-bold text-on-primary transition-all hover:brightness-110"
            >
              {isDeposit ? 'Deposit' : 'Withdraw'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};