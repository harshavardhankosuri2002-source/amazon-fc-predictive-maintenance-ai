import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import { 
  MapPin, 
  Layers, 
  Activity, 
  Filter, 
  ZoomIn, 
  AlertTriangle, 
  CheckCircle,
  HelpCircle,
  Wrench,
  Search
} from 'lucide-react';

export function FacilityHeatmap() {
  const { 
    machines, 
    setSelectedMachineId, 
    setWhyMachineId, 
    setActionSheetMachineId 
  } = useFleet();

  const [activeZoneFilter, setActiveZoneFilter] = useState('All');
  const [activeStatusFilter, setActiveStatusFilter] = useState('All');
  const [hoveredMachine, setHoveredMachine] = useState(null);

  const zones = [
    { id: 'Zone A', name: 'Zone A: Inbound Staging & Induction', desc: 'Receiving docks, de-palletizers, decant conveyor feeds', lines: 4 },
    { id: 'Zone B', name: 'Zone B: Induction & High-Speed Merge', desc: 'Main induction lines, trunk merge conveyors (CV-1042)', lines: 6 },
    { id: 'Zone C', name: 'Zone C: Multi-Tier Pick Tower', desc: '4-tier automated picking mezzanine, robotics (ROB-221)', lines: 4 },
    { id: 'Zone D', name: 'Zone D: Sortation Matrix Deck', desc: 'High-speed cross-belt sorter loop (SORT-082)', lines: 4 },
    { id: 'Zone E', name: 'Zone E: Packaging Lines 01-12', desc: 'Case formers, auto-baggers, sealers (PACK-304)', lines: 8 },
    { id: 'Zone F', name: 'Zone F: Outbound Shipping Docks', desc: 'Diverters, spiral chutes, trailer loader arms', lines: 5 },
    { id: 'Zone G', name: 'Zone G: Autonomous AMR Grid', desc: 'Amazon Robotics drive pods, pod charging lanes', lines: 4 },
  ];

  const filteredMachines = machines.filter(m => {
    const matchZone = activeZoneFilter === 'All' || m.zone === activeZoneFilter;
    const matchStatus = activeStatusFilter === 'All' || m.status === activeStatusFilter;
    return matchZone && matchStatus;
  });

  return (
    <div className="p-6 space-y-5">
      
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-600" />
              <span>Facility Floor Heatmap & Machine Spatial Layout</span>
            </h1>
            <span className="badge badge-blue text-[10px] font-mono">1,200,000 SQ FT</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any machine node to inspect its complete Digital Twin profile, live telemetry, and AI diagnosis.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-white p-2 rounded-lg border border-slate-200">
          <span className="flex items-center gap-1.5 font-medium text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Healthy (90-100)</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Warning (55-89)</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium text-rose-700">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Critical (&lt;55)</span>
          </span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
        <span className="font-bold text-slate-600 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Zone Filter:</span>
        </span>
        <button
          onClick={() => setActiveZoneFilter('All')}
          className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
            activeZoneFilter === 'All' ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          All Facility Zones
        </button>
        {zones.map(z => (
          <button
            key={z.id}
            onClick={() => setActiveZoneFilter(z.id)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeZoneFilter === z.id ? 'bg-sky-600 text-white font-bold' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {z.id}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-1">
          <span className="text-slate-500 mr-1">Status:</span>
          {['All', 'Healthy', 'Warning', 'Critical'].map(st => (
            <button
              key={st}
              onClick={() => setActiveStatusFilter(st)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                activeStatusFilter === st ? 'bg-slate-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Facility Grid Map */}
      <div className="space-y-4">
        {zones
          .filter(z => activeZoneFilter === 'All' || z.id === activeZoneFilter)
          .map(zone => {
            const zoneMachines = filteredMachines.filter(m => m.zone === zone.id);
            const critCount = zoneMachines.filter(m => m.status === 'Critical').length;
            const warnCount = zoneMachines.filter(m => m.status === 'Warning').length;

            return (
              <div key={zone.id} className="enterprise-card p-4">
                
                {/* Zone Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {zone.id}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{zone.name}</h3>
                      <span className="text-xs text-slate-500 font-mono">
                        ({zoneMachines.length} monitored assets)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{zone.desc}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {critCount > 0 && (
                      <span className="badge badge-critical text-[10px]">
                        {critCount} Critical
                      </span>
                    )}
                    {warnCount > 0 && (
                      <span className="badge badge-warning text-[10px]">
                        {warnCount} Warning
                      </span>
                    )}
                    {critCount === 0 && warnCount === 0 && (
                      <span className="badge badge-healthy text-[10px]">
                        All Nominal
                      </span>
                    )}
                  </div>
                </div>

                {/* Machine Interactive Nodes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                  {zoneMachines.map(m => {
                    const isCrit = m.status === 'Critical';
                    const isWarn = m.status === 'Warning';
                    const nodeColor = isCrit ? 'bg-rose-50 border-rose-300 text-rose-950 hover:bg-rose-100' :
                                      isWarn ? 'bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100' :
                                      'bg-emerald-50/40 border-emerald-200 text-slate-800 hover:bg-emerald-100/60';

                    const dotColor = isCrit ? 'bg-rose-500' : isWarn ? 'bg-amber-500' : 'bg-emerald-500';

                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMachineId(m.id)}
                        onMouseEnter={() => setHoveredMachine(m)}
                        onMouseLeave={() => setHoveredMachine(null)}
                        className={`p-2 rounded-lg border cursor-pointer transition-all relative group flex flex-col justify-between ${nodeColor}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[11px] font-bold tracking-tight">
                            {m.id}
                          </span>
                          <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                        </div>

                        <div className="text-[10px] truncate text-slate-600 font-medium">
                          {m.type}
                        </div>

                        <div className="mt-1 flex items-baseline justify-between text-[10.5px]">
                          <span className="font-mono font-extrabold text-slate-900">
                            {m.healthScore}
                          </span>
                          <span className="font-mono text-[9.5px] text-slate-500">
                            {m.currentTelemetry.vibration}mm/s
                          </span>
                        </div>

                        {/* Interactive Tooltip Card on Hover */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50 w-60 p-3 bg-slate-900 text-white rounded-lg shadow-xl text-xs pointer-events-none">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sky-400 font-mono">{m.id}</span>
                            <span className="badge badge-neutral text-[9px] font-mono">{m.status}</span>
                          </div>
                          <div className="font-semibold text-slate-100 truncate">{m.name}</div>
                          <div className="text-[10px] text-slate-400 mb-2">{m.location}</div>
                          <div className="grid grid-cols-2 gap-1 text-[10.5px] font-mono border-t border-slate-700 pt-1.5 mb-1.5">
                            <div>Health: <strong className="text-white">{m.healthScore}/100</strong></div>
                            <div>Failure Risk: <strong className="text-amber-400">{m.failureRisk}%</strong></div>
                            <div>Vibration: <strong className="text-sky-300">{m.currentTelemetry.vibration} mm/s</strong></div>
                            <div>Temp: <strong className="text-sky-300">{m.currentTelemetry.temperature}°C</strong></div>
                          </div>
                          <div className="text-[9.5px] text-slate-300 italic">
                            Click node to open Digital Twin
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
      </div>

    </div>
  );
}
