import { useAppSelector } from '@/hooks';
import { Spin } from 'antd';

const GlobalLoader = () => {
    const { actionLoading } = useAppSelector((state) => state.common.process);

    if (!actionLoading.treeMenu || !actionLoading.getAccountInfo) return null;

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[9999]">
            <Spin size="large" />
        </div>
    );
};

export { GlobalLoader };
