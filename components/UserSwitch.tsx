
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../constants';
import { Users } from 'lucide-react';

interface UserSwitchProps {
  currentUser: User;
  onSwitch: (user: User) => void;
}

const UserSwitch: React.FC<UserSwitchProps> = ({ currentUser, onSwitch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 transition-colors"
      >
        <Users size={14} />
        <span>切换角色 ({currentUser.role})</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-2 overflow-hidden">
            <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
              演示专用角色
            </p>
            {MOCK_USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  onSwitch(user);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex flex-col transition-colors ${
                  currentUser.id === user.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="font-bold">{user.name}</span>
                <span className="text-xs opacity-70">{user.role} | {user.region}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserSwitch;
