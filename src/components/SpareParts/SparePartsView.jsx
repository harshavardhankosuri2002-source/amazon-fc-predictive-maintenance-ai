import React from 'react';
import { useFleet } from '../../context/FleetContext';
import {
  Package,
  AlertTriangle,
  Clock,
  CheckCircle,
  Truck,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function SparePartsView() {
  const { spareParts } = useFleet();

  const criticalShortages = spareParts.filter(p => p.status === 'Critical Shortage' || p.status === 'Reorder Urgently');

  return (
    <div className="p-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Package className="w-5 h-5 text-sky-600" />
              <span>Predictive Spare Part Consumption & Inventory Intelligence</span>
            </h1>
            <span className="badge badge-warning text-xs font-mono">
              {criticalShortages.length} Parts Below Reorder Point
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            ML inventory forecasting based on component RUL degradation curves, machine run hours, and vendor lead times.
          </p>
        </div>
      </div>

      {/* AI Demand Prediction Callout (Prompt Section 34) */}
      <div className="p-4 rounded-lg bg-sky-50 border border-sky-200 text-sky-950 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="font-bold text-sky-900 block mb-1">
            30-Day Automated Demand Forecast (Prompt Section 34):
          </strong>
          Based on current machine health degradation, vibration telemetry, and historical cohort failure rates, <strong>approximately 17 Spherical Roller Bearings (SKF 22215 EK)</strong> and <strong>22 drums of Mobil SHC 630 Synthetic Gear Oil</strong> are forecasted to be consumed over the next 30 days across BLR-04. Automated PO draft has been prepared.
        </div>
      </div>

      {/* Spare Parts Inventory Table */}
      <div className="enterprise-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Part ID</th>
                <th>Spare Part Description</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>30-Day Predicted Demand</th>
                <th>Lead Time</th>
                <th>Unit Cost</th>
                <th>Reorder Threshold</th>
                <th>Supplier</th>
                <th>Inventory Status</th>
              </tr>
            </thead>
            <tbody>
              {spareParts.map((part) => {
                const isShortage = part.status === 'Critical Shortage';
                const isReorder = part.status === 'Reorder Urgently';

                return (
                  <tr key={part.id}>
                    <td className="font-mono font-bold text-slate-900">{part.id}</td>
                    <td className="font-semibold text-slate-900">{part.name}</td>
                    <td className="text-slate-600 text-xs">{part.category}</td>
                    <td>
                      <span className={`font-mono font-bold text-xs ${
                        part.currentStock < part.reorderPoint ? 'text-rose-600' : 'text-slate-900'
                      }`}>
                        {part.currentStock} units
                      </span>
                    </td>
                    <td className="font-mono text-xs font-bold text-sky-700">
                      {part.predicted30dDemand} units
                    </td>
                    <td className="font-mono text-xs text-slate-600">{part.leadTimeDays} days</td>
                    <td className="font-mono text-xs font-bold text-slate-900">₹{part.unitCost.toLocaleString()}</td>
                    <td className="font-mono text-xs text-slate-600">{part.reorderPoint} units</td>
                    <td className="text-xs text-slate-600">{part.supplier}</td>
                    <td>
                      <span className={`badge ${
                        isShortage ? 'badge-critical' : isReorder ? 'badge-warning' : 'badge-healthy'
                      }`}>
                        {part.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
