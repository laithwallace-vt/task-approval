import React, { useState } from 'react';
import { 
  X, CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp, 
  MessageSquare, Building2, Calendar, TrendingUp, TrendingDown,
  Shield, Users, FileText, BarChart3, Zap, Eye, EyeOff,
  ArrowRight, Info, Sparkles, AlertCircle, DollarSign,
  Layers, Clock, RefreshCw
} from 'lucide-react';

// ─── Widget Definitions ───────────────────────────────────────────
// Each widget has a Hero state (content area) and Reference state (details panel)

const BudgetVarianceWidget = ({ mode = 'hero', data }) => {
  const { committed, thisRequest, totalBudget, label } = data;
  const total = committed + thisRequest;
  const isOver = total > totalBudget;
  const percentage = Math.round((total / totalBudget) * 100);
  const remaining = totalBudget - total;

  if (mode === 'reference') {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>Budget</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>
            £{(total / 1000).toFixed(0)}K / £{(totalBudget / 1000).toFixed(0)}K
          </span>
          {isOver ? (
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#FEE2E2', color: '#DC2626' }}>
              {percentage}%
            </span>
          ) : (
            <span className="text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5" style={{ background: '#F0FDF4', color: '#16A34A' }}>
              <CheckCircle2 size={10} /> Under
            </span>
          )}
        </div>
      </div>
    );
  }

  // Hero mode
  return (
    <div style={{ 
      border: `1px solid ${isOver ? '#FECACA' : '#E5E7EB'}`,
      borderRadius: '8px',
      padding: '16px',
      background: isOver ? '#FFF7F7' : '#FFFFFF'
    }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
        <div className="flex items-center gap-2">
          <BarChart3 size={14} style={{ color: 'rgba(0,0,0,0.4)' }} />
          <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
          </span>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ 
          background: isOver ? '#FEE2E2' : '#F0FDF4',
          color: isOver ? '#DC2626' : '#16A34A'
        }}>
          {percentage}%
        </span>
      </div>
      
      {/* Stacked bar */}
      <div style={{ 
        height: '8px', 
        background: '#F3F4F6', 
        borderRadius: '4px',
        overflow: 'visible',
        position: 'relative',
        marginBottom: '8px'
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '8px',
          width: `${Math.min((committed / totalBudget) * 100, 100)}%`,
          background: '#94A3B8',
          borderRadius: '4px 0 0 4px',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          left: `${Math.min((committed / totalBudget) * 100, 100)}%`,
          top: 0,
          height: '8px',
          width: `${Math.min((thisRequest / totalBudget) * 100, 50)}%`,
          background: isOver ? '#EF4444' : '#3B82F6',
          borderRadius: isOver ? '0' : '0 4px 4px 0',
          zIndex: 2
        }} />
        {isOver && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: '-2px',
            height: '12px',
            width: '2px',
            background: '#DC2626',
            borderRadius: '1px',
            zIndex: 3
          }} />
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#94A3B8' }} />
            <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>
              Committed £{(committed / 1000).toFixed(0)}K
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: isOver ? '#EF4444' : '#3B82F6' }} />
            <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>
              This request £{(thisRequest / 1000).toFixed(0)}K
            </span>
          </div>
        </div>
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>
          Budget £{(totalBudget / 1000).toFixed(0)}K
        </span>
      </div>
      
      {isOver && (
        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #FECACA' }}>
          <AlertTriangle size={14} style={{ color: '#DC2626' }} />
          <span className="text-xs font-medium" style={{ color: '#DC2626' }}>
            Over budget by £{(Math.abs(remaining) / 1000).toFixed(1)}K — requires CFO approval
          </span>
        </div>
      )}
    </div>
  );
};

