import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import {
  Droplet,
  AlertTriangle,
  Clock,
  CheckCircle,
  Filter,
  Wrench,
  Search,
  ArrowRight
} from 'lucide-react';

export function LubricationTracker() {
  const { machines, setSelectedMachineId, approveRecommendation } = useFleet();

  const [filterType, setFilterType] = useState('All');

  const overdueMachines = machines.filter(m => m.delayedLubricationCount > 0);
  const totalLitersConsumed = machines.reduce((acc, m) => acc + (m.lubricantConsumptionLiters || 2.5), 0);

  const displayedMachines = machines.filter(m => {
    if (filterType === 'Overdue') return m.delayedLubricationCount > 0;
    if (filterType === 'Normal') return m.delayedLubricationCount === 0;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Droplet className="w-5 h-5 text-sky-600" />
              <span>Lubrication & Oiling Intelligence Tracker</span>
            </h1>
            <span className="badge badge-warning text-xs font-mono">
              {overdueMachines.length} Assets Delayed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Fleet-wide lubrication compliance, oil starvation prediction, and delayed-oiling root cause correlation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Overdue', 'Normal'].map(flt => (
            <button
              key={flt}
              onClick={() => setFilterType(flt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterType === flt ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {flt}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="kpi-card">
          <div className="kpi-title">Overdue Oiling Events</div>
          <div className="kpi-value text-rose-600">{overdueMachines.length}</div>
          <div className="kpi-sub text-rose-700">Immediate schedule needed</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Compliant Machines</div>
          <div className="kpi-value text-emerald-600">{machines.length - overdueMachines.length}</div>
          <div className="kpi-sub text-emerald-700">Within recommended interval</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Monthly Lubricant Use</div>
          <div className="kpi-value text-slate-900">{totalLitersConsumed.toFixed(0)} L</div>
          <div className="kpi-sub text-slate-500">ISO VG 220 / Mobil SHC 630</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Next Scheduled Service</div>
          <div className="kpi-value text-sky-700 text-lg font-bold">13 October 2026</div>
          <div className="kpi-sub text-slate-500">Shift C Overnight Window</div>
        </div>
      </div>

      {/* AI Chronic Oiling Correlation Warning */}
      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <strong className="font-bold text-amber-900 block mb-1">
            Predictive AI Lubrication Warning:
          </strong>
          Conveyor <strong>CV-1042</strong> and Sorter <strong>SORT-082</strong> have repeatedly operated past their 14-day lubrication intervals (3+ delayed cycles). Acoustic emission and vibration spectral analysis reveal that lubricant starvation is the <strong>primary initiator of bearing raceway micro-spalling</strong>.
        </div>
      </div>

      {/* Lubrication Fleet Table (Prompt Section 17) */}
      <div className="enterprise-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Machine ID</th>
                <th>Asset Type</th>
                <th>Location</th>
                <th>Last Serviced</th>
                <th>Recommended Interval</th>
                <th>Delayed Cycles</th>
                <th>Lubricant Type</th>
                <th>Consumption</th>
                <th>Compliance Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedMachines.map((m) => {
                const isOverdue = m.delayedLubricationCount > 0;

                return (
                  <tr 
                    key={m.id}
                    onClick={() => setSelectedMachineId(m.id)}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="font-mono font-bold text-slate-900">{m.id}</td>
                    <td className="font-semibold text-slate-900">{m.type}</td>
                    <td className="text-xs text-slate-600">{m.location}</td>
                    <td className="font-mono text-xs text-slate-700">{m.lastLubrication}</td>
                    <td className="font-mono text-xs text-slate-600">Every {m.recommendedLubricationDays} days</td>
                    <td>
                      <span className={`font-mono font-bold text-xs ${isOverdue ? 'text-rose-600' : 'text-slate-600'}`}>
                        {m.delayedLubricationCount}x delayed
                      </span>
                    </td>
                    <td className="font-mono text-xs text-slate-700">{m.oilType}</td>
                    <td className="font-mono text-xs text-slate-700">{m.lubricantConsumptionLiters} L</td>
                    <td>
                      <span className={`badge ${isOverdue ? 'badge-warning' : 'badge-healthy'}`}>
                        {isOverdue ? '🟡 DUE IN LOW-VOLUME WINDOW' : '🟢 COMPLIANT'}
                      </span>
                    </td>
                    <td className="text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => approveRecommendation(m.id)}
                        className="btn-secondary text-[11px] py-1 px-2.5 text-sky-700 hover:bg-sky-50"
                      >
                        Schedule Oiling
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
