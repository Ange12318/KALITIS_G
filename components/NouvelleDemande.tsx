
import React, { useState, useMemo } from 'react';
import {
  BackArrowIcon,
  PlusIcon,
  CalendarIcon,
  FilterIcon,
  BuildingIcon,
  DocumentIcon,
  UsersIcon,
  ChartBarIcon,
  ListBulletIcon,
} from './Icons';

interface NouvelleDemandeProps {
  onNavigateBack: () => void;
}

type Produit = 'CACAO' | 'CAFE' | '';

interface Lot {
  id: number;
  numero: string;
  nbreSac: number | string;
  poidsNet: number | string;
  marque: string;
  magasin: string;
  recolte: string;
  qualite: string;
  parite: string;
}

const emptyLot = {
  numero: '',
  nbreSac: '',
  poidsNet: '',
  marque: '',
  magasin: '',
  recolte: new Date().getFullYear().toString(),
  qualite: '',
  parite: '',
};

const NouvelleDemande: React.FC<NouvelleDemandeProps> = ({ onNavigateBack }) => {
  const [selectedProduit, setSelectedProduit] = useState<Produit>('');
  const [lots, setLots] = useState<Lot[]>(
    Array.from({ length: 5 }, (_, i) => ({ id: i, ...emptyLot }))
  );

  const handleProduitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProduit = e.target.value as Produit;
    setSelectedProduit(newProduit);

    const updatedLots = lots.map(lot => {
      if (!lot.numero) return lot; // Ne pas mettre à jour les lignes vides

      let newNbreSac: number | string = '';
      let newPoidsNet: number | string = '';

      if (newProduit === 'CACAO') {
        newNbreSac = 385;
        newPoidsNet = 25025;
      } else if (newProduit === 'CAFE') {
        newNbreSac = 420;
        newPoidsNet = 25200;
      }
      return { ...lot, nbreSac: newNbreSac, poidsNet: newPoidsNet };
    });
    setLots(updatedLots);
  };
  
  const handleLotChange = (index: number, field: keyof Lot, value: string | number) => {
    const newLots = [...lots];
    const currentLot = { ...newLots[index], [field]: value };

    // Auto-fill logic when a lot number is entered for the first time
    if (field === 'numero' && newLots[index].numero === '' && value !== '') {
        if (selectedProduit === 'CACAO') {
            currentLot.nbreSac = 385;
            currentLot.poidsNet = 25025;
        } else if (selectedProduit === 'CAFE') {
            currentLot.nbreSac = 420;
            currentLot.poidsNet = 25200;
        }
    }
    
    // Auto-calculate poidsNet for CAFE when nbreSac changes
    if (field === 'nbreSac' && selectedProduit === 'CAFE') {
        const nbreSac = Number(value);
        currentLot.poidsNet = isNaN(nbreSac) ? '' : nbreSac * 60;
    }

    newLots[index] = currentLot;
    setLots(newLots);
  };

  const addLigne = () => {
    setLots(prev => [...prev, { id: prev.length, ...emptyLot }]);
  };
  
  const { totalSacs, totalLots, totalPoidsNet } = useMemo(() => {
    return lots.reduce(
      (acc, lot) => {
        const nbreSac = Number(lot.nbreSac) || 0;
        const poidsNet = Number(lot.poidsNet) || 0;
        if (lot.numero) { // Only count lots that have a number
          acc.totalLots += 1;
          acc.totalSacs += nbreSac;
          acc.totalPoidsNet += poidsNet;
        }
        return acc;
      },
      { totalSacs: 0, totalLots: 0, totalPoidsNet: 0 }
    );
  }, [lots]);


  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="bg-[#0d2d53] text-white rounded-t-xl p-6 flex items-center shadow-lg">
        <PlusIcon className="h-10 w-10 mr-4" />
        <div>
          <h2 className="text-3xl font-bold">Nouvelle Demande</h2>
          <p className="text-blue-200">Créer une nouvelle demande d'analyse pour les autorités ivoiriennes</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Form Fields */}
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><span className="font-mono text-xs mr-2">#</span>Référence *</label><input type="text" placeholder="REF-2024-XXX" className="w-full input-styled" /></div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><DocumentIcon className="h-4 w-4 mr-2"/>N° Autorisation *</label><input type="text" placeholder="AUT-2024-XXX" className="w-full input-styled" /></div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><DocumentIcon className="h-4 w-4 mr-2"/>N° Dossier</label><input type="text" placeholder="DOS-2024-XXX" className="w-full input-styled" /></div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center">Nature *</label><select className="w-full select-styled"><option>Sélectionner la nature</option></select></div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><UsersIcon className="h-4 w-4 mr-2"/>Exportateur *</label><select className="w-full select-styled"><option>Sélectionner un exportateur</option></select></div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><FilterIcon className="h-4 w-4 mr-2"/>Produit *</label>
                <select value={selectedProduit} onChange={handleProduitChange} className="w-full select-styled">
                    <option value="">Sélectionner un produit</option>
                    <option value="CACAO">CACAO</option>
                    <option value="CAFE">CAFE</option>
                </select>
            </div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><BuildingIcon className="h-4 w-4 mr-2"/>Ville *</label><select className="w-full select-styled"><option>Sélectionner une ville</option></select></div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><ChartBarIcon className="h-4 w-4 mr-2"/>Campagne *</label><select className="w-full select-styled"><option>Sélectionner une campagne</option></select></div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><CalendarIcon className="h-4 w-4 mr-2"/>Date Autorisation *</label><input type="date" defaultValue="2025-11-13" className="w-full input-styled" /></div>
            <div className="space-y-1"><label className="text-sm font-medium text-gray-600 flex items-center"><CalendarIcon className="h-4 w-4 mr-2"/>Date Validation</label><input type="date" defaultValue="2025-11-16" className="w-full input-styled" /></div>
        </div>
      </div>
      
      {/* Totaux Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><BuildingIcon className="h-5 w-5 mr-2 text-blue-800"/>Totaux Généraux</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><label className="text-sm font-medium text-gray-600">Nombre de Sacs</label><input type="text" readOnly value={totalSacs} className="w-full input-styled bg-gray-100 text-center font-bold text-lg" /></div>
            <div><label className="text-sm font-medium text-gray-600">Nombre de Lots</label><input type="text" readOnly value={totalLots} className="w-full input-styled bg-gray-100 text-center font-bold text-lg" /></div>
            <div><label className="text-sm font-medium text-gray-600">Total Poids Net (kg)</label><input type="text" readOnly value={totalPoidsNet.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} className="w-full input-styled bg-gray-100 text-center font-bold text-lg" /></div>
        </div>
      </div>

      {/* Lots Details Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><ListBulletIcon className="h-5 w-5 mr-2 text-blue-800"/>Détail des Lots</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#0d2d53] text-white uppercase text-xs">
                <tr>
                    <th className="p-3">N° LOT</th><th className="p-3">NBRE DE SAC</th><th className="p-3">POIDS NET (KG)</th><th className="p-3">MARQUE</th><th className="p-3">MAGASIN/USINE</th><th className="p-3">RÉCOLTE</th><th className="p-3">QUALITÉ DÉCLARÉE</th><th className="p-3">PARITÉ</th>
                </tr>
            </thead>
            <tbody>
                {lots.map((lot, index) => (
                    <tr key={lot.id} className="border-b hover:bg-gray-50">
                        <td className="p-1"><input type="text" value={lot.numero} onChange={(e) => handleLotChange(index, 'numero', e.target.value)} className="w-full input-styled-table" placeholder={`LOT-${index + 1}`} /></td>
                        <td className="p-1"><input type="number" value={lot.nbreSac} onChange={(e) => handleLotChange(index, 'nbreSac', e.target.value)} readOnly={selectedProduit !== 'CAFE'} className={`w-full input-styled-table ${selectedProduit !== 'CAFE' ? 'bg-gray-100' : ''}`} /></td>
                        <td className="p-1"><input type="number" value={lot.poidsNet} readOnly className="w-full input-styled-table bg-gray-100" /></td>
                        <td className="p-1"><select value={lot.marque} onChange={(e) => handleLotChange(index, 'marque', e.target.value)} className="w-full select-styled-table"><option>-- Sélect --</option></select></td>
                        <td className="p-1"><select value={lot.magasin} onChange={(e) => handleLotChange(index, 'magasin', e.target.value)} className="w-full select-styled-table"><option>-- Sélectionner --</option></select></td>
                        <td className="p-1"><input type="text" value={lot.recolte} onChange={(e) => handleLotChange(index, 'recolte', e.target.value)} className="w-full input-styled-table" /></td>
                        <td className="p-1"><select value={lot.qualite} onChange={(e) => handleLotChange(index, 'qualite', e.target.value)} className="w-full select-styled-table"><option>-- Sélecti --</option></select></td>
                        <td className="p-1"><select value={lot.parite} onChange={(e) => handleLotChange(index, 'parite', e.target.value)} className="w-full select-styled-table"><option>-- Séle --</option></select></td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="flex justify-between items-center">
        <button onClick={onNavigateBack} className="flex items-center space-x-2 bg-[#0d2d53] hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors">
            <BackArrowIcon className="h-5 w-5" />
            <span>Retour</span>
        </button>
        <div className="flex items-center gap-4">
            <button className="font-semibold text-gray-700 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">Annuler</button>
            <button onClick={addLigne} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors">
                <PlusIcon className="h-5 w-5" />
                <span>Ajouter une Ligne</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors">
                <DocumentIcon className="h-5 w-5" />
                <span>Enregistrer la Demande</span>
            </button>
        </div>
      </div>

       <style>{`
            .input-styled {
                padding: 0.5rem 0.75rem;
                border: 1px solid #d1d5db;
                border-radius: 0.375rem;
                box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            .input-styled:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgb(59 130 246 / 0.25);
            }
            .select-styled {
                padding: 0.5rem 0.75rem;
                border: 1px solid #d1d5db;
                border-radius: 0.375rem;
                box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                background-color: white;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                background-position: right 0.5rem center;
                background-repeat: no-repeat;
                background-size: 1.5em 1.5em;
                padding-right: 2.5rem;
            }
            .select-styled:focus {
                 outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgb(59 130 246 / 0.25);
            }
            .input-styled-table {
                padding: 0.5rem;
                border: 1px solid #e5e7eb;
                border-radius: 0.375rem;
            }
            .input-styled-table:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 2px rgb(59 130 246 / 0.25);
            }
            .select-styled-table {
                padding: 0.5rem;
                border: 1px solid #e5e7eb;
                border-radius: 0.375rem;
                background-color: white;
                 -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                background-position: right 0.2rem center;
                background-repeat: no-repeat;
                background-size: 1.2em 1.2em;
                padding-right: 2rem;
            }
            .select-styled-table:focus {
                 outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 2px rgb(59 130 246 / 0.25);
            }
        `}</style>
    </div>
  );
};

export default NouvelleDemande;
