import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dashboardService from '@/services/dashboard.service';
import { ChartModel } from '@fc-aiot-fe-share/types/dashboard.type';
import { ChartDisplay } from '../../components/chart-display';
import { Option } from '@fc-aiot-fe-share/types/common.type';

const MainLightSidebarContent = () => {
    const { t } = useTranslation();
    const [charts, setCharts] = useState<ChartModel[]>([]);
    const [statistics, setStatistics] = useState<Array<Option>>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const bgColors = [
        'bg-[#1abc9c]',
        'bg-[#f39c12]',
        'bg-[#5895e0]',
        'bg-[#f07167]',
        'bg-[#56d573]',
        'bg-[#f07167]',
        'bg-[#56d573]',
        'bg-[#5895e0]',
    ];

    useEffect(() => {
        setIsLoading(true);
        dashboardService.getDashboardView().then((res) => {
            setCharts(res?.data?.data?.charts);

            setStatistics(res?.data?.data?.statistics?.[0]?.statisticModels?.components);
            setIsLoading(false);
        });
    }, []);

    return (
        <Spin spinning={isLoading}>
            <div className="grid gap-5 lg:gap-7.5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {/* Stats */}
                    {statistics?.length > 0 &&
                        statistics.map((item, idx) => (
                            <Card key={idx} className={`rounded-lg ${bgColors[idx]} text-white`}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                    <CardTitle className="text-sm font-medium">{t(item.label)}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-between items-center gap-2">
                                    <div className="text-2xl font-medium">{item.value}</div>
                                    {item.label === 'order.pending' && (
                                        <Link
                                            to={`/sales/product-order?status=pending`}
                                            className="hover:underline hover:text-gray-100 text-sm">
                                            {t('host.seeDetails')}
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-8">
                    {charts?.length > 0 &&
                        charts.map((item, idx) => (
                            <Card className="col-span-1 lg:col-span-4" key={idx}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{t(item?.chartName)}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ChartDisplay data={item?.chartModels} type={item.chartType} />
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
        </Spin>
    );
};

export { MainLightSidebarContent };
