import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import {
  TrendingDown,
  Layers,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles
} from 'lucide-react';

export function FailureAnalytics() {
  const { machineModels, machines, failureRecords } = useFleet();

  const [activeTab, setActiveTab] = useState('wear');

  // Wear categories aggregation
  const wearCounts = {
    'Low Wear': machines.filter(m => m.wearClass === 'Low Wear').length,
    'Moderate Wear': machines.filter(m => m.wearClass === 'Moderate Wear').length,
    'High Wear': machines.filter(m => m.wearClass === 'High Wear').length,
    'Chronic Failure': machines.filter(m => m.wearClass === 'Chronic Failure').length,
    'Critical Asset': machines.filter(m => m.wearClass === 'Critical Asset').length,
  };

  // Top failing parts data (Prompt Section 20)
  const partFailureData = [
    { part: 'Spherical Roller Bearings', count: 142, avgLifespanMonths: 14, avgCost: 4850, avgDowntime: '2.8 hrs', primaryCause: 'Lubricant starvation, raceway spalling, vibration harmonic fatigue' },
    { part: 'Modular Conveyor Belts', count: 98, avgLifespanMonths: 22, avgCost: 28400, avgDowntime: '1.4 hrs', primaryCause: 'Splice hinge fatigue, package friction wear, thermal stretching' },
    { part: 'Drive Induction Motors (5.5kW)', count: 64, avgLifespanMonths: 36, avgCost: 38500, avgDowntime: '3.1 hrs', primaryCause: 'Winding thermal degradation, dust buildup, phase imbalance' },
    { part: 'Helical Planetary Gearboxes', count: 48, avgLifespanMonths: 28, avgCost: 72000, avgDowntime: '4.2 hrs', primaryCause: 'Tooth pitch micro-pitting, seal breakdown, synthetic oil breakdown' },
    { part: 'Roller Drive Chains & Sprockets', count: 42, avgLifespanMonths: 18, avgCost: 6200, avgDowntime: '1.2 hrs', primaryCause: 'Elongation pitch wear, lubrication starvation, sprocket misalignment' },
    { part: 'Photoelectric Proximity Sensors', count: 39, avgLifespanMonths: 30, avgCost: 1450, avgDowntime: '0.4 hrs', primaryCause: 'Mechanical vibration misalignment, lens cardboard dust occlusion' },
    { part: 'Interroll Motorized Rollers', count: 31, avgLifespanMonths: 26, avgCost: 5800, avgDowntime: '0.9 hrs', primaryCause: 'Internal planetary gearhead fatigue, dynamic conveyor jamming' },
  ];

  return (
    <div className="p-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-rose-600" />
              <span>Failure Analytics & Equipment Wear Intelligence</span>
            </h1>
            <span className="badge badge-neutral text-xs font-mono">
              500+ Historical Failure Logs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statistical failure models, machine model benchmarking, and wear classification across fulfillment center assets.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
          {[
            { id: 'wear', label: 'Wear Classification' },
            { id: 'models', label: 'Model Benchmarking' },
            { id: 'parts', label: 'Part Failure Analytics' },
            { id: 'rul', label: 'Component RUL' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded font-medium transition-all ${
                activeTab === tab.id ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: MACHINE WEAR CLASSIFICATION (Section 18) */}
      {activeTab === 'wear' && (
        <div className="space-y-5">
          
          {/* Wear Category Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="kpi-card bg-emerald-50/50 border-emerald-200">
              <div className="kpi-title text-emerald-800">Low Wear</div>
              <div className="kpi-value text-emerald-700 text-2xl font-bold">{wearCounts['Low Wear']}</div>
              <div className="kpi-sub text-emerald-900 text-[10px]">Normal degradation</div>
            </div>

            <div className="kpi-card bg-sky-50/50 border-sky-200">
              <div className="kpi-title text-sky-800">Moderate Wear</div>
              <div className="kpi-value text-sky-700 text-2xl font-bold">{wearCounts['Moderate Wear']}</div>
              <div className="kpi-sub text-sky-900 text-[10px]">Increasing PM need</div>
            </div>

            <div className="kpi-card bg-amber-50/50 border-amber-200">
              <div className="kpi-title text-amber-800">High Wear</div>
              <div className="kpi-value text-amber-700 text-2xl font-bold">{wearCounts['High Wear']}</div>
              <div className="kpi-sub text-amber-900 text-[10px]">Frequent degradation</div>
            </div>

            <div className="kpi-card bg-rose-50/50 border-rose-200">
              <div className="kpi-title text-rose-800">Chronic Failure</div>
              <div className="kpi-value text-rose-700 text-2xl font-bold">{wearCounts['Chronic Failure']}</div>
              <div className="kpi-sub text-rose-900 text-[10px]">Repeated failures (SORT-082)</div>
            </div>

            <div className="kpi-card bg-purple-50/50 border-purple-200">
              <div className="kpi-title text-purple-800">Critical Asset</div>
              <div className="kpi-value text-purple-700 text-2xl font-bold">{wearCounts['Critical Asset']}</div>
              <div className="kpi-sub text-purple-900 text-[10px]">Zero backup redundancy</div>
            </div>
          </div>

          {/* Machine Wear vs Failure Frequency Quadrant (Section 18) */}
          <div className="enterprise-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Machine Wear vs. Failure Frequency Quadrant Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Plots asset operational wear against recurring historical failure frequency to isolate chronic candidates.
                </p>
              </div>
              <span className="badge badge-neutral text-xs">Section 18 Matrix</span>
            </div>

            {/* Quadrant Visual Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              
              {/* Quadrant II: High Failure, Low Age (Chronic Infant Mortality) */}
              <div className="p-4 rounded-lg bg-white border border-amber-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                  <span>QUADRANT II: Frequent Failure / High Wear</span>
                  <span className="badge badge-warning text-[10px]">Root Cause Investigation</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-3">
                  Machines experiencing repeated trips despite recent service. Indicates installation misalignment or lubrication failure.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="badge badge-warning font-mono">CV-1042</span>
                  <span className="badge badge-warning font-mono">ROB-221</span>
                  <span className="badge badge-warning font-mono">PACK-304</span>
                  <span className="badge badge-neutral font-mono">+18 machines</span>
                </div>
              </div>

              {/* Quadrant I: Chronic Terminal Failure (Replace vs Maintain) */}
              <div className="p-4 rounded-lg bg-white border border-rose-300 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-rose-800 mb-1">
                  <span>QUADRANT I: Chronic Failure / Aging Asset</span>
                  <span className="badge badge-critical text-[10px]">Replace Recommended</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-3">
                  High failure frequency + cumulative maintenance cost exceeds economic benefit. Prime candidate for capital replacement.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="badge badge-critical font-mono">SORT-082 (11 flr/yr, ₹4.8L/yr)</span>
                  <span className="badge badge-critical font-mono">CV-1016</span>
                  <span className="badge badge-neutral font-mono">+8 machines</span>
                </div>
              </div>

              {/* Quadrant III: Low Failure, Low Wear (Nominal Operations) */}
              <div className="p-4 rounded-lg bg-white border border-emerald-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
                  <span>QUADRANT III: Low Wear / Low Failure Rate</span>
                  <span className="badge badge-healthy text-[10px]">Optimal Health</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-3">
                  Assets adhering to baseline operating parameters. Standard scheduled maintenance interval applies.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="badge badge-healthy font-mono">COMP-019</span>
                  <span className="badge badge-healthy font-mono">238 Assets (74.3%)</span>
                </div>
              </div>

              {/* Quadrant IV: Moderate Wear / High Criticality */}
              <div className="p-4 rounded-lg bg-white border border-sky-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-sky-800 mb-1">
                  <span>QUADRANT IV: High Criticality / Protected Asset</span>
                  <span className="badge badge-blue text-[10px]">Priority Telemetry Watch</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-3">
                  Main trunk induction and sortation cross-belts. Low failure tolerance due to fulfillment throughput impact.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="badge badge-blue font-mono">SORT-MAX4 Fleet</span>
                  <span className="badge badge-blue font-mono">AMR Pod Hubs</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MACHINE MODEL COMPARISON (Section 19) */}
      {activeTab === 'models' && (
        <div className="space-y-4">
          
          {/* AI Insight Box from Prompt */}
          <div className="p-4 rounded-lg bg-sky-50 border border-sky-200 text-sky-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="font-bold text-sky-900 block mb-1">
                AI Cross-Fleet Model Reliability Insight (Section 19):
              </strong>
              <p className="leading-relaxed">
                Model <strong>CONV-X2</strong> has <strong className="text-rose-700">2.5× the failure rate of CONV-X1</strong> (7.9% vs 3.2%) and significantly higher average maintenance costs (₹14,600 vs ₹8,200). Predictive degradation models indicate gearhead housing vibration harmonics resonate at 42Hz under peak load. Operations planning should prioritize CONV-X2 for quarterly structural reinforcement.
              </p>
            </div>
          </div>

          {/* Model Comparison Table */}
          <div className="enterprise-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Category</th>
                    <th>Manufacturer</th>
                    <th>Active Fleet Count</th>
                    <th>Failure Rate (%)</th>
                    <th>Avg Downtime / Incident</th>
                    <th>Avg Maintenance Cost</th>
                    <th>Reliability Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {machineModels.map((m, idx) => (
                    <tr key={idx}>
                      <td className="font-mono font-bold text-slate-900">{m.model}</td>
                      <td>{m.category}</td>
                      <td className="text-slate-600">{m.manufacturer}</td>
                      <td className="font-mono font-bold">{m.count}</td>
                      <td>
                        <span className={`font-mono font-bold ${
                          parseFloat(m.failureRate) > 5 ? 'text-rose-600' : 'text-emerald-700'
                        }`}>
                          {m.failureRate}
                        </span>
                      </td>
                      <td className="font-mono text-slate-700">{m.avgDowntime}</td>
                      <td className="font-mono text-slate-900 font-bold">₹{m.avgCost.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${
                          m.rating.includes('Frequent') ? 'badge-warning' : 'badge-healthy'
                        }`}>
                          {m.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: PART FAILURE ANALYTICS (Section 20) */}
      {activeTab === 'parts' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Historical consumption and breakdown analysis across 500+ past failure logs. Pinpoints components that cause the largest downtime and cost exposure.
          </p>

          <div className="enterprise-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th>Frequently Replaced Component</th>
                    <th>Historical Replacements</th>
                    <th>Avg Lifespan</th>
                    <th>Unit Cost</th>
                    <th>Avg Downtime</th>
                    <th>Primary Failure Root Causes</th>
                  </tr>
                </thead>
                <tbody>
                  {partFailureData.map((p, idx) => (
                    <tr key={idx}>
                      <td className="font-bold text-slate-900">{p.part}</td>
                      <td className="font-mono font-bold text-slate-800">{p.count} events</td>
                      <td className="font-mono text-slate-600">{p.avgLifespanMonths} months</td>
                      <td className="font-mono text-slate-900 font-bold">₹{p.avgCost.toLocaleString()}</td>
                      <td className="font-mono text-rose-600 font-bold">{p.avgDowntime}</td>
                      <td className="text-xs text-slate-600 max-w-md">{p.primaryCause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPONENT REMAINING USEFUL LIFE (Section 21) */}
      {activeTab === 'rul' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Component Remaining Useful Life (RUL) Confidence Intervals
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Bearing RUL */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Spherical Roller Bearing</span>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">18 Days</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Est. Range: 18–26 days</div>
                <div className="health-bar-container mt-2">
                  <div className="health-bar-fill bg-rose-500" style={{ width: '25%' }} />
                </div>
                <span className="text-[10px] text-rose-600 font-bold block mt-1">Critical RUL</span>
              </div>

              {/* Conveyor Belt RUL */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Modular Conveyor Belt</span>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">31 Days</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Est. Range: 28–38 days</div>
                <div className="health-bar-container mt-2">
                  <div className="health-bar-fill bg-amber-500" style={{ width: '42%' }} />
                </div>
                <span className="text-[10px] text-amber-700 font-bold block mt-1">Warning Window</span>
              </div>

              {/* Gearbox RUL */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Planetary Gearbox</span>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">74 Days</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Est. Range: 68–85 days</div>
                <div className="health-bar-container mt-2">
                  <div className="health-bar-fill bg-sky-500" style={{ width: '65%' }} />
                </div>
                <span className="text-[10px] text-sky-700 font-bold block mt-1">Moderate Health</span>
              </div>

              {/* Motor RUL */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Electric Induction Motor</span>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">142 Days</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Est. Range: 130–160 days</div>
                <div className="health-bar-container mt-2">
                  <div className="health-bar-fill bg-emerald-500" style={{ width: '85%' }} />
                </div>
                <span className="text-[10px] text-emerald-700 font-bold block mt-1">Nominal Health</span>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
