import React, { useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '@/core/lib/utils';
import { Search, X, Check, User, Users, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export interface AssigneeUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface AssigneeSelectorProps {
  /**
   * Currently selected user ID(s)
   */
  value: string | string[] | null;
  /**
   * Change handler - returns user ID(s)
   */
  onChange: (value: string | string[] | null) => void;
  /**
   * Available users to assign
   */
  users: AssigneeUser[];
  /**
   * Allow multiple assignees
   */
  multiple?: boolean;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Loading state (for lazy loading)
   */
  isLoading?: boolean;
  /**
   * Fetch more users callback for lazy loading
   */
  onLoadMore?: () => void;
  /**
   * Search callback for server-side filtering
   */
  onSearch?: (query: string) => void;
  /**
   * Max height for dropdown
   */
  maxHeight?: number;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AssigneeSelector - Jira-like user assignment component
 * 
 * Features:
 * - Search with highlighting
 * - Lazy loading support
 * - Single or multiple selection
 * - Avatar display
 * - Keyboard navigation
 * - Responsive design
 * 
 * @example
 * // Single select
 * <AssigneeSelector
 *   value={assignedTo}
 *   onChange={setAssignedTo}
 *   users={availableUsers}
 * />
 * 
 * @example
 * // Multiple select with lazy loading
 * <AssigneeSelector
 *   value={assignees}
 *   onChange={setAssignees}
 *   users={users}
 *   multiple
 *   onLoadMore={fetchMoreUsers}
 *   isLoading={loading}
 * />
 */
export const AssigneeSelector = ({
  value,
  onChange,
  users,
  multiple = false,
  disabled = false,
  placeholder = 'Assign to...',
  isLoading = false,
  onLoadMore,
  onSearch,
  maxHeight = 320,
  size = 'md',
  className
}: AssigneeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize value to array for easier handling
  const selectedIds = useMemo(() => {
    if (value === null) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  // Selected users
  const selectedUsers = useMemo(() => {
    return users.filter(user => selectedIds.includes(user.id));
  }, [users, selectedIds]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle scroll for lazy loading
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown || !onLoadMore) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = dropdown;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        onLoadMore();
      }
    };

    dropdown.addEventListener('scroll', handleScroll);
    return () => dropdown.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);

  // Handle search with debounce (if server-side search)
  useEffect(() => {
    if (!onSearch) return;
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  // Handle selection
  const handleSelect = (userId: string) => {
    if (multiple) {
      const newValue = selectedIds.includes(userId)
        ? selectedIds.filter(id => id !== userId)
        : [...selectedIds, userId];
      onChange(newValue.length > 0 ? newValue : null);
    } else {
      onChange(selectedIds.includes(userId) ? null : userId);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredUsers.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredUsers[highlightedIndex]) {
          handleSelect(filteredUsers[highlightedIndex].id);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        break;
    }
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
  };

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'flex items-center gap-2 border rounded-lg transition-all',
          'bg-white dark:bg-gray-800',
          'border-gray-200 dark:border-gray-700',
          'hover:border-gray-300 dark:hover:border-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
          sizeClasses[size],
          disabled && 'opacity-50 cursor-not-allowed',
          isOpen && 'ring-2 ring-primary-500/20 border-primary-500',
          'w-full justify-between'
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedUsers.length === 0 ? (
            <>
              <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400 truncate">
                {placeholder}
              </span>
            </>
          ) : multiple ? (
            <>
              <Users className="h-4 w-4 text-gray-600 dark:text-gray-300 flex-shrink-0" />
              <span className="text-gray-900 dark:text-white truncate">
                {selectedUsers.length} assigned
              </span>
            </>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                {selectedUsers[0].avatar ? (
                      <Image src={selectedUsers[0].avatar} alt={selectedUsers[0].name} width={24} height={24} className="w-full h-full rounded-full object-cover" unoptimized />
                ) : (
                  getInitials(selectedUsers[0].name)
                )}
              </div>
              <span className="text-gray-900 dark:text-white truncate font-medium">
                {selectedUsers[0].name}
              </span>
            </>
          )}
        </div>
        <ChevronDown className={cn(
          'h-4 w-4 text-gray-400 transition-transform flex-shrink-0',
          isOpen && 'transform rotate-180'
        )} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder="Search users..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* User List */}
          <div
            ref={dropdownRef}
            className="overflow-y-auto"
            style={{ maxHeight }}
          >
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                {isLoading ? 'Loading users...' : 'No users found'}
              </div>
            ) : (
              filteredUsers.map((user, index) => {
                const isSelected = selectedIds.includes(user.id);
                const isHighlighted = index === highlightedIndex;

                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleSelect(user.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors',
                      isHighlighted && 'bg-gray-50 dark:bg-gray-700/50',
                      !isHighlighted && 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    )}
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {user.avatar ? (
                        <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-full h-full rounded-full object-cover" unoptimized />
                      ) : (
                        getInitials(user.name)
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </div>
                      {user.email && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </div>
                      )}
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}

            {/* Loading More Indicator */}
            {isLoading && filteredUsers.length > 0 && (
              <div className="p-3 text-center text-xs text-gray-500 dark:text-gray-400">
                Loading more...
              </div>
            )}
          </div>

          {/* Unassign Option */}
          {selectedUsers.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => onChange(null)}
                className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Unassign {multiple && selectedUsers.length > 1 ? 'all' : ''}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
