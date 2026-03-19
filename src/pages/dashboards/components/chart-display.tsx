import { EChartType } from '@fc-aiot-fe-share/enums/chart.enum';
import { DashboardAccountViewChartOutputModel } from '@fc-aiot-fe-share/types/dashboard.type';
import { useTranslation } from 'react-i18next';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ComposedChart,
    LabelList,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const STATUS_COLORS: Record<string, string> = {
    'order.completed': '#22c55e',
    'order.pending': '#facc15',
};
const DEFAULT_COLOR = '#ffb366';

export function ChartDisplay({ data, type }: { data: DashboardAccountViewChartOutputModel; type: number }) {
    const { t } = useTranslation();

    if (type === EChartType.Horizontal) {
        return (
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    layout="vertical"
                    data={data?.components || []}
                    maxBarSize={80}
                    margin={{ top: 16, right: 30, left: 0, bottom: 5 }}>
                    <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                        type="category"
                        dataKey="label"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={80}
                    />
                    <Tooltip
                        separator=""
                        formatter={(value, name) => [value.toLocaleString(), `${t(name + '')}: `]}
                        labelFormatter={(label) => t(label)}
                    />
                    <Bar
                        dataKey="value"
                        fill="#1B84FF"
                        radius={[0, 4, 4, 0]}
                        className="fill-primary"
                        name={t(data?.components?.[0]?.key)}>
                        <LabelList position="right" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }

    if (type === EChartType.BarAndLine) {
        const chartData =
            data?.components?.map((item) => ({
                label: item.label,
                value: item.value,
                ...item.lineValues,
            })) || [];

        const lineKeys = data?.components?.length > 0 ? Object.keys(data.components[0].lineValues || {}) : [];

        return (
            <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={chartData} margin={{ left: 30 }}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="label" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />

                    <Tooltip
                        separator=""
                        formatter={(value, name) => [value.toLocaleString(), `${t(name + '')}: `]}
                        labelFormatter={(label) => t(label)}
                    />
                    <Legend formatter={(value) => t(value)} />

                    <Bar
                        yAxisId="left"
                        dataKey="value"
                        barSize={20}
                        fill="#1B84FF"
                        className="fill-primary"
                        name={t(data?.components?.[0]?.key)}
                    />
                    {lineKeys.map((key) => (
                        <Line
                            key={key}
                            yAxisId="right"
                            type="monotone"
                            dataKey={key}
                            stroke={STATUS_COLORS[key] || DEFAULT_COLOR}
                            strokeWidth={2}
                            name={t(key)}
                            dot={{ r: 4 }}
                        />
                    ))}
                </ComposedChart>
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={data?.components || []}
                maxBarSize={80}
                margin={{ top: 16, right: 0, left: -20, bottom: 5 }}>
                <XAxis
                    dataKey="label"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => (value.length > 10 ? value.substring(0, 10) + '...' : value)}
                />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    separator=""
                    formatter={(value, name) => [value.toLocaleString(), `${t(name + '')}: `]}
                    labelFormatter={(label) => t(label)}
                />
                <Bar
                    dataKey="value"
                    fill="#1B84FF"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                    name={t(data?.components?.[0]?.key)}>
                    <LabelList dataKey="value" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
