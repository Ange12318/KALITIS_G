import React, { useState } from 'react';
import { UserIcon, LockClosedIcon, CafeIcon, CacaoIcon, ChartBarIcon, ArrowSmallRightIcon, ChevronDownIcon } from './Icons';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'ace' && password === '1234') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Identifiant ou mot de passe incorrect.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4" style={{ 
      backgroundImage: `url('https://images.unsplash.com/photo-1559703248-dca719707502?q=80&w=2070&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-8 space-y-6">
                <div className="text-center">
                     <div className="bg-slate-100/80 p-4 rounded-lg border-l-4 border-blue-800">
                        <h2 className="text-xl font-bold text-[#0d2d53]">Bienvenue dans la plateforme QUALITIS ACE</h2>
                        <p className="text-sm text-gray-600 mt-1">Veuillez vous connecter pour accéder à votre espace</p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-1">
                            Identifiant
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="id"
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="ace"
                                className="block w-full rounded-md border border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                                aria-label="Identifiant"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••"
                                className="block w-full rounded-md border border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                required
                                aria-label="Mot de passe"
                            />
                        </div>
                    </div>
                    
                    {error && <p className="text-sm text-red-600 text-center" role="alert">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center items-center gap-2 rounded-md border border-transparent bg-[#0d2d53] py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                        >
                            <ArrowSmallRightIcon className="h-5 w-5" />
                            Se connecter
                        </button>
                    </div>
                </form>

                <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-3 gap-3 text-center">
                        <button className="flex items-center justify-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700">
                            <CafeIcon className="h-5 w-5 text-amber-800"/>
                            <span>Café</span>
                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                        </button>
                         <button className="flex items-center justify-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700">
                            <CacaoIcon className="h-5 w-5 text-amber-900"/>
                            <span>Cacao</span>
                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                        </button>
                         <button className="flex items-center justify-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700">
                            <ChartBarIcon className="h-5 w-5 text-blue-600"/>
                            <span>Qualité</span>
                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                </div>

            </div>
            <div className="bg-gray-50/80 px-8 py-3 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} QUALITÉ ACE - Tous droits réservés</p>
                <p>Version 1.0</p>
            </div>
        </div>
    </div>
  );
};

export default Login;