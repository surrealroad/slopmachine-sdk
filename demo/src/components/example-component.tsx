import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/code-block";

interface ExampleComponentProps {
  controls: ReactNode;
  output: ReactNode;
  code: string;
  title?: string;
}

export function ExampleComponent({
  controls,
  output,
  code,
  title = "Context Variables",
}: ExampleComponentProps) {
  return (
    <div className="grid grid-cols-2 gap-0 items-stretch shadow-retro-lg">
      {/* Controls */}
      <Card className="bg-background rounded-none rounded-tl-sm border-2 border-neutral-800 border-b-0 border-r-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">{controls}</CardContent>
      </Card>

      {/* Output */}
      <div className="overflow-hidden rounded-none rounded-tr-sm border-2 border-neutral-800 border-b-0">
        {output}
      </div>

      <div className="overflow-hidden rounded-b-sm col-span-2 border-2 border-neutral-800">
        <CodeBlock code={code} language="tsx" showLineNumbers wrap>
          <CodeBlockCopyButton />
        </CodeBlock>
      </div>
    </div>
  );
}
