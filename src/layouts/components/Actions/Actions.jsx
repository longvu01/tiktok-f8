import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import {
  CoinIcon,
  FeedbackAndHelpIcon,
  InboxIcon,
  KeyboardIcon,
  LanguageIcon,
  LogoutIcon,
  MessageIcon,
  ProfileIcon,
  SettingsIcon,
  UploadIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import styles from './Actions.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <LanguageIcon />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FeedbackAndHelpIcon />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <KeyboardIcon />,
    title: 'Keyboard shortcuts',
  },
];

const userMenu = [
  {
    icon: <ProfileIcon />,
    title: 'View profile',
    to: '/@jasonLe',
  },
  {
    icon: <CoinIcon />,
    title: 'Get coins',
    to: '/coin',
  },
  {
    icon: <SettingsIcon />,
    title: 'Settings',
    to: '/settings',
  },
  ...MENU_ITEMS,
  {
    icon: <LogoutIcon />,
    title: 'Log out',
    to: '/logout',
    separate: true,
  },
];

const actions = [
  {
    content: 'Upload video',
    icon: <UploadIcon />,
    badge: null,
  },
  {
    content: 'Message',
    icon: <MessageIcon />,
    badge: null,
  },
  {
    content: 'Inbox',
    icon: <InboxIcon />,
    badge: 12,
  },
];

function Actions({ currentUser }) {
  // Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        console.log('Handle change language');
        break;
      default:
        return;
    }
  };

  return (
    <div className={cx('actions')}>
      {currentUser ? (
        <>
          {actions.map((action) => (
            <Tippy
              key={action.content}
              delay={[0, 200]}
              content={action.content}
              placement="bottom"
            >
              <button className={cx('action-btn')}>
                {action.icon}
                {action.badge && (
                  <span className={cx('badge')}>{action.badge}</span>
                )}
              </button>
            </Tippy>
          ))}
        </>
      ) : (
        <>
          <Button text>Upload</Button>
          <Button primary>Log in</Button>
        </>
      )}
      <Menu
        items={currentUser ? userMenu : MENU_ITEMS}
        onChange={handleMenuChange}
      >
        {currentUser ? (
          <Image
            className={cx('user-avatar')}
            src="https://res.cloudinary.com/deojddyxc/image/upload/v1653564080/Main/167621803_947590256060095_4618145601499961579_n_1_pdcu3k.jpg"
            alt="user-name"
            // fallback="https://static.fullstack.edu.vn/static/media/f8-icon.7ad2b161d5e80c87e516.png"
          />
        ) : (
          <button className={cx('more-btn')}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        )}
      </Menu>
    </div>
  );
}

export default Actions;
