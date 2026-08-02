interface AllFiltersFieldProps {
  label: string;
  children: React.ReactNode;
}

export const AllFiltersField = ({ label, children }: AllFiltersFieldProps) => {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      {children}
    </label>
  );
};
