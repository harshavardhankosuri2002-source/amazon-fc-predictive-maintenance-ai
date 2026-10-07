import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import {
  Scale,
  Cpu,
  Activity,
  CheckCircle,
  HelpCircle,
  Wrench,
  Layers,
  ArrowRight
} from 'lucide-react';

export function MachineCompare() {
  const { machines, setSelectedMachineId, setWhyMachineId, setActionSheetMachineId } = useFleet();

  const [machineAId, setMachineAId] = useState('CV-1042');
  const [machineBId, setMachineBId] = useState('SORT-082');
  const [machineCId, setMachineCId] = useState('ROB-221');

  const mA = machines.find(m => m.id === machineAId) || machines[0];
  const mB = machines.find(m => m.id === machineBId) || machines[1];
  const mC = machines.find(m => m.id === machineCId) || machines[2];

  const compareList = [mA, mB, mC];

  return (
    <div className="p-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-sky-600" />
              <span>Multi-Asset Machine Comparison Tool</span>
            </h1>
            <span className="badge badge-neutral text-xs font-mono">
              Side-By-Side Telemetry Benchmark
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare health, age, failure risk, sensor degradation, and maintenance spend across cohorts.
          </p>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-3.5 rounded-lg border border-slate-200">
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Machine 1 (Asset A)
          </label>
          <select
            value={machineAId}
            onChange={(e) => setMachineAId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs font-mono font-bold text-slate-800"
          >
            {machines.slice(0, 50).map(m => (
              <option key={m.id} value={m.id}>{m.id} - {m.type} ({m.healthScore}/100)</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Machine 2 (Asset B)
          </label>
          <select
            value={machineBId}
            onChange={(e) => setMachineBId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs font-mono font-bold text-slate-800"
          >
            {machines.slice(0, 50).map(m => (
              <option key={m.id} value={m.id}>{m.id} - {m.type} ({m.healthScore}/100)</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Machine 3 (Asset C)
          </label>
          <select
            value={machineCId}
            onChange={(e) => setMachineCId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-xs font-mono font-bold text-slate-800"
          >
            {machines.slice(0, 50).map(m => (
              <option key={m.id} value={m.id}>{m.id} - {m.type} ({m.healthScore}/100)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid (Section 49) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {compareList.map((m, idx) => {
          const isCrit = m.status === 'Critical';
          const isWarn = m.status === 'Warning';
          const cardBorder = isCrit ? 'border-rose-300' : isWarn ? 'border-amber-300' : 'border-slate-200';

          return (
            <div key={idx} className={`enterprise-card p-5 space-y-4 ${cardBorder}`}>
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="font-mono font-bold text-sm text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {m.id}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs mt-1">{m.name}</h3>
                  <div className="text-[10.5px] text-slate-500">{m.location}</div>
                </div>

                <span className={`badge ${isCrit ? 'badge-critical' : isWarn ? 'badge-warning' : 'badge-healthy'}`}>
                  {m.status.toUpperCase()}
                </span>
              </div>

              {/* Vitals */}
              <div className="space-y-2 text-xs">
                
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">AI Health Score:</span>
                  <div className="flex items-center gap-1 font-mono font-bold">
                    <span className={m.healthScore > 75 ? 'text-emerald-600' : m.healthScore > 50 ? 'text-amber-600' : 'text-rose-600'}>
                      {m.healthScore} / 100
                    </span>
                    <button onClick={() => setWhyMachineId(m.id)} className="text-sky-600">
                      <HelpCircle className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Failure Probability:</span>
                  <span className={`font-mono font-bold ${m.failureRisk > 40 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {m.failureRisk}% (14 days)
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Estimated RUL:</span>
                  <span className="font-mono font-bold text-sky-700">{m.rulDays} days</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Operating Age:</span>
                  <span className="font-mono">{m.ageYears} yrs ({m.operatingHours.toLocaleString()} hrs)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Vibration (RMS):</span>
                  <span className={`font-mono font-bold ${m.currentTelemetry.vibration > 3.4 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {m.currentTelemetry.vibration} mm/s
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Motor Temperature:</span>
                  <span className="font-mono">{m.currentTelemetry.temperature}°C</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Motor Current:</span>
                  <span className="font-mono">{m.currentTelemetry.motorCurrent} A</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Lubrication Status:</span>
                  <span className="font-mono text-xs">{m.delayedLubricationCount > 0 ? `Delayed ${m.delayedLubricationCount}x` : 'Compliant'}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Cumulative Maintenance:</span>
                  <span className="font-mono font-bold">₹{m.economics.cumulativeMaintenanceCost.toLocaleString()}</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setActionSheetMachineId(m.id)}
                  className="btn-secondary text-[11px] py-1 px-2.5 text-emerald-700 bg-emerald-50 border-emerald-300"
                >
                  Prescription
                </button>
                <button
                  onClick={() => setSelectedMachineId(m.id)}
                  className="btn-primary text-[11px] py-1 px-2.5"
                >
                  Open Twin →
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
