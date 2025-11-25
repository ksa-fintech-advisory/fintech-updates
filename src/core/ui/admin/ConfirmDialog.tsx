'use client';

import { useTranslations } from 'next-intl';
import { Modal } from './Modal';
import { Button } from './Button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) => {
  const t = useTranslations('common');

  const handleConfirm = () => {
    onConfirm();
  };

  const variantColors = {
    danger: {
      icon: '⚠️',
      iconBg: 'bg-red-100 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
      button: 'danger' as const,
    },
    warning: {
      icon: '⚠️',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      button: 'primary' as const,
    },
    info: {
      icon: 'ℹ️',
      iconBg: 'bg-blue-100 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      button: 'primary' as const,
    },
  };

  const colors = variantColors[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${colors.iconBg}`}
          >
            <span className={`text-2xl ${colors.iconColor}`}>{colors.icon}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
          {title || t('confirm')}
        </h3>

        {/* Message */}
        {message && (
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
            {message}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText || t('cancel')}
          </Button>
          <Button
            variant={colors.button}
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            {confirmText || t('confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
