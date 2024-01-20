export type MessageObject = {
  id: string;
  name?: string;
  webUrl?: string;
};

export type ButtonProps = {
  onClick?: () => void;
  text: string;
  icon?: string;
  loading?: boolean;
};
