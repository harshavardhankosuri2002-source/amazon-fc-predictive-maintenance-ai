import React from 'react';
import { useFleet } from '../../context/FleetContext';
import { downloadMachineReportCard } from '../../utils/pdfGenerator';
import { 
  PlayCircle, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Clock, 
  FileDown, 
  ShieldAlert 
} from 'lucide-react';

export function GuidedDemoBanner() {
  const { 
    guidedDemoStep, 
    nextDemoStep, 
    prevDemoStep, 
    exitGuidedDemo, 
    demoBannerOpen, 
    selectedMachine,
    approveRecommendation,
    setSelectedMachineId,
    setActionSheetMachineId,
    setActiveTab
  } = useFleet();

  if (!demoBannerOpen || guidedDemoStep === 0) return null;

  const demoSteps = [
    {
      step: 1,
      title: 'Facility Command Center Overview',
      desc: 'Operations manager views facility-wide metrics: 1,248 total machines, 96.8% machine availability, ₹42.7L estimated cost avoided.',
      actionLabel: 'Proceed to Fleet Overview →',
    },
    {
      step: 2,
      title: 'Facility-Wide Machine Health Monitoring',
      desc: 'Platform monitors 320 connected machines across 7 fulfillment zones in real time with continuous vibration, thermal, and current telemetry.',
      actionLabel: 'Inject Anomaly on CV-1042 →',
    },
    {
      step: 3,
      title: 'Anomaly Injected: Conveyor CV-1042',
      desc: 'Induction Line 04 Belt Conveyor begins experiencing irregular mechanical harmonics during the afternoon Prime volume rush.',
      actionLabel: 'Trigger AI Telemetry Analysis →',
    },
    {
      step: 4,
      title: 'AI Detects Increasing Vibration (+71%)',
      desc: 'Vibration RMS jumps from normal 2.1–3.4 mm/s baseline to 5.8 mm/s (+71% deviation). Real-time anomaly tagged as Severe.',
      actionLabel: 'Observe Machine Health Drop →',
    },
    {
      step: 5,
      title: 'Machine Health Score Falls: 82 → 67',
      desc: 'AI health evaluation engine calculates multi-factor penalty: Vibration (-15 pts), Temperature (-10 pts), Age (-7 pts), Oiling Delay (-6 pts).',
      actionLabel: 'Check Failure Risk Escalation →',
    },
    {
      step: 6,
      title: 'Failure Probability Spikes: 9% → 68%',
      desc: 'Predictive ML model projects a 68% probability of catastrophic stoppage within the next 14 days if unaddressed (AI Confidence: 87%).',
      actionLabel: 'Open Root Cause Analysis →',
    },
    {
      step: 7,
      title: 'AI Root Cause: Bearing Degradation',
      desc: 'Pattern correlation with 14 past Dematic conveyor failures pinpoints progressive spalling on outboard spherical roller bearing.',
      actionLabel: 'Check Maintenance History →',
    },
    {
      step: 8,
      title: 'AI Inspects Historical Maintenance Logs',
      desc: 'CV-1042 has operated 31,842 total hours. Outboard bearing replaced on 18 Sep 2026; inner ring micro-wear evident.',
      actionLabel: 'Audit Lubrication Records →',
    },
    {
      step: 9,
      title: 'AI Identifies Lubrication Overdue by 5 Days',
      desc: 'Recommended lubrication interval is 14 days (last serviced 29 Sep). Boundary film thinning accelerated mechanical friction.',
      actionLabel: 'Check Production Schedule →',
    },
    {
      step: 10,
      title: 'AI Cross-References 24h Production Schedule',
      desc: 'Warehouse order volume peaks at 48,000 packages/hr from 14:00 to 22:00. Shutting down Line 04 now would stall 14,000 packages.',
      actionLabel: 'Find Low-Volume Window →',
    },
    {
      step: 11,
      title: 'AI Identifies Optimal Window: 02:00 AM – 04:00 AM',
      desc: 'Volume drops to 6,200 packages/hr overnight. Production tradeoff engine selects this slot to guarantee 0 delayed customer shipments.',
      actionLabel: 'Generate AI Recommendation →',
    },
    {
      step: 12,
      title: 'AI Preventive Recommendation Generated',
      desc: 'Action: Inspect bearing + flush lubricate + replace SKF 22215 EK bearing if pitting > 0.2mm. Estimated downtime: 45–60 min. Cost: ₹16,500.',
      actionLabel: 'Review Manager Approval Action →',
    },
    {
      step: 13,
      title: 'Human-in-the-Loop Decision Gate',
      desc: 'The AI never executes irreversible maintenance without human authority. Click "Approve Recommendation" to dispatch the work order.',
      actionLabel: 'Approve & Dispatch Work Order →',
    },
    {
      step: 14,
      title: 'Work Order Generated & Dispatched to Tech 08',
      desc: 'Work Order #WO-8492 automatically assigned to Rajesh Sharma (Lead Mechanical & Gearbox Specialist). Parts reserved from inventory.',
      actionLabel: 'Generate Machine Health Report Card →',
    },
    {
      step: 15,
      title: 'Machine Health Report Card Compiled',
      desc: 'Comprehensive multi-page audit report compiled with sensor charts, root causes, financial ROI (₹70,000 avoided), and compliance logs.',
      actionLabel: 'Download Official PDF Report Card →',
    },
    {
      step: 16,
      title: 'Decision Loop Complete: Sense → Predict → Act',
      desc: 'Full predictive maintenance loop executed: Unplanned downtime prevented, cost avoided, parts pre-staged, technician scheduled.',
      actionLabel: 'Restart Demo or Explore Freely',
    },
  ];

  const current = demoSteps[guidedDemoStep - 1] || demoSteps[0];

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-5 py-3 shadow-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Step Indicator & Content */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/40 flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">
            {guidedDemoStep}/16
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 font-mono">
                Guided Value Chain Demonstration
              </span>
              <span className="text-slate-500">•</span>
              <h4 className="text-xs font-bold text-slate-100">{current.title}</h4>
            </div>
            <p className="text-[11.5px] text-slate-300 mt-0.5 max-w-3xl leading-snug">
              {current.desc}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          {guidedDemoStep > 1 && (
            <button
              onClick={prevDemoStep}
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          {guidedDemoStep === 16 ? (
            <button
              onClick={() => downloadMachineReportCard(selectedMachine)}
              className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF Report Card</span>
            </button>
          ) : (
            <button
              onClick={nextDemoStep}
              className="px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>{current.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={exitGuidedDemo}
            title="Exit Guided Demo"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
