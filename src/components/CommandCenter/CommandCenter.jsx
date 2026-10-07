import React from 'react';
import { useFleet } from '../../context/FleetContext';
import {
  Activity,
  AlertTriangle,
  Clock,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Wrench,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  DollarSign,
  Cpu,
  Layers,
  Calendar,
  Sparkles
} from 'lucide-react';

export function CommandCenter() {
  const {
    kpis,
    machines,
    productionSchedule,
    setSelectedMachineId,
    setWhyMachineId,
    setActionSheetMachineId,
    approveRecommendation,
    setActiveTab,
    startGuidedDemo
  } = useFleet();

  const criticalAndWarningMachines = machines
    .filter(m => m.status === 'Critical' || m.status === 'Warning')
    .slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      
      {/* Welcome & Facility Health Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Facility Health & Operations Command Center
            </h1>
            <span className="badge badge-healthy text-[11px] font-mono">
              96.8% FLEET AVAILABILITY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time machine health intelligence, failure prediction, and production-aware maintenance scheduling across BLR-04 Hyper-Hub.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('heatmap')}
            className="btn-secondary text-xs"
          >
            <span>View 2D Facility Heatmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('copilot')}
            className="btn-primary text-xs bg-indigo-600 hover:bg-indigo-700 border-indigo-600 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Copilot</span>
          </button>
        </div>
      </div>

      {/* SECTION 6: TOP-LEVEL KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Total Machines */}
        <div className="kpi-card">
          <div className="kpi-title">
            <span>Total Machines</span>
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="kpi-value text-slate-900">{kpis.totalMachines.toLocaleString()}</div>
          <div className="kpi-sub">
            <span className="text-slate-500 font-medium">320 connected sample</span>
          </div>
        </div>

        {/* Healthy Machines */}
        <div className="kpi-card">
          <div className="kpi-title">
            <span>Healthy Assets</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          </div>
          <div className="kpi-value text-emerald-600">{kpis.healthyMachines}</div>
          <div className="kpi-sub text-emerald-700">
            <span>74.3% of fleet nominal</span>
          </div>
        </div>

        {/* Warning Machines */}
        <div className="kpi-card">
          <div className="kpi-title">
            <span>Warning State</span>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          </div>
          <div className="kpi-value text-amber-600">{kpis.warningMachines}</div>
          <div className="kpi-sub text-amber-700">
            <span>Degrading telemetry</span>
          </div>
        </div>

        {/* Critical Machines */}
        <div className="kpi-card">
          <div className="kpi-title">
            <span>Critical Assets</span>
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
          </div>
          <div className="kpi-value text-rose-600">{kpis.criticalMachines}</div>
          <div className="kpi-sub text-rose-700">
            <span>Immediate risk</span>
          </div>
        </div>

        {/* Machines at Risk */}
        <div className="kpi-card">
          <div className="kpi-title">
            <span>Machines At Risk</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="kpi-value text-slate-900">{kpis.machinesAtRisk}</div>
          <div className="kpi-sub text-slate-500">
            <span>Failure prob &gt; 40%</span>
          </div>
        </div>

        {/* Predicted Failures */}
        <div className="kpi-card">
          <div className="kpi-title">
            <span>Predicted Failures</span>
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="kpi-value text-rose-600">{kpis.predictedFailures}</div>
          <div className="kpi-sub text-rose-700">
            <span>Within next 14 days</span>
          </div>
        </div>

      </div>

      {/* SECOND ROW OF OPERATIONAL & FINANCIAL KPIS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        
        {/* Preventive Maintenance Due */}
        <div className="kpi-card bg-slate-50">
          <div className="kpi-title text-[10.5px]">PM Due</div>
          <div className="kpi-value text-slate-800 text-xl">{kpis.preventiveMaintenanceDue}</div>
          <div className="kpi-sub text-[10px]">94 work orders</div>
        </div>

        {/* Current Downtime */}
        <div className="kpi-card bg-slate-50">
          <div className="kpi-title text-[10.5px]">Current Downtime</div>
          <div className="kpi-value text-slate-800 text-xl">{kpis.currentDowntimeHours}</div>
          <div className="kpi-sub text-[10px]">Unplanned today</div>
        </div>

        {/* Estimated Downtime Avoided */}
        <div className="kpi-card bg-emerald-50/50 border-emerald-200">
          <div className="kpi-title text-[10.5px] text-emerald-800">Downtime Avoided</div>
          <div className="kpi-value text-emerald-700 text-xl font-bold">{kpis.estimatedDowntimeAvoidedHours}</div>
          <div className="kpi-sub text-[10px] text-emerald-800 font-medium">★ AI Preserved</div>
        </div>

        {/* Maintenance Cost Spent */}
        <div className="kpi-card bg-slate-50">
          <div className="kpi-title text-[10.5px]">Maintenance Spend</div>
          <div className="kpi-value text-slate-800 text-xl font-mono">{kpis.maintenanceCostLakhs}</div>
          <div className="kpi-sub text-[10px]">Month to date</div>
        </div>

        {/* Estimated Cost Avoided */}
        <div className="kpi-card bg-sky-50/60 border-sky-200">
          <div className="kpi-title text-[10.5px] text-sky-900 font-bold">Cost Avoided</div>
          <div className="kpi-value text-sky-800 text-xl font-mono font-bold">{kpis.estimatedCostAvoidedLakhs}</div>
          <div className="kpi-sub text-[10px] text-sky-900 font-medium">ROI 2.32× Avoided</div>
        </div>

        {/* Machine Availability */}
        <div className="kpi-card bg-slate-50">
          <div className="kpi-title text-[10.5px]">Availability</div>
          <div className="kpi-value text-emerald-600 text-xl font-mono">{kpis.machineAvailabilityPct}</div>
          <div className="kpi-sub text-[10px]">Target: &gt;95.0%</div>
        </div>

        {/* Overall Equipment Effectiveness */}
        <div className="kpi-card bg-slate-50">
          <div className="kpi-title text-[10.5px]">OEE Benchmark</div>
          <div className="kpi-value text-indigo-700 text-xl font-mono">{kpis.overallEquipmentEffectivenessPct}</div>
          <div className="kpi-sub text-[10px]">World-class tier</div>
        </div>

      </div>

      {/* FACILITY HEALTH DISTRIBUTION BAR */}
      <div className="enterprise-card p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Facility Machine Health Distribution (320 Active Connected Assets)
          </span>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Healthy: <strong>{kpis.healthyMachines}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Warning: <strong>{kpis.warningMachines}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-rose-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              Critical: <strong>{kpis.criticalMachines}</strong>
            </span>
          </div>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div 
            style={{ width: `${(kpis.healthyMachines / kpis.sampleTotal) * 100}%` }} 
            className="bg-emerald-500 h-full transition-all"
            title={`Healthy: ${kpis.healthyMachines}`}
          />
          <div 
            style={{ width: `${(kpis.warningMachines / kpis.sampleTotal) * 100}%` }} 
            className="bg-amber-500 h-full transition-all"
            title={`Warning: ${kpis.warningMachines}`}
          />
          <div 
            style={{ width: `${(kpis.criticalMachines / kpis.sampleTotal) * 100}%` }} 
            className="bg-rose-500 h-full transition-all"
            title={`Critical: ${kpis.criticalMachines}`}
          />
        </div>
      </div>

      {/* TWO COLUMN SECTION: CRITICAL ACTION QUEUE + PRODUCTION AWARE SCHEDULING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): AI Critical Action Queue */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Urgent AI Recommendations (Human-In-The-Loop Action Queue)</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                AI recommends preventive intervention before catastrophic stoppage. Requires manager sign-off.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('alerts')}
              className="text-xs text-sky-600 hover:text-sky-800 font-semibold"
            >
              View All Alerts →
            </button>
          </div>

          <div className="space-y-3">
            {criticalAndWarningMachines.map((m) => {
              const diag = m.aiDiagnosis;
              const isCrit = m.status === 'Critical';

              return (
                <div 
                  key={m.id} 
                  className={`p-4 rounded-lg border transition-all ${
                    isCrit ? 'bg-rose-50/40 border-rose-200' : 'bg-amber-50/30 border-amber-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {m.id}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{m.name}</h4>
                        <span className={`badge ${isCrit ? 'badge-critical' : 'badge-warning'}`}>
                          {m.status.toUpperCase()}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {m.location}
                        </span>
                      </div>

                      <div className="mt-1.5 text-xs text-slate-800 leading-snug">
                        <strong className="text-slate-900">Diagnosis:</strong> {diag.primaryCause}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-mono">
                        <span>Failure Risk: <strong className="text-rose-600">{m.failureRisk}%</strong></span>
                        <span>•</span>
                        <span>RUL: <strong className="text-sky-700">{m.rulDays} days</strong></span>
                        <span>•</span>
                        <span>Optimal Window: <strong className="text-slate-800">{diag.recommendedWindow}</strong></span>
                        <span>•</span>
                        <span>Downtime: <strong className="text-slate-800">{diag.estimatedDowntime}</strong></span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-400">HEALTH</span>
                        <button
                          onClick={() => setWhyMachineId(m.id)}
                          className="text-[10px] text-sky-600 hover:underline flex items-center gap-0.5 font-bold"
                          title="Why is this machine unhealthy?"
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>Why?</span>
                        </button>
                      </div>
                      <div className="font-mono text-xl font-extrabold text-slate-900">
                        {m.healthScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                      </div>
                    </div>
                  </div>

                  {/* Action & Explanation Footer */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-emerald-800 font-medium">
                      ROI: {diag.costAvoidance}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedMachineId(m.id)}
                        className="btn-secondary text-[11px] py-1 px-2.5"
                      >
                        Inspect Twin
                      </button>

                      <button
                        onClick={() => setActionSheetMachineId(m.id)}
                        className="btn-secondary text-[11px] py-1 px-2.5 text-emerald-700 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 font-semibold"
                      >
                        What Should I Do?
                      </button>

                      <button
                        onClick={() => approveRecommendation(m.id)}
                        className="btn-primary text-[11px] py-1 px-3 bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve Work Order</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Production-Aware Scheduling & Low-Volume Tradeoff */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="enterprise-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Production Schedule & Maintenance Windows</span>
              </h3>
              <span className="badge badge-blue text-[10px]">Tradeoff Engine</span>
            </div>

            <p className="text-xs text-slate-600 leading-snug mb-3">
              The AI never schedules maintenance in isolation. It correlates predicted failure timelines with the 24-hour fulfillment volume curve to avoid peak fulfillment delays.
            </p>

            {/* Hourly Volume Sparkline & Highlights */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-3">
              <div className="flex justify-between items-center text-[11px] mb-1.5">
                <span className="font-semibold text-slate-700">24-Hour Parcel Induction Volume</span>
                <span className="text-rose-600 font-mono font-bold">Peak: 48,000 pkg/hr (16:00)</span>
              </div>

              {/* Simplified Volume Bars */}
              <div className="flex items-end gap-1 h-16 pt-2">
                {productionSchedule.map((item, idx) => {
                  const h = Math.max(12, (item.volume / 48000) * 100);
                  const isMaintenanceWindow = item.hour === '02:00' || item.hour === '03:00';
                  const isPeak = item.volume > 40000;

                  return (
                    <div 
                      key={idx} 
                      className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                      title={`${item.hour}: ${item.volume.toLocaleString()} pkg/hr (${item.windowType})`}
                    >
                      <div
                        className={`w-full rounded-xs transition-all ${
                          isMaintenanceWindow 
                            ? 'bg-emerald-500 ring-2 ring-emerald-300' 
                            : isPeak 
                            ? 'bg-rose-500' 
                            : 'bg-slate-300'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>00:00</span>
                <span className="text-emerald-700 font-bold">★ 02:00–04:00 (Lowest Load: 6.2k)</span>
                <span>12:00</span>
                <span className="text-rose-600 font-bold">16:00 Peak</span>
                <span>23:00</span>
              </div>
            </div>

            {/* Optimal Window Highlight */}
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900 mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Recommended Low-Volume Maintenance Slot: 02:00 AM – 04:00 AM</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-emerald-900">
                Volume drops from peak 48,000 pkg/hr to <strong>6,200 pkg/hr (15% line load)</strong>. Routing packages via Buffer Line B-06 allows offline servicing of <strong>CV-1042</strong> with <strong>zero customer delivery delay</strong>.
              </p>
            </div>

            {/* Maintenance Priority Score Formula (Section 24) */}
            <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                AI Priority Calculation Formula
              </div>
              <div className="font-mono text-xs text-slate-900 font-semibold bg-white p-2 rounded border border-slate-200">
                Priority = Failure Risk × Production Impact × Asset Criticality × Lead Time
              </div>
              <div className="mt-1.5 text-[11px] text-slate-500 flex justify-between">
                <span>CV-1042 Priority Score: <strong className="text-rose-600 font-mono">92 / 100</strong></span>
                <span className="badge badge-critical text-[10px]">CRITICAL PRIORITY</span>
              </div>
            </div>

          </div>

          {/* Quick Guided Demo Callout */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300 font-mono">
                Interactive Guided Value Chain Demonstration
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-snug mb-3">
              Experience the complete 16-step closed decision loop from sensor vibration detection to work order generation and PDF report card export.
            </p>
            <button
              onClick={startGuidedDemo}
              className="btn-primary text-xs bg-sky-500 hover:bg-sky-400 border-sky-400 text-slate-950 font-bold"
            >
              <span>Launch 16-Step Guided Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
