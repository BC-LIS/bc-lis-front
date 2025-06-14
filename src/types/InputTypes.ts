export type InputRegisterField = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  description: string;
};

export type InputLoginField = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type InputField = {
  value: string;
  label: string;
};
