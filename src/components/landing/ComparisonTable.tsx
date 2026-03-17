import React from 'react';
import { Check, X } from 'lucide-react';

const rows: [string, boolean, boolean, boolean][] = [
  ['Password protect', true, true, false],
  ['Auto-expiry', true, true, false],
  ['Image upload', true, false, true],
  ['Link previews', true, false, false],
  ['Code highlighting', true, true, false],
  ['Free to use', true, true, true],
];

const Icon = ({ val }: { val: boolean }) =>
  val ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />;

export const ComparisonTable: React.FC = () => (
  <section className="py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">How we compare</h2>
        <p className="text-muted-foreground">See why Online Clipboard is the best choice.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">Feature</th>
              <th className="p-4 font-bold text-foreground border-x-2 border-primary/20 bg-primary/5 rounded-t-lg">Online Clipboard</th>
              <th className="p-4 font-medium text-muted-foreground">Pastebin</th>
              <th className="p-4 font-medium text-muted-foreground">Google Keep</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([feature, oc, pb, gk], i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-4 font-medium text-foreground">{feature}</td>
                <td className="p-4 text-center border-x-2 border-primary/20 bg-primary/5"><Icon val={oc} /></td>
                <td className="p-4 text-center"><Icon val={pb} /></td>
                <td className="p-4 text-center"><Icon val={gk} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
