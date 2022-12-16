type StreamItem = {
  link?: string;
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
