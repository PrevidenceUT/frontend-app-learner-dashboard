import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

// import { getConfig } from '@edx/frontend-platform';
// import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';

import WidgetNavbar from 'containers/WidgetContainers/WidgetNavbar';
// import urls from 'data/services/lms/urls';
// import { reduxHooks } from 'hooks';
import { EXPANDED_NAVBAR } from 'widgets/RecommendationsPaintedDoorBtn/constants';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
// import { useIsCollapsed, findCoursesNavClicked } from '../hooks';
import { useIsCollapsed } from '../hooks';
// import messages from '../messages';
import BrandLogo from '../BrandLogo';

export const ExpandedHeader = () => {
  // const { formatMessage } = useIntl();
  // const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const isCollapsed = useIsCollapsed();

  // const exploreCoursesClick = findCoursesNavClicked(urls.baseAppUrl(courseSearchUrl));

  return (
    !isCollapsed && (
    <header className="d-flex align-items-center learner-variant-header pl-4">  {/* removed .shadow-sm class */}
      <div className="flex-grow-1 d-flex align-items-center">
        <BrandLogo />

        {/* Course button */}
        {/* <Button
          as="a"
          href="/"
          variant="inverse-primary"
          className="p-4 course-link"
        >
          {formatMessage(messages.course)}
        </Button> */}

        {/* Program button */}
        {/* <Button
          as="a"
          href={urls.programsUrl()}
          variant="inverse-primary"
          className="p-4"
        >
          {formatMessage(messages.program)}
        </Button> */}

        {/* Discover button */}
        {/* <Button
          as="a"
          href={urls.baseAppUrl(courseSearchUrl)}
          variant="inverse-primary"
          className="p-4"
          onClick={exploreCoursesClick}
        >
          {formatMessage(messages.discoverNew)}
        </Button> */}

        <WidgetNavbar placement={EXPANDED_NAVBAR} />
        <span className="flex-grow-1" />
        {/* <Button
          as="a"
          href={getConfig().SUPPORT_URL}
          variant="inverse-primary"
          className="p-4"
        >
          {formatMessage(messages.help)}
          </Button> */}
        {/* Removed support button and added notification icon */}
        <Button
          as="a"
          // href={getConfig().SUPPORT_URL}
          variant="inverse-primary"
          className="p-4"
        >
          <FontAwesomeIcon icon={farBell} />
        </Button>

      </div>

      <AuthenticatedUserDropdown />
    </header>
    )
  );
};

ExpandedHeader.propTypes = {};

export default ExpandedHeader;
