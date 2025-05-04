import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({
  label,
  type,
  name,
  register,
  error,
  rules,
}: InputProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <label className="font-medium text-lg" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        {...register(name, rules)}
        id={name}
        className="h-12 border border-zinc-300 rounded-lg outline-none px-4 text-zinc-500 hover:border-indigo-500 focus:border-indigo-500"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
