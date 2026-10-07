import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import {
  Sliders,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  ShieldAlert,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Wrench
} from 'lucide-react';

export function WhatIfSimulation() {
  const { machines, setSelectedMachineId, approveRecommendation } = useFleet();

  const [selectedMachineId, setSimMachineId] = useState('CV-1042');
  const [delayDays, setDelayDays] = useState(7);

  const targetMachine = machines.find(m => m.id === selectedMachineId) || machines[0];

  // Dynamic what-if mathematical calculations based on prompt Section 25
  const baseProb = targetMachine.failureRisk;
  const simulatedProb = Math.min(96, Math.floor(baseProb + delayDays * 3.8));
  const baseDowntime = 1.0;
  const simulatedDowntime = (baseDowntime + (delayDays * 0.35)).toFixed(1);
  const baseLoss = 12000;
  const simulatedLoss = Math.floor(baseLoss + delayDays * 4200);
  const riskFactor = delayDays === 0 ? 'Nominal Risk' : delayDays <= 3 ? 'Moderate Increase' : delayDays <= 7 ? 'High Risk Exposure' : 'Catastrophic Risk';

  return (
    <div className="p-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sliders className="w-5 h-5 text-sky-600" />
              <span>What-If Maintenance Delay Scenario Simulator</span>
            </h1>
            <span className="badge badge-blue text-xs font-mono">
              Dynamic ML Physics Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Test maintenance deferral scenarios and quantify operational risk exposure before making dispatch decisions.
          </p>
        </div>

        {/* Machine Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-semibold">Select Target Asset:</span>
          <select
            value={selectedMachineId}
            onChange={(e) => setSimMachineId(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 py-1.5 px-3 focus:outline-none cursor-pointer"
          >
            <option value="CV-1042">CV-1042 - Induction Conveyor (Bearing Wear)</option>
            <option value="SORT-082">SORT-082 - Cross-Belt Sorter (Critical)</option>
            <option value="ROB-221">ROB-221 - Palletizing Robot (Joint Backlash)</option>
            <option value="PACK-304">PACK-304 - Case Sealer (Solenoid Delay)</option>
            <option value="COMP-019">COMP-019 - Screw Compressor (Healthy)</option>
          </select>
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="enterprise-card p-6 space-y-6">
        
        {/* Interactive Slider */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Scenario: "What happens if I delay maintenance by {delayDays} days?"
              </span>
              <span className="text-xs text-slate-500">
                Slide to model degradation impact on failure probability, downtime, and cost exposure.
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-2xl font-extrabold text-sky-700">
                +{delayDays} Days
              </span>
              <span className="text-xs text-slate-500 block">Deferral Period</span>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={delayDays}
            onChange={(e) => setDelayDays(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />

          <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
            <span>0 Days (Perform Today)</span>
            <span>7 Days Delay</span>
            <span>14 Days Delay</span>
            <span>21 Days Delay</span>
            <span className="text-rose-600 font-bold">30 Days Delay</span>
          </div>
        </div>

        {/* Dynamic Simulation Output Metrics (Section 25) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Failure Probability Comparison */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Failure Probability
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-mono text-slate-400 line-through text-sm">
                {baseProb}%
              </span>
              <span className="text-slate-400">→</span>
              <span className="font-mono text-2xl font-extrabold text-rose-600">
                {simulatedProb}%
              </span>
            </div>
            <span className="text-[11px] text-rose-600 font-semibold block mt-1 font-mono">
              +{simulatedProb - baseProb}% Risk Surge
            </span>
          </div>

          {/* Downtime Exposure */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Estimated Downtime Exposure
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-mono text-2xl font-extrabold text-slate-900">
                {simulatedDowntime} hrs
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">
              Catastrophic stoppage vs 45m planned
            </span>
          </div>

          {/* Additional Cost Exposure */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Expected Additional Cost
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-mono text-2xl font-extrabold text-amber-700">
                ₹{simulatedLoss.toLocaleString()}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">
              Emergency freight + line idle labor
            </span>
          </div>

          {/* Risk Factor Classification */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Composite Risk Severity
            </span>
            <div className="mt-2">
              <span className={`badge ${
                delayDays === 0 ? 'badge-healthy' : delayDays <= 3 ? 'badge-warning' : 'badge-critical'
              } text-xs py-1`}>
                {riskFactor.toUpperCase()}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-2">
              Line 04 Prime induction blockage
            </span>
          </div>

        </div>

        {/* Narrative AI Output from Section 25 */}
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 text-xs leading-relaxed">
          <strong className="font-bold text-sky-900 block mb-1">
            AI Tradeoff Synthesis (Section 25 Simulation Engine):
          </strong>
          {delayDays === 0 ? (
            <p>Performing preventive maintenance today during the 02:00 AM – 04:00 AM window entails <strong>45 minutes of scheduled downtime</strong> costing <strong>₹16,500</strong> with 0 delayed parcels.</p>
          ) : (
            <p>
              Delaying maintenance by <strong>{delayDays} days</strong> causes failure probability to rise from <strong>{baseProb}% to {simulatedProb}%</strong>. Exposure increases to <strong>{simulatedDowntime} hours of unplanned stoppage</strong>, generating an expected cost penalty of <strong>₹{simulatedLoss.toLocaleString()}</strong>.
              {delayDays >= 7 && <strong className="text-rose-700 block mt-1">Recommendation: Do NOT delay past 5 days. Schedule during tomorrow morning's low-volume window.</strong>}
            </p>
          )}
        </div>

        {/* Action Gate */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setSelectedMachineId(targetMachine.id)}
            className="btn-secondary text-xs"
          >
            Inspect Digital Twin
          </button>

          <button
            onClick={() => approveRecommendation(targetMachine.id)}
            className="btn-primary text-xs bg-emerald-600 hover:bg-emerald-700 border-emerald-600 flex items-center gap-1.5"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Schedule Optimal Window (02:00 AM)</span>
          </button>
        </div>

      </div>

    </div>
  );
}
