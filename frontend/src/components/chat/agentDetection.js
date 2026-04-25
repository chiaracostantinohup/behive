export const agentStyles = {
  finance: {
    name: 'Finance Agent',
    textColor: '#00E5A0',
    borderColor: '#00E5A0',
    bgColor: 'rgba(0, 229, 160, 0.4)',
  },
  marketing: {
    name: 'Marketing Agent',
    textColor: '#FF6B9D',
    borderColor: '#FF6B9D',
    bgColor: 'rgba(255, 107, 157, 0.4)',
  },
  sales: {
    name: 'Sales Agent',
    textColor: '#FFB800',
    borderColor: '#FFB800',
    bgColor: 'rgba(255, 184, 0, 0.4)',
  },
};

export const detectAgent = (text) => {
  const lower = text.toLowerCase();
  if (
    lower.includes('cost') ||
    lower.includes('budget') ||
    lower.includes('financial') ||
    lower.includes('finanziaria')
  ) {
    return 'finance';
  }
  if (
    lower.includes('marketing') ||
    lower.includes('campaign') ||
    lower.includes('campagna')
  ) {
    return 'marketing';
  }
  if (
    lower.includes('sales') ||
    lower.includes('vendite') ||
    lower.includes('pipeline')
  ) {
    return 'sales';
  }
  return 'finance';
};
