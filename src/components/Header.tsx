import React from 'react';
import { RefreshCw, Sparkles, Heart } from 'lucide-react';
import type { PriceSegment, CatalogStats } from '../types/catalog.ts';

interface HeaderProps {
  stats: CatalogStats;
  selectedSegments: PriceSegment[];
  onSelectSegment: (segment: PriceSegment | 'ALL') => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastSyncedAt?: Date;
  onOpenSettings?: () => void;
  favoriteCount: number;
  onToggleFavoritesOnly: () => void;
  showFavoritesOnly: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  selectedSegments,
  onSelectSegment,
  onRefresh,
  isRefreshing,
  lastSyncedAt,
  onOpenSettings,
  favoriteCount,
  onToggleFavoritesOnly,
  showFavoritesOnly,
}) => {
  const isAllActive = selectedSegments.length === 0;

  const segmentConfig: Array<{ name: PriceSegment; count: number; activeStyle: string; inactiveStyle: string; dotColor: string }> = [
    {
      name: 'Super Hemat',
      count: stats.countsBySegment['Super Hemat'] || 0,
      activeStyle: 'bg-emerald-700 text-white border-emerald-700 shadow-sm',
      inactiveStyle: 'bg-emerald-50/80 text-emerald-800 border-emerald-200/90 hover:bg-emerald-100',
      dotColor: 'bg-emerald-500',
    },
    {
      name: 'Ekonomis',
      count: stats.countsBySegment['Ekonomis'] || 0,
      activeStyle: 'bg-sky-700 text-white border-sky-700 shadow-sm',
      inactiveStyle: 'bg-sky-50/80 text-sky-800 border-sky-200/90 hover:bg-sky-100',
      dotColor: 'bg-sky-500',
    },
    {
      name: 'Menengah',
      count: stats.countsBySegment['Menengah'] || 0,
      activeStyle: 'bg-indigo-700 text-white border-indigo-700 shadow-sm',
      inactiveStyle: 'bg-indigo-50/80 text-indigo-800 border-indigo-200/90 hover:bg-indigo-100',
      dotColor: 'bg-indigo-500',
    },
    {
      name: 'Premium',
      count: stats.countsBySegment['Premium'] || 0,
      activeStyle: 'bg-amber-600 text-white border-amber-600 shadow-sm',
      inactiveStyle: 'bg-amber-50/90 text-amber-900 border-amber-300/80 hover:bg-amber-100',
      dotColor: 'bg-amber-500',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-600 shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-amber-300 font-serif font-black text-sm tracking-tighter">
                RWJ
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-tight">
                  UD REZ WAN JAYA
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300/70">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  Katalog Galeri
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium tracking-tight">
                Katalog Blangko Undangan Pernikahan Eksklusif & Lengkap
              </p>
            </div>
          </div>

          {/* Right Top Action Bar: Refresh, Settings, Favorites */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Favorites Toggle */}
            <button
              type="button"
              onClick={onToggleFavoritesOnly}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                showFavoritesOnly
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
              title="Tampilkan Model Favorit"
            >
              <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : 'text-rose-500'}`} />
              <span className="hidden sm:inline">Favorit</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${showFavoritesOnly ? 'bg-white/20' : 'bg-stone-100 text-stone-600'}`}>
                {favoriteCount}
              </span>
            </button>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 disabled:opacity-60 transition-all shadow-2xs"
              title={lastSyncedAt ? `Terakhir diperbarui: ${lastSyncedAt.toLocaleTimeString('id-ID')}` : 'Perbarui data'}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Segarkan Data</span>
            </button>
          </div>
        </div>

        {/* Dynamic Price Segment Summary Pills Bar */}
        <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mr-1 hidden sm:inline">
              Kategori:
            </span>

            {/* "Semua" pill */}
            <button
              type="button"
              onClick={() => onSelectSegment('ALL')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isAllActive
                  ? 'bg-stone-900 text-amber-300 border-stone-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>Semua</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isAllActive ? 'bg-amber-400/20 text-amber-300' : 'bg-stone-100 text-stone-600'}`}>
                {stats.total}
              </span>
            </button>

            {/* Segmen Harga pills with live counts */}
            {segmentConfig.map((seg) => {
              const isActive = selectedSegments.includes(seg.name);
              return (
                <button
                  key={seg.name}
                  type="button"
                  onClick={() => onSelectSegment(seg.name)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                    isActive ? seg.activeStyle : seg.inactiveStyle
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : seg.dotColor}`} />
                  <span>{seg.name}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-stone-700 border border-stone-200/60'
                    }`}
                  >
                    {seg.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick sync status indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-stone-500 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Real-time Sync</span>
          </div>
        </div>
      </div>
    </header>
  );
};