const PriceBenchmarkWidget = ({ mode = 'hero', data }) => {
  const { yourPrice, marketMedian, vendorName, percentile } = data;
  const delta = yourPrice - marketMedian;
  const deltaPercent = Math.round((delta / marketMedian) * 100);
  const isAbove = delta > 0;

  if (mode === 'reference') {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>Market benchmark</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium" style={{ color: isAbove ? '#DC2626' : '#16A34A' }}>
            {isAbove ? `${deltaPercent}% above` : `${Math.abs(deltaPercent)}% below`}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #E0E7FF',
      borderRadius: '8px',
      padding: '16px',
      background: '#FAFBFF'
    }}>
      <div className="flex items-center gap-2" style={{ marginBottom: '12px' }}>
        <Sparkles size={14} style={{ color: '#6366F1' }} />
        <span className="text-xs font-medium" style={{ color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Vertice Price Intelligence
        </span>
      </div>
      
      <div className="flex items-center gap-4" style={{ marginBottom: '12px' }}>
        <div>
          <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Your price</div>
          <div className="text-lg font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>
            £{yourPrice.toLocaleString()}
          </div>
        </div>
        <div style={{ color: 'rgba(0,0,0,0.2)' }}>
          <ArrowRight size={16} />
        </div>
        <div>
          <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Market median</div>
          <div className="text-lg font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>
            £{marketMedian.toLocaleString()}
          </div>
        </div>
        <div style={{ 
          marginLeft: 'auto',
          padding: '4px 10px',
          borderRadius: '6px',
          background: isAbove ? '#FEE2E2' : '#F0FDF4',
          color: isAbove ? '#DC2626' : '#16A34A',
          fontSize: '13px',
          fontWeight: 500
        }}>
          {isAbove ? `${deltaPercent}% above market` : `${Math.abs(deltaPercent)}% below market`}
        </div>
      </div>
      
      {/* Percentile bar */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ height: '4px', background: '#E5E7EB', borderRadius: '2px', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: `${percentile}%`,
            top: '-3px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isAbove ? '#EF4444' : '#22C55E',
            border: '2px solid white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transform: 'translateX(-50%)'
          }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs" style={{ color: 'rgba(0,0,0,0.3)' }}>Cheapest</span>
          <span className="text-xs" style={{ color: 'rgba(0,0,0,0.3)' }}>Most expensive</span>
        </div>
      </div>
      
      <div className="flex items-start gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #E0E7FF' }}>
        <Info size={13} style={{ color: '#6366F1', marginTop: '1px', flexShrink: 0 }} />
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', lineHeight: '1.5' }}>
          Based on {vendorName} pricing data across 847 similar contracts. 
          {isAbove ? ' Vertice negotiators could save an estimated £' + delta.toLocaleString() + '.' : ' This is a competitive rate.'}
        </span>
      </div>
    </div>
  );
};

const UsagePulseWidget = ({ mode = 'hero', data }) => {
  const { purchased, active, productName } = data;
  const utilisation = Math.round((active / purchased) * 100);
  const wasted = purchased - active;
  const isLow = utilisation < 60;

  if (mode === 'reference') {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>Utilisation</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium" style={{ color: isLow ? '#F59E0B' : 'rgba(0,0,0,0.9)' }}>
            {active}/{purchased} seats ({utilisation}%)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      border: `1px solid ${isLow ? '#FDE68A' : '#E5E7EB'}`,
      borderRadius: '8px',
      padding: '16px',
      background: isLow ? '#FFFBEB' : '#FFFFFF'
    }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
        <div className="flex items-center gap-2">
          <Users size={14} style={{ color: isLow ? '#F59E0B' : 'rgba(0,0,0,0.4)' }} />
          <span className="text-xs font-medium" style={{ color: isLow ? '#D97706' : 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Licence utilisation
          </span>
        </div>
      </div>
      
      <div className="flex items-end gap-4" style={{ marginBottom: '12px' }}>
        <div>
          <div className="text-3xl font-medium" style={{ color: isLow ? '#D97706' : 'rgba(0,0,0,0.9)', lineHeight: 1 }}>
            {utilisation}%
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(0,0,0,0.4)' }}>
            {active} active of {purchased} purchased
          </div>
        </div>
        
        {isLow && (
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div className="text-sm font-medium" style={{ color: '#DC2626' }}>
              {wasted} unused seats
            </div>
            <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>
              ~£{Math.round((wasted / purchased) * 75000).toLocaleString()} wasted annually
            </div>
          </div>
        )}
      </div>
      
      {/* Utilisation bar */}
      <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          height: '6px',
          width: `${utilisation}%`,
          background: isLow ? '#F59E0B' : '#22C55E',
          borderRadius: '3px',
          transition: 'width 0.6s ease'
        }} />
      </div>
      
      {isLow && (
        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: `1px solid ${isLow ? '#FDE68A' : '#E5E7EB'}` }}>
          <AlertTriangle size={13} style={{ color: '#D97706', flexShrink: 0 }} />
          <span className="text-xs" style={{ color: 'rgba(0,0,0,0.6)' }}>
            Consider right-sizing before renewal. Current usage suggests {Math.ceil(active * 1.1)} seats would be sufficient.
          </span>
        </div>
      )}
    </div>
  );
};

