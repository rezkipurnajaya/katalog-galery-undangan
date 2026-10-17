import React from 'react';
import { Search, SlidersHorizontal, LayoutGrid, Grid3X3, Table, X, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import type { ViewMode, FilterState } from '../types/catalog.ts';

interface SearchAndToolbarProps {
  filters: FilterState;
  onUpdateFilters: (partial: Partial<FilterState>) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  filteredCount: number;
  totalCount: number;
}

export const SearchAndToolbar: React.FC<SearchAndToolbarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  activeFilterCount,
  onToggleDrawer,
  isDrawerOpen,
  viewMode,
  onChangeViewMode,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="py-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Row: Search Input, Filter Button, Sort Dropdown & View Mode Switcher */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
            placeholder="Cari seri (mis: BABY, BELIYA), kode (mis: 12), warna, dll..."
            className="w-full pl-9 pr-9 py-2 bg-white border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-2xs transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onUpdateFilters({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 rounded-full"
              aria-label="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Controls: Filter Lanjutan, Sort, and View Modes */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between md:justify-end">
          {/* Advanced Filter Drawer Trigger */}
          <button
            type="button"
            onClick={onToggleDrawer}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isDrawerOpen || activeFilterCount > 0
                ? 'bg-amber-500/10 text-amber-900 border-amber-400/80 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600" />
            <span>Filter Lanjutan</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => onUpdateFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="appearance-none bg-white border border-stone-300 rounded-lg px-3 py-2 pr-7 text-xs font-semibold text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-2xs cursor-pointer"
            >
              <option value="series_asc">Seri & Kode (A - Z)</option>
              <option value="series_desc">Seri & Kode (Z - A)</option>
              <option value="segment_asc">Segmen: Terhemat - Termahal</option>
              <option value="segment_desc">Segmen: Termahal - Terhemat</option>
              <option value="kode_asc">Nomor Kode (Kecil - Besar)</option>
              <option value="kode_desc">Nomor Kode (Besar - Kecil)</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500">
              ▼
            </div>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="inline-flex items-center p-0.5 bg-stone-100/90 rounded-lg border border-stone-200/80 shadow-2xs shrink-0">
            <button
              type="button"
              onClick={() => onChangeViewMode('grid4')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'grid4'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Mode Grid 4-Kolom Standar"
              aria-label="Mode Grid 4-Kolom"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChangeViewMode('grid6')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'grid6'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Mode Grid 6-Kolom Ringkas"
              aria-label="Mode Grid 6-Kolom"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChangeViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Mode Tabel / List"
              aria-label="Mode Tabel"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sub-row: Dynamic Result Counter & Active Filter Pills */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
        <div>
          <span>Menampilkan </span>
          <span className="font-bold text-stone-900">{filteredCount}</span>
          <span> dari </span>
          <span className="font-bold text-stone-900">{totalCount}</span>
          <span> model blangko undangan</span>
          {filters.selectedSeries !== 'SEMUA' && (
            <span className="ml-1.5 font-semibold text-amber-700">
              (Seri: {filters.selectedSeries})
            </span>
          )}
        </div>

        {/* Clear active filters if any */}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Semua Filter ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {filters.selectedSegments.map((seg) => (
            <span
              key={seg}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300/80"
            >
              <span>Segmen: {seg}</span>
              <button
                type="button"
                onClick={() =>
                  onUpdateFilters({
                    selectedSegments: filters.selectedSegments.filter((s) => s !== seg),
                  })
                }
                className="hover:text-amber-700 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.selectedColors.map((col) => (
            <span
              key={col}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-300"
            >
              <span>Warna: {col}</span>
              <button
                type="button"
                onClick={() =>
                  onUpdateFilters({
                    selectedColors: filters.selectedColors.filter((c) => c !== col),
                  })
                }
                className="hover:text-stone-900 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.selectedLipatan.map((lip) => (
            <span
              key={lip}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-300"
            >
              <span>{lip}</span>
              <button
                type="button"
                onClick={() =>
                  onUpdateFilters({
                    selectedLipatan: filters.selectedLipatan.filter((l) => l !== lip),
                  })
                }
                className="hover:text-stone-900 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.selectedOrientasi.map((ori) => (
            <span
              key={ori}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-300"
            >
              <span>{ori}</span>
              <button
                type="button"
                onClick={() =>
                  onUpdateFilters({
                    selectedOrientasi: filters.selectedOrientasi.filter((o) => o !== ori),
                  })
                }
                className="hover:text-stone-900 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.selectedAmplop.map((amp) => (
            <span
              key={amp}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-300"
            >
              <span>{amp}</span>
              <button
                type="button"
                onClick={() =>
                  onUpdateFilters({
                    selectedAmplop: filters.selectedAmplop.filter((a) => a !== amp),
                  })
                }
                className="hover:text-stone-900 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
