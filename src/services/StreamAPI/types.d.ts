type StreamItem = {
  link?: string;
  logo?: string;
  name: string;
  type:
    | "tv_everywhere"
    | "subscription"
    | "purchase"
    | "free"
    | "rent"
    | "buy"
    | "sub"
    | "free";
};
