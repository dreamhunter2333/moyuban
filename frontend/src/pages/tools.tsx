import { TOOLS } from '@/lib/tools';
import { PageHeading } from '@/components/page-heading';
import { ToolLink } from '@/components/tool-link';

export function ToolsPage() {
  return (
    <div className="page-content tool-workspace">
      <PageHeading title="工具集" />
      <div className="tools-index">
        {TOOLS.map((tool) => (
          <ToolLink key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
