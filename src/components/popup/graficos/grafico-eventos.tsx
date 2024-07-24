import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

type Livros = {
  event_name: string;
  id: string;
  nature: string;
  participation: string;
  year: string;
};

const chartConfig = {
  Congresso: {
    label: "Congresso",
    color: "#FF5800",
  },
  Oficina: {
    label: "Oficina",
    color: "#FCEE21",
  },
  Outra: {
    label: "Outra",
    color: "#7F400B",
  },
  Simpósio: {
    label: "Simpósio",
    color: "#D53A2C",
  },
  Encontro: {
    label: "Encontro",
    color: "#E9A700",
  },
  Seminário: {
    label: "Seminário",
    color: "#FFBD7B",
  },
} as ChartConfig;

export function GraficosEventos({ publicacoes }: { publicacoes: Livros[] }) {
  const [chartData, setChartData] = useState<{ year: string; [nature: string]: number }[]>([]);

  useEffect(() => {
    const counts: { [year: string]: { [nature: string]: number } } = {};

    publicacoes.forEach((livro) => {
      const year = livro.year;
      const nature = livro.nature;

      if (!counts[year]) {
        counts[year] = {};
      }

      counts[year][nature] = (counts[year][nature] || 0) + 1;
    });

    const data = Object.entries(counts).map(([year, natureCounts]) => ({
      year,
      ...natureCounts,
    }));

    setChartData(data);
  }, [publicacoes]);

  function getColorForNature(nature: string) {
    return chartConfig[nature]?.color || '#000000';
  }

  return (
    <Alert className="pt-12">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
           
            <CartesianGrid vertical={false} horizontal={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            {Object.keys(chartConfig).map((nature, index) => (
              <Bar
                key={nature}
                dataKey={nature}
                stackId="a"
                fill={chartConfig[nature].color}
                radius={4}
              >
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
