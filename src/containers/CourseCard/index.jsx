import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@edx/paragon';

import UserStory from 'assets/user_story.png';
import { useIsCollapsed } from './hooks';
// import CourseCardBanners from './components/CourseCardBanners';
import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
// import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';

import './CourseCard.scss';

export const CourseCard = ({
  cardId,
  showActionButton = true, // Add a default prop to control visibility
}) => {
  const isCollapsed = useIsCollapsed();
  // const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 course-card" id={cardId} data-testid="CourseCard">
      <Card>
        <div className="d-flex flex-column single-card">
          <div className="course-details">
            <div className="content-type-text-and-icon">
              <img className="content-type-icon" src={UserStory} alt="Content type icon" />
              <p className="content-type-text">User Story</p>  {/* This will be dynamic text */}
              <span className="emoji-container">
                <span className="content-type-emoji">😊</span>
              </span>
            </div>
            <div className="course-details-text">
              <CourseCardTitle cardId={cardId} />
              <CourseCardDetails cardId={cardId} />
            </div>
          </div>

          <div {...(!isCollapsed && { className: 'd-flex' })}>
            <CourseCardImage cardId={cardId} orientation="horizontal" />
            {/* <Card.Body>
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
                actions={<CourseCardMenu cardId={cardId} />}
              />
              <Card.Section className="pt-0">
                <CourseCardDetails cardId={cardId} />
              </Card.Section>
              <Card.Footer orientation={orientation}>
                <CourseCardActions cardId={cardId} />
              </Card.Footer>
            </Card.Body> */}
          </div>
          {showActionButton && (
          <div className="course-action-button">
            <CourseCardMenu cardId={cardId} />
          </div>
          )}
          {/* <CourseCardBanners cardId={cardId} /> */}
        </div>
      </Card>
    </div>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  showActionButton: PropTypes.bool, // Add PropTypes definition
};
CourseCard.defaultProps = {
  showActionButton: false, // Provide a default value
};

export default CourseCard;
