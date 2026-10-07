// CSV and Data Export Utilities for Fleet Data

export function exportFleetToCSV(machines) {
  const headers = [
    'Machine ID',
    'Machine Name',
    'Category',
    'Type',
    'Model',
    'Manufacturer',
    'Location',
    'Status',
    'Health Score',
    'Failure Risk (%)',
    'RUL (Days)',
    'Operating Hours',
    'Age (Years)',
    'Vibration (mm/s)',
    'Temperature (°C)',
    'Motor Current (A)',
    'Last Maintenance',
    'Next Maintenance',
    'Lubrication Status',
    'Criticality',
    'Primary Root Cause',
    'Recommended Action'
  ];

  const rows = machines.map(m => [
    m.id,
    `"${m.name}"`,
    `"${m.category}"`,
    `"${m.type}"`,
    m.model,
    `"${m.manufacturer}"`,
    `"${m.location}"`,
    m.status,
    m.healthScore,
    m.failureRisk,
    m.rulDays,
    m.operatingHours,
    m.ageYears,
    m.currentTelemetry.vibration,
    m.currentTelemetry.temperature,
    m.currentTelemetry.motorCurrent,
    m.lastMaintenance,
    m.nextMaintenance,
    m.delayedLubricationCount > 0 ? `Delayed ${m.delayedLubricationCount}x` : 'Up to Date',
    m.criticality,
    `"${m.aiDiagnosis.primaryCause.replace(/"/g, '""')}"`,
    `"${m.aiDiagnosis.recommendedAction.replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Amazon_FC_Fleet_Machines_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportMaintenanceToCSV(records) {
  const headers = ['Record ID', 'Machine ID', 'Machine Name', 'Maintenance Type', 'Date', 'Technician', 'Part Replaced', 'Cost (INR)', 'Downtime (min)', 'Notes'];
  const rows = records.map(r => [
    r.id,
    r.machineId,
    `"${r.machineName}"`,
    `"${r.type}"`,
    r.date,
    `"${r.technician}"`,
    `"${r.part}"`,
    r.cost,
    r.downtimeMinutes,
    `"${r.notes.replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Amazon_FC_Maintenance_History_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportFailuresToCSV(failures) {
  const headers = ['Failure ID', 'Machine ID', 'Machine Name', 'Issue', 'Detected At', 'Root Cause', 'Downtime (hrs)', 'Resolved At', 'Part Replaced', 'Cost (INR)', 'Technician Assigned'];
  const rows = failures.map(f => [
    f.id,
    f.machineId,
    `"${f.machineName}"`,
    `"${f.issue}"`,
    f.detected,
    `"${f.cause}"`,
    f.downtimeHours,
    f.resolved,
    `"${f.partReplaced}"`,
    f.cost,
    `"${f.technician}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Amazon_FC_Failure_History_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
