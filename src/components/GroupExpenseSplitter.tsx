/**
 * Calculadora de Adelantos, Gastos Comunes y Balance (Déficit / Superávit) para los 5 viajeros:
 * Laura, José Antonio, Mónica, José Vicente y Beatriz.
 *
 * Funcionalidades:
 * - Cada persona puede registrar el dinero que ha adelantado seleccionando o escribiendo el asunto
 *   (ej. Hotel, Entradas, Autobús/Transfer, Restaurante, Vuelos, Otros).
 * - Selector rápido de asuntos frecuentes con un toque + campo libre de detalle.
 * - Sección inferior detallada persona por persona con su Total Adelantado, su Cuota Individual (Total / 5)
 *   y su SUPERÁVIT (a favor / a recibir) o DÉFICIT (a pagar / pendiente de aportar), además de la
 *   propuesta óptima de Bizums para saldar todas las cuentas en los mínimos pasos posibles.
 */

import React, { useEffect, useState } from 'react';
import {
  Coins,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Tag
} from 'lucide-react';
import { TRAVELER_PROFILES } from '../utils/auth';
import { TravelerProfile } from '../types/itinerary';

export interface AdvanceExpenseItem {
  id: string;
  category: string; // Ej: Hotel, Entradas, Autobús, Restaurante...
  concept: string; // Detalle libre opcional
  amount: number;
  paidById: TravelerProfile['id'];
  createdAt: string;
}

const EXPENSE_STORAGE_KEY = 'roma_group_expenses_v2';

const QUICK_CATEGORIES = [
  'Hotel',
  'Entradas',
  'Autobús / Transfer',
  'Restaurante',
  'Tasa Turística',
  'Helados / Café',
  'Otros'
];

const INITIAL_ADVANCES: AdvanceExpenseItem[] = [
  {
    id: 'adv-1',
    category: 'Hotel',
    concept: 'Reserva Alojamiento Via Palermo 4',
    amount: 450,
    paidById: 'laura',
    createdAt: '2026-11-06'
  },
  {
    id: 'adv-2',
    category: 'Entradas',
    concept: 'Coliseo + Foro Romano (5 personas)',
    amount: 90,
    paidById: 'jose-antonio',
    createdAt: '2026-11-06'
  },
  {
    id: 'adv-3',
    category: 'Autobús / Transfer',
    concept: 'Minivan Aeropuerto -> Via Palermo 4',
    amount: 70,
    paidById: 'jose-vicente',
    createdAt: '2026-11-06'
  },
  {
    id: 'adv-4',
    category: 'Entradas',
    concept: 'Entradas Panteón (5 € x 5)',
    amount: 25,
    paidById: 'beatriz',
    createdAt: '2026-11-06'
  }
];

interface SettlementTransfer {
  from: TravelerProfile;
  to: TravelerProfile;
  amount: number;
}

/**
 * Calcula las transferencias/Bizums mínimos para saldar el déficit de quienes pusieron menos
 * con el superávit de quienes adelantaron más.
 */
function calculateOptimalSettlements(
  balances: { profile: TravelerProfile; diff: number }[]
): SettlementTransfer[] {
  const debtors = balances
    .filter((b) => b.diff < -0.01)
    .map((b) => ({ profile: b.profile, amount: Math.abs(b.diff) }))
    .sort((a, b) => b.amount - a.amount);

  const creditors = balances
    .filter((b) => b.diff > 0.01)
    .map((b) => ({ profile: b.profile, amount: b.diff }))
    .sort((a, b) => b.amount - a.amount);

  const transfers: SettlementTransfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const payAmount = Math.min(debtors[i].amount, creditors[j].amount);
    if (payAmount > 0.01) {
      transfers.push({
        from: debtors[i].profile,
        to: creditors[j].profile,
        amount: Math.round(payAmount * 100) / 100
      });
    }
    debtors[i].amount -= payAmount;
    creditors[j].amount -= payAmount;

    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }

  return transfers;
}

