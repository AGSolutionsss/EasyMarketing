import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
    IconAtom,
    IconBasket,
    IconBellRinging,
    IconBorderAll,
    IconBorderRadius,
    IconBoxMultiple,
    IconBrandChrome,
    IconBrandGravatar,
    IconBrush,
    IconBug,
    IconCalendar,
    IconChartArcs,
    IconChartCandle,
    IconChartInfographic,
    IconCircle,
    IconCircleOff,
    IconClipboardList,
    IconDashboard,
    IconDeviceAnalytics,
    IconFiles,
    IconForms,
    IconHelp,
    IconId,
    IconKey,
    IconLayoutList,
    IconLoader,
    IconLockAccess,
    IconMail,
    IconMenu,
    IconMessages,
    IconNfc,
    IconPalette,
    IconPencil,
    IconPhoneCall,
    IconPictureInPicture,
    IconReceipt2,
    IconRun,
    IconShadow,
    IconShape,
    IconShieldLock,
    IconSitemap,
    IconTools,
    IconTypography,
    IconUser,
    IconUserCheck
} from '@tabler/icons';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,

    IconChartArcs: IconChartArcs,
    IconClipboardList: IconClipboardList,
    IconChartInfographic: IconChartInfographic,

    IconForms: IconForms,
    IconReceipt2: IconReceipt2,
    IconPencil: IconPencil,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconPhoneCall: IconPhoneCall,
    IconBrandChrome: IconBrandChrome,
    IconFiles: IconFiles,
    IconAtom: IconAtom,
    IconTools: IconTools,
    IconBrush: IconBrush,
    IconLockAccess: IconLockAccess,
    IconShieldLock: IconShieldLock,
    IconKey: IconKey,
    IconTypography: IconTypography,
    IconMenu: IconMenu,
    IconBoxMultiple: IconBoxMultiple,
    IconCircleOff: IconCircleOff,
    IconCircle: IconCircle,
    IconBorderRadius: IconBorderRadius,
    IconBrandGravatar: IconBrandGravatar,
    IconShape: IconShape,
    IconUserCheck: IconUserCheck,
    IconId: IconId,
    IconLayoutList: IconLayoutList,
    IconBug: IconBug,
    IconLoader: IconLoader,
    IconRun: IconRun,
    IconUser: IconUser,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconPictureInPicture: IconPictureInPicture,
    IconMail: IconMail,
    IconMessages: IconMessages,
    IconNfc: IconNfc,
    IconCalendar: IconCalendar,
    IconBellRinging: IconBellRinging,
    IconBorderAll: IconBorderAll,
    IconChartCandle: IconChartCandle,
    IconBasket: IconBasket
};

const menuItems = {
    items: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'group',
            children: [
                {
                    id: 'dash-default',
                    title: <FormattedMessage id="Dashboard" />,
                    type: 'item',
                    url: '/dashboard',
                    icon: icons['IconDashboard'],
                    breadcrumbs: false
                },
                {
                    id: 'user-list',
                    title: <FormattedMessage id="Users List" />,
                    type: 'item',
                    url: '/users-list',
                    icon: icons['IconUserCheck'],
                    
                },
                {
                    id: 'user-add',
                    title: <FormattedMessage id="Add Users" />,
                    type: 'item',
                    url: '/users-add',
                    icon: icons['IconUser'],
                    
                },
            ]
        },

       
        {
            id: 'utilities',
            title: <FormattedMessage id="Marketing" />,
            type: 'group',
            children: [
                {
                    id: 'icons1',
                    title: <FormattedMessage id="Upload Task" />,
                    type: 'collapse',
                    icon: icons['IconPencil'],
                    children: [
                        {
                            id: 'util-tabler-icons',
                            title: <FormattedMessage id="CSV Format" />,
                            type: 'item',
                            url: '/upload-csv-format'
                        },
                        {
                            id: 'util-material-icons',
                            title: <FormattedMessage id="Copy & Paste" />,
                            type: 'item',
                            url: '/upload-copy-paste'
                        }
                    ]
                },
                {
                    id: 'sample-page',
                    title: <FormattedMessage id="Assign Task List" />,
                    type: 'item',
                    url: '/assign-task-list',
                    icon: icons['IconBrandChrome']
                },
                {
                    id: 'icons',
                    title: <FormattedMessage id="Task List" />,
                    type: 'collapse',
                    icon: icons['IconCalendar'],
                    children: [
                        {
                            id: 'util-tabler-icons',
                            title: <FormattedMessage id="Unassign Task List" />,
                            type: 'item',
                            url: '/unassign-task-list'
                        },
                        {
                            id: 'util-material-icons',
                            title: <FormattedMessage id="Complete Task List" />,
                            type: 'item',
                            url: '/complete-task-list'
                        }
                    ]
                },
                
            ]
        },
        
    ]
};

export default menuItems;
