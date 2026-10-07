import React from 'react';
import { useFleet } from '../../context/FleetContext';
import { X, HelpCircle, AlertTriangle, TrendingDown, Thermometer, Activity, Clock, Wrench } from 'lucide-react';

export function WhyModal() {
  const { whyMachine, setWhyMachineId } = useFleet();

  if (!whyMachine) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container w-full max-w-lg p-5">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
              <HelpCircle className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Health Score Diagnostic: {whyMachine.id}
              </h3>
              <p className="text-[11px] text-slate-500">
                Factor decomposition explaining current score of <strong className="text-slate-800 font-mono">{whyMachine.healthScore} / 100</strong>
              </p>
            </div>
          </div>

          <button 
            onClick={() => setWhyMachineId(null)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Narrative Summary from Prompt */}
        <div className="my-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900 block mb-1">AI Analytical Assessment:</span>
          Health has decreased by <strong className="text-rose-600 font-semibold font-mono">14 points</strong> over the last 30 days. The primary contributors are increasing vibration RMS (+71% above baseline), elevated motor temperature ({whyMachine.currentTelemetry.temperature}°C), and extended operating hours since the last scheduled lubrication service.
        </div>

        {/* Feature Contribution Waterfall Breakdown */}
        <div className="space-y-2 mt-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Score Penalty Waterfall Breakdown
          </div>

          {whyMachine.scoreWaterfall.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs font-mono">
                  {item.impact}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">{item.factor}</div>
                  <div className="text-[10px] text-slate-500">Subsystem: {item.category}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-rose-600">{item.impact} pts</span>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 border border-slate-300 font-bold text-xs text-slate-800 mt-2">
            <span>Resulting AI Machine Health Score</span>
            <span className="font-mono text-sm text-slate-900">{whyMachine.healthScore} / 100</span>
          </div>
        </div>

        {/* Sensor Baseline Comparison */}
        <div className="mt-4 pt-3 border-t border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Key Sensor Deviation vs Baseline
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Vibration RMS</span>
              <span className="font-bold text-slate-800 font-mono">{whyMachine.currentTelemetry.vibration} mm/s</span>
              <span className="text-[10px] text-slate-400 block">Normal: {whyMachine.currentTelemetry.normalVibRange} mm/s</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Motor Temperature</span>
              <span className="font-bold text-slate-800 font-mono">{whyMachine.currentTelemetry.temperature}°C</span>
              <span className="text-[10px] text-slate-400 block">Normal: {whyMachine.currentTelemetry.normalTempRange}°C</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setWhyMachineId(null)}
            className="btn-secondary text-xs"
          >
            Close Explanation
          </button>
        </div>

      </div>
    </div>
  );
}
