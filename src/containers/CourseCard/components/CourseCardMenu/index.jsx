import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
// import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { Dropdown } from '@edx/paragon';
// import { MoreVert } from '@edx/paragon/icons';
import { StrictDict } from '@edx/react-unit-test-utils';

import EmailSettingsModal from 'containers/EmailSettingsModal';
import UnenrollConfirmModal from 'containers/UnenrollConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { reduxHooks } from 'hooks';
import SocialShareMenu from './SocialShareMenu';
import {
  useEmailSettings,
  useUnenrollData,
  useHandleToggleDropdown,
  useOptionVisibility,
} from './hooks';

import messages from './messages';

export const testIds = StrictDict({
  unenrollModalToggle: 'unenrollModalToggle',
});

export const CourseCardMenu = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const emailSettings = useEmailSettings();
  const unenrollModal = useUnenrollData();
  const handleToggleDropdown = useHandleToggleDropdown(cardId);
  const { shouldShowUnenrollItem, shouldShowDropdown } = useOptionVisibility(cardId);
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const { isEmailEnabled } = reduxHooks.useCardEnrollmentData(cardId);

  if (!shouldShowDropdown) {
    return null;
  }

  return (
    <>
      <Dropdown onToggle={handleToggleDropdown}>
        {/* Commented out the unenrooll button */}
        {/* <Dropdown.Toggle
          id={`course-actions-dropdown-${cardId}`}
          as={IconButton}
          src={MoreVert}
          iconAs={Icon}
          variant="link"  //Removed border around unenroll button
          alt={formatMessage(messages.dropdownAlt)}
        /> */}
        <FontAwesomeIcon
          className="bookmark-icon"
          icon={faBookmark}
          style={
            {
              color: '#004179', marginTop: '14px', width: '9.69px', height: '12.94px',
            }
          }
        />
        <Dropdown.Menu>
          {shouldShowUnenrollItem && (
            <Dropdown.Item
              disabled={isMasquerading}
              onClick={unenrollModal.show}
              data-testid={testIds.unenrollModalToggle}
            >
              {formatMessage(messages.unenroll)}
            </Dropdown.Item>
          )}
          <SocialShareMenu cardId={cardId} emailSettings={emailSettings} />
        </Dropdown.Menu>
      </Dropdown>
      <UnenrollConfirmModal
        show={unenrollModal.isVisible}
        closeModal={unenrollModal.hide}
        cardId={cardId}
      />
      {isEmailEnabled && (
        <EmailSettingsModal
          show={emailSettings.isVisible}
          closeModal={emailSettings.hide}
          cardId={cardId}
        />
      )}
    </>
  );
};
CourseCardMenu.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardMenu;
