import React, { useState } from 'react';
import { 
  GripVertical, Plus, Settings, Eye, Monitor, Mail, MessageSquare,
  ChevronDown, ChevronRight, FileText, DollarSign, BarChart3,
  Shield, Users, Layers, Link2, Clock, CheckCircle2, XCircle,
  ArrowRight, Sparkles, AlertTriangle, X, Hash, Building2,
  RefreshCw, ExternalLink, Zap, Variable, Box, Type, Calendar,
  List, Upload, User, ToggleLeft, Braces, Play, Puzzle,
  Workflow, LayoutGrid, Copy, Trash2, ChevronUp
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS (Vertice system)
// ═══════════════════════════════════════════════════════════════
const t = {
  text: { 
    primary: 'rgba(15,23,41,1)', secondary: 'rgba(15,23,41,0.7)', 
    tertiary: 'rgba(15,23,41,0.5)', quaternary: 'rgba(15,23,41,0.35)' 
  },
  border: { light: 'rgba(15,23,41,0.08)', strong: 'rgba(15,23,41,0.12)' },
  bg: { primary: '#fff', secondary: '#fafbfc', hover: '#f5f6f8', canvas: '#eceef1' },
  purple: { base: '#6000f0', light: '#f0e5ff', mid: '#e0ccff' },
  green: { base: '#16a249', light: '#e8fcef' },
  amber: { base: '#f97415', light: '#fff2eb' },
  red: { base: '#dc2828', light: '#fef1f2' },
  blue: { base: '#2563eb', light: '#eff6ff' }
};

// ═══════════════════════════════════════════════════════════════
// COMPONENT REGISTRY — The "LEGO pieces"
// ═══════════════════════════════════════════════════════════════
const STANDARD_FIELDS = [
  { id: 'text', label: 'Text', icon: Type, description: 'Single line text input' },
  { id: 'number', label: 'Number', icon: Hash, description: 'Numeric value' },
  { id: 'date', label: 'Date', icon: Calendar, description: 'Date picker' },
  { id: 'select', label: 'Select', icon: List, description: 'Dropdown selection' },
  { id: 'file', label: 'File Upload', icon: Upload, description: 'File attachment' },
  { id: 'user', label: 'User Picker', icon: User, description: 'Select a user' },
  { id: 'toggle', label: 'Toggle', icon: ToggleLeft, description: 'Yes/No switch' },
  { id: 'currency', label: 'Currency', icon: DollarSign, description: 'Monetary value' },
];

const RICH_COMPONENTS = [
  { id: 'offer_comparison', label: 'Offer Comparison', icon: Layers, description: 'Compare offers side-by-side', bindsTo: 'offers[]', color: t.blue },
  { id: 'contract_lineage', label: 'Contract Lineage', icon: RefreshCw, description: 'Renewal history timeline', bindsTo: 'contract', color: t.purple },
  { id: 'budget_variance', label: 'Budget Variance', icon: BarChart3, description: 'Budget impact visualisation', bindsTo: 'budget', color: t.green },
  { id: 'vendor_risk', label: 'Vendor Risk', icon: Shield, description: 'Risk assessment card', bindsTo: 'vendor', color: t.amber },
  { id: 'license_usage', label: 'License Usage', icon: Users, description: 'Usage analytics chart', bindsTo: 'licenseUsage', color: t.blue },
  { id: 'ai_recommendation', label: 'AI Insight', icon: Sparkles, description: 'AI-generated recommendation', bindsTo: 'aiInsight', color: t.purple },
  { id: 'external_link', label: 'External Link', icon: ExternalLink, description: 'Embedded link or video', bindsTo: null, color: { base: '#64748b', light: '#f1f5f9' } },
];

const ACTION_SECTIONS = [
  { id: 'approval_actions', label: 'Approval Actions', icon: CheckCircle2, description: 'Approve / Reject with reason' },
  { id: 'assignment', label: 'Assignment', icon: User, description: 'Reassign or delegate' },
  { id: 'escalation', label: 'Escalation', icon: AlertTriangle, description: 'Override or escalate' },
];

// ═══════════════════════════════════════════════════════════════
// PALETTE SECTION
// ═══════════════════════════════════════════════════════════════
const PaletteSection = ({ title, items, isRich, isAction, onAdd }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={() => setCollapsed(!collapsed)} style={{
        display: 'flex', alignItems: 'center', gap: 6, width: '100%',
        background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
        marginBottom: collapsed ? 0 : 8
      }}>
        {collapsed ? <ChevronRight size={12} color={t.text.quaternary} /> : <ChevronDown size={12} color={t.text.quaternary} />}
        <span style={{ fontSize: 11, fontWeight: 500, color: t.text.tertiary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</span>
        <span style={{ fontSize: 11, color: t.text.quaternary, marginLeft: 'auto' }}>{items.length}</span>
      </button>
      {!collapsed && items.map(item => (
        <button key={item.id} onClick={() => onAdd(item)} style={{
          display: 'flex', alignItems: 'center', gap: 8, width: '100%',
          padding: '6px 8px', marginBottom: 2, borderRadius: 6,
          background: 'none', border: '1px solid transparent', cursor: 'pointer',
          transition: 'all 0.12s ease', textAlign: 'left'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = t.bg.hover; e.currentTarget.style.borderColor = t.border.light; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'transparent'; }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isRich ? (item.color?.light || t.bg.secondary) : isAction ? t.amber.light : t.bg.secondary,
            color: isRich ? (item.color?.base || t.text.tertiary) : isAction ? t.amber.base : t.text.tertiary,
            flexShrink: 0
          }}>
            <item.icon size={14} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: t.text.primary, lineHeight: 1.3 }}>{item.label}</div>
            {isRich && item.bindsTo && (
              <div style={{ fontSize: 11, color: t.purple.base, fontFamily: 'monospace', marginTop: 1 }}>
                → {item.bindsTo}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CANVAS COMPONENT RENDERERS
// ═══════════════════════════════════════════════════════════════
const FieldOnCanvas = ({ item, selected, onSelect, onRemove }) => {
  const isRich = RICH_COMPONENTS.find(r => r.id === item.type);
  const isAction = ACTION_SECTIONS.find(a => a.id === item.type);
  const def = isRich || isAction || STANDARD_FIELDS.find(f => f.id === item.type);
  if (!def) return null;

  if (isRich) return (
    <RichComponentOnCanvas item={item} def={def} selected={selected} onSelect={onSelect} onRemove={onRemove} />
  );
  if (isAction) return (
    <ActionSectionOnCanvas item={item} def={def} selected={selected} onSelect={onSelect} onRemove={onRemove} />
  );
  return (
    <StandardFieldOnCanvas item={item} def={def} selected={selected} onSelect={onSelect} onRemove={onRemove} />
  );
};

const StandardFieldOnCanvas = ({ item, def, selected, onSelect, onRemove }) => (
  <div onClick={() => onSelect(item.instanceId)} style={{
    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
    border: `1px solid ${selected ? t.purple.base : t.border.strong}`,
    borderRadius: 8, background: selected ? t.purple.light + '40' : t.bg.primary,
    cursor: 'pointer', transition: 'all 0.12s', position: 'relative', marginBottom: 6
  }}>
    <GripVertical size={14} color={t.text.quaternary} style={{ cursor: 'grab', flexShrink: 0 }} />
    <div style={{ width: 24, height: 24, borderRadius: 4, background: t.bg.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text.tertiary, flexShrink: 0 }}>
      <def.icon size={13} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: t.text.primary }}>{item.label || def.label}</div>
      <div style={{ fontSize: 12, color: t.text.tertiary }}>{def.description}</div>
    </div>
    {item.required && <span style={{ fontSize: 10, fontWeight: 500, color: t.red.base, background: t.red.light, padding: '2px 6px', borderRadius: 4 }}>Required</span>}
    <button onClick={e => { e.stopPropagation(); onRemove(item.instanceId); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.text.quaternary, padding: 2 }}>
      <Trash2 size={13} />
    </button>
  </div>
);

const RichComponentOnCanvas = ({ item, def, selected, onSelect, onRemove }) => (
  <div onClick={() => onSelect(item.instanceId)} style={{
    border: `1px solid ${selected ? t.purple.base : def.color?.base + '30'}`,
    borderRadius: 8, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.12s',
    background: selected ? t.purple.light + '30' : t.bg.primary, marginBottom: 6
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: `1px solid ${t.border.light}` }}>
      <GripVertical size={14} color={t.text.quaternary} style={{ cursor: 'grab' }} />
      <div style={{ width: 24, height: 24, borderRadius: 4, background: def.color?.light, display: 'flex', alignItems: 'center', justifyContent: 'center', color: def.color?.base, flexShrink: 0 }}>
        <def.icon size={13} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: t.text.primary, flex: 1 }}>{def.label}</span>
      {item.boundVariable && (
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: t.purple.base, background: t.purple.light, padding: '2px 8px', borderRadius: 4 }}>
          <Variable size={10} style={{ display: 'inline', verticalAlign: -1, marginRight: 3 }} />{item.boundVariable}
        </span>
      )}
      <button onClick={e => { e.stopPropagation(); onRemove(item.instanceId); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.text.quaternary, padding: 2 }}>
        <Trash2 size={13} />
      </button>
    </div>
    {/* Rich component preview */}
    <RichPreview type={item.type} />
  </div>
);

