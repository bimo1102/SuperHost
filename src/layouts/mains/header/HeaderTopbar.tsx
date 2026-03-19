import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownUser } from '@/partials/dropdowns/user';
import { ModalSearch } from '@/partials/modals/search/ModalSearch';
import { toAbsoluteUrl } from '@fc-aiot-fe-share/utils';
import { useRef, useState } from 'react';
const HeaderTopbar = () => {
    const isRTL = false;
    const itemUserRef = useRef<any>(null);

    const handleShow = () => {
        window.dispatchEvent(new Event('resize'));
    };

    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const handleOpen = () => setSearchModalOpen(true);
    const handleClose = () => {
        setSearchModalOpen(false);
    };

    return (
        <div className="flex items-center gap-2 lg:gap-3.5">
            <button
                onClick={handleOpen}
                className="btn btn-icon btn-icon-lg size-9 rounded-full hover:bg-primary-light hover:text-primary text-gray-500">
                <KeenIcon icon="magnifier" />
            </button>
            <ModalSearch open={searchModalOpen} onOpenChange={handleClose} />

            <Menu>
                <MenuItem
                    ref={itemUserRef}
                    toggle="dropdown"
                    trigger="click"
                    dropdownProps={{
                        placement: isRTL ? 'bottom-start' : 'bottom-end',
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: isRTL ? [-20, 10] : [20, 10], // [skid, distance]
                                },
                            },
                        ],
                    }}>
                    <MenuToggle className="btn btn-icon rounded-full">
                        <img
                            className="size-9 rounded-full border-2 border-success shrink-0"
                            src={toAbsoluteUrl('/media/avatars/blank.png')}
                            alt=""
                        />
                    </MenuToggle>
                    {DropdownUser({ menuItemRef: itemUserRef })}
                </MenuItem>
            </Menu>
        </div>
    );
};

export { HeaderTopbar };
