import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const SidebarNavLink = ({ item, active, collapsed, variant = 'main' }) => {
  const Icon = item.icon;
  const baseCls =
    'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-smooth';
  const activeCls = 'bg-surface-elevated text-foreground border-l-2 border-primary';
  const idleCls = 'text-foreground-muted hover:bg-surface-elevated hover:text-foreground';
  const collapsedCls = collapsed ? 'justify-center' : '';

  // Collapsed management variant has no border-left
  const isCollapsedMgmt = variant === 'collapsed-mgmt';
  const cls = isCollapsedMgmt
    ? cn(
        'w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-smooth',
        active
          ? 'bg-surface-elevated text-foreground'
          : 'text-foreground-muted hover:bg-surface-elevated hover:text-foreground'
      )
    : cn(baseCls, active ? activeCls : idleCls, collapsedCls);

  return (
    <Link to={item.path} title={collapsed ? item.label : undefined}>
      <button className={cls}>
        <Icon className="h-4 w-4 flex-shrink-0" />
        {!collapsed && !isCollapsedMgmt && item.label}
      </button>
    </Link>
  );
};

export default SidebarNavLink;