const RichPreview = ({ type }) => {
  const previewStyle = { padding: '12px', fontSize: 12, color: t.text.tertiary };
  
  if (type === 'offer_comparison') return (
    <div style={previewStyle}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {['Current offer', 'Alternative offer'].map(label => (
          <div key={label} style={{ background: t.bg.secondary, borderRadius: 6, padding: '10px 12px', border: `1px solid ${t.border.light}` }}>
            <div style={{ fontSize: 11, color: t.text.tertiary, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: t.text.primary }}>£--,---</div>
            <div style={{ fontSize: 11, color: t.text.quaternary, marginTop: 2 }}>-- line items</div>
          </div>
        ))}
      </div>
    </div>
  );
  
  if (type === 'budget_variance') return (
    <div style={previewStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: t.text.tertiary }}>Department budget</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: t.text.primary }}>£---K / £---K</span>
      </div>
      <div style={{ height: 6, background: t.bg.hover, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: '60%', height: '100%', background: '#94A3B8', borderRadius: 3 }} />
      </div>
    </div>
  );

  if (type === 'contract_lineage') return (
    <div style={previewStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {[1,2,3].map(i => (
          <React.Fragment key={i}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: i === 3 ? t.purple.base : '#CBD5E1' }} />
            {i < 3 && <div style={{ flex: 1, height: 1, background: t.border.strong }} />}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: t.text.quaternary }}>
        <span>2022</span><span>2024</span><span>Current</span>
      </div>
    </div>
  );

  if (type === 'vendor_risk') return (
    <div style={previewStyle}>
      <div style={{ display: 'flex', gap: 12 }}>
        {['Security', 'Financial', 'Compliance'].map(label => (
          <div key={label} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.bg.hover, margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: t.text.tertiary }}>--</div>
            <div style={{ fontSize: 11, color: t.text.quaternary }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === 'license_usage') return (
    <div style={previewStyle}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
        {[40,65,55,80,45,70,60].map((h,i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? t.blue.base : t.bg.hover, borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );

  if (type === 'ai_recommendation') return (
    <div style={{ ...previewStyle, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <Sparkles size={14} color={t.purple.base} style={{ flexShrink: 0, marginTop: 1 }} />
      <div>
        <div style={{ fontSize: 12, color: t.text.secondary, lineHeight: 1.5 }}>AI-generated recommendation will appear here based on context...</div>
        <div style={{ fontSize: 11, color: t.purple.base, marginTop: 4 }}>Confidence: --%</div>
      </div>
    </div>
  );

  return (
    <div style={previewStyle}>
      <div style={{ textAlign: 'center', padding: '8px 0', color: t.text.quaternary }}>Component preview</div>
    </div>
  );
};

const ActionSectionOnCanvas = ({ item, def, selected, onSelect, onRemove }) => (
  <div onClick={() => onSelect(item.instanceId)} style={{
    border: `2px dashed ${selected ? t.purple.base : t.amber.base + '40'}`,
    borderRadius: 8, padding: '12px', cursor: 'pointer', transition: 'all 0.12s',
    background: selected ? t.purple.light + '20' : t.amber.light + '30', marginBottom: 6
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <GripVertical size={14} color={t.text.quaternary} style={{ cursor: 'grab' }} />
      <div style={{ width: 24, height: 24, borderRadius: 4, background: t.amber.light, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.amber.base, flexShrink: 0 }}>
        <def.icon size={13} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: t.text.primary, flex: 1 }}>{def.label}</span>
      <button onClick={e => { e.stopPropagation(); onRemove(item.instanceId); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.text.quaternary, padding: 2 }}>
        <Trash2 size={13} />
      </button>
    </div>
    {item.type === 'approval_actions' && (
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, height: 32, borderRadius: 6, background: t.green.light, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12, fontWeight: 500, color: t.green.base }}>
          <CheckCircle2 size={13} /> Approve
        </div>
        <div style={{ flex: 1, height: 32, borderRadius: 6, background: t.red.light, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12, fontWeight: 500, color: t.red.base }}>
          <XCircle size={13} /> Reject
        </div>
      </div>
    )}
    {item.type === 'assignment' && (
      <div style={{ height: 32, borderRadius: 6, background: t.bg.primary, border: `1px solid ${t.border.strong}`, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 12, color: t.text.tertiary }}>
        Select assignee...
      </div>
    )}
    {item.type === 'escalation' && (
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, height: 32, borderRadius: 6, background: t.bg.primary, border: `1px solid ${t.border.strong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12, color: t.text.secondary }}>
          <Users size={12} /> Override
        </div>
        <div style={{ flex: 1, height: 32, borderRadius: 6, background: t.bg.primary, border: `1px solid ${t.border.strong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12, color: t.text.secondary }}>
          <ArrowRight size={12} /> Escalate
        </div>
      </div>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// PROPERTIES PANEL
// ═══════════════════════════════════════════════════════════════
const PropertiesPanel = ({ selectedItem, items, onUpdate }) => {
  if (!selectedItem) return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: t.bg.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '40px auto 12px', color: t.text.quaternary }}>
        <Settings size={18} />
      </div>
      <div style={{ fontSize: 13, color: t.text.tertiary, marginBottom: 4 }}>No selection</div>
      <div style={{ fontSize: 12, color: t.text.quaternary, lineHeight: 1.5 }}>Click a component on the canvas to edit its properties</div>
    </div>
  );

  const item = items.find(i => i.instanceId === selectedItem);
  if (!item) return null;

  const isRich = RICH_COMPONENTS.find(r => r.id === item.type);
  const isAction = ACTION_SECTIONS.find(a => a.id === item.type);
  const def = isRich || isAction || STANDARD_FIELDS.find(f => f.id === item.type);

  return (
    <div style={{ padding: 0 }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border.light}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 4, background: isRich ? def.color?.light : isAction ? t.amber.light : t.bg.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isRich ? def.color?.base : isAction ? t.amber.base : t.text.tertiary }}>
          <def.icon size={13} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: t.text.primary }}>{def.label}</span>
      </div>

      {/* Common properties */}
      <div style={{ padding: 16 }}>
        {!isAction && (
          <>
            <label style={{ fontSize: 12, fontWeight: 500, color: t.text.secondary, display: 'block', marginBottom: 4 }}>Label</label>
            <input 
              value={item.label || def.label} 
              onChange={e => onUpdate(item.instanceId, { label: e.target.value })}
              style={{ width: '100%', height: 32, padding: '0 10px', fontSize: 13, border: `1px solid ${t.border.strong}`, borderRadius: 6, outline: 'none', marginBottom: 12, fontFamily: 'inherit', color: t.text.primary }}
            />
          </>
        )}

        {!isRich && !isAction && (
          <>
            <label style={{ fontSize: 12, fontWeight: 500, color: t.text.secondary, display: 'block', marginBottom: 4 }}>Help text</label>
            <input 
              value={item.helpText || ''} 
              placeholder="Shown below the field..."
              onChange={e => onUpdate(item.instanceId, { helpText: e.target.value })}
              style={{ width: '100%', height: 32, padding: '0 10px', fontSize: 13, border: `1px solid ${t.border.strong}`, borderRadius: 6, outline: 'none', marginBottom: 12, fontFamily: 'inherit', color: t.text.primary }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: t.text.secondary, marginBottom: 12 }}>
              <input type="checkbox" checked={item.required || false} onChange={e => onUpdate(item.instanceId, { required: e.target.checked })} style={{ accentColor: t.purple.base }} />
              Required field
            </label>
          </>
        )}

        {/* Variable binding for rich components */}
        {isRich && (
          <div style={{ background: t.purple.light + '40', borderRadius: 8, padding: 12, border: `1px solid ${t.purple.base}20` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Variable size={13} color={t.purple.base} />
              <span style={{ fontSize: 12, fontWeight: 500, color: t.purple.base }}>Variable Binding</span>
            </div>
            <select 
              value={item.boundVariable || ''} 
              onChange={e => onUpdate(item.instanceId, { boundVariable: e.target.value })}
              style={{ width: '100%', height: 32, padding: '0 8px', fontSize: 13, border: `1px solid ${t.border.strong}`, borderRadius: 6, background: t.bg.primary, fontFamily: 'inherit', color: t.text.primary }}
            >
              <option value="">Select variable...</option>
              <option value="offers">offers (Collection)</option>
              <option value="offer1">offer1 (Offer)</option>
              <option value="offer2">offer2 (Offer)</option>
              <option value="contract">contract (Contract)</option>
              <option value="budget">budget (Budget)</option>
              <option value="vendor">vendor (Vendor)</option>
              <option value="licenseUsage">licenseUsage (Usage)</option>
              <option value="aiInsight">aiInsight (AI)</option>
            </select>
            <div style={{ fontSize: 11, color: t.text.tertiary, marginTop: 6, lineHeight: 1.5 }}>
              This component will display data from the selected task variable.
            </div>
          </div>
        )}

        {/* Channel visibility */}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${t.border.light}` }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: t.text.secondary, marginBottom: 8 }}>Show in channels</div>
          {[
            { id: 'web', label: 'Web', icon: Monitor },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'slack', label: 'Slack / Teams', icon: MessageSquare }
          ].map(ch => (
            <label key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: t.text.secondary, marginBottom: 6 }}>
              <input 
                type="checkbox" 
                checked={item.channels?.[ch.id] !== false} 
                onChange={e => onUpdate(item.instanceId, { channels: { ...item.channels, [ch.id]: e.target.checked } })}
                style={{ accentColor: t.purple.base }} 
              />
              <ch.icon size={13} color={t.text.tertiary} />
              {ch.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CHANNEL PREVIEW
// ═══════════════════════════════════════════════════════════════
const ChannelPreview = ({ channel, items, formName }) => {
  const visibleItems = items.filter(i => i.channels?.[channel] !== false);

  if (channel === 'email') return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${t.border.strong}`, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border.light}`, background: t.bg.secondary }}>
        <div style={{ fontSize: 11, color: t.text.quaternary, marginBottom: 4 }}>FROM: notifications@vertice.one</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: t.text.primary }}>Action required: Renewal Approval — Microsoft 365</div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 13, color: t.text.secondary, marginBottom: 16, lineHeight: 1.6 }}>
          Hi Sarah, you have a pending approval task. Here's a summary:
        </div>
        {visibleItems.filter(i => {
          const isRich = RICH_COMPONENTS.find(r => r.id === i.type);
          const isAction = ACTION_SECTIONS.find(a => a.id === i.type);
          return isRich || (!isAction);
        }).map(item => {
          const def = RICH_COMPONENTS.find(r => r.id === item.type) || STANDARD_FIELDS.find(f => f.id === item.type);
          if (!def) return null;
          return (
            <div key={item.instanceId} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${t.border.light}`, fontSize: 13 }}>
              <span style={{ color: t.text.tertiary }}>{item.label || def.label}</span>
              <span style={{ color: t.text.primary, fontWeight: 500 }}>--</span>
            </div>
          );
        })}
        <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 6, background: t.green.base, color: '#fff', fontSize: 13, fontWeight: 500 }}>Approve</div>
          <div style={{ flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 6, background: t.red.base, color: '#fff', fontSize: 13, fontWeight: 500 }}>Reject</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <span style={{ fontSize: 12, color: t.purple.base }}>View full details in Vertice →</span>
        </div>
      </div>
    </div>
  );

  if (channel === 'slack') return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', borderRadius: 8, border: `1px solid ${t.border.strong}` }}>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 4, background: t.purple.base, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box size={14} color="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: t.text.primary }}>Vertice</span>
          <span style={{ fontSize: 11, color: t.text.quaternary }}>APP</span>
        </div>
        <div style={{ borderLeft: `3px solid ${t.purple.base}`, paddingLeft: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: t.text.primary, marginBottom: 4 }}>Approval Required: Microsoft 365 Renewal</div>
          {visibleItems.filter(i => RICH_COMPONENTS.find(r => r.id === i.type)).slice(0, 3).map(item => {
            const def = RICH_COMPONENTS.find(r => r.id === item.type);
            return (
              <div key={item.instanceId} style={{ fontSize: 12, color: t.text.secondary, marginBottom: 2 }}>
                {def.label}: <span style={{ fontWeight: 500 }}>--</span>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ padding: '6px 16px', borderRadius: 4, background: t.green.base, color: '#fff', fontSize: 12, fontWeight: 500 }}>Approve</div>
          <div style={{ padding: '6px 16px', borderRadius: 4, border: `1px solid ${t.border.strong}`, color: t.text.secondary, fontSize: 12, fontWeight: 500 }}>Reject</div>
          <div style={{ padding: '6px 16px', borderRadius: 4, border: `1px solid ${t.border.strong}`, color: t.purple.base, fontSize: 12, fontWeight: 500 }}>Open in Vertice</div>
        </div>
      </div>
    </div>
  );

  return null;
};