const VendorHealthWidget = ({ mode = 'hero', data }) => {
  const { security, dpa, diversity, financial } = data;
  const hasIssue = [security, dpa, diversity, financial].some(s => s.status === 'fail' || s.status === 'warning');

  if (mode === 'reference') {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>Vendor risk</span>
        <div className="flex items-center gap-1">
          {[security, dpa, diversity, financial].map((item, i) => (
            <div key={i} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: item.status === 'pass' ? '#22C55E' : item.status === 'warning' ? '#F59E0B' : '#EF4444'
            }} />
          ))}
          <span className="text-xs ml-1" style={{ color: hasIssue ? '#D97706' : '#16A34A' }}>
            {hasIssue ? 'Issues found' : 'All clear'}
          </span>
        </div>
      </div>
    );
  }

  const items = [
    { label: 'Security', icon: Shield, ...security },
    { label: 'DPA Status', icon: FileText, ...dpa },
    { label: 'Diversity', icon: Users, ...diversity },
    { label: 'Financial', icon: DollarSign, ...financial }
  ];

  return (
    <div style={{ 
      border: `1px solid ${hasIssue ? '#FDE68A' : '#E5E7EB'}`,
      borderRadius: '8px',
      padding: '16px',
      background: '#FFFFFF'
    }}>
      <div className="flex items-center gap-2" style={{ marginBottom: '12px' }}>
        <Shield size={14} style={{ color: 'rgba(0,0,0,0.4)' }} />
        <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Vendor compliance
        </span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {items.map((item, i) => {
          const Icon = item.icon;
          const colors = {
            pass: { bg: '#F0FDF4', border: '#BBF7D0', text: '#16A34A', icon: '#22C55E' },
            warning: { bg: '#FFFBEB', border: '#FDE68A', text: '#D97706', icon: '#F59E0B' },
            fail: { bg: '#FEF2F2', border: '#FECACA', text: '#DC2626', icon: '#EF4444' }
          }[item.status];
          
          return (
            <div key={i} style={{ 
              padding: '10px 12px',
              borderRadius: '6px',
              border: `1px solid ${colors.border}`,
              background: colors.bg
            }}>
              <div className="flex items-center gap-1.5" style={{ marginBottom: '4px' }}>
                <Icon size={12} style={{ color: colors.icon }} />
                <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>{item.label}</span>
              </div>
              <div className="text-sm font-medium" style={{ color: colors.text }}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DuplicateDetectionWidget = ({ mode = 'hero', data }) => {
  const { duplicates, currentTool } = data;
  const hasDuplicates = duplicates.length > 0;

  if (mode === 'reference') {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>Duplicates</span>
        <span className="text-xs" style={{ color: hasDuplicates ? '#D97706' : '#16A34A' }}>
          {hasDuplicates ? `${duplicates.length} overlap found` : 'None detected'}
        </span>
      </div>
    );
  }

  if (!hasDuplicates) return null;

  return (
    <div style={{ 
      border: '1px solid #FDE68A',
      borderRadius: '8px',
      padding: '16px',
      background: '#FFFBEB'
    }}>
      <div className="flex items-center gap-2" style={{ marginBottom: '12px' }}>
        <Layers size={14} style={{ color: '#D97706' }} />
        <span className="text-xs font-medium" style={{ color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Potential overlap detected
        </span>
      </div>
      
      <div className="text-sm" style={{ color: 'rgba(0,0,0,0.8)', marginBottom: '12px', lineHeight: 1.5 }}>
        You already pay for tools with similar functionality to {currentTool}:
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {duplicates.map((dup, i) => (
          <div key={i} className="flex items-center justify-between" style={{ 
            padding: '8px 12px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid #FDE68A'
          }}>
            <div>
              <div className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>{dup.name}</div>
              <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>{dup.overlap}</div>
            </div>
            <div className="text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>£{dup.cost.toLocaleString()}/yr</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RenewalDeltaWidget = ({ mode = 'hero', data }) => {
  const { lastYear, thisYear, unitPriceChange, volumeChange, vendorName } = data;
  const totalDelta = thisYear - lastYear;
  const totalDeltaPercent = Math.round((totalDelta / lastYear) * 100);
  const isIncrease = totalDelta > 0;

  if (mode === 'reference') {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>vs. last year</span>
        <div className="flex items-center gap-1.5">
          {isIncrease ? <TrendingUp size={12} style={{ color: '#D97706' }} /> : <TrendingDown size={12} style={{ color: '#16A34A' }} />}
          <span className="text-sm font-medium" style={{ color: isIncrease ? '#D97706' : '#16A34A' }}>
            {isIncrease ? '+' : ''}£{totalDelta.toLocaleString()} ({totalDeltaPercent}%)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '16px',
      background: '#FFFFFF'
    }}>
      <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
        <RefreshCw size={14} style={{ color: 'rgba(0,0,0,0.4)' }} />
        <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Renewal comparison
        </span>
      </div>
      
      {/* The equation: Old → Delta → New */}
      <div className="flex items-center gap-4" style={{ marginBottom: '16px' }}>
        <div>
          <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Last year</div>
          <div className="text-lg" style={{ color: 'rgba(0,0,0,0.4)' }}>
            £{lastYear.toLocaleString()}
          </div>
        </div>
        <div style={{ 
          padding: '4px 10px',
          borderRadius: '20px',
          background: isIncrease ? '#FEF3C7' : '#DCFCE7',
          color: isIncrease ? '#D97706' : '#16A34A',
          fontSize: '13px',
          fontWeight: 500,
          whiteSpace: 'nowrap'
        }}>
          {isIncrease ? '+' : ''}£{totalDelta.toLocaleString()}
        </div>
        <div>
          <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>This offer</div>
          <div className="text-lg font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>
            £{thisYear.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Truth Decomposition */}
      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
        <div className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>
          What's driving the change
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="flex items-center justify-between" style={{ 
            padding: '8px 12px', borderRadius: '6px',
            background: unitPriceChange > 0 ? '#FEF2F2' : '#F0FDF4',
            border: `1px solid ${unitPriceChange > 0 ? '#FECACA' : '#BBF7D0'}`
          }}>
            <div>
              <div className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.7)' }}>Unit price</div>
              <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>Cost per licence</div>
            </div>
            <span className="text-sm font-medium" style={{ color: unitPriceChange > 0 ? '#DC2626' : '#16A34A' }}>
              {unitPriceChange > 0 ? '+' : ''}{unitPriceChange}%
            </span>
          </div>
          <div className="flex items-center justify-between" style={{ 
            padding: '8px 12px', borderRadius: '6px',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE'
          }}>
            <div>
              <div className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.7)' }}>Seat count</div>
              <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>Volume change</div>
            </div>
            <span className="text-sm font-medium" style={{ color: '#2563EB' }}>
              {volumeChange > 0 ? '+' : ''}{volumeChange}%
            </span>
          </div>
        </div>
      </div>
      
      {/* AI verdict */}
      <div className="flex items-start gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #F3F4F6' }}>
        <Sparkles size={13} style={{ color: '#6366F1', marginTop: '1px', flexShrink: 0 }} />
        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', lineHeight: '1.5' }}>
          {unitPriceChange > 3 
            ? `Unit cost increased ${unitPriceChange}% — vendor pricing pressure. Consider negotiation before approving.`
            : volumeChange > 10
            ? `Cost increase driven by ${volumeChange}% seat growth. Unit rates are protected.`
            : `Renewal terms are competitive. No action required.`
          }
        </span>
      </div>
    </div>
  );
};


// ─── Scenario Definitions ─────────────────────────────────────────

const scenarios = {
  underBudget: {
    title: 'New Purchase — Under Budget',
    subtitle: 'Simple approval, budget is healthy',
    request: {
      question: "What is the final decision for 'SaaS Renewal'?",
      vendor: 'Microsoft',
      totalAmount: 92000,
      type: 'New Purchase',
      dueDate: 'Mar 29, 2026',
      assignee: 'Alex Chen (You)',
    },
    heroWidgets: [],  // No hero — budget is fine, keep it reference
    alertWidgets: [],
    referenceWidgets: ['budget', 'benchmark', 'vendorHealth'],
    widgetData: {
      budget: { committed: 7100000, thisRequest: 92000, totalBudget: 9000000, label: 'IT 2025 / Software' },
      benchmark: { yourPrice: 92000, marketMedian: 98000, vendorName: 'Microsoft', percentile: 42 },
      vendorHealth: {
        security: { status: 'pass', value: 'SOC 2 Type II' },
        dpa: { status: 'pass', value: 'Signed' },
        diversity: { status: 'pass', value: 'Certified' },
        financial: { status: 'pass', value: 'Stable (A+)' }
      }
    }
  },
  overBudget: {
    title: 'New Purchase — Over Budget',
    subtitle: 'Budget exceeded — widget promoted to Hero',
    request: {
      question: "What is the final decision for 'SaaS Renewal'?",
      vendor: 'Microsoft',
      totalAmount: 92000,
      type: 'New Purchase',
      dueDate: 'Mar 29, 2026',
      assignee: 'Alex Chen (You)',
    },
    heroWidgets: ['budget'],  // Budget becomes hero because it triggers the decision
    alertWidgets: [],
    referenceWidgets: ['benchmark', 'vendorHealth'],
    widgetData: {
      budget: { committed: 17132907, thisRequest: 92000, totalBudget: 9000000, label: 'IT 2025 / Software' },
      benchmark: { yourPrice: 92000, marketMedian: 71000, vendorName: 'Microsoft', percentile: 78 },
      vendorHealth: {
        security: { status: 'pass', value: 'SOC 2 Type II' },
        dpa: { status: 'pass', value: 'Signed' },
        diversity: { status: 'warning', value: 'Pending' },
        financial: { status: 'pass', value: 'Stable (A+)' }
      }
    }
  },
  renewalWithIntel: {
    title: 'Renewal — Price Intelligence',
    subtitle: 'Vertice differentiator: decompose the price change',
    request: {
      question: "What is the final decision for 'HubSpot Renewal'?",
      vendor: 'HubSpot',
      totalAmount: 152000,
      type: 'Renewal',
      dueDate: 'Apr 15, 2026',
      assignee: 'Alex Chen (You)',
    },
    heroWidgets: ['renewalDelta', 'benchmark'],
    alertWidgets: [],
    referenceWidgets: ['usage', 'vendorHealth'],
    widgetData: {
      renewalDelta: { lastYear: 140000, thisYear: 152000, unitPriceChange: 5, volumeChange: 12.5, vendorName: 'HubSpot' },
      benchmark: { yourPrice: 152000, marketMedian: 145000, vendorName: 'HubSpot', percentile: 62 },
      usage: { purchased: 100, active: 42, productName: 'HubSpot Marketing Hub' },
      vendorHealth: {
        security: { status: 'pass', value: 'SOC 2 Type II' },
        dpa: { status: 'pass', value: 'Signed' },
        diversity: { status: 'pass', value: 'Certified' },
        financial: { status: 'pass', value: 'Stable (B+)' }
      }
    }
  },
  lowUtilisation: {
    title: 'Renewal — Low Utilisation Alert',
    subtitle: 'Usage widget promoted to Hero — why renew 100 seats?',
    request: {
      question: "What is the final decision for 'Figma Renewal'?",
      vendor: 'Figma',
      totalAmount: 75000,
      type: 'Renewal',
      dueDate: 'May 1, 2026',
      assignee: 'Alex Chen (You)',
    },
    heroWidgets: ['usage'],
    alertWidgets: ['duplicate'],
    referenceWidgets: ['budget', 'renewalDelta', 'vendorHealth'],
    widgetData: {
      usage: { purchased: 100, active: 42, productName: 'Figma' },
      duplicate: { 
        currentTool: 'Figma',
        duplicates: [
          { name: 'Sketch', overlap: 'UI design, prototyping', cost: 12000 },
          { name: 'Adobe XD', overlap: 'UI design, handoff', cost: 8400 }
        ]
      },
      budget: { committed: 4200000, thisRequest: 75000, totalBudget: 9000000, label: 'Design 2025' },
      renewalDelta: { lastYear: 72000, thisYear: 75000, unitPriceChange: 4.2, volumeChange: 0, vendorName: 'Figma' },
      vendorHealth: {
        security: { status: 'pass', value: 'SOC 2 Type II' },
        dpa: { status: 'pass', value: 'Signed' },
        diversity: { status: 'pass', value: 'Certified' },
        financial: { status: 'pass', value: 'Stable (A)' }
      }
    }
  }
};


// ─── Widget Renderer ──────────────────────────────────────────────

const WidgetRenderer = ({ type, mode, data }) => {
  const widgetMap = {
    budget: BudgetVarianceWidget,
    benchmark: PriceBenchmarkWidget,
    usage: UsagePulseWidget,
    vendorHealth: VendorHealthWidget,
    duplicate: DuplicateDetectionWidget,
    renewalDelta: RenewalDeltaWidget
  };
  const Widget = widgetMap[type];
  if (!Widget || !data) return null;
  return <Widget mode={mode} data={data} />;
};


// ─── Main Component ───────────────────────────────────────────────

const TaskApprovalWidgetSystem = () => {
  const [activeScenario, setActiveScenario] = useState('underBudget');
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showWidgetLabels, setShowWidgetLabels] = useState(true);

  const scenario = scenarios[activeScenario];
  const { request, heroWidgets, alertWidgets, referenceWidgets, widgetData } = scenario;

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: '#F8F9FA',
      minHeight: '100vh',
      padding: '16px'
    }}>
      {/* Scenario Switcher */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 16px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
          Scenario:
        </span>
        {Object.entries(scenarios).map(([key, s]) => (
          <button
            key={key}
            onClick={() => { setActiveScenario(key); setIsRejecting(false); setRejectionReason(''); }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: `1px solid ${activeScenario === key ? '#3B82F6' : '#E5E7EB'}`,
              background: activeScenario === key ? '#EFF6FF' : '#FFFFFF',
              color: activeScenario === key ? '#2563EB' : 'rgba(0,0,0,0.6)',
              fontSize: '12px',
              fontWeight: activeScenario === key ? 500 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {s.title}
          </button>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={() => setShowWidgetLabels(!showWidgetLabels)}
            className="flex items-center gap-1.5"
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #E5E7EB',
              background: showWidgetLabels ? '#F5F3FF' : '#FFFFFF',
              color: showWidgetLabels ? '#7C3AED' : 'rgba(0,0,0,0.5)',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {showWidgetLabels ? <Eye size={12} /> : <EyeOff size={12} />}
            {showWidgetLabels ? 'Labels on' : 'Labels off'}
          </button>
        </div>
      </div>

      {/* Scenario Description */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 12px', padding: '10px 14px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px' }}>
        <div className="flex items-center gap-2">
          <Zap size={13} style={{ color: '#D97706' }} />
          <span className="text-xs" style={{ color: '#92400E' }}>
            <strong>{scenario.title}:</strong> {scenario.subtitle}
          </span>
        </div>
      </div>

      {/* The Modal */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 140px)'
      }}>
        {/* Header */}
        <div className="flex items-center justify-between" style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB' }}>
          <div className="flex items-center gap-3">
            <span className="text-base font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>Triage/Pre Approval</span>
            <span className="flex items-center gap-1.5" style={{ 
              padding: '3px 8px', background: '#EFF6FF', color: '#2563EB', 
              fontSize: '12px', borderRadius: '4px'
            }}>
              <Building2 size={12} />
              {request.type}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>
              <Calendar size={13} /> Due {request.dueDate}
            </span>
            <span className="text-xs" style={{ color: 'rgba(0,0,0,0.7)' }}>{request.assignee}</span>
            <button style={{ color: 'rgba(0,0,0,0.3)' }}><MessageSquare size={16} /></button>
            <button style={{ color: 'rgba(0,0,0,0.3)' }}><X size={16} /></button>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Content Area */}
          <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', position: 'relative' }}>
            {showWidgetLabels && (
              <div style={{ position: 'absolute', top: '8px', right: '12px', padding: '2px 8px', background: '#EFF6FF', borderRadius: '4px', fontSize: '10px', color: '#3B82F6', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Content Area
              </div>
            )}

            {/* Alert Widgets (anomaly-promoted) */}
            {alertWidgets.map((type) => (
              <div key={type} style={{ marginBottom: '16px', position: 'relative' }}>
                {showWidgetLabels && (
                  <div style={{ position: 'absolute', top: '-8px', left: '8px', padding: '1px 6px', background: '#FEF2F2', borderRadius: '3px', fontSize: '9px', color: '#DC2626', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 1 }}>
                    Alert Widget ↑ promoted
                  </div>
                )}
                <WidgetRenderer type={type} mode="hero" data={widgetData[type]} />
              </div>
            ))}

            {/* Question */}
            <div style={{ marginBottom: '8px' }}>
              <span className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>{request.question}</span>
            </div>
            <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
              <span className="text-sm" style={{ color: 'rgba(0,0,0,0.5)' }}>This request is</span>
              <span style={{ 
                padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500,
                background: widgetData.budget && widgetData.budget.committed + widgetData.budget.thisRequest > widgetData.budget.totalBudget ? '#FEE2E2' : '#F0FDF4',
                color: widgetData.budget && widgetData.budget.committed + widgetData.budget.thisRequest > widgetData.budget.totalBudget ? '#DC2626' : '#16A34A'
              }}>
                {widgetData.budget && widgetData.budget.committed + widgetData.budget.thisRequest > widgetData.budget.totalBudget 
                  ? 'Over budget' 
                  : `${Math.round(((widgetData.budget?.totalBudget - (widgetData.budget?.committed + widgetData.budget?.thisRequest)) / widgetData.budget?.totalBudget) * 100)}% under budget`
                }
              </span>
            </div>

            {/* Radio Buttons */}
            {!isRejecting && (
              <div className="flex gap-3" style={{ marginBottom: '20px' }}>
                <button
                  onClick={() => {}}
                  className="flex items-center gap-2 flex-1"
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    fontSize: '13px',
                    color: 'rgba(0,0,0,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #D1D5DB' }} />
                  Approve
                </button>
                <button
                  onClick={() => setIsRejecting(true)}
                  className="flex items-center gap-2 flex-1"
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    fontSize: '13px',
                    color: 'rgba(0,0,0,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #D1D5DB' }} />
                  Decline
                </button>
              </div>
            )}

            {/* Rejection reason */}
            <div style={{ marginBottom: '20px' }}>
              <div className="text-sm" style={{ color: 'rgba(0,0,0,0.7)', marginBottom: '6px' }}>
                {isRejecting ? 'Why are you declining this request? *' : 'Reason for your decision'}
              </div>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Add any notes or reasoning for your decision"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${isRejecting ? '#FECACA' : '#E5E7EB'}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: 'rgba(0,0,0,0.8)',
                  resize: 'vertical',
                  minHeight: '64px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Hero Widgets */}
            {heroWidgets.map((type) => (
              <div key={type} style={{ marginBottom: '12px', position: 'relative' }}>
                {showWidgetLabels && (
                  <div style={{ position: 'absolute', top: '-8px', left: '8px', padding: '1px 6px', background: '#F0FDF4', borderRadius: '3px', fontSize: '9px', color: '#16A34A', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 1 }}>
                    Hero Widget — triggers decision
                  </div>
                )}
                <WidgetRenderer type={type} mode="hero" data={widgetData[type]} />
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div style={{ 
            width: '360px', 
            borderLeft: '1px solid #E5E7EB',
            overflowY: 'auto',
            padding: '16px 20px',
            background: '#FAFBFC',
            position: 'relative',
            flexShrink: 0
          }}>
            {showWidgetLabels && (
              <div style={{ position: 'absolute', top: '8px', right: '12px', padding: '2px 8px', background: '#F5F3FF', borderRadius: '4px', fontSize: '10px', color: '#7C3AED', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Details Panel
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-4" style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '10px', marginBottom: '14px' }}>
              <span className="text-sm" style={{ color: 'rgba(0,0,0,0.4)' }}>Comments</span>
              <span className="text-sm font-medium" style={{ color: '#3B82F6', borderBottom: '2px solid #3B82F6', paddingBottom: '10px', marginBottom: '-11px' }}>Details</span>
            </div>

            {/* Static Metadata */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div>
                <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Assignee</div>
                <div className="text-sm" style={{ color: 'rgba(0,0,0,0.9)' }}>{request.assignee}</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Vendor</div>
                <div className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>{request.vendor}</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Total amount</div>
                <div className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.9)' }}>£{request.totalAmount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Cost centre</div>
                <div className="text-sm" style={{ color: 'rgba(0,0,0,0.9)' }}>CC-DEMO-001 · team.department</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Office</div>
                <div className="text-sm" style={{ color: 'rgba(0,0,0,0.9)' }}>London</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', marginBottom: '2px' }}>Business justification</div>
                <div className="text-sm" style={{ color: 'rgba(0,0,0,0.7)', fontStyle: 'italic' }}>
                  "Need CRM to support sales growth and improve customer relationships"
                </div>
              </div>
            </div>

            {/* Reference Widgets */}
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '12px' }}>
              {showWidgetLabels && (
                <div style={{ padding: '1px 6px', background: '#F5F3FF', borderRadius: '3px', fontSize: '9px', color: '#7C3AED', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '8px' }}>
                  Reference Widgets — supporting context
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {referenceWidgets.map((type) => (
                  <div key={type} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <WidgetRenderer type={type} mode="reference" data={widgetData[type]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Line Items */}
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '12px', marginTop: '12px' }}>
              <div className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.5)', marginBottom: '8px' }}>Line items (2)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm" style={{ color: 'rgba(0,0,0,0.8)' }}>Enterprise CRM Licence</div>
                    <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>Software</div>
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(0,0,0,0.8)' }}>£75,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm" style={{ color: 'rgba(0,0,0,0.8)' }}>Implementation & Training</div>
                    <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>Services</div>
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(0,0,0,0.8)' }}>£17,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between" style={{ padding: '12px 20px', borderTop: '1px solid #E5E7EB', background: '#FAFBFC' }}>
          <button className="text-sm" style={{ color: 'rgba(0,0,0,0.5)' }}>Cancel</button>
          <div className="flex gap-3">
            {isRejecting ? (
              <>
                <button
                  onClick={() => { setIsRejecting(false); setRejectionReason(''); }}
                  style={{
                    padding: '8px 16px', borderRadius: '6px',
                    border: '1px solid #E5E7EB', background: '#FFFFFF',
                    fontSize: '13px', color: 'rgba(0,0,0,0.7)', cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    padding: '8px 16px', borderRadius: '6px',
                    border: 'none', background: '#DC2626',
                    fontSize: '13px', color: '#FFFFFF', fontWeight: 500, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <XCircle size={14} /> Confirm Rejection
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsRejecting(true)}
                  style={{
                    padding: '8px 16px', borderRadius: '6px',
                    border: '1px solid #FECACA', background: '#FFFFFF',
                    fontSize: '13px', color: '#DC2626', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <XCircle size={14} /> Decline
                </button>
                <button
                  style={{
                    padding: '8px 16px', borderRadius: '6px',
                    border: 'none', background: '#16A34A',
                    fontSize: '13px', color: '#FFFFFF', fontWeight: 500, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <CheckCircle2 size={14} /> Approve & Send to Negotiation
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Engineering Spec: Widget Injection Logic */}
      <div style={{ maxWidth: '1200px', margin: '20px auto 0', padding: '20px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '12px' }}>
          <Zap size={14} style={{ color: '#7C3AED' }} />
          <span className="text-sm font-medium" style={{ color: '#7C3AED' }}>Widget Injection Logic (Engineering Spec)</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div style={{ padding: '12px', background: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
            <div className="text-xs font-medium" style={{ color: '#16A34A', marginBottom: '6px' }}>HERO (Content Area)</div>
            <div className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>
              Widget contains the variable triggering the approval decision. Placed between question and action buttons.
              <br /><br />
              <code style={{ background: '#DCFCE7', padding: '2px 4px', borderRadius: '3px', fontSize: '10px' }}>
                widget.triggersDecision === true
              </code>
            </div>
          </div>
          <div style={{ padding: '12px', background: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
            <div className="text-xs font-medium" style={{ color: '#DC2626', marginBottom: '6px' }}>ALERT (Content Area — Top)</div>
            <div className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>
              Any widget detecting an anomaly gets promoted above the question, regardless of type.
              <br /><br />
              <code style={{ background: '#FEE2E2', padding: '2px 4px', borderRadius: '3px', fontSize: '10px' }}>
                widget.hasAnomaly === true
              </code>
            </div>
          </div>
          <div style={{ padding: '12px', background: '#F5F3FF', borderRadius: '8px', border: '1px solid #DDD6FE' }}>
            <div className="text-xs font-medium" style={{ color: '#7C3AED', marginBottom: '6px' }}>REFERENCE (Details Panel)</div>
            <div className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>
              Supporting context for the decision. Compact single-line format. Default placement for all widgets.
              <br /><br />
              <code style={{ background: '#EDE9FE', padding: '2px 4px', borderRadius: '3px', fontSize: '10px' }}>
                widget.relevance === 'secondary'
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskApprovalWidgetSystem;
