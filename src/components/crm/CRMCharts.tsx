import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Thermometer, BarChart3, Activity, Percent } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { format, subDays, startOfDay, eachDayOfInterval, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { STAGE_CONFIG, PIPELINE_ORDER, type PipelineStage, type Lead } from "@/lib/crm";

const chartTooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
  fontSize: "12px",
};

interface CRMChartsProps {
  leads: Lead[];
  grouped: Record<PipelineStage, Lead[]> | undefined;
}

const CRMCharts = ({ leads, grouped }: CRMChartsProps) => {
  const dailyLeadsData = useMemo(() => {
    const today = startOfDay(new Date());
    const start = subDays(today, 29);
    const days = eachDayOfInterval({ start, end: today });
    return days.map((day) => {
      const dayStr = format(day, "yyyy-MM-dd");
      const dayLeads = leads.filter((l) => format(parseISO(l.created_at), "yyyy-MM-dd") === dayStr);
      return {
        date: format(day, "dd/MM", { locale: ptBR }),
        total: dayLeads.length,
        quentes: dayLeads.filter((l) => l.temperatura === "quente").length,
        mornos: dayLeads.filter((l) => l.temperatura === "morno").length,
      };
    });
  }, [leads]);

  const tempDistribution = useMemo(() => {
    return [
      { name: "Frio 🧊", value: leads.filter((l) => l.temperatura === "frio").length, color: "#60a5fa" },
      { name: "Morno 🌡️", value: leads.filter((l) => l.temperatura === "morno").length, color: "#facc15" },
      { name: "Quente 🔥", value: leads.filter((l) => l.temperatura === "quente").length, color: "#f87171" },
    ].filter((d) => d.value > 0);
  }, [leads]);

  const stageBarData = useMemo(() => {
    return PIPELINE_ORDER.map((stage) => ({
      name: STAGE_CONFIG[stage].label,
      count: grouped?.[stage]?.length || 0,
    }));
  }, [grouped]);

  const cumulativeData = useMemo(() => {
    if (leads.length === 0) return [];
    const sorted = [...leads].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const today = startOfDay(new Date());
    const earliest = startOfDay(new Date(sorted[0].created_at));
    const start = subDays(today, Math.min(89, Math.floor((today.getTime() - earliest.getTime()) / 86400000)));
    const days = eachDayOfInterval({ start, end: today });
    let cumTotal = leads.filter((l) => new Date(l.created_at) < start).length;
    let cumConvertidos = leads.filter((l) => l.stage === "convertido" && new Date(l.created_at) < start).length;
    return days.map((day) => {
      const dayStr = format(day, "yyyy-MM-dd");
      const dayLeads = leads.filter((l) => format(parseISO(l.created_at), "yyyy-MM-dd") === dayStr);
      cumTotal += dayLeads.length;
      cumConvertidos += dayLeads.filter((l) => l.stage === "convertido").length;
      return { date: format(day, "dd/MM", { locale: ptBR }), total: cumTotal, convertidos: cumConvertidos };
    });
  }, [leads]);

  const weeklyConversionData = useMemo(() => {
    if (leads.length === 0) return [];
    const today = startOfDay(new Date());
    const weeks: { label: string; total: number; convertidos: number; taxa: number }[] = [];
    for (let w = 7; w >= 0; w--) {
      const weekEnd = subDays(today, w * 7);
      const weekStart = subDays(weekEnd, 6);
      const weekLeads = leads.filter((l) => {
        const d = new Date(l.created_at);
        return d >= weekStart && d <= new Date(weekEnd.getTime() + 86400000 - 1);
      });
      const convertidos = weekLeads.filter((l) => l.stage === "convertido").length;
      weeks.push({
        label: format(weekStart, "dd/MM", { locale: ptBR }),
        total: weekLeads.length,
        convertidos,
        taxa: weekLeads.length > 0 ? Math.round((convertidos / weekLeads.length) * 100) : 0,
      });
    }
    return weeks;
  }, [leads]);

  if (leads.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Leads */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-card border border-border/30 rounded-xl p-6 lg:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays size={18} className="text-primary" />
          <h2 className="text-lg font-semibold font-sora">Evolução de Leads (30 dias)</h2>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyLeadsData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="total" name="Total" stroke="hsl(var(--primary))" fill="url(#gradTotal)" strokeWidth={2} />
              <Area type="monotone" dataKey="quentes" name="Quentes" stroke="#f87171" fill="#f8717120" strokeWidth={1.5} />
              <Area type="monotone" dataKey="mornos" name="Mornos" stroke="#facc15" fill="#facc1520" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Temperature Pie */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-card border border-border/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Thermometer size={18} className="text-yellow-400" />
          <h2 className="text-lg font-semibold font-sora">Distribuição por Temperatura</h2>
        </div>
        <div className="h-[250px]">
          {tempDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tempDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {tempDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">Sem dados</div>
          )}
        </div>
      </motion.div>

      {/* Stage Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-card border border-border/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={18} className="text-cyan-400" />
          <h2 className="text-lg font-semibold font-sora">Leads por Etapa</h2>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageBarData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="count" name="Leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Cumulative Growth */}
      {cumulativeData.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="bg-card border border-border/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} className="text-emerald-400" />
            <h2 className="text-lg font-semibold font-sora">Crescimento Acumulado</h2>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cumulativeData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="total" name="Total" stroke="hsl(var(--primary))" fill="url(#gradCum)" strokeWidth={2} />
                <Area type="monotone" dataKey="convertidos" name="Convertidos" stroke="#22c55e" fill="#22c55e20" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Weekly Conversion */}
      {weeklyConversionData.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="bg-card border border-border/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Percent size={18} className="text-purple-400" />
            <h2 className="text-lg font-semibold font-sora">Conversão Semanal</h2>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyConversionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="total" name="Total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} opacity={0.4} />
                <Bar dataKey="convertidos" name="Convertidos" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CRMCharts;
