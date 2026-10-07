import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import { exportFleetToCSV } from '../../utils/exportUtils';
import {
  Cpu,
  Search,
  Filter,
  ArrowUpDown,
  FileSpreadsheet,
  HelpCircle,
  Wrench,
  Activity,
  Layers,
  CheckCircle,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export function MachineHealth() {
  const {
    filteredMachines,
    setSelectedMachineId,
    setWhyMachineId,
    setActionSheetMachineId,
    searchQuery,
    setSearchQuery,
    selectedZone,
    setSelectedZone,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedWearClass,
    setSelectedWearClass,
    machines
  } = useFleet();

  const [sortField, setSortField] = useState('healthScore');
  const [sortDirection, setSortDirection] = useState('asc'); // asc / desc
  const [viewMode, setViewMode] = useState('table'); // table / grid

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedMachines = [...filteredMachines].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'vibration') {
      aVal = a.currentTelemetry.vibration;
      bVal = b.currentTelemetry.vibration;
    }

    if (typeof aVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return (
    <div className="p-6 space-y-5">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-600" />
              <span>Machine Health Fleet Directory</span>
            </h1>
            <span className="badge badge-neutral text-xs font-mono">
              {sortedMachines.length} of {machines.length} Machines
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time health index, failure probability, and remaining useful life for all automated fulfillment equipment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center text-xs">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded font-medium ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'}`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded font-medium ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'}`}
            >
              Grid View
            </button>
          </div>

          <button
            onClick={() => exportFleetToCSV(machines)}
            className="btn-secondary text-xs flex items-center gap-1.5"
            title="Export filtered fleet to CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Multi-Parameter Filtering Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
          
          {/* Search */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Search Equipment
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="ID, type, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded pl-8 pr-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Zone Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Fulfillment Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              <option value="All">All Facility Zones</option>
              <option value="Zone A">Zone A: Inbound Staging</option>
              <option value="Zone B">Zone B: Induction Lines</option>
              <option value="Zone C">Zone C: Pick Tower</option>
              <option value="Zone D">Zone D: Sortation Deck</option>
              <option value="Zone E">Zone E: Packing Lines</option>
              <option value="Zone F">Zone F: Outbound Docks</option>
              <option value="Zone G">Zone G: AMR Floor Grid</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Asset Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Material Handling">Material Handling</option>
              <option value="Robotics">Robotics & AMRs</option>
              <option value="Packaging">Packaging Systems</option>
              <option value="Supporting Equipment">Supporting Equipment</option>
            </select>
          </div>

          {/* Health Status */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Health Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Healthy">Healthy (Nominal)</option>
              <option value="Warning">Warning State</option>
              <option value="Critical">Critical Priority</option>
            </select>
          </div>

          {/* Wear Classification */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Wear Classification
            </label>
            <select
              value={selectedWearClass}
              onChange={(e) => setSelectedWearClass(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              <option value="All">All Wear Classes</option>
              <option value="Low Wear">Low Wear</option>
              <option value="Moderate Wear">Moderate Wear</option>
              <option value="High Wear">High Wear</option>
              <option value="Chronic Failure">Chronic Failure</option>
              <option value="Critical Asset">Critical Asset</option>
            </select>
          </div>

        </div>
      </div>

      {/* TABLE VIEW (Prompt Section 7: Machine ID, Type, Health, Failure Risk, RUL, Status) */}
      {viewMode === 'table' && (
        <div className="enterprise-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')} className="cursor-pointer hover:text-slate-900">
                    <div className="flex items-center gap-1">
                      <span>Machine ID</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th>Type & Model</th>
                  <th>Location</th>
                  <th onClick={() => handleSort('healthScore')} className="cursor-pointer hover:text-slate-900">
                    <div className="flex items-center gap-1">
                      <span>Health Score</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('failureRisk')} className="cursor-pointer hover:text-slate-900">
                    <div className="flex items-center gap-1">
                      <span>Failure Risk</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('rulDays')} className="cursor-pointer hover:text-slate-900">
                    <div className="flex items-center gap-1">
                      <span>Est. RUL</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th>Vibration / Temp</th>
                  <th onClick={() => handleSort('operatingHours')} className="cursor-pointer hover:text-slate-900">
                    <div className="flex items-center gap-1">
                      <span>Run Hours</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedMachines.map((m) => {
                  const statusBadge = m.status === 'Critical' ? 'badge-critical' :
                                      m.status === 'Warning' ? 'badge-warning' : 'badge-healthy';

                  return (
                    <tr 
                      key={m.id}
                      onClick={() => setSelectedMachineId(m.id)}
                      className="group"
                    >
                      <td className="font-mono font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {m.id}
                      </td>
                      <td>
                        <div className="font-semibold text-slate-900">{m.type}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{m.model} • {m.manufacturer}</div>
                      </td>
                      <td className="text-slate-600 text-xs">
                        {m.location}
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-xs">{m.healthScore}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setWhyMachineId(m.id);
                            }}
                            className="text-[10px] text-sky-600 hover:text-sky-800 p-0.5"
                            title="Why?"
                          >
                            <HelpCircle className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="w-16 health-bar-container">
                          <div
                            className="health-bar-fill"
                            style={{
                              width: `${m.healthScore}%`,
                              backgroundColor: m.healthScore > 75 ? '#16a34a' : m.healthScore > 50 ? '#d97706' : '#dc2626'
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <span className={`font-mono font-bold text-xs ${m.failureRisk > 50 ? 'text-rose-600' : m.failureRisk > 20 ? 'text-amber-600' : 'text-slate-700'}`}>
                          {m.failureRisk}%
                        </span>
                      </td>
                      <td className="font-mono text-xs font-semibold text-slate-800">
                        {m.rulDays} days
                      </td>
                      <td>
                        <div className="text-[11px] font-mono text-slate-800">
                          {m.currentTelemetry.vibration} mm/s
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {m.currentTelemetry.temperature}°C
                        </div>
                      </td>
                      <td className="font-mono text-xs text-slate-600">
                        {m.operatingHours.toLocaleString()} hrs
                      </td>
                      <td>
                        <span className={`badge ${statusBadge}`}>
                          {m.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setActionSheetMachineId(m.id)}
                            className="btn-secondary text-[10.5px] py-0.5 px-2 text-emerald-700 bg-emerald-50 border-emerald-300 hover:bg-emerald-100"
                            title="What Should I Do?"
                          >
                            Action
                          </button>
                          <button
                            onClick={() => setSelectedMachineId(m.id)}
                            className="btn-secondary text-[10.5px] py-0.5 px-2 hover:bg-slate-100"
                          >
                            Twin →
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {sortedMachines.map((m) => {
            const isCrit = m.status === 'Critical';
            const isWarn = m.status === 'Warning';
            const cardBorder = isCrit ? 'border-rose-300' : isWarn ? 'border-amber-300' : 'border-slate-200';

            return (
              <div
                key={m.id}
                onClick={() => setSelectedMachineId(m.id)}
                className={`enterprise-card p-4 cursor-pointer hover:border-sky-500 transition-all ${cardBorder}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    {m.id}
                  </span>
                  <span className={`badge ${isCrit ? 'badge-critical' : isWarn ? 'badge-warning' : 'badge-healthy'}`}>
                    {m.status.toUpperCase()}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 truncate">{m.name}</h4>
                <div className="text-[10.5px] text-slate-500 mt-0.5">{m.location}</div>

                <div className="grid grid-cols-2 gap-2 my-3 p-2 bg-slate-50 rounded border border-slate-200 text-xs font-mono">
                  <div>
                    <span className="text-[9.5px] text-slate-400 block">HEALTH</span>
                    <strong className="text-slate-900 text-sm">{m.healthScore} / 100</strong>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-slate-400 block">FAILURE RISK</span>
                    <strong className={m.failureRisk > 40 ? 'text-rose-600 text-sm' : 'text-slate-800 text-sm'}>
                      {m.failureRisk}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-slate-400 block">RUL</span>
                    <strong className="text-sky-700">{m.rulDays} days</strong>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-slate-400 block">VIBRATION</span>
                    <strong className="text-slate-800">{m.currentTelemetry.vibration} mm/s</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWhyMachineId(m.id);
                    }}
                    className="text-sky-600 hover:underline text-[11px] font-bold flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Why?</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionSheetMachineId(m.id);
                    }}
                    className="text-emerald-700 hover:underline text-[11px] font-bold flex items-center gap-1"
                  >
                    <Wrench className="w-3 h-3" />
                    <span>What Should I Do?</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