// ═══════════════════════════════════════════════════════════════
// TASK SETTINGS TAB (Layer 3: Execution)
// ═══════════════════════════════════════════════════════════════
const TaskSettings = () => (
  <div style={{ padding: 20 }}>
    <div style={{ fontSize: 13, fontWeight: 500, color: t.text.primary, marginBottom: 16 }}>Task Execution Settings</div>
    
    {/* Assignee */}
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: t.text.secondary, display: 'block', marginBottom: 6 }}>Assignee Rule</label>
      <select style={{ width: '100%', height: 32, padding: '0 8px', fontSize: 13, border: `1px solid ${t.border.strong}`, borderRadius: 6, fontFamily: 'inherit', color: t.text.primary }}>
        <option>Department manager</option>
        <option>Specific user</option>
        <option>Role-based (Finance approver)</option>
        <option>Round robin</option>
      </select>
    </div>

    {/* Override */}
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: t.text.secondary, marginBottom: 8 }}>
        <input type="checkbox" defaultChecked style={{ accentColor: t.purple.base }} />
        Allow manager override
      </label>
      <div style={{ fontSize: 12, color: t.text.quaternary, paddingLeft: 24, lineHeight: 1.5 }}>
        When enabled, a manager's manager can take over this task (e.g., holiday coverage, disagreement resolution). Uses the same form with a different assignee.
      </div>
    </div>

    {/* SLA */}
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: t.text.secondary, display: 'block', marginBottom: 6 }}>SLA Deadline</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="number" defaultValue={3} style={{ width: 60, height: 32, padding: '0 8px', fontSize: 13, border: `1px solid ${t.border.strong}`, borderRadius: 6, fontFamily: 'inherit', color: t.text.primary }} />
        <select style={{ flex: 1, height: 32, padding: '0 8px', fontSize: 13, border: `1px solid ${t.border.strong}`, borderRadius: 6, fontFamily: 'inherit', color: t.text.primary }}>
          <option>Business days</option>
          <option>Calendar days</option>
          <option>Hours</option>
        </select>
      </div>
    </div>

    {/* Notifications */}
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: t.text.secondary, display: 'block', marginBottom: 8 }}>Notifications</label>
      {['Slack', 'Microsoft Teams', 'Email'].map(ch => (
        <label key={ch} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: t.text.secondary, marginBottom: 6 }}>
          <input type="checkbox" defaultChecked={ch !== 'Microsoft Teams'} style={{ accentColor: t.purple.base }} />
          {ch}
        </label>
      ))}
    </div>

    {/* Variables */}
    <div style={{ background: t.purple.light + '40', borderRadius: 8, padding: 12, border: `1px solid ${t.purple.base}20` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Braces size={13} color={t.purple.base} />
        <span style={{ fontSize: 12, fontWeight: 500, color: t.purple.base }}>Task Variables</span>
      </div>
      <div style={{ fontSize: 12, color: t.text.tertiary, marginBottom: 8 }}>Variables available to form components:</div>
      {[
        { name: 'offer1', type: 'Offer', source: 'negotiation.output' },
        { name: 'offer2', type: 'Offer', source: 'negotiation.output' },
        { name: 'contract', type: 'Contract', source: 'trigger.contract' },
        { name: 'budget', type: 'Budget', source: 'system.dept_budget' },
        { name: 'vendor', type: 'Vendor', source: 'trigger.vendor' },
      ].map(v => (
        <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderBottom: `1px solid ${t.border.light}` }}>
          <code style={{ fontSize: 12, color: t.purple.base, background: t.purple.light, padding: '1px 6px', borderRadius: 3 }}>{v.name}</code>
          <span style={{ fontSize: 11, color: t.text.quaternary }}>{v.type}</span>
          <span style={{ fontSize: 11, color: t.text.quaternary, marginLeft: 'auto', fontFamily: 'monospace' }}>← {v.source}</span>
        </div>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
let instanceCounter = 7;

export default function FormBuilderSystem() {
  const [activeTab, setActiveTab] = useState('edit');
  const [previewChannel, setPreviewChannel] = useState('web');
  const [selectedItem, setSelectedItem] = useState(null);
  const [rightPanel, setRightPanel] = useState('properties'); // properties | settings

  // Start with a pre-populated renewal approval form
  const [canvasItems, setCanvasItems] = useState([
    { instanceId: 'i1', type: 'text', label: 'Vendor name', required: true, channels: { web: true, email: true, slack: true } },
    { instanceId: 'i2', type: 'currency', label: 'Annual contract value', required: true, channels: { web: true, email: true, slack: true } },
    { instanceId: 'i3', type: 'offer_comparison', boundVariable: 'offers', channels: { web: true, email: false, slack: false } },
    { instanceId: 'i4', type: 'budget_variance', boundVariable: 'budget', channels: { web: true, email: true, slack: true } },
    { instanceId: 'i5', type: 'contract_lineage', boundVariable: 'contract', channels: { web: true, email: false, slack: false } },
    { instanceId: 'i6', type: 'ai_recommendation', boundVariable: 'aiInsight', channels: { web: true, email: true, slack: true } },
    { instanceId: 'i7', type: 'approval_actions', channels: { web: true, email: true, slack: true } },
  ]);

  const addItem = (def) => {
    instanceCounter++;
    const newItem = {
      instanceId: `i${instanceCounter}`,
      type: def.id,
      label: def.label,
      channels: { web: true, email: true, slack: true },
      ...(def.bindsTo ? { boundVariable: '' } : {}),
    };
    // Insert before action sections
    const actionIdx = canvasItems.findIndex(i => ACTION_SECTIONS.find(a => a.id === i.type));
    if (actionIdx >= 0) {
      const updated = [...canvasItems];
      updated.splice(actionIdx, 0, newItem);
      setCanvasItems(updated);
    } else {
      setCanvasItems([...canvasItems, newItem]);
    }
    setSelectedItem(newItem.instanceId);
    setActiveTab('edit');
  };

  const removeItem = (instanceId) => {
    setCanvasItems(canvasItems.filter(i => i.instanceId !== instanceId));
    if (selectedItem === instanceId) setSelectedItem(null);
  };

  const updateItem = (instanceId, updates) => {
    setCanvasItems(canvasItems.map(i => i.instanceId === instanceId ? { ...i, ...updates } : i));
  };

  const formName = 'Renewal Approval Form';

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: t.bg.canvas, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: t.text.primary, fontSize: 14, lineHeight: 1.5, WebkitFontSmoothing: 'antialiased' }}>
      
      {/* Top bar */}
      <div style={{ height: 48, background: t.bg.primary, borderBottom: `1px solid ${t.border.light}`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: t.purple.base, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutGrid size={13} color="#fff" />
          </div>
          <span style={{ fontSize: 13, color: t.text.tertiary }}>Forms</span>
          <ChevronRight size={12} color={t.text.quaternary} />
          <span style={{ fontSize: 13, fontWeight: 500, color: t.text.primary }}>{formName}</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: t.text.quaternary, padding: '3px 8px', background: t.bg.secondary, borderRadius: 4 }}>
            Used by 6 resources
          </span>
          <button style={{ height: 32, padding: '0 14px', borderRadius: 6, background: t.bg.primary, border: `1px solid ${t.border.strong}`, fontSize: 13, fontWeight: 500, color: t.text.secondary, cursor: 'pointer', fontFamily: 'inherit' }}>
            Duplicate
          </button>
          <button style={{ height: 32, padding: '0 14px', borderRadius: 6, background: t.purple.base, border: 'none', fontSize: 13, fontWeight: 500, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
            Save form
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* LEFT: Component Palette */}
        <div style={{ width: 220, background: t.bg.primary, borderRight: `1px solid ${t.border.light}`, overflowY: 'auto', padding: '12px 10px', flexShrink: 0 }}>
          <PaletteSection title="Standard Fields" items={STANDARD_FIELDS} onAdd={addItem} />
          <PaletteSection title="Rich Components" items={RICH_COMPONENTS} isRich onAdd={addItem} />
          <PaletteSection title="Action Sections" items={ACTION_SECTIONS} isAction onAdd={addItem} />
        </div>

        {/* CENTER: Canvas + Preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0 20px', borderBottom: `1px solid ${t.border.light}`, background: t.bg.primary, flexShrink: 0 }}>
            {[
              { id: 'edit', label: 'Edit', icon: LayoutGrid },
              { id: 'preview', label: 'Preview', icon: Eye },
              { id: 'channels', label: 'Channels', icon: Monitor },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', background: 'none', border: 'none',
                borderBottom: `2px solid ${activeTab === tab.id ? t.purple.base : 'transparent'}`,
                color: activeTab === tab.id ? t.purple.base : t.text.tertiary, fontFamily: 'inherit',
                transition: 'all 0.12s', marginBottom: -1
              }}>
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {activeTab === 'edit' && (
              <div style={{ maxWidth: 560, margin: '0 auto' }}>
                <div style={{ fontSize: 12, color: t.text.quaternary, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Puzzle size={13} />
                  {canvasItems.length} components · Click to configure · Drag to reorder
                </div>
                {canvasItems.map(item => (
                  <FieldOnCanvas 
                    key={item.instanceId} 
                    item={item} 
                    selected={selectedItem === item.instanceId}
                    onSelect={setSelectedItem}
                    onRemove={removeItem}
                  />
                ))}
                <button onClick={() => {}} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  width: '100%', padding: '10px 0', borderRadius: 8,
                  border: `1px dashed ${t.border.strong}`, background: 'none',
                  fontSize: 12, color: t.text.quaternary, cursor: 'pointer', marginTop: 8,
                  fontFamily: 'inherit'
                }}>
                  <Plus size={14} /> Add component from palette
                </button>
              </div>
            )}

            {activeTab === 'preview' && (
              <div style={{ maxWidth: 560, margin: '0 auto', background: t.bg.primary, borderRadius: 8, border: `1px solid ${t.border.strong}`, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border.light}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: t.text.primary }}>Manager Approval</div>
                    <div style={{ fontSize: 12, color: t.text.tertiary, marginTop: 2 }}>Microsoft 365 · Renewal · Due Mar 29, 2026</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, color: t.amber.base, background: t.amber.light, padding: '3px 8px', borderRadius: 4 }}>Pending</span>
                </div>
                <div style={{ padding: 20 }}>
                  {canvasItems.filter(i => i.channels?.web !== false).map(item => {
                    const isRich = RICH_COMPONENTS.find(r => r.id === item.type);
                    const isAction = ACTION_SECTIONS.find(a => a.id === item.type);
                    const def = isRich || isAction || STANDARD_FIELDS.find(f => f.id === item.type);
                    if (!def) return null;
                    if (isAction) return (
                      <div key={item.instanceId} style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${t.border.light}`, display: 'flex', gap: 8 }}>
                        <button style={{ flex: 1, height: 40, borderRadius: 8, border: 'none', background: t.green.base, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Approve</button>
                        <button style={{ flex: 1, height: 40, borderRadius: 8, border: `1px solid ${t.border.strong}`, background: t.bg.primary, color: t.text.secondary, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Reject</button>
                      </div>
                    );
                    if (isRich) return (
                      <div key={item.instanceId} style={{ marginBottom: 12 }}>
                        <RichPreview type={item.type} />
                      </div>
                    );
                    return (
                      <div key={item.instanceId} style={{ marginBottom: 12 }}>
                        <label style={{ fontSize: 12, fontWeight: 500, color: t.text.secondary, display: 'block', marginBottom: 4 }}>
                          {item.label || def.label}
                          {item.required && <span style={{ color: t.red.base, marginLeft: 2 }}>*</span>}
                        </label>
                        <div style={{ height: 32, border: `1px solid ${t.border.strong}`, borderRadius: 6, background: t.bg.primary }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'channels' && (
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
                  {[
                    { id: 'email', label: 'Email', icon: Mail },
                    { id: 'slack', label: 'Slack / Teams', icon: MessageSquare }
                  ].map(ch => (
                    <button key={ch.id} onClick={() => setPreviewChannel(ch.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                      borderRadius: 6, border: `1px solid ${previewChannel === ch.id ? t.purple.base : t.border.strong}`,
                      background: previewChannel === ch.id ? t.purple.light : t.bg.primary,
                      color: previewChannel === ch.id ? t.purple.base : t.text.secondary,
                      fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
                    }}>
                      <ch.icon size={14} /> {ch.label}
                    </button>
                  ))}
                </div>
                <ChannelPreview channel={previewChannel} items={canvasItems} formName={formName} />
                <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: t.text.quaternary }}>
                  Configure per-component channel visibility in the properties panel
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Properties / Settings */}
        <div style={{ width: 280, background: t.bg.primary, borderLeft: `1px solid ${t.border.light}`, overflow: 'hidden', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Right panel tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${t.border.light}`, flexShrink: 0 }}>
            {[
              { id: 'properties', label: 'Properties', icon: Settings },
              { id: 'settings', label: 'Task Settings', icon: Zap },
            ].map(tab => (
              <button key={tab.id} onClick={() => setRightPanel(tab.id)} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '10px 0', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                background: 'none', border: 'none', fontFamily: 'inherit',
                borderBottom: `2px solid ${rightPanel === tab.id ? t.purple.base : 'transparent'}`,
                color: rightPanel === tab.id ? t.purple.base : t.text.tertiary,
                marginBottom: -1
              }}>
                <tab.icon size={13} /> {tab.label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {rightPanel === 'properties' ? (
              <PropertiesPanel selectedItem={selectedItem} items={canvasItems} onUpdate={updateItem} />
            ) : (
              <TaskSettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
