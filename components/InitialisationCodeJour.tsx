import React, { useState } from 'react';
import {
  BackArrowIcon,
  GearIcon,
  InformationCircleIcon,
  KeyIcon,
  PlusIcon,
  CalendarIcon,
  UserIcon,
  SparklesIcon,
  ValidationIcon,
  RefreshIcon
} from './Icons';

interface InitialisationCodeJourProps {
  onNavigateBack: () => void;
}

const InitialisationCodeJour: React.FC<InitialisationCodeJourProps> = ({ onNavigateBack }) => {
  const [currentCode, setCurrentCode] = useState('');
  const [initializationDate, setInitializationDate] = useState('');
  const [initializedBy, setInitializedBy] = useState('');
  const [newCode, setNewCode] = useState('');

  const generateRandomCode = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleGenerateCode = () => {
    setNewCode(generateRandomCode(8));
  };

  const handleInitializeCode = () => {
    if (newCode.trim() === '') {
      alert("Veuillez d'abord générer ou saisir un code.");
      return;
    }
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR');
    
    setCurrentCode(newCode);
    setInitializationDate(formattedDate);
    setInitializedBy('Utilisateur'); 
    setNewCode('');
  };

  const handleReset = () => {
    setNewCode('');
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="bg-[#0d2d53] text-white rounded-t-xl p-6 flex items-center shadow-lg">
        <GearIcon className="h-10 w-10 mr-4" />
        <div>
          <h2 className="text-3xl font-bold">Initialisation du Code du Jour</h2>
          <p className="text-blue-200">Configuration et gestion du code de codification quotidien</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-b-xl shadow-lg border space-y-8">
        {/* Information Box */}
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg" role="alert">
          <div className="flex">
            <div className="py-1"><InformationCircleIcon className="h-6 w-6 text-blue-500 mr-4"/></div>
            <div>
              <p className="font-bold">Information</p>
              <p className="text-sm">Le code du jour est utilisé pour codifier les lots de manière sécurisée. Il doit être initialisé chaque jour et peut être régénéré si nécessaire. Seul le code actif du jour sera utilisé pour les opérations de codification.</p>
            </div>
          </div>
        </div>

        {/* Current Code Section */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><KeyIcon className="h-5 w-5 mr-2 text-gray-600"/>Code Actuel</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-6 min-h-[72px] flex items-center justify-center">
             {currentCode ? (
                <span className="text-3xl font-mono font-bold tracking-widest text-gray-700">{currentCode}</span>
              ) : (
                <span className="text-xl font-semibold text-gray-400">Aucun code initialisé</span>
              )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-xs font-semibold text-gray-500 uppercase">DATE D'INITIALISATION</p>
              <p className="text-lg font-bold text-gray-800">{initializationDate || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-xs font-semibold text-gray-500 uppercase">INITIALISÉ PAR</p>
              <p className="text-lg font-bold text-gray-800">{initializedBy || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-xs font-semibold text-gray-500 uppercase">STATUT</p>
               {currentCode ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <ValidationIcon className="h-4 w-4 mr-1.5"/>
                  Actif
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Inactif
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Initialize New Code Section */}
        <div className="border rounded-lg p-6">
           <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center"><PlusIcon className="h-5 w-5 mr-2 text-gray-600"/>INITIALISER UN NOUVEAU CODE</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-1 relative">
                <label className="text-sm font-medium text-gray-600 flex items-center"><CalendarIcon className="h-4 w-4 mr-2"/>Date d'application</label>
                <input type="date" defaultValue={new Date().toISOString().substring(0, 10)} className="w-full form-input"/>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 flex items-center"><KeyIcon className="h-4 w-4 mr-2"/>Code du jour</label>
                <input 
                  type="text" 
                  placeholder="CODE" 
                  className="w-full form-input font-mono uppercase text-center"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600 flex items-center"><UserIcon className="h-4 w-4 mr-2"/>Initialisé par</label>
                <input type="text" value="Utilisateur" readOnly className="w-full form-input bg-gray-100"/>
              </div>
           </div>
           <div className="flex justify-center flex-wrap gap-4">
              <button onClick={handleGenerateCode} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors flex items-center gap-2">
                <SparklesIcon className="h-5 w-5"/>
                <span>Générer un Code</span>
              </button>
              <button onClick={handleInitializeCode} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors flex items-center gap-2">
                <ValidationIcon className="h-5 w-5"/>
                <span>Initialiser le Code</span>
              </button>
              <button onClick={handleReset} className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-6 rounded-lg border border-gray-300 shadow-sm transition-colors flex items-center gap-2">
                <RefreshIcon className="h-5 w-5"/>
                <span>Réinitialiser</span>
              </button>
           </div>
        </div>
      </div>
      
      {/* Back Button */}
      <div className="mt-8">
        <button onClick={onNavigateBack} className="flex items-center space-x-2 bg-[#0d2d53] hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors">
          <BackArrowIcon className="h-5 w-5" />
          <span>Retour</span>
        </button>
      </div>

      <style>{`
        .form-input {
            padding: 0.5rem 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgb(59 130 246 / 0.25);
        }
      `}</style>
    </div>
  );
};

export default InitialisationCodeJour;