export const GroupExpenseSplitter: React.FC = () => {
  const [expenses, setExpenses] = useState<AdvanceExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem(EXPENSE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ADVANCES;
    } catch {
      return INITIAL_ADVANCES;
    }
  });

  const [paidById, setPaidById] = useState<TravelerProfile['id']>('laura');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hotel');
  const [concept, setConcept] = useState<string>('');
  const [amountStr, setAmountStr] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
    } catch {
      // Ignorar si almacenamiento lleno
    }
  }, [expenses]);

  const handleAddAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountStr.replace(',', '.'));
    if (isNaN(val) || val <= 0) return;

    const finalConcept = concept.trim() || selectedCategory;
    const newItem: AdvanceExpenseItem = {
      id: `adv-${Date.now()}`,
      category: selectedCategory,
      concept: finalConcept,
      amount: Math.round(val * 100) / 100,
      paidById,
      createdAt: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short'
      })
    };

    setExpenses((prev) => [newItem, ...prev]);
    setConcept('');
    setAmountStr('');
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  // Cálculos globales y por persona (5 viajeros)
  const totalGroupSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const quotaPerPerson = totalGroupSpent / TRAVELER_PROFILES.length;

  const travelerStats = TRAVELER_PROFILES.map((profile) => {
    const personAdvances = expenses.filter((e) => e.paidById === profile.id);
    const totalAdvanced = personAdvances.reduce((s, e) => s + e.amount, 0);
    // diff > 0 => SUPERÁVIT (ha adelantado más de lo que le toca pagar)
    // diff < 0 => DÉFICIT (ha adelantado menos de su cuota y debe aportar)
    const diff = totalAdvanced - quotaPerPerson;
    return {
      profile,
      personAdvances,
      totalAdvanced,
      diff
    };
  });

  const settlements = calculateOptimalSettlements(
    travelerStats.map((t) => ({ profile: t.profile, diff: t.diff }))
  );

  return (
    <div className="bg-roman-surface rounded-card p-5 sm:p-6 border border-roman-border shadow-soft space-y-6">
      {/* Cabecera de la Calculadora */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-roman-border pb-4">
        <div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-roman-text flex items-center gap-2">
            <Coins className="w-5 h-5 text-roman-terracotta" />
            Calculadora de Adelantos y Balance del Grupo
          </h3>
          <p className="text-xs text-roman-muted mt-0.5">
            Anota el dinero adelantado por cada uno (Hotel, Entradas, Autobús...) y consulta abajo el <strong>Superávit</strong> o <strong>Déficit</strong> por persona.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-roman-bg border border-roman-border text-right">
          <div className="text-[11px] uppercase tracking-wider text-roman-muted font-bold">
            Total Adelantado · Cuota Individual (÷5)
          </div>
          <div className="font-serif font-bold text-base sm:text-lg text-roman-terracotta">
            {totalGroupSpent.toFixed(2)} € total · {quotaPerPerson.toFixed(2)} € / persona
          </div>
        </div>
      </div>

      {/* 1. FORMULARIO PARA AÑADIR DINERO ADELANTADO Y ASUNTO */}
      <form
        onSubmit={handleAddAdvance}
        className="p-4 rounded-card bg-roman-bg border border-roman-border space-y-3.5"
      >
        <div className="text-xs font-bold uppercase tracking-wider text-roman-text flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-roman-terracotta" />
          1. Registrar dinero adelantado
        </div>

        {/* Selector rápido del Viajero que adelanta el dinero */}
        <div>
          <label className="block text-[11px] font-bold text-roman-muted mb-1.5">
            ¿Quién ha adelantado el dinero?
          </label>
          <div className="flex flex-wrap gap-1.5">
            {TRAVELER_PROFILES.map((prof) => {
              const active = paidById === prof.id;
              return (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => setPaidById(prof.id)}
                  className={`touch-target pl-2 pr-3.5 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition border ${
                    active
                      ? 'bg-roman-terracotta text-white border-transparent shadow-soft'
                      : 'bg-roman-surface text-roman-text border-roman-border hover:bg-roman-elevated'
                  }`}
                >
                  <span
                    style={{ backgroundColor: prof.color }}
                    className="w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {prof.initials}
                  </span>
                  {prof.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chips rápidos de Asunto (Hotel, Entradas, Autobús...) */}
        <div>
          <label className="block text-[11px] font-bold text-roman-muted mb-1.5">
            Asunto principal:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                    active
                      ? 'bg-[#2B2420] text-[#F7F3EC] dark:bg-[#F5F0E8] dark:text-[#181412] border-transparent font-bold'
                      : 'bg-roman-surface text-roman-muted border-roman-border hover:text-roman-text'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Campos de Detalle del Asunto + Importe en Euros + Botón Añadir */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
          <div className="sm:col-span-6">
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder={`Detalle del asunto (ej. ${selectedCategory} Roma)...`}
              className="touch-target w-full px-3.5 py-2.5 rounded-xl border border-roman-border bg-roman-surface text-xs text-roman-text focus:outline-none focus:border-roman-terracotta"
            />
          </div>

          <div className="sm:col-span-3">
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="Dinero (€)"
              className="touch-target w-full px-3.5 py-2.5 rounded-xl border border-roman-border bg-roman-surface text-xs font-bold text-roman-text focus:outline-none focus:border-roman-terracotta"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="touch-target w-full py-2.5 px-4 rounded-xl bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-xs shadow-soft flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Añadir Adelanto
            </button>
          </div>
        </div>
      </form>

      {/* 2. SECCIÓN INFERIOR: DÉFICIT O SUPERÁVIT DETALLADO PARA CADA PERSONA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-base text-roman-text">
            2. Balance Individual: Superávit o Déficit por Persona
          </h4>
          <span className="text-[11px] text-roman-muted">
            Cuota por viajero: <strong>{quotaPerPerson.toFixed(2)} €</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {travelerStats.map(({ profile, personAdvances, totalAdvanced, diff }) => {
            const isSurplus = diff >= 0.01;
            const isDeficit = diff <= -0.01;

            return (
              <div
                key={profile.id}
                className="p-4 rounded-card bg-roman-bg border border-roman-border flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  {/* Cabecera con Avatar y Nombre */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: profile.color }}
                        className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
                      >
                        {profile.initials}
                      </span>
                      <div>
                        <div className="font-serif font-bold text-sm text-roman-text">
                          {profile.name}
                        </div>
                        <div className="text-[11px] text-roman-muted">
                          Ha adelantado: <strong>{totalAdvanced.toFixed(2)} €</strong>
                        </div>
                      </div>
                    </div>

                    {/* Insignia clara de SUPERÁVIT o DÉFICIT */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                        isSurplus
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300'
                          : isDeficit
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300'
                          : 'bg-roman-elevated text-roman-muted'
                      }`}
                    >
                      {isSurplus ? (
                        <>
                          <TrendingUp className="w-3 h-3" /> Superávit
                        </>
                      ) : isDeficit ? (
                        <>
                          <TrendingDown className="w-3 h-3" /> Déficit
                        </>
                      ) : (
                        'En paz'
                      )}
                    </span>
                  </div>

                  {/* Desglose de lo que ha adelantado esta persona */}
                  {personAdvances.length > 0 ? (
                    <div className="text-[11px] text-roman-muted space-y-1 pt-1 border-t border-roman-border">
                      {personAdvances.map((adv) => (
                        <div key={adv.id} className="flex items-center justify-between gap-1">
                          <span className="truncate">
                            • <strong>{adv.category}:</strong> {adv.concept}
                          </span>
                          <span className="font-bold text-roman-text shrink-0">
                            {adv.amount.toFixed(2)} €
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] italic text-roman-muted pt-1 border-t border-roman-border">
                      Sin pagos adelantados registrados aún.
                    </p>
                  )}
                </div>

                {/* Recuadro final con el importe exacto de Superávit o Déficit */}
                <div
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                    isSurplus
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                      : isDeficit
                      ? 'bg-[#B5532F]/15 text-roman-terracotta border border-[#B5532F]/30'
                      : 'bg-roman-surface text-roman-muted border border-roman-border'
                  }`}
                >
                  <span>
                    {isSurplus
                      ? 'Superávit (a recibir):'
                      : isDeficit
                      ? 'Déficit (a poner):'
                      : 'Saldo cuadrado:'}
                  </span>
                  <span className="text-sm font-serif">
                    {isSurplus
                      ? `+${diff.toFixed(2)} €`
                      : isDeficit
                      ? `-${Math.abs(diff).toFixed(2)} €`
                      : '0,00 €'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PROPUESTA AUTOMÁTICA DE BIZUMS PARA SALDAR DÉFICITS Y SUPERÁVITS */}
      {settlements.length > 0 && (
        <div className="p-4 rounded-card bg-roman-elevated border border-roman-border space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-roman-terracotta">
            📲 Cómo cuadrar las cuentas entre los 5 (Bizums sugeridos)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {settlements.map((s, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-roman-surface border border-roman-border flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-roman-text">
                  <span
                    style={{ backgroundColor: s.from.color }}
                    className="w-5 h-5 rounded-full text-white text-[9px] flex items-center justify-center"
                  >
                    {s.from.initials}
                  </span>
                  <span>{s.from.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-roman-muted" />
                  <span
                    style={{ backgroundColor: s.to.color }}
                    className="w-5 h-5 rounded-full text-white text-[9px] flex items-center justify-center"
                  >
                    {s.to.initials}
                  </span>
                  <span>{s.to.name}</span>
                </div>
                <span className="font-serif font-bold text-sm text-roman-terracotta">
                  {s.amount.toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. HISTORIAL COMPLETO DE ADELANTOS CON OPCIÓN DE BORRAR */}
      {expenses.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-roman-border">
          <div className="text-xs font-bold text-roman-muted">
            Historial de pagos adelantados ({expenses.length})
          </div>
          <div className="space-y-1.5">
            {expenses.map((item) => {
              const payer =
                TRAVELER_PROFILES.find((p) => p.id === item.paidById) ||
                TRAVELER_PROFILES[0];
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-roman-bg border border-roman-border text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      style={{ backgroundColor: payer.color }}
                      className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                    >
                      {payer.initials}
                    </span>
                    <div className="truncate">
                      <span className="px-2 py-0.5 rounded bg-roman-surface border border-roman-border text-[10px] font-bold text-roman-terracotta mr-1.5">
                        {item.category}
                      </span>
                      <span className="font-bold text-roman-text">{item.concept}</span>
                      <span className="text-roman-muted ml-1.5 text-[11px]">
                        (adelantado por {payer.name})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-roman-text">
                      {item.amount.toFixed(2)} €
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="text-roman-muted hover:text-roman-terracotta p-1"
                      title="Eliminar adelanto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
