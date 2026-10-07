import React from 'react';
import { useFleet } from '../../context/FleetContext';
import { downloadFacilityMaintenanceReport, downloadMachineReportCard } from '../../utils/pdfGenerator';
import { exportFleetToCSV, exportMaintenanceToCSV, exportFailuresToCSV } from '../../utils/exportUtils';
import {
  FileText,
  FileDown,
  FileSpreadsheet,
  Calendar,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export function ReportsView() {
  const { kpis, machines, maintenanceRecords, failureRecords, setSelectedMachineId } = useFleet();

  return (
    <div className="p-6 space-y-6">
      
      {/* Title & Downloads */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" />
              <span>Operations Briefings & Executive Reliability Reports</span>
            </h1>
            <span className="badge badge-neutral text-xs font-mono">
              Export Center (PDF / CSV)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated daily shift briefings, weekly executive reliability scorecards, and auditable compliance reports.
          </p>
        </div>

        {/* Global Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadFacilityMaintenanceReport(machines, kpis, [])}
            className="btn-primary text-xs flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Facility Report (PDF)</span>
          </button>

          <button
            onClick={() => exportFleetToCSV(machines)}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Fleet CSV</span>
          </button>
        </div>
      </div>

      {/* SECTION 39: DAILY AI OPERATIONS REPORT */}
      <div className="enterprise-card p-5 border-l-4 border-l-sky-600">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Daily Machine Health Brief (Shift C Handover)
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-slate-600">
            Date: 07 October 2026 • 17:00 IST
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Critical Machines</span>
            <span className="font-mono text-xl font-bold text-rose-600">7</span>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Predicted Failures</span>
            <span className="font-mono text-xl font-bold text-rose-600">4</span>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Maintenance Due</span>
            <span className="font-mono text-xl font-bold text-slate-900">31</span>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Highest Risk Machine</span>
            <span className="font-mono text-base font-bold text-slate-900">SORT-082</span>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Recommended Action</span>
            <span className="text-xs font-semibold text-slate-800">Inspect before 02:00 AM</span>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Expected Downtime Risk</span>
            <span className="font-mono text-xs font-bold text-slate-800">3.2 hrs downtime</span>
          </div>

          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] text-emerald-800 font-bold block">Cost Preventable</span>
            <span className="font-mono text-base font-bold text-emerald-700">₹72,000</span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900 block mb-1">Chief Operations Brief:</strong>
          Induction line conveyor CV-1042 vibration increased to 5.8 mm/s; recommended for bearing replacement during the 02:00 AM – 04:00 AM window. Sorter loop SORT-082 displays chronic gear fatigue and requires lead technician monitoring during peak evening sortation.
        </div>
      </div>

      {/* SECTION 40: WEEKLY EXECUTIVE RELIABILITY REPORT */}
      <div className="enterprise-card p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Weekly Executive Reliability Scorecard (W40 - October 2026)
              </h2>
              <span className="text-[11px] text-slate-500">
                Prepared for Amazon Operations Director & Fulfillment Center General Manager
              </span>
            </div>
          </div>
        </div>

        {/* Executive Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Fleet Reliability Metrics
            </span>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Machine Availability:</span>
              <strong className="font-mono text-emerald-600 text-sm">96.8%</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Unplanned Downtime:</span>
              <strong className="font-mono text-slate-800">4.7 hrs / week</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Downtime Avoided by AI:</span>
              <strong className="font-mono text-emerald-700 text-sm font-bold">31.5 hrs</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Financial ROI & Cost Avoidance
            </span>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Preventive Maintenance Spend:</span>
              <strong className="font-mono text-slate-800">₹18.4L</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Estimated Cost Avoided:</span>
              <strong className="font-mono text-sky-800 text-sm font-bold">₹42.7L</strong>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Preventive vs Reactive Ratio:</span>
              <strong className="font-mono text-slate-800">84% / 16% (Target &gt;80%)</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Top Problematic Assets & Components
            </span>
            <div className="text-xs text-slate-700">
              • <strong>CONV-X2 Fleet:</strong> 2.5× higher failure rate than CONV-X1
            </div>
            <div className="text-xs text-slate-700">
              • <strong>Spherical Bearings:</strong> Accounts for 38% of emergency stops
            </div>
            <div className="text-xs text-slate-700">
              • <strong>SORT-082:</strong> Breached replacement cost threshold (52% ROI)
            </div>
          </div>

        </div>

        {/* Top Executive Directives */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
          <strong className="font-bold text-emerald-900 block text-xs mb-1">
            Executive Leadership Directives:
          </strong>
          <div>1. Approve capital replacement proposal for Sorter SORT-082 in next quarter capex budget (Payback: 14 months).</div>
          <div>2. Mandate strictly enforced 14-day lubrication compliance across Zone B induction lines to extend roller bearing lifespan by an estimated 40%.</div>
          <div>3. Pre-order 17 SKF 22215 bearings ahead of forecasted Diwali / Prime holiday volume peak.</div>
        </div>

      </div>

      {/* CSV Export Quick Links */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={() => exportMaintenanceToCSV(maintenanceRecords)}
          className="btn-secondary text-xs flex items-center gap-1.5"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
          <span>Export 1,000+ Maintenance Logs (CSV)</span>
        </button>

        <button
          onClick={() => exportFailuresToCSV(failureRecords)}
          className="btn-secondary text-xs flex items-center gap-1.5"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-rose-600" />
          <span>Export 500+ Historical Failures (CSV)</span>
        </button>
      </div>

    </div>
  );
}
