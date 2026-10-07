import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import { downloadMachineReportCard } from '../../utils/pdfGenerator';
import {
  X,
  Activity,
  FileDown,
  Wrench,
  HelpCircle,
  AlertTriangle,
  Clock,
  Thermometer,
  Zap,
  Gauge,
  Droplet,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  History,
  CheckCircle,
  FileText,
  DollarSign,
  Layers
} from 'lucide-react';

export function DigitalTwinModal() {
  const {
    selectedMachine,
    setSelectedMachineId,
    setWhyMachineId,
    setActionSheetMachineId,
    approveRecommendation,
    maintenanceRecords,
    failureRecords
  } = useFleet();

  const [activeSubTab, setActiveSubTab] = useState('telemetry');
  const [timeRange, setTimeRange] = useState('24h');

  if (!selectedMachine) return null;

  const m = selectedMachine;
  const diag = m.aiDiagnosis;
  const tel = m.currentTelemetry;

  // Filter historical logs for this machine
  const machineMaintenance = maintenanceRecords.filter(r => r.machineId === m.id).slice(0, 8);
  const machineFailures = failureRecords.filter(f => f.machineId === m.id).slice(0, 8);

  const statusBadgeClass = m.status === 'Critical' ? 'badge-critical' :
                           m.status === 'Warning' ? 'badge-warning' : 'badge-healthy';

  // Generate simulated time-series points based on time range
  const timePoints = timeRange === '1h' ? ['13:40', '13:50', '14:00', '14:10', '14:20', '14:32'] :
                     timeRange === '6h' ? ['08:30', '10:00', '11:30', '13:00', '14:00', '14:32'] :
                     timeRange === '24h' ? ['Yesterday', '02:00', '06:00', '10:00', '13:00', 'Now'] :
                     timeRange === '7d' ? ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'] :
                     ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const vibTrend = timeRange === '24h' || timeRange === '7d' 
    ? (m.status === 'Critical' ? [3.2, 3.8, 4.2, 5.1, 5.8, tel.vibration] :
       m.status === 'Warning' ? [2.4, 2.9, 3.5, 4.2, 5.1, tel.vibration] :
       [2.1, 2.2, 2.3, 2.4, 2.3, tel.vibration])
    : [tel.vibration - 0.4, tel.vibration - 0.2, tel.vibration + 0.1, tel.vibration - 0.1, tel.vibration];

  const tempTrend = timeRange === '24h' || timeRange === '7d'
    ? (m.status === 'Critical' ? [54, 58, 62, 66, 70, tel.temperature] :
       m.status === 'Warning' ? [48, 52, 56, 61, 65, tel.temperature] :
       [44, 45, 46, 45, 46, tel.temperature])
    : [tel.temperature - 1.2, tel.temperature - 0.8, tel.temperature + 0.5, tel.temperature];

  return (
    <div className="modal-backdrop">
      <div className="modal-container w-full max-w-5xl p-6 bg-white max-h-[92vh] overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-base font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {m.id}
              </span>
              <h2 className="text-base font-bold text-slate-900">{m.name}</h2>
              <span className={`badge ${statusBadgeClass}`}>
                {m.status.toUpperCase()}
              </span>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                {m.model} • {m.manufacturer}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>{m.location}</span>
              <span className="text-slate-300">•</span>
              <span>Category: <strong>{m.category}</strong></span>
              <span className="text-slate-300">•</span>
              <span>Criticality: <strong>{m.criticality}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            {/* What Should I Do Button */}
            <button
              onClick={() => setActionSheetMachineId(m.id)}
              className="btn-primary text-xs bg-emerald-600 hover:bg-emerald-700 border-emerald-600 flex items-center gap-1.5 shadow-sm"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>What Should I Do?</span>
            </button>

            {/* Download PDF Report */}
            <button
              onClick={() => downloadMachineReportCard(m)}
              className="btn-secondary text-xs flex items-center gap-1.5"
              title="Download Machine Health Report Card (PDF)"
            >
              <FileDown className="w-3.5 h-3.5 text-sky-600" />
              <span>Report PDF</span>
            </button>

            <button
              onClick={() => setSelectedMachineId(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Machine Health Score & Key Vitals Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          
          {/* Health Score Card with "Why?" */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Health Score</span>
              <button
                onClick={() => setWhyMachineId(m.id)}
                className="text-[10.5px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-0.5 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Why?</span>
              </button>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-2xl font-extrabold text-slate-900">{m.healthScore}</span>
              <span className="text-xs text-slate-500 font-mono">/ 100</span>
            </div>
            <div className="health-bar-container mt-1.5">
              <div 
                className="health-bar-fill"
                style={{ 
                  width: `${m.healthScore}%`,
                  backgroundColor: m.healthScore > 75 ? '#16a34a' : m.healthScore > 50 ? '#d97706' : '#dc2626'
                }}
              />
            </div>
          </div>

          {/* Failure Probability */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Failure Risk</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`font-mono text-2xl font-extrabold ${m.failureRisk > 50 ? 'text-rose-600' : m.failureRisk > 20 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {m.failureRisk}%
              </span>
              <span className="text-[11px] text-slate-500">within 14 days</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1 font-mono">
              AI Confidence: {m.confidenceScore}%
            </span>
          </div>

          {/* Remaining Useful Life */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Estimated RUL</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-2xl font-extrabold text-sky-700">
                {m.rulDays}
              </span>
              <span className="text-xs text-slate-500">Days</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">
              Est. Window: {Math.max(3, m.rulDays - 7)}–{m.rulDays + 8} days
            </span>
          </div>

          {/* Operating Age & Run Hours */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Run Hours & Age</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-lg font-bold text-slate-900">
                {m.operatingHours.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">hrs</span>
            </div>
            <span className="text-[10.5px] text-slate-500 block mt-0.5">
              Age: {m.ageYears} yrs (Inst. {m.installationDate})
            </span>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs mb-4">
          {[
            { id: 'telemetry', label: 'Sensors & Anomaly Detection', icon: Activity },
            { id: 'components', label: 'Component Health & RUL', icon: Layers },
            { id: 'rootcause', label: 'Root Cause & Failure Prediction', icon: ShieldAlert },
            { id: 'history', label: 'Maintenance & Failure History', icon: History },
            { id: 'lifecycle', label: 'Lubrication & Replace vs Maintain', icon: DollarSign },
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-all ${
                  isTabActive
                    ? 'border-sky-600 text-sky-800 font-bold bg-sky-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SENSORS & ANOMALY DETECTION */}
        {activeSubTab === 'telemetry' && (
          <div className="space-y-4">
            
            {/* Active Anomaly Banner */}
            {m.status !== 'Healthy' && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                      ⚠️ Anomaly Detected • {diag.anomalyDetectedTime}
                    </span>
                    <span className="badge badge-critical text-[10px]">
                      {diag.anomalySeverity}
                    </span>
                  </div>
                  <p className="text-xs text-rose-800 mt-1 leading-snug">
                    <strong>Issue:</strong> Abnormal vibration signature detected. Normal envelope: <span className="font-mono">{tel.normalVibRange} mm/s</span>. Current: <strong className="font-mono text-rose-700">{tel.vibration} mm/s</strong> (+71% deviation above baseline).
                  </p>
                </div>
              </div>
            )}

            {/* Time Range Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Real-Time Sensor Telemetry Time-Series</span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                {['1h', '6h', '24h', '7d', '30d', '90d'].map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      timeRange === range ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Telemetry Sparklines / Gauges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Vibration RMS Card */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-600" />
                    <span>Vibration RMS</span>
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-900">{tel.vibration} mm/s</span>
                </div>
                <div className="text-[10px] text-slate-500 mb-2">
                  Normal Range: {tel.normalVibRange} mm/s
                </div>
                {/* Visual spark bar */}
                <div className="flex items-end gap-1.5 h-14 bg-white p-2 rounded border border-slate-200">
                  {vibTrend.map((v, i) => {
                    const h = Math.min(100, Math.max(15, (v / 8) * 100));
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div 
                          className={`w-full rounded-xs transition-all ${v > 4.5 ? 'bg-rose-500' : v > 3.4 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[9px] text-slate-400 font-mono">{timePoints[i] || ''}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-[10.5px] text-rose-600 font-medium">
                  {tel.vibration > 3.4 ? '⚠️ Harmonics indicate outer race spalling' : '✓ Velocity within ISO standard'}
                </div>
              </div>

              {/* Operating Temperature Card */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                    <span>Motor Temperature</span>
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-900">{tel.temperature}°C</span>
                </div>
                <div className="text-[10px] text-slate-500 mb-2">
                  Normal Range: {tel.normalTempRange}°C
                </div>
                <div className="flex items-end gap-1.5 h-14 bg-white p-2 rounded border border-slate-200">
                  {tempTrend.map((t, i) => {
                    const h = Math.min(100, Math.max(15, ((t - 30) / 50) * 100));
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div 
                          className={`w-full rounded-xs transition-all ${t > 65 ? 'bg-rose-500' : t > 58 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[9px] text-slate-400 font-mono">{timePoints[i] || ''}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-[10.5px] text-amber-700 font-medium">
                  {tel.temperature > 58 ? `Elevated: +${(tel.temperature - 55).toFixed(1)}°C above mean` : '✓ Thermal dissipation nominal'}
                </div>
              </div>

              {/* Motor Current & Load */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-sky-600" />
                    <span>Motor Current & Load</span>
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-900">{tel.motorCurrent} A</span>
                </div>
                <div className="text-[10px] text-slate-500 mb-2">
                  Normal: {tel.normalCurrentRange} A | Load: {tel.load}%
                </div>
                <div className="space-y-2 mt-2">
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-600 mb-0.5">
                      <span>Line Utilization Load</span>
                      <span className="font-mono font-bold">{tel.load}%</span>
                    </div>
                    <div className="health-bar-container">
                      <div className="health-bar-fill bg-sky-600" style={{ width: `${tel.load}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-600 mb-0.5">
                      <span>Power Consumption</span>
                      <span className="font-mono font-bold">{tel.powerKw} kW</span>
                    </div>
                    <div className="health-bar-container">
                      <div className="health-bar-fill bg-indigo-500" style={{ width: `${Math.min(100, (tel.powerKw / 25) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Error Code History Banner */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Recent Machine Diagnostic Error Events
              </span>
              {tel.recentErrors.length > 0 ? (
                <div className="space-y-1">
                  {tel.recentErrors.map((err, idx) => (
                    <div key={idx} className="text-xs font-mono text-slate-800 flex items-center gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{err}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500">No active fault codes logged in the last 24 operating hours.</div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: COMPONENT HEALTH & RUL */}
        {activeSubTab === 'components' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 leading-snug">
              Subsystem degradation is tracked individually via acoustic resonance, current signature, and duty hours. Click any component to drill down.
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Health Score</th>
                    <th>Risk Level</th>
                    <th>Estimated RUL</th>
                    <th>Operating Hours</th>
                    <th>Last Serviced</th>
                  </tr>
                </thead>
                <tbody>
                  {m.components.map((comp, idx) => {
                    const riskBadge = comp.risk === 'Critical' ? 'badge-critical' :
                                      comp.risk === 'High' ? 'badge-warning' :
                                      comp.risk === 'Medium' ? 'badge-warning' : 'badge-healthy';

                    return (
                      <tr key={idx}>
                        <td className="font-semibold text-slate-900">{comp.name}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs">{comp.health}%</span>
                            <div className="w-16 health-bar-container">
                              <div
                                className="health-bar-fill"
                                style={{
                                  width: `${comp.health}%`,
                                  backgroundColor: comp.health > 70 ? '#16a34a' : comp.health > 45 ? '#d97706' : '#dc2626'
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${riskBadge}`}>{comp.risk}</span>
                        </td>
                        <td className="font-mono font-bold text-slate-800">{comp.rulDays} Days</td>
                        <td className="font-mono text-slate-600">{comp.hours.toLocaleString()} hrs</td>
                        <td className="text-slate-500 font-mono text-xs">{comp.lastService}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ROOT CAUSE ANALYSIS & FAILURE PREDICTION */}
        {activeSubTab === 'rootcause' && (
          <div className="space-y-4">
            
            {/* Failure Prediction Engine Card (Section 13) */}
            <div className="p-4 rounded-lg bg-slate-900 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 font-mono">
                  AI Failure Prediction Engine
                </span>
                <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[11px] font-mono px-2 py-0.5 rounded">
                  Confidence: {m.confidenceScore}%
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold">Model estimates a</span>
                <span className="text-2xl font-extrabold text-amber-400 font-mono">{m.failureRisk}% probability</span>
                <span className="text-sm text-slate-300">of functional stoppage within the next 14 days.</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {diag.confidenceRationale}
              </p>
            </div>

            {/* Root Cause Analysis (Section 14: Why is this machine failing?) */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Why is this machine at risk? (Root Cause Analysis)</span>
              </h3>

              <div className="mb-3">
                <span className="text-xs font-bold text-rose-700 block uppercase tracking-wider">Primary Root Cause:</span>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">
                  {diag.primaryCause}
                </p>
              </div>

              <div className="mb-3">
                <span className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Supporting Telemetry Evidence:</span>
                <ul className="mt-1 space-y-1 text-xs text-slate-700">
                  {diag.supportingEvidence.map((ev, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Secondary Contributing Factors:</span>
                <ul className="mt-1 space-y-1 text-xs text-slate-700">
                  {diag.secondaryFactors.map((sec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: MAINTENANCE & FAILURE HISTORY */}
        {activeSubTab === 'history' && (
          <div className="space-y-4">
            
            {/* Failure Timeline (Section 15) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Historical Failure Incidents ({machineFailures.length} recorded)
                </h4>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="enterprise-table">
                  <thead>
                    <tr>
                      <th>Issue</th>
                      <th>Detected At</th>
                      <th>Root Cause</th>
                      <th>Downtime</th>
                      <th>Action Taken</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineFailures.map((flr, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold text-slate-900">{flr.issue}</td>
                        <td className="font-mono text-xs text-slate-600">{flr.detected}</td>
                        <td className="text-xs text-slate-700">{flr.cause}</td>
                        <td className="font-mono text-xs font-bold text-rose-600">{flr.downtimeHours} hrs</td>
                        <td className="text-xs text-slate-600">{flr.action}</td>
                        <td className="font-mono text-xs text-slate-800">₹{flr.cost.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Maintenance Log (Section 16) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Preventive & Corrective Maintenance History
                </h4>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="enterprise-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Maintenance Type</th>
                      <th>Technician</th>
                      <th>Part Serviced</th>
                      <th>Cost</th>
                      <th>Downtime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineMaintenance.map((mLog, idx) => (
                      <tr key={idx}>
                        <td className="font-mono text-xs text-slate-700">{mLog.date}</td>
                        <td>
                          <span className="badge badge-neutral text-[10.5px]">{mLog.type}</span>
                        </td>
                        <td className="text-xs text-slate-800">{mLog.technician}</td>
                        <td className="font-mono text-xs text-slate-600">{mLog.part}</td>
                        <td className="font-mono text-xs text-slate-900">₹{mLog.cost.toLocaleString()}</td>
                        <td className="font-mono text-xs text-slate-600">{mLog.downtimeMinutes} min</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: LUBRICATION & REPLACE VS MAINTAIN */}
        {activeSubTab === 'lifecycle' && (
          <div className="space-y-4">
            
            {/* Lubrication Intelligence Card (Section 17) */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-sky-600" />
                  <span>Lubrication & Oiling Intelligence</span>
                </h4>
                <span className={`badge ${m.delayedLubricationCount > 0 ? 'badge-warning' : 'badge-healthy'}`}>
                  {m.delayedLubricationCount > 0 ? `Overdue by ${m.delayedLubricationCount * 2} days` : 'Optimal Schedule'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Last Serviced</span>
                  <span className="font-mono font-bold text-slate-900">{m.lastLubrication}</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Recommended Interval</span>
                  <span className="font-mono font-bold text-slate-900">Every {m.recommendedLubricationDays} days</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Delayed Oiling Events</span>
                  <span className="font-mono font-bold text-amber-700">{m.delayedLubricationCount} times</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Lubricant Grade</span>
                  <span className="font-mono text-[10.5px] text-slate-800">{m.oilType}</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-snug">
                <strong>AI Correlation Insight:</strong> Machines experiencing more than 3 delayed oiling events show a <strong className="text-rose-600">2.8× acceleration in spherical bearing vibration</strong> compared to cohorts serviced strictly within the 14-day window.
              </p>
            </div>

            {/* Replace vs Maintain Economic Evaluation (Section 35 & 36) */}
            <div className="p-4 rounded-lg bg-white border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Asset Procurement Intelligence: Replace vs. Maintain</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Original Purchase Cost</span>
                  <span className="font-mono font-bold text-slate-900">₹{m.economics.purchaseCost.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Cumulative Maintenance</span>
                  <span className="font-mono font-bold text-slate-900">₹{m.economics.cumulativeMaintenanceCost.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Annual Maintenance Run Rate</span>
                  <span className="font-mono font-bold text-amber-700">₹{m.economics.annualMaintenanceCost.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Failure Frequency</span>
                  <span className="font-mono font-bold text-slate-900">{m.economics.annualFailures} / year</span>
                </div>
              </div>

              <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                m.economics.replaceVsMaintain.includes('REPLACE') ? 'bg-amber-50 border border-amber-200 text-amber-950 font-medium' : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}>
                <span className="font-bold block mb-1">Financial Decision Advisory:</span>
                {m.economics.replaceVsMaintain}
              </div>
            </div>

          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadMachineReportCard(m)}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5 text-sky-600" />
              <span>Download Machine Report (PDF)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedMachineId(null)}
              className="btn-secondary text-xs"
            >
              Close Profile
            </button>

            <button
              onClick={() => {
                approveRecommendation(m.id);
                setSelectedMachineId(null);
              }}
              className="btn-primary text-xs bg-emerald-600 hover:bg-emerald-700 border-emerald-600 flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Approve Preventive Work Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
