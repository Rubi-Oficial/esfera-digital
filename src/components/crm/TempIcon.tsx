import { Flame, Snowflake, Thermometer } from "lucide-react";

const TempIcon = ({ temp }: { temp: string }) => {
  if (temp === "quente") return <Flame size={14} className="text-red-400" />;
  if (temp === "morno") return <Thermometer size={14} className="text-yellow-400" />;
  return <Snowflake size={14} className="text-blue-400" />;
};

export default TempIcon;
