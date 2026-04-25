import React from 'react';
import { motion } from 'framer-motion';

export const QuickPrompts = ({ prompts, onSelect }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    {prompts.map((prompt, index) => {
      const Icon = prompt.icon;
      return (
        <motion.button
          key={prompt.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(prompt)}
          className="p-4 bg-surface border border-border rounded-lg text-left hover:bg-surface-elevated hover:border-primary/50 transition-smooth group"
        >
          <Icon className="h-5 w-5 text-foreground-muted mb-3 group-hover:text-primary transition-smooth" />
          <p className="text-sm text-foreground leading-snug">{prompt.text}</p>
        </motion.button>
      );
    })}
  </div>
);

export default QuickPrompts;
