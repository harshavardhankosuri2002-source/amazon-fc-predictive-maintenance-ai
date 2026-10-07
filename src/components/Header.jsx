import React from 'react';
import { useFleet } from '../context/FleetContext';
import { downloadFacilityMaintenanceReport } from '../utils/pdfGenerator';
import { exportFleetToCSV } from '../utils/exportUtils';
import { 
  Activity, 
  Play, 
  Pause, 
  PlayCircle, 
  FileDown, 
  FileSpreadsheet, 
  Search, 
  Flame, 
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  Warehouse
} from 'lucide-react';

export function Header() {
  const { 
    facilityInfo, 
    isSimulating, 
    setIsSimulating, 
    simulationSpeed, 
    setSimulationSpeed, 
    lastUpdatedTime, 
    searchQuery, 
    setSearchQuery, 
    triggerScenario, 
    activeScenario, 
    startGuidedDemo,
    guidedDemoStep,
    machines,
    kpis,
    setActiveTab
  } = useFleet();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-5 py-2.5">
      <div className="flex items-center justify-between gap-4">
        
        {/* Brand & Facility Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-sky-400 font-bold shadow-sm">
            <Warehouse className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-[15px]">PredictiveOps AI</span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-slate-200 font-mono">
                {facilityInfo.facilityId}
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
                • {facilityInfo.facilityName}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span>Predict the failure. Prevent the downtime.</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-mono">{facilityInfo.activeShift}</span>
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search machine ID (e.g. CV-1042), component, issue, technician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Simulation, Guided Demo & Quick Action Bar */}
        <div className="flex items-center gap-2.5">
          
          {/* Guided Demo Button */}
          <button
            onClick={startGuidedDemo}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
              guidedDemoStep > 0 
                ? 'bg-amber-500 text-white hover:bg-amber-600 ring-2 ring-amber-300' 
                : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white hover:opacity-95'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            <span>{guidedDemoStep > 0 ? `Demo Step ${guidedDemoStep}/16` : 'Run Guided Demo'}</span>
          </button>

          {/* Quick Scenario Selector */}
          <div className="relative hidden xl:block">
            <select
              value={activeScenario}
              onChange={(e) => triggerScenario(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 py-1.5 pl-2.5 pr-7 font-medium focus:outline-none cursor-pointer hover:bg-slate-100"
            >
              <option value="normal">Scenario: Normal Baseline</option>
              <option value="bearing_degradation">⚠️ Scenario 1: Bearing Degradation (CV-1042)</option>
              <option value="lubrication_failure">🚨 Scenario 2: Lubrication Failure (SORT-082)</option>
              <option value="motor_overload">⚡ Scenario 3: Motor Overload (PACK-304)</option>
              <option value="reset_normal">↺ Reset All Scenarios</option>
            </select>
          </div>

          {/* Live Stream Telemetry Indicator & Ticker */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className={isSimulating ? "pulse-dot" : "w-2 h-2 rounded-full bg-slate-400"}></span>
              <span className="font-semibold text-slate-700 font-mono text-[11px]">
                {isSimulating ? 'LIVE DATA' : 'PAUSED'}
              </span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-[10.5px] text-slate-500 hidden sm:inline">
              {lastUpdatedTime}
            </span>

            {/* Play/Pause Toggle */}
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              title={isSimulating ? "Pause Simulation" : "Resume Simulation"}
              className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200 transition-colors"
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Speed Toggle */}
            <button
              onClick={() => setSimulationSpeed(speed => speed === 1 ? 2 : speed === 2 ? 5 : 1)}
              className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-1 rounded hover:bg-sky-100 border border-sky-200"
              title="Simulation speed multiplier"
            >
              {simulationSpeed}x
            </button>
          </div>

          {/* Facility Report Download (PDF & CSV) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => downloadFacilityMaintenanceReport(machines, kpis, [])}
              title="Download Full Facility Maintenance Report (PDF)"
              className="btn-secondary text-xs px-2.5 py-1.5 flex items-center gap-1 hover:bg-slate-100"
            >
              <FileDown className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Report PDF</span>
            </button>

            <button
              onClick={() => exportFleetToCSV(machines)}
              title="Export Complete Fleet Telemetry to CSV"
              className="btn-secondary text-xs px-2 py-1.5 hover:bg-slate-100"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
