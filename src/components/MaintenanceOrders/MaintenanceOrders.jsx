import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import { exportMaintenanceToCSV } from '../../utils/exportUtils';
import {
  Wrench,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Plus,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';

export function MaintenanceOrders() {
  const {
    workOrders,
    updateWorkOrderStatus,
    technicians,
    machines,
    maintenanceRecords,
    setSelectedMachineId,
    productionSchedule
  } = useFleet();

  const [viewMode, setViewMode] = useState('kanban'); // kanban / table
  const [filterStatus, setFilterStatus] = useState('All');
  const [newOrderModal, setNewOrderModal] = useState(false);

  const statuses = ['Open', 'Assigned', 'In Progress', 'Waiting for Parts', 'Resolved', 'Verified'];

  const filteredOrders = workOrders.filter(wo => {
    return filterStatus === 'All' || wo.status === filterStatus;
  });

  return (
    <div className="p-6 space-y-6">
      
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Wrench className="w-5 h-5 text-sky-600" />
              <span>Work Order Management & Maintenance Scheduling</span>
            </h1>
            <span className="badge badge-neutral text-xs font-mono">
              {workOrders.length} Total Orders
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Production-Aware Maintenance Scheduling: Human approval gate, optimal window tradeoffs, and technician skill dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Kanban / List Toggle */}
          <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded font-medium ${viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'}`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded font-medium ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'}`}
            >
              Table View
            </button>
          </div>

          <button
            onClick={() => exportMaintenanceToCSV(maintenanceRecords)}
            className="btn-secondary text-xs flex items-center gap-1.5"
            title="Export historical maintenance logs to CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Production Tradeoff Guidance Ribbon (Section 23) */}
      <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
        <Calendar className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-emerald-900 block mb-0.5">
            Production-Aware Optimization Rule Active:
          </strong>
          Orders with lower failure urgency are automatically slotted into the <strong>02:00 AM – 04:00 AM low-volume window</strong> (6,200 packages/hr) to guarantee 0 delayed customer shipments. Critical emergency orders with failure probability &gt; 70% override production priority.
        </div>
      </div>

      {/* KANBAN BOARD VIEW (Prompt Section 33) */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {statuses.map(st => {
            const columnOrders = workOrders.filter(wo => wo.status === st);

            return (
              <div key={st} className="bg-slate-100/70 rounded-xl p-3 border border-slate-200 flex flex-col min-h-[460px]">
                
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-800 tracking-tight">
                    {st}
                  </span>
                  <span className="bg-white text-slate-700 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200">
                    {columnOrders.length}
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-2.5 flex-1">
                  {columnOrders.map(wo => {
                    const isCrit = wo.priority === 'Critical';

                    return (
                      <div
                        key={wo.id}
                        className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs hover:border-sky-400 transition-all text-xs"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono font-bold text-slate-900 text-[11px]">
                            {wo.id}
                          </span>
                          <span className={`badge ${isCrit ? 'badge-critical' : 'badge-warning'} text-[9.5px]`}>
                            {wo.priority}
                          </span>
                        </div>

                        <div 
                          onClick={() => setSelectedMachineId(wo.machineId)}
                          className="font-bold text-slate-900 text-xs hover:text-sky-600 cursor-pointer"
                        >
                          {wo.machineId} • {wo.machineName}
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-snug">
                          {wo.action}
                        </p>

                        <div className="mt-2 pt-2 border-t border-slate-100 space-y-1 text-[10.5px] text-slate-500 font-mono">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="truncate">{wo.scheduledWindow}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-700 font-medium">
                            <UserCheck className="w-3 h-3 text-sky-600" />
                            <span>{wo.technicianName}</span>
                          </div>
                        </div>

                        {/* Status Change Selector (Human-in-the-Loop) */}
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">Change Status:</span>
                          <select
                            value={wo.status}
                            onChange={(e) => updateWorkOrderStatus(wo.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded text-[10.5px] text-slate-700 py-0.5 px-1 font-medium focus:outline-none cursor-pointer hover:bg-slate-100"
                          >
                            {statuses.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                      </div>
                    );
                  })}

                  {columnOrders.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs italic">
                      No orders in this stage
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="enterprise-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Machine ID</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned Technician</th>
                  <th>Scheduled Window</th>
                  <th>Estimated Downtime</th>
                  <th>Estimated Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(wo => (
                  <tr key={wo.id}>
                    <td className="font-mono font-bold text-slate-900">{wo.id}</td>
                    <td>
                      <span 
                        onClick={() => setSelectedMachineId(wo.machineId)}
                        className="font-mono text-sky-600 hover:underline cursor-pointer font-bold"
                      >
                        {wo.machineId}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${wo.priority === 'Critical' ? 'badge-critical' : 'badge-warning'}`}>
                        {wo.priority}
                      </span>
                    </td>
                    <td>
                      <select
                        value={wo.status}
                        onChange={(e) => updateWorkOrderStatus(wo.id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded text-xs py-1 px-1.5 font-medium cursor-pointer"
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="text-xs font-semibold text-slate-800">{wo.technicianName}</td>
                    <td className="text-xs font-mono text-slate-600">{wo.scheduledWindow}</td>
                    <td className="text-xs font-mono">{wo.estimatedDowntime}</td>
                    <td className="text-xs font-mono font-bold text-slate-900">{wo.estimatedCost}</td>
                    <td>
                      <button
                        onClick={() => setSelectedMachineId(wo.machineId)}
                        className="btn-secondary text-[11px] py-0.5 px-2"
                      >
                        Twin →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TECHNICIAN WORKLOAD ALLOCATOR SECTION (Prompt Section 32) */}
      <div className="enterprise-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>Technician Workload Balancing & Automated Dispatch</span>
            </h3>
            <p className="text-xs text-slate-500">
              AI recommends technician assignments matching equipment failure mode and availability.
            </p>
          </div>
          <span className="badge badge-neutral text-xs">12 Active Specialists</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {technicians.map(t => (
            <div key={t.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] font-mono">
                    {t.avatar}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block leading-tight">{t.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{t.id}</span>
                  </div>
                </div>
                <span className={`badge ${t.available ? 'badge-healthy' : 'badge-warning'} text-[9px]`}>
                  {t.available ? 'AVAILABLE' : 'DISPATCHED'}
                </span>
              </div>

              <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                <div>Skill Category: <strong className="text-slate-900">{t.skill}</strong></div>
                <div>Experience: <strong className="text-slate-800">{t.experience}</strong></div>
                <div>Avg Resolution: <strong className="text-slate-800 font-mono">{t.avgResolutionHours} hrs</strong></div>
                <div>Jobs this Month: <strong className="text-slate-800 font-mono">{t.completedMonth}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
