import React from 'react';
import { useFleet } from '../../context/FleetContext';
import { 
  X, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  Package, 
  AlertOctagon, 
  Coins, 
  ShieldAlert, 
  CalendarClock,
  ArrowRight,
  Wrench
} from 'lucide-react';

export function ActionSheetModal() {
  const { 
    actionSheetMachine, 
    setActionSheetMachineId, 
    approveRecommendation, 
    rejectRecommendation 
  } = useFleet();

  if (!actionSheetMachine) return null;

  const m = actionSheetMachine;
  const diag = m.aiDiagnosis;

  return (
    <div className="modal-backdrop">
      <div className="modal-container w-full max-w-xl p-5">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Wrench className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Prescriptive Action Plan: {m.id}
              </h3>
              <p className="text-[11px] text-slate-500">
                {m.name} • {m.location}
              </p>
            </div>
          </div>

          <button 
            onClick={() => setActionSheetMachineId(null)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Hero Callout */}
        <div className="my-3.5 p-3.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-950">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-600 text-white font-mono">
              Prescribed Immediate Action
            </span>
            <span className="text-xs font-semibold text-sky-800">
              AI Confidence: {m.confidenceScore}%
            </span>
          </div>
          <p className="text-xs font-semibold leading-relaxed mt-1">
            {diag.recommendedAction}
          </p>
        </div>

        {/* 8 Prescriptive Action Points (Prompt Section 48) */}
        <div className="space-y-2.5 text-xs text-slate-700">
          
          {/* Point 1: Why / Primary Cause */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <AlertOctagon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wider">Root Cause Diagnosis:</strong>
              <span>{diag.primaryCause} (Supporting: {diag.supportingEvidence[0]})</span>
            </div>
          </div>

          {/* Point 2: Recommended Maintenance Window */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <CalendarClock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wider">Recommended Maintenance Window:</strong>
              <span className="font-semibold text-sky-800 font-mono">{diag.recommendedWindow}</span>
              <span className="text-[10.5px] text-slate-500 block">Lowest fulfillment parcel volume (6,200 pkg/hr) to protect delivery commitments.</span>
            </div>
          </div>

          {/* Point 3: Technician Skill Required */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <UserCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wider">Technician Skill Required:</strong>
              <span>{diag.technicianSkill}</span>
            </div>
          </div>

          {/* Point 4: Parts Required */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <Package className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wider">Spare Parts Required:</strong>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {diag.partsNeeded.map((p, idx) => (
                  <span key={idx} className="badge badge-neutral font-mono text-[10.5px]">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Points 5 & 6: Downtime & Cost Estimates */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block text-[10.5px] uppercase tracking-wider">Estimated Downtime:</strong>
              <span className="font-bold text-slate-900 font-mono text-sm">{diag.estimatedDowntime}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block text-[10.5px] uppercase tracking-wider">Estimated Cost:</strong>
              <span className="font-bold text-slate-900 font-mono text-sm">{diag.estimatedCost}</span>
            </div>
          </div>

          {/* Point 7: Risk If Ignored */}
          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
            <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-rose-800 mb-0.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Risk If Recommendation Is Ignored:</span>
            </div>
            <p className="text-[11.5px] leading-relaxed">
              {diag.riskIfIgnored}
            </p>
          </div>

        </div>

        {/* Human-in-the-Loop Action Gate (Section 58) */}
        <div className="mt-5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 italic">
            Human-in-the-Loop Verification Required
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                rejectRecommendation(m.id);
                setActionSheetMachineId(null);
              }}
              className="btn-secondary text-xs"
            >
              Defer Action
            </button>

            <button
              onClick={() => {
                approveRecommendation(m.id);
                setActionSheetMachineId(null);
              }}
              className="btn-primary text-xs bg-emerald-600 hover:bg-emerald-700 border-emerald-600 flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Approve & Dispatch Work Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
