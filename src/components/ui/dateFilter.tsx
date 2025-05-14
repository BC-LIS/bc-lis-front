import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DateFilterInputProps {
  readonly label: string;
  readonly value?: string;
  readonly onChange: (value: string) => void;
}

export function DateFilterInput({ label, value, onChange }: DateFilterInputProps) {
  return (
    <div>
      <Label className="text-base font-semibold">{label}</Label>
      <Input
        type="date"
        className="w-full"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}