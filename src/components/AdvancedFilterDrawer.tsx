import React from 'react';
import { X, RotateCcw, Check, SlidersHorizontal } from 'lucide-react';
import type { FilterState, PriceSegment, CatalogStats } from '../types/catalog.ts';

interface AdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onUpdateFilters: (partial: Partial<FilterState>) => void;
  onResetFilters: () => void;
  stats: CatalogStats;
}

const AVAILABLE_COLORS: Array<{ name: string; hex: string; border?: boolean }> = [
  { name: 'Putih', hex: '#ffffff', border: true },
  { name: 'Krem', hex: '#f5ede0', border: true },
  { name: 'Kuning / Emas', hex: '#d4af37' },
  { name: 'Cokelat', hex: '#5d4037' },
  { name: 'Hitam', hex: '#1c1917' },
  { name: 'Hijau', hex: '#1b4d3e' },
  { name: 'Biru', hex: '#1e3a8a' },
  { name: 'Pink', hex: '#f472b6' },
  { name: 'Merah', hex: '#991b1b' },
  { name: 'Ungu', hex: '#6b21a8' },
  { name: 'Abu-abu', hex: '#64748b' },
];

const AVAILABLE_LIPATAN = ['Lipat 2', 'Lipat 3', 'Single Card'];
const AVAILABLE_ORIENTASI = ['Potrait', 'Landscape', 'Persegi'];
const AVAILABLE_AMPLOP = ['Dengan Amplop', 'Tanpa Amplop'];
const AVAILABLE_SEGMENTS: PriceSegment[] = ['Super Hemat', 'Ekonomis', 'Menengah', 'Premium'];

export const AdvancedFilterDrawer: React.FC<AdvancedFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onResetFilters,
  stats,
}) => {
  if (!isOpen) return null;

  const toggleSegment = (seg: PriceSegment) => {
    const exists = filters.selectedSegments.includes(seg);
    const updated = exists
      ? filters.selectedSegments.filter((s) => s !== seg)
      : [...filters.selectedSegments, seg];
    onUpdateFilters({ selectedSegments: updated });
  };

  const toggleColor = (color: string) => {
    const exists = filters.selectedColors.includes(color);
    const updated = exists
      ? filters.selectedColors.filter((c) => c !== color)
      : [...filters.selectedColors, color];
    onUpdateFilters({ selectedColors: updated });
  };

  const toggleLipatan = (lipatan: string) => {
    const exists = filters.selectedLipatan.includes(lipatan);
    const updated = exists
      ? filters.selectedLipatan.filter((l) => l !== lipatan)
      : [...filters.selectedLipatan, lipatan];
    onUpdateFilters({ selectedLipatan: updated });
  };

  const toggleOrientasi = (orientasi: string) => {
    const exists = filters.selectedOrientasi.includes(orientasi);
    const updated = exists
      ? filters.selectedOrientasi.filter((o) => o !== orientasi)
      : [...filters.selectedOrientasi, orientasi];
    onUpdateFilters({ selectedOrientasi: updated });
  };

  const toggleAmplop = (amplop: string) => {
    const exists = filters.selectedAmplop.includes(amplop);
    const updated = exists
      ? filters.selectedAmplop.filter((a) => a !== amplop)
      : [...filters.selectedAmplop, amplop];
    onUpdateFilters({ selectedAmplop: updated });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (Right Slide-over) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-4 bg-[#faf8f5] border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100/70 text-amber-800 rounded-lg">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Filter Lanjutan
                </h3>
                <p className="text-[11px] text-stone-500">
                  Sesuaikan preferensi spesifikasi undangan
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Tutup panel filter"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Filter Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* 1. Kategori Segmen Harga */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5 flex items-center justify-between">
                <span>Kategori Segmen Harga</span>
                <span className="text-[10px] text-stone-500 font-normal">Tingkat Kemewahan</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_SEGMENTS.map((seg) => {
                  const isChecked = filters.selectedSegments.includes(seg);
                  const count = stats.countsBySegment[seg] || 0;
                  return (
                    <button
                      key={seg}
                      type="button"
                      onClick={() => toggleSegment(seg)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-amber-900 font-bold'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                            isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-3" />}
                        </div>
                        <span>{seg}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Warna Dominan Swatches */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5 flex items-center justify-between">
                <span>Warna Dominan</span>
                <span className="text-[10px] text-stone-500 font-normal">
                  {filters.selectedColors.length > 0 ? `${filters.selectedColors.length} dipilih` : 'Semua'}
                </span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AVAILABLE_COLORS.map((col) => {
                  const isChecked = filters.selectedColors.includes(col.name);
                  const count = stats.countsByColor[col.name] || 0;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => toggleColor(col.name)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs border transition-all text-left ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-amber-900 font-bold'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs ${col.border ? 'border border-stone-300' : ''}`}
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="truncate flex-1 text-[11px]">{col.name}</span>
                      {count > 0 && <span className="text-[10px] text-stone-400 font-mono">({count})</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Model Lipatan */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5">
                Model Lipatan
              </h4>
              <div className="space-y-1.5">
                {AVAILABLE_LIPATAN.map((lip) => {
                  const isChecked = filters.selectedLipatan.includes(lip);
                  const count = stats.countsByLipatan[lip] || 0;
                  return (
                    <button
                      key={lip}
                      type="button"
                      onClick={() => toggleLipatan(lip)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-amber-900 font-bold'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                            isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-3" />}
                        </div>
                        <span>{lip}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">({count} model)</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Orientasi Layout */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5">
                Orientasi Layout
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {AVAILABLE_ORIENTASI.map((ori) => {
                  const isChecked = filters.selectedOrientasi.includes(ori);
                  const count = stats.countsByOrientasi[ori] || 0;
                  return (
                    <button
                      key={ori}
                      type="button"
                      onClick={() => toggleOrientasi(ori)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs border text-center transition-all ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-amber-900 font-bold'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="font-semibold">{ori}</span>
                      <span className="text-[10px] text-stone-400 font-mono mt-0.5">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Kelengkapan Amplop */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5">
                Kelengkapan Amplop
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_AMPLOP.map((amp) => {
                  const isChecked = filters.selectedAmplop.includes(amp);
                  const count = stats.countsByAmplop[amp] || 0;
                  return (
                    <button
                      key={amp}
                      type="button"
                      onClick={() => toggleAmplop(amp)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs border text-left transition-all ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-amber-900 font-bold'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                            isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-3" />}
                        </div>
                        <span className="text-[11px] font-semibold">{amp}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center gap-2">
            <button
              type="button"
              onClick={onResetFilters}
              className="flex-1 py-2 px-3 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-3 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span>Terapkan Filter ({stats.filteredCount})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
