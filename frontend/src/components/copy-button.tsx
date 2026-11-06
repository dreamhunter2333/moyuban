import type { ComponentProps } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps extends Omit<ComponentProps<typeof Button>, 'children' | 'aria-label'> {
  copied: boolean;
  label: string;
  copiedLabel: string;
}

export function CopyButton({ copied, label, copiedLabel, variant = 'outline', ...props }: CopyButtonProps) {
  return (
    <Button variant={variant} size="icon" aria-label={copied ? copiedLabel : label} {...props}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
    </Button>
  );
}
