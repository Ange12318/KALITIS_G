
import React from 'react';
import {
  AuthorityIcon,
  BackArrowIcon,
  RefreshIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  PrintIcon,
  DownloadIcon,
  CalendarIcon,
  FilterIcon,
  BuildingIcon,
  EmptyBoxIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CubesIcon,
  WeightIcon,
  DocumentIcon,
  UsersIcon,
  ChartBarIcon,
} from './Icons';

interface DemandesAutoritesProps {
  onNavigateBack: () => void;
  onNavigateToNouvelleDemande: () => void;
}

const DemandesAutorites: React.FC<DemandesAutoritesProps> = ({ onNavigateBack, onNavigateToNouvelleDemande }) => {
  return (
    <div className="p-6 lg:p-10">
      <div className="bg-[#0d2d53] text-white rounded-t-xl p-6 flex items-center shadow-lg">
        <AuthorityIcon className="h-10 w-10 mr-4" />
        <div>
          <h2 className="text-3xl font-bold">Demandes Autorités Ivoirienne</h2>
          <p className="text-blue-200">Gestion des demandes d'analyse et de sondage des autorités ivoiriennes</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-b-xl shadow-lg">
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center"><span className="font-mono text-xs mr-2">#</span>Référence</label>
            <input type="text" placeholder="Saisir la référence" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center"><DocumentIcon className="h-4 w-4 mr-2" />N° Autorisation</label>
            <input type="text" placeholder="Numéro d'autorisation" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center"><UsersIcon className="h-4 w-4 mr-2" />Exportateur</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
              <option>Tous les exportateurs</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center"><FilterIcon className="h-4 w-4 mr-2" />Produit</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
              <option>Tous les produits</option>
            </select>
          </div>
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-gray-600 flex items-center"><CalendarIcon className="h-4 w-4 mr-2" />Date Début</label>
            <input type="date" defaultValue="2025-11-13" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-gray-600 flex items-center"><CalendarIcon className="h-4 w-4 mr-2" />Date Fin</label>
            <input type="date" defaultValue="2025-11-13" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center"><ChartBarIcon className="h-4 w-4 mr-2" />Campagne</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
              <option>Toutes les campagnes</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center"><BuildingIcon className="h-4 w-4 mr-2" />Ville</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
              <option>Toutes les villes</option>
            </select>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-6 border-t pt-4">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors shadow"><RefreshIcon className="h-4 w-4" /><span>Actualiser</span></button>
          <button onClick={onNavigateToNouvelleDemande} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors shadow"><PlusIcon className="h-4 w-4" /><span>Nouvelle Demande</span></button>
          <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm transition-colors border border-gray-300"><EditIcon className="h-4 w-4" /><span>Modifier</span></button>
          <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm transition-colors border border-gray-300"><TrashIcon className="h-4 w-4" /><span>Supprimer</span></button>
          <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm transition-colors border border-gray-300"><PrintIcon className="h-4 w-4" /><span>Imprimer</span></button>
          <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm transition-colors border border-gray-300"><DownloadIcon className="h-4 w-4" /><span>Exporter</span></button>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
           {/* Table Header */}
            <div className="bg-[#0d2d53] text-white text-sm font-bold rounded-t-lg">
                <div className="flex items-center">
                    <div className="p-3 w-12 text-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50" /></div>
                    <div className="p-3 flex-1">RÉFÉRENCE</div>
                    <div className="p-3 flex-1">PRODUIT</div>
                    <div className="p-3 flex-1">VILLE</div>
                    <div className="p-3 flex-1">EXPORTATEUR</div>
                    <div className="p-3 flex-1">DATE RÉCEPTION</div>
                    <div className="p-3 flex-1">DATE EXPIRATION</div>
                    <div className="p-3 flex-1">CAMPAGNE</div>
                    <div className="p-3 w-28 text-right">NBRE LOTS</div>
                    <div className="p-3 w-28 text-right">POIDS NET</div>
                    <div className="p-3 w-28 text-right">NBRE BV</div>
                    <div className="p-3 w-28 text-right">NBRE BA</div>
                    <div className="p-3 w-24 text-center">ÉTAT</div>
                </div>
            </div>
            
            {/* Table Body - Empty State */}
            <div className="h-80 flex flex-col items-center justify-center text-center text-gray-500">
                <EmptyBoxIcon className="h-20 w-20 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Aucune donnée à afficher</h3>
                <p className="text-sm">Veuillez appliquer des filtres pour charger les données.</p>
            </div>
            
             {/* Table Footer */}
            <div className="flex justify-between items-center p-3 border-t bg-gray-50 rounded-b-lg">
                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2 bg-[#0d2d53] text-white text-sm font-semibold px-3 py-1.5 rounded-md">
                        <CubesIcon className="h-4 w-4" />
                        <span>Total Lots: 0</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-[#0d2d53] text-white text-sm font-semibold px-3 py-1.5 rounded-md">
                        <WeightIcon className="h-4 w-4" />
                        <span>Poids Total: 0 kg</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-600 disabled:opacity-50">
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                     <button className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-600 disabled:opacity-50">
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
      </div>

       <div className="mt-8">
        <button
          onClick={onNavigateBack}
          className="flex items-center space-x-2 bg-[#0d2d53] hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors"
        >
          <BackArrowIcon className="h-5 w-5" />
          <span>Retour</span>
        </button>
      </div>
    </div>
  );
};

export default DemandesAutorites;
